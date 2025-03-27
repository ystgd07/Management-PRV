import { Dispatch, SetStateAction } from 'react';

/**
 * PWA 서비스 등록 함수
 */
export const registerPWA = (): void => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Vite PWA 플러그인이 자동으로 처리
      console.log('PWA ready');
    });
  }
};

/**
 * PWA 업데이트 감지 및 알림 설정
 * @param setShowUpdatePrompt 업데이트 알림 표시 상태 설정 함수
 */
export const setupPWAUpdates = (
  setShowUpdatePrompt: Dispatch<SetStateAction<boolean>>
): (() => void) | undefined => {
  if ('serviceWorker' in navigator) {
    // 서비스 워커 업데이트 감지
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });

    // 개발 환경이 아닐 때만 주기적으로 업데이트 확인
    if (import.meta.env.PROD) {
      const interval = setInterval(async () => {
        try {
          const registration = await navigator.serviceWorker.getRegistration();
          if (registration) {
            await registration.update();
          }
        } catch (error) {
          console.error('서비스 워커 업데이트 오류:', error);
        }
      }, 60 * 60 * 1000); // 1시간마다 업데이트 확인

      return () => clearInterval(interval);
    }
  }
  
  return undefined;
}; 