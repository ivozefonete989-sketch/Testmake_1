import { Product } from './types';
import { BookOpen, BrainCircuit, ShieldCheck } from 'lucide-react';

export const PRODUCTS: Product[] = [
  {
    id: 'mb_student',
    name: 'MedBase Student',
    description: 'Идеальный старт для студентов-медиков.',
    price: 4990,
    oldPrice: 8500,
    type: 'student',
    features: [
      'Библиотека учебников ГЭОТАР',
      'Базовый ИИ-ассистент',
      'Тесты для аккредитации'
    ]
  },
  {
    id: 'mb_pro',
    name: 'MedBase Pro',
    description: 'Для практикующих врачей и ординаторов.',
    price: 9990,
    oldPrice: 16650,
    type: 'pro',
    features: [
      'Все клинические рекомендации',
      'Продвинутый ИИ-диагност',
      'Правовая поддержка 24/7'
    ]
  },
  {
    id: 'mb_premium',
    name: 'MedBase Premium',
    description: 'Полный доступ ко всей экосистеме.',
    price: 14990,
    oldPrice: 24000,
    type: 'premium',
    features: [
      'Доступ к иностранным гайдлайнам',
      'Персональный менеджер',
      'Видео-лекции экспертов'
    ]
  }
];

export const ICONS = {
  AI: <BrainCircuit className="w-6 h-6 mb-2 text-[#EAB308]" />, // Gold/Yellowish
  Library: <BookOpen className="w-6 h-6 mb-2 text-[#3B82F6]" />, // Blue
  Shield: <ShieldCheck className="w-6 h-6 mb-2 text-[#41B865]" />, // Green
};
