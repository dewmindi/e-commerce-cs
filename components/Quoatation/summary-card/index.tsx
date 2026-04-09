// "use client";

// import React from "react";
// import { SelectedProduct } from "@/types/quoate";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// interface SummaryCardProps {
//   selectedProducts: SelectedProduct[];
//   onCheckout: () => void;
// }

// const SummaryCard: React.FC<SummaryCardProps> = ({ selectedProducts, onCheckout }) => {
//   const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);

//   return (
//     <div className="sticky top-24 w-full">
//       <Card className="bg-[#0f0f0f] shadow-2xl border border-white/10 rounded-[2.5rem] p-6 md:p-8 overflow-hidden relative group/summary">
//         <h3 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h3>

//         <div className="space-y-3 mb-6">
//           {selectedProducts.length === 0 ? (
//             <p className="text-sm text-slate-500">No packages selected</p>
//           ) : (
//             selectedProducts.map((p) => (
//               <div key={p.productId} className="flex justify-between text-sm">
//                 <span>
//                   <strong>{p.subcategoryName}:</strong> {p.productName}
//                 </span>
//                 <span className="font-mono text-slate-900">AUD {p.price.toLocaleString()}</span>
//               </div>
//             ))
//           )}
//         </div>

//         <div className=" pt-4 mb-6">
//           <div className="flex justify-between items-center mt-4 mb-4 pb-4 pt-4 border-t border-b border-slate-100">
//             <span className="text-lg font-bold text-slate-900">Total</span>
//             <span className="text-2xl font-bold font-mono">AUD {totalPrice.toLocaleString()}</span>
//           </div>
//         </div>

//         {/* <Button onClick={onCheckout} size="lg" className="w-full justify-center shadow-lg shadow-primary-500/30">
//           Continue
//         </Button> */}
//       </Card>
//     </div>
//   );
// };

// export default SummaryCard;

"use client";


import React from "react";
import { SelectedProduct } from "@/types/quoate";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


interface SummaryCardProps {
 selectedProducts: SelectedProduct[];
 onCheckout: () => void;
}


const SummaryCard: React.FC<SummaryCardProps> = ({ selectedProducts, onCheckout }) => {
 const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);


 return (
   <div className="w-full">
     <Card className="bg-[#0f0f0f] shadow-2xl border border-white/10 rounded-[2.5rem] p-6 md:p-8 overflow-hidden relative group/summary">
       <div className="absolute top-0 right-0 w-32 h-32  pointer-events-none" />
      
       <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-6 bg-[#a87f03] rounded-full" />
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Quotation Summary</h3>
       </div>


       <div className="space-y-4 mb-10 min-h-[100px]">
         {selectedProducts.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-6 text-center space-y-3 opacity-40">
              <div className="w-10 h-10 rounded-full border border-dashed border-gray-600 flex items-center justify-center text-gray-500">?</div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">No Selections Yet</p>
           </div>
         ) : (
           selectedProducts.map((p) => (
             <div key={p.productId} className="group/item flex flex-col gap-1 p-4 bg-white/[0.03] border border-white/5 rounded-2xl transition-all hover:bg-white/[0.06] hover:border-white/10">
               <div className="flex justify-between items-start">
                  <span className="text-[10px] font-black uppercase text-[#a87f03] tracking-wider">{p.subcategoryName}</span>
                  <span className="text-xs font-black text-white">AUD {p.price.toLocaleString()}</span>
               </div>
               <span className="text-sm font-medium text-gray-400 leading-tight">{p.productName}</span>
             </div>
           ))
         )}
       </div>


       <div className="relative">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent h-px -top-6" />
         <div className="flex justify-between items-end mb-2">
           <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Estimated Total</span>
           <span className="text-[10px] font-black text-[#a87f03] uppercase">inc. GST</span>
         </div>
         <div className="flex justify-between items-baseline">
           <span className="text-xs font-bold text-gray-400">AUD Total</span>
           <span className="text-4xl font-black text-white tracking-tighter">
             {totalPrice.toLocaleString()}
           </span>
         </div>
       </div>
     </Card>
   </div>
 );
};


export default SummaryCard;



