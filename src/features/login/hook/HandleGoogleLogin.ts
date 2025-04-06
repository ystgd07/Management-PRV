import { useState } from "react";
import { useAuth } from "@/shared/context/AuthContext";
import { resetAuthState } from "@/shared/api/apiClient";

export function useGoogleLogin(auth = useAuth()) {
  const [error, setError] = useState<string | null>(null);
  const { checkAuthStatus, isLoading } = auth;

  const handleGoogleLogin = () => {
    try {
      resetAuthState();

      // 백엔드 API 서버의 Google 인증 엔드포인트로 직접 리다이렉트
      const apiBaseUrl = import.meta.env.VITE_API_URL || "";

      // OAuth 상태 파라미터 추가 (CSRF 방지)
      const state = btoa(
        JSON.stringify({
          redirectUrl: "/main", // 인증 성공 후 리다이렉트할 경로
          timestamp: Date.now(),
        })
      );

      // 로컬 스토리지에 상태 저장 (백엔드에서 리다이렉트 후 검증용)
      localStorage.setItem("oauth_state", state);

      // 리다이렉트 방식으로 OAuth 인증 시작
      window.location.href = `${apiBaseUrl}/auth/google?state=${encodeURIComponent(
        state
      )}`;

      // 주의: 이후 코드는 실행되지 않음
    } catch (error: any) {
      console.error("Google 로그인 리다이렉트 중 오류 발생:", error);
      setError("로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleOAuthCallback = async () => {
    try {
      // URL에서 state와 code 파라미터 추출
      const urlParams = new URLSearchParams(window.location.search);
      const state = urlParams.get("state");
      const code = urlParams.get("code");
      const errorParam = urlParams.get("error");

      if (errorParam) {
        setError(`인증 과정에서 오류가 발생했습니다: ${errorParam}`);
        return;
      }

      // 저장된 상태와 일치하는지 확인 (CSRF 방지)
      const savedState = localStorage.getItem("oauth_state");
      if (savedState !== state) {
        setError("보안 검증에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      // 인증 상태 확인
      const isAuthenticated = await checkAuthStatus();

      // 인증 성공 시 상태 정보에서 리다이렉트 URL 추출
      if (isAuthenticated && savedState) {
        try {
          const stateData = JSON.parse(atob(savedState));
          if (stateData.redirectUrl) {
            window.location.href = stateData.redirectUrl;
            return;
          }
        } catch (e) {
          console.error("상태 데이터 파싱 오류:", e);
        }
      }

      // 기본 리다이렉트
      window.location.href = "/main";
    } catch (error: any) {
      console.error("OAuth 콜백 처리 중 오류 발생:", error);
      setError("로그인 완료 처리 중 오류가 발생했습니다.");
    } finally {
      // 상태 정보 정리
      localStorage.removeItem("oauth_state");
    }
  };

  return {
    isLoading,
    error,
    handleGoogleLogin,
    handleOAuthCallback,
  };
}
