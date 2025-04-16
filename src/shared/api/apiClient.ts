import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// 개발용 API URL 로컬
const BASE_URL = import.meta.env.VITE_API_URL;

// 리프레시 관련 상태 관리 (전역 변수)
let isRefreshing = false;
let isRefreshFailed = false;

// API 클라이언트 생성 함수
const createApiClient = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: "/api",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // 요청 인터셉터
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      // 이미 리프레시 실패 상태라면 추가 시도 방지
      if (isRefreshFailed) {
        return Promise.reject(error);
      }

      // 401 Unauthorized 에러 (토큰 만료) 처리
      if (error.response?.status === 401) {
        // 이미 리프레시 진행 중이면 추가 시도 방지
        if (isRefreshing) {
          return Promise.reject(error);
        }

        try {
          isRefreshing = true;
          // refresh 토큰으로 새 access 토큰 요청
          await axiosInstance.post("/auth/refresh");
          isRefreshing = false;

          // 토큰 리프레시 성공 후 원래 요청 재시도
          return axiosInstance(error.config as AxiosRequestConfig);
        } catch (refreshError) {
          // 리프레시 실패 상태로 설정
          isRefreshFailed = true;
          isRefreshing = false;

          // 다른 API 호출이 완료될 시간을 주기 위해 약간 지연 후 리다이렉트
          setTimeout(() => {
            // 현재 로그인 페이지가 아닌 경우에만 리다이렉트
            if (window.location.pathname !== "/") {
              window.location.href = "/";
            }
          }, 100);

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const apiClient = createApiClient();

// 로그인 페이지에서 호출하여 리프레시 실패 상태 초기화
export const resetAuthState = () => {
  isRefreshFailed = false;
  isRefreshing = false;
};

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((response) => response.data),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((response) => response.data),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((response) => response.data),

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((response) => response.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((response) => response.data),
};
