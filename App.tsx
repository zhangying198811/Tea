import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ScanTea from './pages/ScanTea';
import HealthAnalysis from './pages/HealthAnalysis';
import ChatBot from './pages/ChatBot';
import { AppRoute } from './types';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);

  const renderPage = () => {
    switch (currentRoute) {
      case AppRoute.HOME:
        return <Home onNavigate={setCurrentRoute} />;
      case AppRoute.SCAN_TEA:
        return <ScanTea />;
      case AppRoute.HEALTH_ANALYSIS:
        return <HealthAnalysis />;
      case AppRoute.KNOWLEDGE_CHAT:
        return <ChatBot />;
      default:
        return <Home onNavigate={setCurrentRoute} />;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-[#fcfbf7] relative shadow-2xl overflow-hidden flex flex-col border-x border-stone-200">
      {/* Background Texture - Rice Paper Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Content Area */}
      {/* Added pb-28 to ensure content is visible above the bottom navigation */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 scrollbar-hide pb-28">
        {renderPage()}
      </main>

      {/* Navigation */}
      <Navigation currentRoute={currentRoute} onNavigate={setCurrentRoute} />
    </div>
  );
};

export default App;