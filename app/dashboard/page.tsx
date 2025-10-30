// app/dashboard/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { Home, Package, ShoppingCart, Users, LineChart, CreditCard, ChevronDown, Bell, Search, Settings, HelpCircle, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useRouter } from "next/navigation";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface Order {
  orderId: string;
  customerName: string;
  customerEmail: string;
  paymentStatus: string;
  amountTotal: number;
  currency: string;
  createdAt: string;
  items: { name: string; quantity: number; price: number }[];
  fulfillmentStatus: 'Pending' | 'Started' | 'Completed' | 'Canceled'; 
}

const recentSales = [
  { name: 'Cygnus', time: '36 Min ago', price: '8/30/2025', image: 'https://placehold.co/40x40/4A5568/E2E8F0?text=C' },
  { name: 'RCC Resillence', time: '56 Min ago', price: '8/30/2025', image: 'https://placehold.co/40x40/4A5568/E2E8F0?text=R' },
  { name: 'New Style', time: '04 Hour ago', price: '8/30/2025', image: 'https://placehold.co/40x40/4A5568/E2E8F0?text=N' },
  { name: 'The Tranquils', time: '07 Hour ago', price: '8/30/2025', image: 'https://placehold.co/40x40/4A5568/E2E8F0?text=T' },
  { name: 'Best Mortgage', time: '09 Hour ago', price: '8/30/2025', image: 'https://placehold.co/40x40/4A5568/E2E8F0?text=B' },
];

const StatCard = ({ title, value, percentage, isPositive }) => (
  <div className="flex flex-col bg-gray-900 rounded-2xl p-6 shadow-md border border-gray-800">
    <div className="text-sm font-medium text-gray-400">{title}</div>
    <div className="flex items-center mt-2">
      <div className="text-3xl font-bold text-white">{value}</div>
      <div
        className={`flex items-center ml-4 px-2 py-1 text-xs font-semibold rounded-full ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}
      >
        {isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
        {percentage}%
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title, linkText, onLinkClick }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold text-white">{title}</h2>
    <button onClick={onLinkClick} className="flex items-center text-indigo-400 text-sm font-medium hover:underline">
      {linkText} <ChevronRight size={16} className="ml-1" />
    </button>
  </div>
);

export default function DashboardPage() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/get-orders');
        const j = await r.json();
        if (!r.ok || !j.success) throw new Error(j.error || 'Failed to fetch orders');
        setOrders(j.data);
      } catch (e: any) {
        setErr(e.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredOrders = orders
    .filter(o =>
    (o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail?.toLowerCase().includes(search.toLowerCase()) ||
      o.orderId?.toLowerCase().includes(search.toLowerCase()))
    )
    .filter(o => statusFilter === 'all' || o.paymentStatus === statusFilter);

  const totalIncome = orders.reduce((sum, o) => sum + o.amountTotal, 0);
  const pendingOrders = orders.filter((o) => o.paymentStatus === "Pending").length;
  const completedOrders = orders.filter((o) => o.paymentStatus === "Completed").length;

  const paginatedOrders = filteredOrders.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const router = useRouter();
  return (
    <div className="text-white">
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 ">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors duration-200">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-900"></span>
            </button>
            <div className="flex items-center space-x-2">
              <img
                src="https://placehold.co/36x36/6B46C1/E2E8F0?text=CS"
                alt="User Profile"
                className="w-9 h-9 rounded-full"
              />
              <span className="font-semibold text-sm">CS Graphic</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </header>
      </main>
      {/* Stat Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Income" value={`$${totalIncome}`} percentage="12.04" isPositive />
        <StatCard title="Total orders" value={orders.length} percentage="16.00" isPositive />
        <StatCard title="Total revenue" value="24.000" percentage="11.07" isPositive />
        <StatCard title="Pending Orders" value={orders.length} percentage="4.06" isPositive={false} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-gray-900 rounded-2xl p-6 shadow-md border border-gray-800">
          <SectionHeader title="Recent Order" linkText="View all" onLinkClick={() => {router.push('/dashboard/orders');}} />
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="text-gray-500 text-sm font-medium border-b border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">NO</th>
                  <th className="px-4 py-3 text-left">DATE</th>
                  <th className="px-4 py-3 text-left">CUSTOMER</th>
                  <th className="px-4 py-3 text-left">STATUS</th>
                  <th className="px-4 py-3 text-left">TOTAL</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedOrders.map((order) => {
                  const createdAt = new Date(order.createdAt); // convert ISO string to Date
                  const formattedDate = createdAt.toLocaleString(); // e.g., "8/29/2025, 9:06:54 PM"

                  return (
                    <tr key={order.orderId} className="border-b border-gray-800 last:border-b-0">
                      <td className="px-4 py-4 whitespace-nowrap text-gray-400">{order.orderId}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-400">{formattedDate}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-white">{order.customerEmail}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${order.paymentStatus === 'paid'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-white">${order.amountTotal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex items-center justify-between p-4 border-t bg-gray-800">
              <button
                onClick={() => setPage((p) => p - 1)} disabled={page === 1}
                className='border border-gray-700 text-gray-400 px-4 py-2 rounded-lg hover:bg-white hover:text-black disabled:opacity-50 flex items-center'
              >
                <span className="text-sm text-gray-600">
                  Previous
                </span>
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}
                className='border border-gray-700 text-gray-400 px-4 py-2 rounded-lg hover:bg-white hover:text-black disabled:opacity-50 flex items-center'
              >
                <span className="text-sm text-gray-600">
                  Next
                </span>
              </button>
            </div>
          </div>
        </div>

              {/* Recent Sales List */}
              <div className="bg-gray-900 rounded-2xl p-6 shadow-md border border-gray-800">
                <SectionHeader title="Hosting Payment Reminders" linkText="View all" onLinkClick={() => { }} />
                <div className="space-y-4">
                  {recentSales.map((sale, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img src={sale.image} alt={sale.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="ml-3">
                          <div className="font-medium text-white">{sale.name}</div>
                          <div className="text-xs text-gray-400 mt-1">{sale.time}</div>
                        </div>
                      </div>
                      <div className="font-medium text-white">{sale.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            
      </div>

    </div>
  );
}
