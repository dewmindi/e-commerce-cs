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
    <div className="sticky top-24 w-full">
      <Card className="bg-white shadow-lg border-t-4 border-t-slate-900 p-10">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h3>

        <div className="space-y-3 mb-6">
          {selectedProducts.length === 0 ? (
            <p className="text-sm text-slate-500">No packages selected</p>
          ) : (
            selectedProducts.map((p) => (
              <div key={p.productId} className="flex justify-between text-sm">
                <span>
                  <strong>{p.subcategoryName}:</strong> {p.productName}
                </span>
                <span className="font-mono text-slate-900">AUD {p.price.toLocaleString()}</span>
              </div>
            ))
          )}
        </div>

        <div className=" pt-4 mb-6">
          <div className="flex justify-between items-center mt-4 mb-4 pb-4 pt-4 border-t border-b border-slate-100">
            <span className="text-lg font-bold text-slate-900">Total</span>
            <span className="text-2xl font-bold font-mono">AUD {totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* <Button onClick={onCheckout} size="lg" className="w-full justify-center shadow-lg shadow-primary-500/30">
          Continue
        </Button> */}
      </Card>
    </div>
  );
};

export default SummaryCard;
