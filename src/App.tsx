import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./shared/context/AuthContext";
import OfflineAlert from "./shared/ui/OfflineAlert";
import UpdatePrompt from "./shared/ui/UpdatePrompt";
import LoginPage from "./pages/login/page";
import Main from "./pages/main/page";
import AuthCallback from "./pages/auth/callback";
import ProtectedRoute from "./shared/routes/ProtectedRoute";

// 로그인 여부에 따라 리다이렉트하는 컴포넌트
function AuthRedirect() {
  const { isAuthenticated, isLoading } = useAuth();

  // 로딩 중일 때는 아무것도 렌더링하지 않음
  if (isLoading) return null;

  // 인증된 사용자는 메인 페이지로, 그렇지 않으면 로그인 페이지로
  return isAuthenticated ? <Navigate to='/main' replace /> : <LoginPage />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='mx-auto max-w-[420px] flex flex-col min-h-screen bg-background'>
          <OfflineAlert />
          <Routes>
            <Route path='/' element={<AuthRedirect />} />

            <Route path='/auth/callback' element={<AuthCallback />} />

            <Route
              path='/main'
              element={
                // 인증 경로
                <Main />
              }
            />

            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
          <UpdatePrompt />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
