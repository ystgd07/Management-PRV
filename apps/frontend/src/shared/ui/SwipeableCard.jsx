import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';

/**
 * 스와이프 제스처를 지원하는 카드 컴포넌트
 * 좌우로 스와이프하여 액션을 수행할 수 있음
 */
const SwipeableCard = ({ title, description, onSwipeLeft, onSwipeRight }) => {
  const [offset, setOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      // 스와이프 중에 카드 위치 업데이트
      if (!isAnimating) {
        const newOffset = eventData.deltaX;
        // 스와이프 제한 (-150px ~ 150px)
        setOffset(Math.max(-150, Math.min(150, newOffset)));
      }
    },
    onSwiped: (eventData) => {
      setIsAnimating(true);
      
      // 오른쪽으로 충분히 스와이프된 경우
      if (offset > 100) {
        setOffset(200);
        setTimeout(() => {
          onSwipeRight && onSwipeRight();
          setOffset(0);
          setIsAnimating(false);
        }, 300);
      } 
      // 왼쪽으로 충분히 스와이프된 경우
      else if (offset < -100) {
        setOffset(-200);
        setTimeout(() => {
          onSwipeLeft && onSwipeLeft();
          setOffset(0);
          setIsAnimating(false);
        }, 300);
      } 
      // 충분히 스와이프되지 않은 경우 원위치
      else {
        setOffset(0);
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }
    },
    trackMouse: false,
    // 탭 중에 스와이프가 발생하는 것을 방지
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  });

  // 스와이프 방향에 따라 배경색 변경
  const getBgColor = () => {
    if (offset > 60) return 'rgba(0, 255, 0, 0.1)';  // 오른쪽 스와이프 (초록색)
    if (offset < -60) return 'rgba(255, 0, 0, 0.1)'; // 왼쪽 스와이프 (빨간색)
    return 'white';
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-md my-2 touch-manipulation"
      style={{ 
        x: offset,
        backgroundColor: getBgColor(),
        transition: isAnimating ? 'all 0.3s ease' : 'none',
      }}
      {...handlers}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        
        {/* 스와이프 힌트 */}
        <div className="mt-2 text-xs text-gray-400 flex justify-between">
          <span>← 삭제</span>
          <span>저장 →</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeableCard; 