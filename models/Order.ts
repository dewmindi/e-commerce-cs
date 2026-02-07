
// import mongoose, { Schema, model, models } from 'mongoose';

// const OrderSchema = new Schema(
//   {
//     sessionId: { type: String, required: true, unique: true },
//     orderId: { type: String, required: true },
//     paymentStatus: String,
//     amountTotal: Number,
//     amountSubtotal: Number,
//     currency: String,
//     customerEmail: String,
//     customerName: String,
//     paymentMethodType: String,
//     paymentIntentId: String,
//     items: [
//       {
//         id: String,
//         name: String,
//         price: Number,
//         quantity: Number,
//       },
//     ],
//     fee: Number,
//     requirements: String,  // added top-level field
//     phone: String,
//     fulfillmentStatus: {
//       type: String,
//       enum: ["pending", "started", "completed", "canceled"],
//       default: "pending",
//     },
//   },
//   {
//     timestamps: true, // automatically adds createdAt & updatedAt
//     strict: false,
//   }
// );

// const OrderModel = models.Order || model('Order', OrderSchema);
// export default OrderModel;

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    stripeSessionId: { type: String, unique: true, sparse: true },
    stripePaymentIntentId: { type: String, unique: true, sparse: true },
    sessionId: { type: String, sparse: true }, // Legacy field support

    customerName: String,
    email: String,
    phone: String,
    projectNote: String,

    items: Array,
    amount: Number,
    currency: String,

    status: {
      type: String,
      enum: ["paid", "failed", "expired", "canceled"],
      default: "paid",
    },

    failureReason: String,

    fulfillmentStatus: {
      type: String,
      enum: ["Pending", "Started", "Completed", "canceled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);


export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
