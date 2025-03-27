import { useState, useEffect } from 'react';
import { setupPWAUpdates } from '../../pwa';

/**
 * PWA 업데이트 알림 컴포넌트
 */
const UpdatePrompt = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  
  useEffect(() => {
    const cleanup = setupPWAUpdates(setShowUpdatePrompt);
    return cleanup;
  }, []);
  
  if (!showUpdatePrompt) return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50">
      <p>새 버전이 준비되었습니다!</p>
      <div className="flex mt-2 gap-2">
        <button 
          className="bg-white text-blue-500 px-4 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          업데이트
        </button>
        <button 
          className="bg-transparent text-white border border-white px-4 py-2 rounded"
          onClick={() => setShowUpdatePrompt(false)}
        >
          나중에
        </button>
      </div>
    </div>
  );
};

export default UpdatePrompt; 