import React, { useRef, useState } from 'react';
import { Camera, Upload, X, ScanLine } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  label: string;
  subLabel?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, label, subLabel }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
      onImageSelect(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
        className="hidden"
      />
      
      {!preview ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full aspect-[4/3] border-2 border-dashed border-stone-300 rounded-[2rem] bg-stone-50 hover:bg-stone-100 hover:border-stone-400 transition-all flex flex-col items-center justify-center group relative overflow-hidden"
        >
          {/* Corner Decors */}
          <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-stone-300"></div>
          <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-stone-300"></div>
          <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-stone-300"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-stone-300"></div>

          <div className="w-20 h-20 rounded-full bg-stone-200/50 flex items-center justify-center mb-6 text-stone-500 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all duration-300">
            <Camera size={32} strokeWidth={1.5} />
          </div>
          <span className="text-xl font-serif font-bold text-stone-700 tracking-wide">{label}</span>
          {subLabel && <span className="text-xs text-stone-400 mt-2 uppercase tracking-widest">{subLabel}</span>}
        </button>
      ) : (
        <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border-4 border-white group">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          
          {/* Scanning Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 pointer-events-none animate-scan"></div>
          
          <div className="absolute top-4 left-4 bg-black/40 text-white px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold flex items-center gap-2">
            <ScanLine size={12} className="animate-pulse" /> 正在分析
          </div>

          <button
            onClick={clearImage}
            className="absolute bottom-4 right-4 bg-white text-stone-900 p-3 rounded-full hover:bg-stone-100 shadow-lg hover:scale-110 transition-transform"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;