export interface EmailTemplate {
  subject: string;
  html: string;
}

export interface ContactFormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

export interface OrderFormData {
  orderId: string;
  products: Array<{ name: string; quantity: number }>;
  totalAmount: number;
  // ... other order fields
}

// Add more interfaces for different email types
