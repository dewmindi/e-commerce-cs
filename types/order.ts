export type OrderItem = { name: string; price: number; quantity: number };
export type Order = {
  orderId: string;
  sessionId: string;
  customerName?: string;
  customerEmail?: string;
  items: OrderItem[];
  amountSubtotal: number;
  amountTotal: number;
  currency: string;
  paymentStatus: string;
  paymentIntentId?: string;
  createdAt: Date;
  extraDetails?: any;
};
