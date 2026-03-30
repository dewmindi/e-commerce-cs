
import { connectDB } from "./lib/db";
import Order from "./models/Order";

async function listOrders() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).limit(10).lean();
  console.log("Latest 10 orders:");
  orders.forEach((o: any) => {
    console.log(`- OrderID: ${o.orderId}, Created: ${o.createdAt}, Status: ${o.status}, Intent: ${o.stripePaymentIntentId}, Session: ${o.stripeSessionId}`);
  });
}

listOrders();
