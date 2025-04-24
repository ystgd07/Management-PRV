import { useEffect } from 'react';
import { useResponsive } from './useResponsive';

/**
 * 모바일 최적화를 위한 커스텀 훅
 * 모바일 환경에 맞게 다양한 설정을 자동으로 구성
 */
export const useMobileOptimization = () => {
  const { isMobile } = useResponsive();

  useEffect(() => {
    // 모바일 환경에서만 실행
    if (isMobile) {
      // 더블 탭 확대 방지 (iOS Safari)
      document.addEventListener('touchstart', (event) => {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      }, { passive: false });

      // 폼 입력 시 자동 확대 방지
      const metaViewport = document.querySelector('meta[name=viewport]');
      if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }

      // iOS에서 100vh 문제 해결
      const setVhVariable = () => {
        // 비주얼 뷰포트의 높이 (iOS에서 더 정확함)
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      setVhVariable();
      window.addEventListener('resize', setVhVariable);
      window.addEventListener('orientationchange', setVhVariable);

      // iOS에서 키보드가 나타날 때 화면 스크롤 방지
      const inputs = document.querySelectorAll('input, textarea');
      
      const handleFocus = () => {
        document.body.classList.add('keyboard-open');
        
        // 약간의 지연 후 스크롤 (iOS 키보드 열림 애니메이션 고려)
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 50);
      };
      
      const handleBlur = () => {
        document.body.classList.remove('keyboard-open');
      };
      
      inputs.forEach(input => {
        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);
      });

      // 클린업 함수
      return () => {
        window.removeEventListener('resize', setVhVariable);
        window.removeEventListener('orientationchange', setVhVariable);
        
        inputs.forEach(input => {
          input.removeEventListener('focus', handleFocus);
          input.removeEventListener('blur', handleBlur);
        });
      };
    }
  }, [isMobile]);

  // 유용한 모바일 최적화 헬퍼 함수
  const helpers = {
    // 모바일 터치 이벤트를 손쉽게 사용하기 위한 핸들러
    getTouchHandlers: (onSwipeLeft, onSwipeRight) => {
      let startX = 0;
      let startY = 0;
      
      return {
        onTouchStart: (e) => {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        },
        onTouchEnd: (e) => {
          const endX = e.changedTouches[0].clientX;
          const endY = e.changedTouches[0].clientY;
          
          const diffX = startX - endX;
          const diffY = startY - endY;
          
          // 수직 스와이프가 수평 스와이프보다 큰 경우 무시 (스크롤 의도)
          if (Math.abs(diffY) > Math.abs(diffX)) return;
          
          if (Math.abs(diffX) > 50) { // 최소 50px 이상 이동해야 스와이프로 인식
            if (diffX > 0) {
              // 왼쪽으로 스와이프
              onSwipeLeft && onSwipeLeft();
            } else {
              // 오른쪽으로 스와이프
              onSwipeRight && onSwipeRight();
            }
          }
        }
      };
    },
    
    // 스크롤 고정/해제 헬퍼
    lockScroll: () => {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    },
    
    unlockScroll: () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  };

  return {
    ...helpers,
    isMobile
  };
};

export default useMobileOptimization; 