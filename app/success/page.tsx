"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Download, Home, ShoppingBag, Calendar, User, Mail } from "lucide-react";

export default function SuccessPage() {
  const sp = useSearchParams();
  const session_id = sp.get("session_id");
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!session_id) {
      setErr("No session ID found.");
      setLoading(false);
      return;
    }

    // Fetch session details from our API
    (async () => {
      try {
        const res = await fetch(`/api/get-payment-details?session_id=${session_id}`);
        if (!res.ok) throw new Error("Failed to fetch session details");
        const json = await res.json();
        
        if (json.success && json.data) {
           setOrderDetails(json.data);
        } else {
           throw new Error("Invalid response from server");
        }
      } catch (e: any) {
        console.error(e);
        setErr("Could not load order details.");
      } finally {
        setLoading(false);
      }
    })();
  }, [session_id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bb8d03]"></div>
          <p className="text-gray-600 text-lg">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-red-500 font-medium mb-6">{err}</p>
          <button 
            onClick={() => router.push('/')}
            className="w-full bg-gray-900 text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const orderId = orderDetails?.orderId;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-[#bb8d03] p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <CheckCircle className="text-[#bb8d03] w-12 h-12" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-yellow-100 text-lg">Thank you for your purchase.</p>
          </div>

          <div className="p-8">
            {/* Order Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Order Details</h3>
                <div className="flex items-center gap-3 text-gray-700">
                  <ShoppingBag className="w-5 h-5 text-[#bb8d03]" />
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-medium">#{orderId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="w-5 h-5 text-[#bb8d03]" />
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-medium">{new Date(orderDetails.created * 1000).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Customer Details</h3>
                <div className="flex items-center gap-3 text-gray-700">
                  <User className="w-5 h-5 text-[#bb8d03]" />
                  <div>
                    <p className="text-xs text-gray-500">Customer</p>
                    <p className="font-medium">{orderDetails.customerName || "Guest"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-[#bb8d03]" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium break-all">{orderDetails.customerEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 my-6"></div>

            {/* Order Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                {orderDetails.itemsPurchased?.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                        {item.quantity}x
                      </div>
                      <span className="font-medium text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {(item.price * item.quantity).toFixed(2)} {orderDetails.currency?.toUpperCase()}
                    </span>
                  </div>
                ))}
                
                <div className="pt-3 flex justify-between items-center text-lg font-bold text-gray-900 mt-2">
                  <span>Total Paid</span>
                  <span>{orderDetails.amountTotal.toFixed(2)} {orderDetails.currency?.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`/api/payment-slip?orderId=${encodeURIComponent(orderId)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#bb8d03] hover:bg-[#a67c03] text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download Invoice
              </a>
              
              <button 
                onClick={() => router.push('/')}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-all"
              >
                <Home className="w-5 h-5" />
                Return to Home
              </button>
            </div>

          </div>
        </div>

        <p className="text-center text-gray-500 text-sm">
          A confirmation email has been sent to {orderDetails.customerEmail}
        </p>
      </motion.div>
    </div>
  );
}
