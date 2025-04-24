import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api, resetAuthState } from "../api/apiClient";

interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  checkAuthStatus: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  checkAuthStatus: async () => false,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const userData = await api.get<User>("/auth/me");
      setUser(userData);
      return true;
    } catch (error) {
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      resetAuthState();
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  // 앱 시작 시 인증 상태 확인
  useEffect(() => {
    const isLoginPage = window.location.pathname === "/";

    // 로그인 페이지에서는 인증 확인을 건너뛰고 상태 초기화
    if (isLoginPage) {
      resetAuthState();
      setIsLoading(false);
      return;
    }

    // 보호된 페이지에서만 인증 상태 확인
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        checkAuthStatus,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
