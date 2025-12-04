import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { fileToGenerativePart, analyzeConstitution } from '../services/geminiService';
import { TCMAnalysisResult } from '../types';
import { Loader2, AlertTriangle, ArrowRight, Scroll, ThermometerSun } from 'lucide-react';

const HealthAnalysis: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [result, setResult] = useState<TCMAnalysisResult | null>(null);

  const [answers, setAnswers] = useState({
    energy: '正常',
    temp: '正常',
    sleep: '良好'
  });

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setStep(2);
  };

  const handleAnalysis = async () => {
    if (!imageFile) return;
    setLoading(true);
    setStep(3);
    
    try {
      const base64 = await fileToGenerativePart(imageFile);
      const summary = `精力: ${answers.energy}, 冷热: ${answers.temp}, 睡眠: ${answers.sleep}`;
      const analysis = await analyzeConstitution(base64, imageFile.type, summary);
      setResult(analysis);
    } catch (err) {
      alert("分析中断，请重试");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 pb-32 pt-6 min-h-screen">
      <div className="mb-6 border-l-4 border-red-800 pl-4">
         <h2 className="text-2xl font-serif font-bold text-stone-900">中医闻诊</h2>
         <p className="text-stone-400 text-xs tracking-widest uppercase mt-1">TCM Analysis</p>
      </div>

      <div className="bg-amber-50/50 border border-amber-200 p-3 mb-6 rounded text-[10px] text-amber-900 leading-tight">
          <AlertTriangle className="inline mr-1 -mt-0.5" size={10} />
          结果仅供娱乐参考，不作为医疗依据。
      </div>

      {step === 1 && (
        <div className="animate-fade-in">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 text-center">
             <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3 text-stone-800 font-serif font-bold text-lg border border-stone-200">
                望
             </div>
             <h3 className="font-bold text-stone-800 mb-1">拍摄舌象</h3>
             <p className="text-xs text-stone-500 mb-6">自然光下，放松舌头</p>
             <ImageUploader label="上传照片" onImageSelect={handleImageSelect} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <div className="space-y-4 mb-6">
             {[
               { q: '精力状态', key: 'energy', opts: ['充沛', '正常', '疲乏'] },
               { q: '冷热偏好', key: 'temp', opts: ['怕冷', '正常', '怕热'] },
               { q: '睡眠质量', key: 'sleep', opts: ['安稳', '一般', '失眠'] }
             ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
                   <p className="text-xs font-bold text-stone-500 mb-3">{item.q}</p>
                   <div className="flex gap-2">
                     {item.opts.map(opt => (
                       <button
                         key={opt}
                         onClick={() => setAnswers({...answers, [item.key]: opt} as any)}
                         className={`flex-1 py-2 rounded text-xs transition-colors ${
                           (answers as any)[item.key] === opt 
                             ? 'bg-stone-800 text-white font-bold' 
                             : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                         }`}
                       >
                         {opt}
                       </button>
                     ))}
                   </div>
                </div>
             ))}
          </div>
          <button 
            onClick={handleAnalysis}
            className="w-full py-3.5 bg-red-800 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 text-sm"
          >
            生成诊断书 <ArrowRight size={16} />
          </button>
        </div>
      )}

      {step === 3 && loading && (
        <div className="text-center py-20 text-stone-600">
           <ThermometerSun className="mx-auto mb-4 text-red-800 animate-pulse" size={48} />
           <p className="font-serif tracking-widest text-sm">正在辨证论治...</p>
        </div>
      )}

      {step === 3 && !loading && result && (
        <div className="animate-fade-in space-y-4">
          <div className="bg-white rounded-xl shadow-lg border-t-4 border-red-800 p-6 relative overflow-hidden">
             {/* Seal */}
             <div className="absolute top-2 right-2 opacity-10 pointer-events-none">
                <Scroll size={100} />
             </div>

             <div className="text-center border-b border-stone-100 pb-4 mb-4">
                <p className="text-[10px] text-stone-400 tracking-[0.3em] uppercase mb-1">Diagnosis</p>
                <h2 className="text-3xl font-serif font-bold text-stone-900">{result.constitution}</h2>
             </div>

             <div className="space-y-4">
                <div>
                   <span className="text-xs font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded">辨证</span>
                   <p className="text-sm text-stone-600 mt-2 leading-relaxed text-justify">
                      {result.explanation}
                   </p>
                </div>

                <div className="bg-[#fcfbf7] p-3 rounded-lg border border-stone-200">
                   <span className="text-xs font-bold text-[#3C5A50] bg-emerald-50 px-2 py-0.5 rounded">宜饮</span>
                   <div className="flex flex-wrap gap-2 mt-2">
                      {result.recommended_teas.map((tea, i) => (
                        <span key={i} className="text-sm font-serif font-bold text-stone-800 border-b border-stone-300 pb-0.5">{tea}</span>
                      ))}
                   </div>
                </div>

                <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                   <span className="text-xs font-bold text-stone-500 border border-stone-200 px-2 py-0.5 rounded">忌口</span>
                   <p className="text-sm text-stone-600 mt-2">{result.avoid_teas.join("、")}</p>
                </div>

                <div className="pt-2">
                   <p className="text-xs text-stone-400 text-center font-serif italic">"{result.lifestyle_tip}"</p>
                </div>
             </div>
          </div>
          
          <button onClick={() => setStep(1)} className="w-full py-3 text-stone-400 text-xs">
             重新诊断
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthAnalysis;