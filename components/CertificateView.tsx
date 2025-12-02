import React from 'react';
import { GeneratedCertificate } from '../types';
import { QrCode, Sparkles } from 'lucide-react';

interface Props {
  data: GeneratedCertificate;
  className?: string;
  previewMode?: boolean;
}

export const CertificateView: React.FC<Props> = ({ data, className = '', previewMode = false }) => {
  return (
    <div className={`relative w-full max-w-4xl mx-auto aspect-[1.414/1] overflow-hidden rounded-xl shadow-2xl group ${className}`}>
      
      {/* Background Gradient & Effects */}
      <div className="absolute inset-0 brand-gradient z-0">
        {/* Animated Shimmer Effect */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-100%] animate-shimmer"></div>
        
        {/* Decorative Snowflakes / Texture Overlay */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900 opacity-20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-6 md:p-10 text-white select-none">
        
        {/* Header: Logos */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/10">
               {/* Icon placeholder for MedBase */}
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-base md:text-lg leading-tight">MedBaseGeotar</span>
              <span className="text-[10px] md:text-xs opacity-80 uppercase tracking-widest">Medical Ecosystem</span>
            </div>
          </div>

          <div className="flex items-center gap-2 opacity-90">
             <div className="text-right hidden sm:block">
                <div className="font-heading font-bold text-xs md:text-sm">ГЭОТАР-Медиа</div>
                <div className="text-[10px] opacity-80">Издательская группа</div>
             </div>
             {/* Icon placeholder for GEOTAR */}
             <div className="bg-white/10 p-1.5 rounded-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/><path d="M12 7v5l3 3"/></svg>
             </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center mt-2 relative">
          {/* Central decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/20 blur-[60px] rounded-full"></div>

          <div className="mb-2 flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.2em] opacity-80 font-medium bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-yellow-300" />
            Сертификат на доступ
            <Sparkles className="w-3 h-3 text-yellow-300" />
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] tracking-tight">
            {data.recipientName ? data.recipientName : <span className="opacity-30 border-b-2 border-white/30 px-4">[Имя Получателя]</span>}
          </h1>

          {/* Message Area */}
          <div className="w-full max-w-xl">
             <div className="font-handwriting text-2xl md:text-4xl text-white/95 leading-relaxed drop-shadow-sm min-h-[3em] flex items-center justify-center">
               {data.message ? (
                 `"${data.message}"`
               ) : (
                 <span className="opacity-40 text-2xl">
                   {previewMode ? "Здесь будет ваше поздравление..." : '"С наилучшими пожеланиями в Новом году!"'}
                 </span>
               )}
             </div>
          </div>

          <div className="mt-6 text-xs md:text-sm opacity-90 font-medium bg-black/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/5">
            Тариф: <span className="text-yellow-300">{data.productName}</span> <br/>
            {data.senderName ? (
              <span className="mt-1 block">От: {data.senderName}</span>
            ) : (
              <span className="mt-1 block opacity-50">От: [Ваше Имя]</span>
            )}
          </div>
        </div>

        {/* Footer: Code and QR */}
        <div className="flex justify-between items-end mt-4 pt-4 border-t border-white/20">
          <div>
             <div className="text-[10px] md:text-xs uppercase opacity-70 mb-1.5 font-bold tracking-wider">Код активации</div>
             <div className="font-mono text-2xl md:text-4xl font-bold tracking-widest text-white drop-shadow-md">
               {data.code === 'PREVIEW' ? 'XXXX-XXXX-XXXX' : data.code}
             </div>
             <div className="text-[10px] opacity-50 mt-1">Действителен до {data.expiryDate}</div>
          </div>

          <div className="flex flex-col items-end gap-2">
             <div className="bg-white p-1.5 md:p-2 rounded-lg shadow-xl">
                <QrCode className="text-[#467AD7] w-12 h-12 md:w-16 md:h-16" />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};