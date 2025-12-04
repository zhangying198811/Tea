import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { fileToGenerativePart, identifyTea } from '../services/geminiService';
import { TeaAnalysisResult } from '../types';
import { Loader2, Leaf, Thermometer, Utensils, Feather } from 'lucide-react';

const ScanTea: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TeaAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const base64 = await fileToGenerativePart(file);
      const analysis = await identifyTea(base64, file.type);
      setResult(analysis);
    } catch (err) {
      setError("识别失败，请确保图片清晰并包含茶叶主体。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 pb-32 pt-6 min-h-screen">
      <div className="mb-6 border-l-4 border-stone-800 pl-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900">慧眼识茶</h2>
        <p className="text-stone-400 text-xs tracking-widest uppercase mt-1">Tea Identification</p>
      </div>

      <div className="mb-8">
        <ImageUploader 
          label="拍摄茶叶" 
          subLabel="干茶 / 茶汤"
          onImageSelect={handleAnalyze} 
        />
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 text-stone-600">
          <Loader2 size={40} className="animate-spin mb-4 text-[#3C5A50]" />
          <p className="font-serif text-sm tracking-widest animate-pulse">茶师正在品鉴...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-xl text-xs font-medium border border-red-100 text-center">
          {error}
        </div>
      )}

      {result && (
        <div className="animate-fade-in pb-4">
          {/* Result Card */}
          <div className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden relative">
            
            {/* Header Strip */}
            <div className="bg-[#3C5A50] p-4 text-[#fcfbf7] flex justify-between items-start">
               <div>
                  <h3 className="text-xl font-serif font-bold">{result.name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-xs opacity-90">
                     <span className="px-1.5 py-0.5 border border-white/30 rounded">{result.type}</span>
                     <span>{result.origin}</span>
                  </div>
               </div>
               <div className="w-10 h-10 border border-white/50 rounded-full flex items-center justify-center font-serif text-sm font-bold bg-white/10">
                  {result.quality_estimate.slice(0, 2)}
               </div>
            </div>

            <div className="p-5 space-y-6">
              
              {/* Sensory */}
              <div>
                 <h4 className="flex items-center gap-2 text-sm font-bold text-stone-800 mb-2">
                    <Leaf size={14} className="text-[#3C5A50]" /> 感官特征
                 </h4>
                 <p className="text-sm text-stone-600 leading-relaxed text-justify bg-stone-50 p-3 rounded-lg border border-stone-100">
                    {result.sensory_profile}
                 </p>
              </div>

              {/* Brewing Grid */}
              <div className="grid grid-cols-3 gap-2">
                 {[
                   { l: '水温', v: result.brewing_guide?.temp },
                   { l: '时间', v: result.brewing_guide?.time },
                   { l: '茶水比', v: result.brewing_guide?.ratio }
                 ].map((item, i) => (
                   <div key={i} className="text-center bg-[#fcfbf7] p-2 rounded-lg border border-stone-200">
                      <div className="text-[10px] text-stone-400 mb-1">{item.l}</div>
                      <div className="text-sm font-bold text-stone-800 truncate">{item.v}</div>
                   </div>
                 ))}
              </div>

              {/* Story */}
              <div className="relative">
                 <div className="absolute -top-3 left-4 bg-white px-2 text-xs font-serif font-bold text-stone-400">茶韵</div>
                 <div className="border-t border-stone-200 pt-3">
                   <p className="text-xs text-stone-500 italic leading-relaxed font-serif">
                     {result.culture_story}
                   </p>
                 </div>
              </div>

              {/* Pairing */}
              <div className="flex items-center justify-between bg-amber-50 p-3 rounded-lg border border-amber-100">
                 <div className="flex items-center gap-2">
                    <Utensils size={14} className="text-amber-700" />
                    <span className="text-xs text-amber-900 font-medium">茶食推荐</span>
                 </div>
                 <span className="text-sm font-serif font-bold text-amber-900">{result.food_pairing}</span>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanTea;