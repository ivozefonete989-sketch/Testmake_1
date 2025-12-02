export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  features: string[];
  type: 'student' | 'pro' | 'premium';
}

export interface GiftFormData {
  senderName: string;
  recipientName: string;
  message: string;
  email: string;
}

export interface GeneratedCertificate {
  code: string;
  productName: string;
  senderName: string;
  recipientName: string;
  message: string;
  expiryDate: string;
}
