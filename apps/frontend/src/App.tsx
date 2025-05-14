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
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/api/queryClient";
import { useFavoritesQuery } from "./entities/favorite/queries";
import { useJobStore } from "./store/Job/store";
import { useEffect } from "react";
import HistoryPage from "./pages/history/page";
import { Toaster } from "sonner";

// 찜하기 데이터 로드 컴포넌트 (Feature 레이어로 나누기) #수정필요
function FavoritesLoader() {
  const { isAuthenticated } = useAuth();
  const { data: favorites } = useFavoritesQuery();
  const { setFavorites, setSavedJobIds } = useJobStore();

  useEffect(() => {
    if (isAuthenticated && favorites) {
      setFavorites(favorites);
      setSavedJobIds(favorites.map((fav) => String(fav.jobId)));
    }
  }, [favorites, isAuthenticated, setFavorites, setSavedJobIds]);

  return null;
}

function AuthRedirect() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return isAuthenticated ? <Navigate to='/main' replace /> : <LoginPage />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position='bottom-center' theme='light' />
        <Router>
          <div className='mx-auto max-w-[420px] flex flex-col min-h-screen bg-background'>
            <OfflineAlert />
            {/* 인증된 사용자만 찜 목록 로드 */}
            <FavoritesLoader />
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

              <Route path='/history' element={<HistoryPage />} />

              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
            <UpdatePrompt />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
