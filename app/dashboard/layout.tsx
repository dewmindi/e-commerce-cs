// app/dashboard/layout.tsx
'use client';

import React, { useState } from 'react';
import { Home, Package, ShoppingCart, Users, LineChart, CreditCard, HelpCircle, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const NavItem = ({ icon, text, href }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <button
      onClick={() => router.push(href)}
      className={`flex items-center w-full py-3 px-5 text-sm rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800'
      }`}
    >
      {React.createElement(icon, { size: 20 })}
      <span className="ml-3 font-medium">{text}</span>
    </button>
  );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-950 min-h-screen flex text-white font-[Inter]">
      {/* Sidebar */}
      <aside className="bg-gray-900 w-64 p-5 flex flex-col justify-between border-r border-gray-800">
        <div>
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">C</div>
            <span className="ml-2 font-bold text-xl">CS Graphic Meta</span>
          </div>
          <nav>
            <NavItem icon={Home} text="Dashboard" href="/dashboard" />
            {/* <NavItem icon={Package} text="Products" href="/dashboard/products" /> */}
            <NavItem icon={ShoppingCart} text="Orders" href="/dashboard/orders" />
            <NavItem icon={Users} text="Customers" href="/dashboard/customers" />
            <NavItem icon={LineChart} text="Analytics" href="/dashboard/analytics" />
            {/* <NavItem icon={CreditCard} text="Payments" href="/dashboard/payments" /> */}
          </nav>
        </div>
        <div className="mt-auto space-y-2 border-t border-gray-800 pt-4">
          <NavItem icon={HelpCircle} text="Help" href="/dashboard/help" />
          <NavItem icon={Settings} text="Settings" href="/dashboard/settings" />
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
