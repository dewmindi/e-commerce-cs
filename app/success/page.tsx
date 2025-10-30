"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const sp = useSearchParams();
  const session_id = sp.get("session_id");
  const router = useRouter();

  const [toast, setToast] = useState("");
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!session_id) {
        setErr("No session ID found.");
        setLoading(false);
        return;
      }
      try {
        const r = await fetch(`/api/get-payment-details?session_id=${session_id}`);
        const j = await r.json();
        if (!r.ok || !j.success) throw new Error(j.error || "Failed to fetch payment details");

        setPaymentDetails(j.data);

        // Save order (idempotent)
        await fetch("/api/save-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: j.data.orderId,
            sessionId: j.data.sessionId,
            customerName: j.data.customerName,
            customerEmail: j.data.customerEmail,
            items: j.data.itemsPurchased.map((i: any) => ({
              name: i.name,
              price: i.price,
              quantity: i.quantity,
            })),
            amountSubtotal: j.data.amountSubtotal,
            amountTotal: j.data.amountTotal,
            currency: j.data.currency,
            paymentStatus: j.data.paymentStatus,
            paymentIntentId: j.data.paymentIntentId,
            createdAt: new Date(j.data.created * 1000),
          }),
        });
      } catch (e: any) {
        setErr(e.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    })();
  }, [session_id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }
  if (err) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <p className="text-red-500 font-medium">{err}</p>
      </div>
    );
  }
  if (!paymentDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">No details found.</p>
      </div>
    );
  }
  
  const orderId = paymentDetails.orderId || paymentDetails.sessionId;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center px-6 py-12">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center"
      >
        <CheckCircle className="mx-auto text-[#bb8d03fc] w-16 h-16 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Payment Successful 🎉</h1>
        <p className="text-gray-600 mt-2">Thank you for your purchase!</p>
        <p className="mt-2 text-gray-500">Order #{orderId}</p>

        <a
          href={`/api/payment-slip?orderId=${encodeURIComponent(orderId)}`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block bg-[#bb8d03fc] text-white py-2 px-4 rounded-lg shadow transition"
        >
          Download Payment Slip (PDF)
        </a>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget as HTMLFormElement);
            const formData = Object.fromEntries(fd.entries());
            console.log("Submitting form data:", formData);
            const submitBtn = (e.currentTarget as HTMLFormElement).querySelector("button[type='submit']") as HTMLButtonElement;
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";
          //   await fetch("/api/save-customer-form", {
          //     method: "POST",
          //     headers: { "Content-Type": "application/json" },
          //     body: JSON.stringify({ orderId, sessionId: paymentDetails.sessionId, formData }),
          //   });
          //   setToast("Your requirements have been submitted successfully!");
            
          //   setTimeout(() => {
          //       router.push("/");
          //     }, 2000);
          // }}
                      try {
              const res = await fetch("/api/save-customer-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId, sessionId: paymentDetails.sessionId, formData }),
              });
              if (!res.ok) throw new Error("Failed to submit form");

              // Show toast
              setToast("Your requirements have been submitted successfully!");

              // Redirect after 2s
              setTimeout(() => {
                router.push("/");
              }, 6000);
            } catch (err: any) {
              setToast(err.message || "Submission failed. Please try again.");
              submitBtn.disabled = false;
              submitBtn.textContent = "Submit";
            }
          }}
          className="mt-8 text-left"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Leave a note. We will contact you shortly.
          </h3>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Note
          </label>
          <textarea
            name="requirements"
            rows={4}
            className="w-full border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-[#bb8d03fc] outline-none"
          />
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone
          </label>
          <input
            name="phone"
            className="w-full border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-[#bb8d03fc] outline-none"
          />
          <button
            type="submit"
            className="w-full bg-[#bb8d03fc] text-white py-2 px-4 rounded-lg shadow transition"
          >
            Submit
          </button>
        </form>
                {/* Toast notification */}
        {toast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#bb8d03fc] text-white px-4 py-2 rounded shadow-lg animate-fade-in-out">
            {toast}
          </div>
        )}
      </motion.div>
            <style jsx>{`
        .animate-fade-in-out {
          animation: fadeInOut 3s forwards;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
