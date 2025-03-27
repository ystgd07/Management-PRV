import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * 모바일 하단 네비게이션 바 컴포넌트
 * iOS, Android의 홈 인디케이터와 노치를 고려한 레이아웃
 */
const MobileNav = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  const tabs = [
    { id: 'home', icon: '🏠', label: '홈' },
    { id: 'search', icon: '🔍', label: '검색' },
    { id: 'notification', icon: '🔔', label: '알림' },
    { id: 'profile', icon: '👤', label: '프로필' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg pb-safe-bottom">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="flex flex-col items-center justify-center w-full h-full focus:outline-none"
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="relative">
              {activeTab === tab.id && (
                <motion.div
                  className="absolute inset-0 bg-blue-100 rounded-full -z-10"
                  layoutId="tab-indicator"
                  initial={false}
                  transition={{ type: 'spring', duration: 0.5 }}
                  style={{ width: '100%', height: '100%', padding: '8px' }}
                />
              )}
              <div className="text-xl mb-1">{tab.icon}</div>
            </div>
            <span className={`text-xs ${activeTab === tab.id ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav; 