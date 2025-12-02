import React, { useState } from 'react';
import { Product, GiftFormData, GeneratedCertificate } from '../types';
import { X, Gift, AlertCircle, ChevronRight } from 'lucide-react';
import { CertificateView } from './CertificateView';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSubmit: (data: GiftFormData) => void;
  isProcessing: boolean;
}

export const PurchaseModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  product, 
  onSubmit,
  isProcessing
}) => {
  const [formData, setFormData] = useState<GiftFormData>({
    senderName: '',
    recipientName: '',
    message: '',
    email: ''
  });

  const [errors, setErrors] = useState<Partial<GiftFormData>>({});

  if (!isOpen || !product) return null;

  const validate = () => {
    const newErrors: Partial<GiftFormData> = {};
    if (!formData.email) newErrors.email = 'Обязательное поле';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Некорректный email';
    
    if (formData.message.length > 150) newErrors.message = 'Слишком длинное сообщение';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  // Prepare preview data
  const previewData: GeneratedCertificate = {
    code: 'PREVIEW',
    productName: product.name,
    senderName: formData.senderName,
    recipientName: formData.recipientName,
    message: formData.message,
    expiryDate: '31.12.2025'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content - Wide Layout */}
      <div className="relative w-full max-w-6xl h-[90vh] md:h-auto bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col md:flex-row">
        
        {/* Left Side: Form */}
        <div className="w-full md:w-[45%] flex flex-col bg-gray-50/50">
          <div className="p-6 md:p-8 flex-1 overflow-y-auto no-scrollbar">
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-heading font-bold text-2xl text-gray-900 flex items-center gap-2">
                  <Gift className="w-6 h-6 text-[#41B865]" />
                  Оформление
                </h2>
                <p className="text-sm text-gray-500 mt-1">Заполните данные для персонализации</p>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors md:hidden"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
               <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Выбранный тариф</div>
               <div className="flex justify-between items-center">
                 <span className="font-bold text-gray-900 text-lg">{product.name}</span>
                 <span className="font-bold text-brand-blue text-xl">{product.price.toLocaleString('ru-RU')} ₽</span>
               </div>
            </div>

            <form id="gift-form" onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 transition-colors group-focus-within:text-[#467AD7]">Ваше имя</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#467AD7]/20 focus:border-[#467AD7] outline-none transition-all text-gray-900"
                      placeholder="Иван"
                      value={formData.senderName}
                      onChange={e => setFormData({...formData, senderName: e.target.value})}
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 transition-colors group-focus-within:text-[#467AD7]">Имя получателя</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#467AD7]/20 focus:border-[#467AD7] outline-none transition-all text-gray-900"
                      placeholder="Анна"
                      value={formData.recipientName}
                      onChange={e => setFormData({...formData, recipientName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 transition-colors group-focus-within:text-[#467AD7]">
                    Текст поздравления
                    <span className={`ml-2 text-xs font-normal transition-colors ${formData.message.length > 150 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                      {formData.message.length}/150
                    </span>
                  </label>
                  <textarea
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#467AD7]/20 focus:border-[#467AD7] outline-none transition-all resize-none shadow-sm text-gray-900"
                    rows={4}
                    placeholder="Напишите самые теплые слова..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.message}</p>}
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 transition-colors group-focus-within:text-[#467AD7]">
                    Email для доставки <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-[#467AD7]/20 outline-none transition-all text-gray-900 ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-[#467AD7]'}`}
                    placeholder="example@mail.ru"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                  {errors.email ? (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.email}</p>
                  ) : (
                    <p className="text-xs text-gray-400 mt-1.5">Сертификат придет на этот адрес.</p>
                  )}
                </div>
              </div>

            </form>
          </div>
          
          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-100 bg-white">
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full bg-brand-green hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2 brand-gradient transform active:scale-[0.99]"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Обработка...
                </>
              ) : (
                <>
                  Перейти к оплате
                  <ChevronRight className="w-5 h-5 opacity-80" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className="hidden md:flex w-[55%] bg-[#0f172a] relative overflow-hidden flex-col items-center justify-center p-8 lg:p-12">
           {/* Background Decoration */}
           <div className="absolute inset-0 snow-bg opacity-30 pointer-events-none"></div>
           <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/20 rounded-full blur-[100px]"></div>

           {/* Close Button Desktop */}
           <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2 hover:bg-white/10 rounded-full"
            >
              <X className="w-8 h-8" />
            </button>

           <div className="relative w-full z-10 flex flex-col items-center">
             <div className="text-white/80 font-heading font-medium tracking-widest text-sm uppercase mb-6 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-white/30"></span>
                Предпросмотр
                <span className="w-8 h-[1px] bg-white/30"></span>
             </div>
             
             {/* Certificate Component with Preview Mode */}
             <div className="w-full shadow-2xl rounded-xl transition-all duration-500 hover:scale-[1.02]">
                <CertificateView data={previewData} previewMode={true} />
             </div>

             <p className="text-white/40 text-xs mt-6 text-center max-w-sm">
               * Внешний вид сертификата может незначительно отличаться в финальной версии PDF.
             </p>
           </div>
        </div>

        {/* Mobile Preview (Visible only on small screens) */}
        <div className="md:hidden bg-[#0f172a] p-6 pb-8 border-t border-gray-800">
           <div className="text-white/60 text-xs uppercase font-bold mb-4 text-center">Предпросмотр подарка</div>
           <div className="shadow-lg rounded-lg overflow-hidden">
               <CertificateView data={previewData} previewMode={true} />
           </div>
        </div>
      </div>
    </div>
  );
};