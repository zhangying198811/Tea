import React from 'react';
import { Home, Eye, Activity, MessageCircleQuestion } from 'lucide-react';
import { AppRoute } from '../types';

interface NavigationProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentRoute, onNavigate }) => {
  const navItems = [
    { id: AppRoute.HOME, label: '茶寮', icon: Home },
    { id: AppRoute.SCAN_TEA, label: '识茶', icon: Eye },
    { id: AppRoute.HEALTH_ANALYSIS, label: '闻诊', icon: Activity },
    { id: AppRoute.KNOWLEDGE_CHAT, label: '问道', icon: MessageCircleQuestion },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 pt-2 pointer-events-none">
      {/* Dock Container */}
      <div className="pointer-events-auto bg-[#2c2c2a] text-[#fcfbf7] rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] p-1.5 flex items-center gap-1 border border-stone-700/50 backdrop-blur-md mx-4 max-w-sm w-full justify-between">
        {navItems.map((item) => {
          const isActive = currentRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                relative flex items-center justify-center h-12 rounded-full transition-all duration-500 ease-out overflow-hidden
                ${isActive ? 'flex-grow bg-[#3C5A50] text-[#fcfbf7] px-5 gap-2 shadow-inner' : 'w-12 text-stone-400 hover:text-stone-200 hover:bg-white/5'}
              `}
            >
              <item.icon 
                size={20} 
                strokeWidth={isActive ? 2 : 2} 
                className={`transition-transform duration-300 ${isActive ? 'scale-100' : 'scale-90'}`}
              />
              
              {/* Text Label - Only visible when active */}
              <span 
                className={`
                  font-serif font-bold text-sm whitespace-nowrap transition-all duration-500
                  ${isActive ? 'opacity-100 translate-x-0 max-w-[4rem]' : 'opacity-0 -translate-x-4 max-w-0'}
                `}
              >
                {isActive && item.label}
              </span>

              {/* Active Indicator Dot (Optional decoration) */}
              {isActive && (
                <span className="absolute top-1.5 right-1.5 w-1 h-1 bg-red-400 rounded-full opacity-80 animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;