import { useState, useEffect } from 'react';

/**
 * 오프라인 상태를 알려주는 알림 컴포넌트
 */
export const OfflineAlert = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  if (isOnline) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white p-2 text-center z-50">
      오프라인 상태입니다. 일부 기능이 제한될 수 있습니다.
    </div>
  );
};

export default OfflineAlert; 