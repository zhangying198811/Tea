import React from 'react';
import { AppRoute } from '../types';
import { Sparkles, ScanLine, Activity, MessageCircle, CloudSun, Leaf, Wind, ArrowRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (route: AppRoute) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="px-5 pt-6 min-h-full">
      {/* Top Bar: Date & Brand */}
      <div className="flex justify-between items-end mb-6 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-stone-500 mb-1">
             <span className="text-[10px] font-bold tracking-widest border border-stone-300 px-1.5 py-0.5 rounded-sm">甲辰年</span>
             <span className="text-[10px] tracking-widest">谷雨 · 宜品茶</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-stone-900 leading-none">
            灵叶<span className="text-red-800 text-lg align-top ml-1">®</span>
          </h1>
        </div>
        <div className="flex flex-col items-end">
           <div className="w-9 h-9 rounded-lg border-2 border-stone-800 flex items-center justify-center bg-stone-800 text-[#fcfbf7] shadow-[2px_2px_0px_#b91c1c]">
             <span className="font-serif font-bold text-sm">茶</span>
           </div>
        </div>
      </div>

      {/* Hero: Daily Wisdom (Card Style) */}
      <div className="relative w-full bg-[#2c4038] rounded-2xl p-6 text-[#fcfbf7] shadow-xl mb-8 overflow-hidden group border border-[#1a2621]">
         {/* Background Pattern */}
         <div className="absolute top-0 right-0 opacity-10 transform translate-x-8 -translate-y-8 rotate-12 transition-transform duration-700 group-hover:rotate-45">
            <Leaf size={140} />
         </div>
         
         <div className="relative z-10">
           <div className="flex items-center gap-2 mb-4 text-emerald-100/80">
             <CloudSun size={16} />
             <span className="text-[10px] tracking-[0.3em] font-medium uppercase border-b border-emerald-100/30 pb-0.5">每日茶签</span>
           </div>
           <p className="font-serif text-lg leading-relaxed mb-5 text-justify tracking-wide">
             "茶者，南方之嘉木也。<br/>一碗喉吻润，二碗破孤闷。"
           </p>
           <div className="flex justify-end items-center gap-2 opacity-70">
             <div className="h-px w-8 bg-emerald-100/50"></div>
             <span className="text-xs font-serif">陆羽《茶经》</span>
           </div>
         </div>
      </div>

      {/* Main Navigation Grid (Bogu Shelf Style) */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Large Card: Scan */}
        <div 
          onClick={() => onNavigate(AppRoute.SCAN_TEA)}
          className="col-span-2 bg-white p-5 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden active:scale-[0.99] transition-all hover:shadow-md cursor-pointer group"
        >
           <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <ScanLine size={140} />
           </div>
           <div className="relative z-10 flex justify-between items-center">
             <div className="flex-1 pr-4">
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-1">慧眼识茶</h3>
                <p className="text-xs text-stone-500 mb-4 leading-relaxed">
                  拍照识别 · 品质鉴定 · 冲泡指引<br/>
                  <span className="text-[10px] opacity-70">AI Visual Analysis</span>
                </p>
                <button className="bg-stone-800 text-white text-[10px] px-4 py-2 rounded-full flex items-center gap-1 group-hover:bg-stone-700 transition-colors">
                   立即识别 <ArrowRight size={12} />
                </button>
             </div>
             <div className="w-14 h-14 bg-red-50 rounded-2xl rotate-3 group-hover:rotate-12 transition-transform duration-500 flex items-center justify-center text-red-800 border border-red-100 shrink-0">
                <ScanLine size={26} />
             </div>
           </div>
        </div>

        {/* Medium Card: Health */}
        <div 
          onClick={() => onNavigate(AppRoute.HEALTH_ANALYSIS)}
          className="bg-[#f5f5f4] p-4 rounded-2xl border border-stone-200 shadow-sm active:scale-[0.98] transition-all hover:bg-[#efefeb] cursor-pointer flex flex-col justify-between min-h-[9rem]"
        >
           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-stone-700 shadow-sm mb-2 border border-stone-100">
              <Activity size={20} />
           </div>
           <div>
              <h3 className="font-serif font-bold text-stone-800 text-lg">中医闻诊</h3>
              <p className="text-[10px] text-stone-500 mt-1 leading-tight">AI 舌诊分析体质</p>
           </div>
        </div>

        {/* Medium Card: Chat */}
        <div 
          onClick={() => onNavigate(AppRoute.KNOWLEDGE_CHAT)}
          className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 shadow-sm active:scale-[0.98] transition-all hover:bg-emerald-50 cursor-pointer flex flex-col justify-between min-h-[9rem]"
        >
           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-700 shadow-sm mb-2 border border-emerald-50">
              <MessageCircle size={20} />
           </div>
           <div>
              <h3 className="font-serif font-bold text-stone-800 text-lg">问道茶师</h3>
              <p className="text-[10px] text-stone-500 mt-1 leading-tight">趣聊茶文化历史</p>
           </div>
        </div>
      </div>

      {/* Decorative Footer */}
      <div className="mt-12 text-center opacity-40 pb-4">
        <Wind className="mx-auto mb-2 text-stone-400" size={16} />
        <p className="text-[10px] font-serif tracking-[0.5em] text-stone-500">万物有灵 · 茶韵天成</p>
      </div>
    </div>
  );
};

export default Home;