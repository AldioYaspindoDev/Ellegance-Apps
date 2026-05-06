"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import useBucket from "../context/bucketContext";
import { motion, AnimatePresence } from "framer-motion";
import { User, Package, Calendar, CreditCard, ChevronRight, ShoppingBag, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const { user, loading: userLoading } = useBucket();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.email) return;
            
            try {
                const response = await fetch(`http://localhost:5000/order/user/${user.email}`);
                const data = await response.json();
                if (data.success) {
                    setOrders(data.data);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        } else if (!userLoading) {
            setLoading(false);
        }
    }, [user, userLoading]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'success': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            case 'pending': return 'text-amber-600 bg-amber-50 border-amber-100';
            case 'failed': return 'text-rose-600 bg-rose-50 border-rose-100';
            default: return 'text-neutral-600 bg-neutral-50 border-neutral-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'success': return <CheckCircle2 className="w-3 h-3" />;
            case 'pending': return <Clock className="w-3 h-3" />;
            case 'failed': return <XCircle className="w-3 h-3" />;
            default: return <AlertCircle className="w-3 h-3" />;
        }
    };

    if (userLoading || loading) {
        return (
            <main className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin h-8 w-8 border-4 border-neutral-900 border-t-transparent rounded-full"></div>
                </div>
                <Footer />
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-6">
                        <User className="w-10 h-10 text-neutral-300" />
                    </div>
                    <h2 className="text-2xl font-light text-neutral-900 mb-4">Please login to view your profile</h2>
                    <Link href="/kredensial/Login" className="px-10 py-4 bg-neutral-900 text-white text-sm font-bold tracking-widest hover:bg-neutral-800 transition-colors">
                        LOGIN NOW
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white flex flex-col">
            <Navbar />
            
            <div className="flex-1 pt-32 pb-20">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        
                        {/* Sidebar / User Info */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-1"
                        >
                            <div className="bg-neutral-50 p-8 sticky top-32 border border-neutral-100">
                                <div className="flex flex-col items-center text-center mb-8">
                                    <div className="w-24 h-24 bg-neutral-900 rounded-full flex items-center justify-center mb-4 shadow-xl">
                                        <span className="text-3xl font-light text-white uppercase">{user.username?.charAt(0)}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-tight mb-1">{user.username}</h2>
                                    <p className="text-sm text-neutral-500 lowercase">{user.email}</p>
                                    <div className="mt-4 px-3 py-1 bg-neutral-200 text-[10px] font-bold tracking-[0.2em] text-neutral-600 uppercase rounded-full">
                                        {user.role}
                                    </div>
                                </div>
                                
                                <div className="space-y-1">
                                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-neutral-900 text-xs font-bold tracking-widest border border-neutral-900 transition-all">
                                        <Package className="w-4 h-4" />
                                        MY ORDERS
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 text-xs font-bold tracking-widest hover:text-neutral-900 transition-all">
                                        <User className="w-4 h-4" />
                                        ACCOUNT SETTINGS
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Main Content / Orders */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-3"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <h1 className="title-xl text-neutral-900">Order History</h1>
                                <div className="text-xs font-medium text-neutral-400">
                                    Total: {orders.length} Orders
                                </div>
                            </div>

                            {orders.length === 0 ? (
                                <div className="text-center py-20 border border-dashed border-neutral-200 rounded-3xl">
                                    <ShoppingBag className="w-16 h-16 text-neutral-200 mx-auto mb-6" />
                                    <h2 className="text-xl font-medium text-neutral-900 mb-4">No orders found</h2>
                                    <p className="text-neutral-500 mb-10">You haven't made any purchases yet.</p>
                                    <Link href="/collection" className="inline-block px-10 py-4 bg-neutral-900 text-white text-sm font-bold tracking-widest hover:bg-neutral-800 transition-colors">
                                        START SHOPPING
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b border-neutral-200">
                                                <th className="text-left py-6 px-4 text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Order ID</th>
                                                <th className="text-left py-6 px-4 text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Date</th>
                                                <th className="text-left py-6 px-4 text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Amount</th>
                                                <th className="text-left py-6 px-4 text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Status</th>
                                                <th className="text-right py-6 px-4 text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-100">
                                            {orders.map((order) => (
                                                <tr key={order.id} className="group hover:bg-neutral-50/50 transition-colors">
                                                    <td className="py-6 px-4">
                                                        <span className="text-sm font-bold text-neutral-900 tracking-tight">{order.orderId}</span>
                                                    </td>
                                                    <td className="py-6 px-4">
                                                        <div className="flex items-center gap-2 text-neutral-500">
                                                            <Calendar className="w-3 h-3" />
                                                            <span className="text-xs">{new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-6 px-4">
                                                        <span className="text-sm font-bold text-neutral-900">
                                                            Rp {parseFloat(order.grossAmount).toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td className="py-6 px-4">
                                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-[10px] font-bold tracking-wider uppercase ${getStatusColor(order.status)}`}>
                                                            {getStatusIcon(order.status)}
                                                            {order.status}
                                                        </div>
                                                    </td>
                                                    <td className="py-6 px-4 text-right">
                                                        <button 
                                                            onClick={() => setSelectedOrder(order === selectedOrder ? null : order)}
                                                            className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-neutral-400 group-hover:text-neutral-900 transition-colors uppercase"
                                                        >
                                                            {selectedOrder === order ? "Close" : "Details"}
                                                            <ChevronRight className={`w-3 h-3 transition-transform ${selectedOrder === order ? "rotate-90" : ""}`} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Order Details Accordion Content */}
                            <AnimatePresence>
                                {selectedOrder && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-8 overflow-hidden"
                                    >
                                        <div className="bg-neutral-50 p-8 border border-neutral-100">
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="p-2 bg-neutral-900 text-white rounded">
                                                    <ShoppingBag className="w-4 h-4" />
                                                </div>
                                                <h3 className="text-sm font-bold tracking-widest text-neutral-900 uppercase">Items in this order</h3>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                {selectedOrder.items?.map((item) => (
                                                    <div key={item.id} className="flex gap-6 items-center py-4 border-b border-neutral-200 last:border-0">
                                                        <div className="w-16 h-20 bg-white border border-neutral-100 overflow-hidden">
                                                            <img 
                                                                src={item.product?.productImages ? `http://localhost:5000/${item.product.productImages}` : "/placeholder.jpg"} 
                                                                alt={item.product?.productName}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-tight">{item.product?.productName || 'Product Removed'}</h4>
                                                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Quantity: {item.quantity}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-bold text-neutral-900">Rp {parseFloat(item.price * item.quantity).toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-8 pt-8 border-t border-neutral-200 flex justify-between items-end">
                                                <div>
                                                    <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] mb-1">Customer Info</p>
                                                    <p className="text-xs font-medium text-neutral-900">{selectedOrder.customerName} • {selectedOrder.customerEmail}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] mb-1">Total Paid</p>
                                                    <p className="text-xl font-bold text-neutral-900">Rp {parseFloat(selectedOrder.grossAmount).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}