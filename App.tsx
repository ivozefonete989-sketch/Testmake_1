import React, { useState } from 'react';
import { PRODUCTS, ICONS } from './constants';
import { Product, GiftFormData, GeneratedCertificate } from './types';
import { PurchaseModal } from './components/PurchaseModal';
import { reserveCode } from './services/codeService';
import { CertificateView } from './components/CertificateView';
import { Gift, CheckCircle, ArrowLeft, Star, Sparkles, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchasedCertificate, setPurchasedCertificate] = useState<GeneratedCertificate | null>(null);
  const [viewState, setViewState] = useState<'browsing' | 'success'>('browsing');

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: GiftFormData) => {
    if (!selectedProduct) return;

    setIsProcessing(true);
    
    // Simulate booking and "payment"
    try {
      const code = await reserveCode(selectedProduct.id);
      
      const certificate: GeneratedCertificate = {
        code,
        productName: selectedProduct.name,
        senderName: data.senderName,
        recipientName: data.recipientName,
        message: data.message,
        expiryDate: '31.12.2025'
      };

      setPurchasedCertificate(certificate);
      setViewState('success');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Booking failed', error);
      alert('Ошибка бронирования. Попробуйте снова.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetFlow = () => {
    setViewState('browsing');
    setPurchasedCertificate(null);
    setSelectedProduct(null);
  };

  const scrollToProducts = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (viewState === 'success' && purchasedCertificate) {
    return (
      <div className="min-h-screen bg-[#0B1221] relative flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 snow-bg opacity-30 z-0"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-green/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl w-full text-center relative z-10 animate-in fade-in duration-700 slide-in-from-bottom-10">
          
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-green-400 to-emerald-600 p-1">
              <div className="bg-[#0B1221] p-4 rounded-full">
                <CheckCircle className="w-16 h-16 text-[#41B865] animate-pulse-glow" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 text-glow">
            Подарок успешно оформлен!
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto mb-10 text-lg">
            Волшебство уже в пути. Сертификат отправлен на email.
          </p>

          <div className="mb-10 transform transition-transform hover:scale-[1.02] duration-500 shadow-2xl shadow-blue-500/20 rounded-xl">
            <CertificateView data={purchasedCertificate} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button 
                className="bg-white hover:bg-gray-100 text-[#0B1221] font-bold py-4 px-10 rounded-xl shadow-lg shadow-white/10 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                onClick={() => window.print()}
             >
               Скачать PDF
             </button>
             <button 
                onClick={resetFlow}
                className="text-white/60 hover:text-white font-medium py-4 px-8 flex items-center justify-center gap-2 transition-colors border border-white/10 rounded-xl hover:bg-white/5"
             >
               <ArrowLeft className="w-4 h-4" />
               Вернуться в магазин
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0B1221] text-white overflow-x-hidden selection:bg-brand-green/30">
      
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
        
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[#0B1221]">
          {/* Gradients simulating the reference image */}
          <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-[#467AD7] opacity-20 rounded-full blur-[150px] animate-float"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-[#41B865] opacity-20 rounded-full blur-[150px] animate-float-delayed"></div>
          <div className="absolute inset-0 snow-bg opacity-50"></div>
          
          {/* Sparkles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse-glow"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-yellow-300 rounded-full blur-[2px] animate-pulse-glow" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse-glow" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          
          {/* Main Glass Card Showcase */}
          <div className="max-w-5xl mx-auto glass-card rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-1000 border-t border-l border-white/20">
            
            {/* Top Shine */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

            {/* Logo Badge */}
            <div className="inline-flex flex-col items-center mb-8 animate-float">
               <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#467AD7] to-[#41B865] rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 mb-2">
                 <span className="font-heading font-extrabold text-2xl md:text-3xl text-white">MB</span>
               </div>
               <div className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-white/90 border border-white/10">
                 Holiday Edition
               </div>
            </div>

            {/* Headlines */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black mb-6 leading-tight drop-shadow-2xl">
              ПОДАРИТЕ БУДУЩЕЕ <br/>
              <span className="brand-gradient-text text-glow">В МЕДИЦИНЕ</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Годовой доступ к экосистеме <strong className="text-white">MedBaseGeotar</strong>. <br className="hidden md:block"/>
              Самый ценный подарок для профессионального роста.
            </p>

            {/* Feature Bubbles (Like reference image) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
               
               <div className="group">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full flex items-center justify-center mb-4 border border-yellow-400/30 group-hover:scale-110 transition-transform duration-300">
                     <div className="text-yellow-400">{ICONS.AI}</div>
                  </div>
                  <h3 className="font-bold text-white mb-1">ИИ-ассистент</h3>
                  <p className="text-xs text-white/50">Мгновенные ответы по клинрекам</p>
               </div>

               <div className="group">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4 border border-blue-400/30 group-hover:scale-110 transition-transform duration-300">
                     <div className="text-blue-400">{ICONS.Library}</div>
                  </div>
                  <h3 className="font-bold text-white mb-1">Библиотека</h3>
                  <p className="text-xs text-white/50">Доступ к лучшим изданиям ГЭОТАР</p>
               </div>

               <div className="group">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full flex items-center justify-center mb-4 border border-green-400/30 group-hover:scale-110 transition-transform duration-300">
                     <div className="text-green-400">{ICONS.Shield}</div>
                  </div>
                  <h3 className="font-bold text-white mb-1">Поддержка</h3>
                  <p className="text-xs text-white/50">Правовые и клинические стандарты</p>
               </div>

            </div>

            {/* CTA Price Anchor */}
            <div className="flex flex-col items-center animate-pulse-glow">
              <div className="text-sm uppercase tracking-widest text-white/40 mb-2">Стоимость подарка</div>
              <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
                 <span className="text-2xl text-white/30 line-through mr-4 align-top mt-2 inline-block">16 650 ₽</span>
                 <span className="gold-gradient-text drop-shadow-sm">от 4 990 ₽</span>
              </div>
              
              <button 
                 onClick={scrollToProducts}
                 className="group bg-gradient-to-r from-[#467AD7] to-[#41B865] hover:brightness-110 text-white font-bold py-4 px-12 rounded-full shadow-[0_0_40px_rgba(65,184,101,0.3)] transition-all transform hover:scale-105 flex items-center gap-3"
              >
                <Gift className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span>ВЫБРАТЬ ПОДАРОК</span>
              </button>
            </div>

          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-white/30 hover:text-white transition-colors" onClick={scrollToProducts}>
             <ChevronDown className="w-8 h-8" />
          </div>

        </div>
      </header>

      {/* Product Showcase */}
      <main id="products-section" className="relative py-24 bg-[#F2F5FF] rounded-t-[50px] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] z-30">
        <div className="container mx-auto px-4">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <div className="inline-block bg-brand-blue/10 text-brand-blue px-4 py-1 rounded-full text-sm font-bold mb-4">
               Ограниченное предложение
             </div>
             <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0B1221] mb-6">Выберите свой тариф</h2>
             <p className="text-gray-500 text-lg">
               Каждый сертификат включает полный доступ на 12 месяцев и возможность персонального поздравления.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PRODUCTS.map((product, idx) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-[32px] p-8 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border border-transparent hover:border-brand-blue/30 relative flex flex-col transform hover:-translate-y-2"
              >
                {/* Badge */}
                {product.type === 'pro' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#467AD7] to-[#41B865] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg z-10 flex items-center gap-1">
                     <Sparkles className="w-3 h-3 text-yellow-300" />
                     ХИТ ПРОДАЖ
                  </div>
                )}

                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                     {product.type === 'student' && ICONS.Library}
                     {product.type === 'pro' && ICONS.Shield}
                     {product.type === 'premium' && ICONS.AI}
                </div>
                  
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed h-10">{product.description}</p>
                
                <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-blue-50/50 transition-colors">
                   <div className="text-gray-400 line-through text-sm text-right mb-1">{product.oldPrice.toLocaleString('ru-RU')} ₽</div>
                   <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-gray-500">Цена сегодня:</span>
                      <span className="text-3xl font-heading font-bold text-[#0B1221]">{product.price.toLocaleString('ru-RU')} ₽</span>
                   </div>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                      <div className="mt-0.5 min-w-[20px]">
                        <CheckCircle className="w-5 h-5 text-[#41B865]" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleBuyClick(product)}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 
                    ${product.type === 'pro' 
                      ? 'bg-gradient-to-r from-[#467AD7] to-[#41B865] shadow-blue-500/30 hover:shadow-blue-500/50' 
                      : 'bg-gray-900 hover:bg-gray-800 shadow-gray-500/20'}`}
                >
                  <Gift className="w-5 h-5" />
                  Купить в подарок
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-white py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
             © {new Date().getFullYear()} MedBaseGeotar Ecosystem.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#467AD7] transition-colors">Условия акции</a>
            <a href="#" className="hover:text-[#467AD7] transition-colors">Помощь</a>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <PurchaseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onSubmit={handleFormSubmit}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default App;