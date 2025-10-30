'use client'
import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  ArrowDown,
  ArrowUp,
  Search,
  Filter,
  BarChart,
  Menu,
  ChevronDown,
  DollarSign,
  Package,
  Calendar,
  CreditCard,
  User,
  ClipboardCheck,
  Truck,
  Clipboard,
  Circle,
} from 'lucide-react';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


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
  requirements: String;
  phone: String;
}

export default function AnalyticsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");


  const getCurrencySymbol = (currency: string) => {
  switch (currency?.toLowerCase()) {
    case "aud":
      return "A$";
    case "usd":
      return "$";
    default:
      return "$"; // fallback
  }
};

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

  const updateStatus = async () => {
    if (!selectedOrder) return;

    const res = await fetch("/api/update-order-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: selectedOrder.orderId,
        status: newStatus,
      }),
    });

    const result = await res.json();
    if (result.success) {
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === selectedOrder.orderId
            ? { ...order, fulfillmentStatus: newStatus as "Pending" | "Started" | "Completed" | "Canceled" }
            : order
        )
      );
      setSelectedOrder(null); // close modal
    }
  };

  // Helper function to generate a random tracking number
  const generateTrackingNumber = () => {
    const prefix = Math.random() < 0.5 ? '1Z' : '940011';
    const numLength = 12;
    let number = '';
    for (let i = 0; i < numLength; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return prefix + number;
  };



  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-600';
      case 'Pending':
        return 'bg-purple-600';
      case 'Cancelled':
        return 'bg-red-600';
      case 'Unpaid':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getFulfillmentColor = (fulfillment) => {
    switch (fulfillment) {
      case 'completed':
        return 'bg-green-600';
      case 'started':
        return 'bg-yellow-600';
      case 'canceled':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

type SortDir = 'ascending' | 'descending';
type SortKey =
  | 'orderId'
  | 'customerName'
  | 'amountTotal'
  | 'createdAt'
  | 'paymentStatus'
  | 'fulfillmentStatus';

const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDir } | null>(null);

const requestSort = (key: SortKey) => {
  let direction: SortDir = 'ascending';
  if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending';
  }
  setSortConfig({ key, direction });
};

const getComparable = (o: Order, key: SortKey) => {
  if (key === 'amountTotal') return o.amountTotal;
  if (key === 'createdAt') return new Date(o.createdAt).getTime();
  // string-ish fields
  return (o as any)[key]?.toString().toLowerCase() ?? '';
};

const sortedData = React.useMemo(() => {
  const out = [...orders];
  if (!sortConfig) return out;
  out.sort((a, b) => {
    const va = getComparable(a, sortConfig.key);
    const vb = getComparable(b, sortConfig.key);
    if (va < vb) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (va > vb) return sortConfig.direction === 'ascending' ? 1 : -1;
    return 0;
  });
  return out;
}, [orders, sortConfig]);

  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    if (sortConfig.direction === 'ascending') {
      return <ArrowUp className="w-4 h-4 text-gray-400" />;
    }
    return <ArrowDown className="w-4 h-4 text-gray-400" />;
  };

  // const filteredData = sortedData.filter((item) => {
  //   const matchesTab =
  //     activeTab === 'All' ||
  //     (activeTab === 'started' && item.fulfillment === 'started') ||
  //     (activeTab === 'pending' && item.status === 'pending') ||
  //     (activeTab === 'completed' && (item.fulfillment === 'started' || item.fulfillment === 'started')) ||
  //     (activeTab === 'Closed' && (item.fulfillment === 'completed' || item.fulfillment === 'cancelled'));
  //     // (activeTab === 'Local Delivery' && item.trackingNumber.startsWith('1Z'));
    
  //   const matchesSearch =
  //     searchTerm.length === 0 ||
  //     Object.values(item).some(
  //       (value) =>
  //         typeof value === 'string' &&
  //         value.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   return matchesTab && matchesSearch;
  // });
  
//   const filteredData = React.useMemo(() => {
//   return sortedData.filter((item) => {
//     const matchesTab =
//       activeTab === 'All' ||
//       (activeTab === 'Started' && item.fulfillmentStatus === 'started') ||
//       (activeTab === 'Pending' && item.fulfillmentStatus === 'pending') ||
//       (activeTab === 'Completed' && item.fulfillmentStatus === 'completed') ||
//       (activeTab === 'Cancelled' && item.fulfillmentStatus === 'canceled');

//     const matchesSearch =
//       searchTerm.length === 0 ||
//       Object.values(item).some(
//         (value) =>
//           typeof value === 'string' &&
//           value.toLowerCase().includes(searchTerm.toLowerCase())
//       );

//     return matchesTab && matchesSearch;
//   });
// }, [sortedData, activeTab, searchTerm]);

const filteredData = React.useMemo(() => {
  const term = searchTerm.trim().toLowerCase();

  return sortedData.filter((o) => {
    // tab filter (normalize case and spelling)
    const f = (o.fulfillmentStatus || '').toLowerCase();
    const matchesTab =
      activeTab === 'All' ||
      (activeTab === 'Started' && f === 'started') ||
      (activeTab === 'Pending' && f === 'pending') ||
      (activeTab === 'Completed' && f === 'completed') ||
      (activeTab === 'Cancelled' && (f === 'canceled' || f === 'cancelled'));

    // build a single searchable string
    const haystack = [
      o.orderId,
      o.customerName,
      o.customerEmail,
      o.phone as any,
      o.paymentStatus,
      o.fulfillmentStatus,
      o.currency,
      String(o.amountTotal),
      new Date(o.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      o.requirements as any,
      ...o.items.map((it) => `${it.name} x${it.quantity}`)
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const matchesSearch = term === '' || haystack.includes(term);
    return matchesTab && matchesSearch;
  });
}, [sortedData, activeTab, searchTerm]);


  const getFulfillmentIcon = (fulfillment) => {
    switch (fulfillment) {
      case 'completed':
        return <ClipboardCheck className="w-4 h-4 text-green-400" />;
      case 'started':
        return <ClipboardCheck className="w-4 h-4 text-yellow-400" />;
      case 'canceled':
        return <ClipboardCheck className="w-4 h-4 text-red-400" />;
      default:
        return <ClipboardCheck className="w-4 h-4 text-white-400" />;;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <ClipboardCheck className="w-4 h-4 text-green-400 " />;
      case 'Pending':
        return <Clipboard className="w-4 h-4 text-purple-400" />;
      case 'Cancelled':
        return <X className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const tableHeaders = [
    { key: 'id', label: 'Order ID', icon: <DollarSign className="w-4 h-4" /> },
    { key: 'customer', label: 'Customer', icon: <User className="w-4 h-4" /> },
    { key: 'total', label: 'Total', icon: <DollarSign className="w-4 h-4" /> },
    { key: 'items', label: 'Package', icon: <Package className="w-4 h-4" /> },
    { key: 'orderDate', label: 'Order Date', icon: <Calendar className="w-4 h-4" /> },
    { key: 'status', label: 'Payment', icon: <CreditCard className="w-4 h-4" /> },
    { key: 'fulfillment', label: 'Fulfillment', icon: <Truck className="w-4 h-4" /> },
  ];
//   const exportToExcel = () => {
//     // Transform your filteredData into plain rows
//   const exportData = filteredData.map((order) => ({
//     "Order ID": order.orderId,
//     Customer: order.customerName,
//     Email: order.customerEmail,
//     Phone: order.phone,
//     "Payment Status": order.paymentStatus,
//     "Fulfillment Status": order.fulfillmentStatus,
//     "Total Amount": order.amountTotal,
//     Currency: order.currency,
//     Items: order.items.map((i) => `${i.name} (x${i.quantity})`).join(", "),
//     Requirements: order.requirements,
//     "Order Date": new Date(order.createdAt).toLocaleString(),
//   }));

//   // Create worksheet & workbook
//   const worksheet = XLSX.utils.json_to_sheet(exportData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

//   // Generate Excel file and download
//   const excelBuffer = XLSX.write(workbook, {
//     bookType: "xlsx",
//     type: "array",
//   });
//   const blob = new Blob([excelBuffer], {
//     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//   });
//   saveAs(blob, `orders_${Date.now()}.xlsx`);
// };

const exportToExcel = (orders: any[]) => {
  // 1. Define headers
  const headers = [
    "Order ID",
    "Customer Name",
    "Payment Status",
    "Fulfillment Status",
    "Date",
    "Total Amount",
    "Requirements",
    "Email",
    "Phone Number"
  ];

  // 2. Convert orders into row arrays
  const rows = filteredData.map((order) => [
    order.orderId,
    order.customerName,
    order.paymentStatus,
    order.fulfillmentStatus,
    new Date(order.createdAt).toLocaleDateString(), // formatted date
    order.amountTotal,
    order.requirements,
    order.customerEmail,
    order.phone
  ]);

  // 3. Build worksheet (headers + rows)
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

  // 4. Set column widths
  worksheet["!cols"] = [
    { wch: 25 }, // Order ID
    { wch: 20 }, // Customer
    { wch: 15 }, // Payment Status
    { wch: 15 }, // Fulfillment Status
    { wch: 15 }, // Date
    { wch: 15 }, // Amount
    { wch: 25 }, // Requirements
    { wch: 25 }, // Email
    { wch: 15 }, // Phone Number
  ];

  // 5. Build workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

  // 6. Export as Excel
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, `orders_${Date.now()}.xlsx`);
};

  return (
    <div className=" text-gray-300 min-h-screen ">
      <div className="flex items-center justify-between mb-6">
        <h1 className="md:text-3xl sm:text-2xl font-bold text-white">Orders</h1>
        <div className="hidden sm:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 text-sm bg-zinc-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg">
            <BarChart className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="sm:hidden flex items-center space-x-2">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg bg-zinc-800 text-gray-400">
            <Menu className="w-5 h-5" />
          </button>
          <button className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden mb-4">
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-zinc-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="flex-1 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center">
              <Filter className="w-5 h-5 text-gray-400" />
            </button>
            <button className="flex-1 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center">
              <BarChart className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex flex-wrap gap-2 text-sm font-medium mb-4 sm:mb-0">
          {['All', 'Started', 'Pending', 'Completed', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                activeTab === tab
                  ? 'bg-zinc-700 text-white'
                  : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
  onClick={exportToExcel}
  className="flex items-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
>
  <ArrowDown className="w-4 h-4 mr-1.5" />
  Export Excel
</button>

        <div className="flex items-center space-x-2 text-sm">
          <div className="relative">
            <select className="appearance-none bg-zinc-800 text-gray-400 py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
              <option>Customer</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="appearance-none bg-zinc-800 text-gray-400 py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
              <option>Payment</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="appearance-none bg-zinc-800 text-gray-400 py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
              <option>Payment Method</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          <button className="flex items-center px-4 py-2 rounded-lg bg-zinc-800 text-gray-400 hover:bg-zinc-700 transition-colors duration-200">
            <Plus className="w-4 h-4 mr-1.5" />
            Add filter
          </button>
        </div>
      </div>

      <div className="bg-gray-900  rounded-xl overflow-x-auto shadow-lg">
        <table className=" min-w-full divide-y divide-zinc-700">
          <thead className=" ">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  onClick={() => requestSort(header.key)}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                >
                  <div className="flex items-center">
                    {header.icon && <span className="mr-2 text-gray-500">{header.icon}</span>}
                    {header.label}
                    {getSortIcon(header.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-900  divide-y divide-zinc-700">
            {filteredData.map((order) => {
              const createdAt = new Date(order.createdAt); // convert ISO string to Date
              const formattedDate = createdAt.toLocaleString(); // e.g., "8/29/2025, 9:06:54 PM"
              return (
                <tr key={order.orderId} className="hover:bg-zinc-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{order.orderId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.customerName}<br></br>
                        <span>
                          {order.phone}
                        </span><br></br>
                                                <span>
                          {order.customerEmail}
                        </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                     {getCurrencySymbol(order.currency)}
  {order.amountTotal.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} (x{item.quantity})<br></br>
                        <span>
                          {order.requirements}
                        </span>
                      </li>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(formattedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.paymentStatus)} text-white`}>
                      {getStatusIcon(order.paymentStatus)}
                      <span className="ml-1">{order.paymentStatus}</span>
                    </span>
                  </td>
                  <td
                    onClick={() => {
                      setSelectedOrder(order);
                      console.log("clicked");
                      setNewStatus(order.fulfillmentStatus || "pending");
                    }}
                    className="px-6 py-4 whitespace-nowrap text-sm cursor-pointer">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getFulfillmentColor(order.fulfillmentStatus)} text-white`}>
                      {getFulfillmentIcon(order.fulfillmentStatus)}
                      <span className="ml-1">{order.fulfillmentStatus}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-8 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Status Update Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-900 rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Update Status</h2>

            <select
              className="w-full p-2 rounded bg-zinc-800 text-white mb-4"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="started">Started</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600"
              >
                Cancel
              </button>
              <button
                onClick={updateStatus}
                className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
        <div>
          Showing {orders.length} of {filteredData.length} orders
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200">Previous</button>
          <button className="px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200">1</button>
          <button className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200">Next</button>
        </div>
      </div>
    </div>
  );
}
