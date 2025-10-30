"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, ShoppingCart, DollarSign, Settings } from "lucide-react";


interface Order {
  orderId: string;
  customerName: string;
  customerEmail: string;
  paymentStatus: string;
  amountTotal: number;
  currency: string;
  createdAt: string;
  items: { name: string; quantity: number; price: number }[];
}

// const mockOrders: Order[] = [
//   { id: "ORD001", customer: "John Doe", service: "Logo Design", status: "Pending", date: "2025-08-10", amount: 120 },
//   { id: "ORD002", customer: "Sarah Smith", service: "Web Design", status: "Completed", date: "2025-08-11", amount: 650 },
//   { id: "ORD003", customer: "David Wilson", service: "Logo Design", status: "Completed", date: "2025-08-12", amount: 200 },
//   { id: "ORD004", customer: "Emily Johnson", service: "Web Design", status: "Pending", date: "2025-08-15", amount: 800 },
// ];

export default function AdminDashboard() {
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

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 hidden md:block">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="space-y-3">
          <Button variant="ghost" className="w-full justify-start"><LayoutDashboard className="mr-2 h-5 w-5"/> Dashboard</Button>
          <Button variant="ghost" className="w-full justify-start"><ShoppingCart className="mr-2 h-5 w-5"/> Orders</Button>
          <Button variant="ghost" className="w-full justify-start"><DollarSign className="mr-2 h-5 w-5"/> Income</Button>
          <Button variant="ghost" className="w-full justify-start"><Settings className="mr-2 h-5 w-5"/> Settings</Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-semibold mb-6">Dashboard Overview</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card><CardContent className="p-4"><p className="text-sm text-gray-500">Total Orders</p><h3 className="text-xl font-bold">{orders.length}</h3></CardContent></Card>
          <Card><CardContent className="p-4"><p className="text-sm text-gray-500">Total Income</p><h3 className="text-xl font-bold">${totalIncome}</h3></CardContent></Card>
          <Card><CardContent className="p-4"><p className="text-sm text-gray-500">Pending Orders</p><h3 className="text-xl font-bold">{pendingOrders}</h3></CardContent></Card>
          <Card><CardContent className="p-4"><p className="text-sm text-gray-500">Completed Orders</p><h3 className="text-xl font-bold">{completedOrders}</h3></CardContent></Card>
        </div>

        {/* Orders Table */}
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.orderId} className="border-t">
                  <td className="px-4 py-3">{order.orderId}</td>
                  <td className="px-4 py-3">{order.customerEmail}</td>
                  <td className="px-4 py-3"> {order.items.map(i => (
                  <li className='' key={i.name}>{i.name} × {i.quantity}</li>
                ))}</td>
                  <td className="px-4 py-3">
                    <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"}>
                      {order.paymentStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{order.createdAt}</td>
                  <td className="px-4 py-3 text-right">${order.amountTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between p-4 border-t bg-gray-50">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
