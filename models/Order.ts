
import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    orderId: { type: String, required: true },
    paymentStatus: String,
    amountTotal: Number,
    amountSubtotal: Number,
    currency: String,
    customerEmail: String,
    customerName: String,
    paymentMethodType: String,
    paymentIntentId: String,
    items: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    fee: Number,
    requirements: String,  // added top-level field
    phone: String,
    fulfillmentStatus: {
      type: String,
      enum: ["pending", "started", "completed", "canceled"],
      default: "pending",
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
    strict: false,
  }
);

const OrderModel = models.Order || model('Order', OrderSchema);
export default OrderModel;
