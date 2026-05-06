"use client";

import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import useBucket from "../context/bucketContext";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, Check, Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function BucketPage() {
    const { bucketItems, loading, removeFromBucket, updateQuantity, clearUserBucket, user } = useBucket();
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    // Hitung total harga
    const totalPrice = bucketItems.reduce((acc, item) => {
        return acc + (item.product?.price * item.quantity);
    }, 0);

    // Fungsi Checkout
    const handleCheckout = async () => {
        if (!user) {
            alert("Please login to checkout");
            return;
        }

        if (bucketItems.length === 0) {
            alert("Your bucket is empty");
            return;
        }

        setIsCheckingOut(true);

        try {
            const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            const response = await fetch("http://localhost:5000/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderId: orderId,
                    email: user.email,
                    username: user.username,
                    item_details: bucketItems.map(item => ({
                        id: item.productId,
                        quantity: item.quantity
                    }))
                }),
            });

            const data = await response.json();

            if (data.success && data.token) {
                // Trigger Midtrans Snap
                window.snap.pay(data.token, {
                    onSuccess: async function(result) {
                        console.log('success', result);
                        // Mengosongkan keranjang setelah pembelian berhasil
                        await clearUserBucket();
                        alert("Payment Success! Your order is being processed.");
                        window.location.href = "/";
                    },
                    onPending: function(result) {
                        console.log('pending', result);
                        alert("Waiting for your payment!");
                    },
                    onError: function(result) {
                        console.log('error', result);
                        alert("Payment failed!");
                    },
                    onClose: function() {
                        console.log('customer closed the popup without finishing the payment');
                    }
                });
            } else {
                alert(data.message || "Failed to create transaction");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Something went wrong during checkout");
        } finally {
            setIsCheckingOut(false);
        }
    };

    // Fungsi Delete Item (Dibuat langsung di sini sesuai permintaan)
    const handleDeleteItem = async (itemId) => {
        const result = await removeFromBucket(itemId);
        
        if (result.success) {
            setToastMsg(result.message);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } else {
            alert(result.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-32 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-neutral-900 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white flex flex-col">
            <Navbar />
            
            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-neutral-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3"
                    >
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium">{toastMsg}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex-1 pt-32 pb-20">
                <div className="section-container">
                    <h1 className="title-xl mb-12 text-neutral-900">Your Bucket</h1>

                    {bucketItems.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20 border border-dashed border-neutral-200 rounded-3xl"
                        >
                            <ShoppingBag className="w-16 h-16 text-neutral-200 mx-auto mb-6" />
                            <h2 className="text-xl font-medium text-neutral-900 mb-4">Your bucket is empty</h2>
                            <p className="text-neutral-500 mb-10">Start adding some premium items to your collection.</p>
                            <Link href="/collection" className="inline-block px-10 py-4 bg-neutral-900 text-white text-sm font-bold tracking-widest hover:bg-neutral-800 transition-colors">
                                EXPLORE COLLECTION
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                            {/* Items List */}
                            <div className="lg:col-span-2 space-y-8">
                                <AnimatePresence mode="popLayout">
                                    {bucketItems.map((item, index) => (
                                        <motion.div 
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex gap-6 pb-8 border-b border-neutral-100 group"
                                        >
                                            <div className="w-32 h-40 bg-neutral-50 overflow-hidden">
                                                <img 
                                                    src={item.product?.productImages ? `http://localhost:5000/${item.product.productImages}` : "/placeholder.jpg"} 
                                                    alt={item.product?.productName}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">
                                                            {item.product?.productName}
                                                        </h3>
                                                        <button 
                                                            onClick={() => handleDeleteItem(item.id)}
                                                            className="text-red-300 hover:text-red-600 transition-colors p-1"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-neutral-500 mb-4 uppercase tracking-widest">
                                                        Size: <span className="font-bold text-neutral-900">{item.selectedSize}</span>
                                                    </p>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center border border-neutral-200 bg-white">
                                                            <button 
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="p-2 hover:bg-neutral-50 transition-colors"
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <Minus className="w-3 h-3" />
                                                            </button>
                                                            <span className="w-8 text-center text-sm font-medium border-x border-neutral-100">{item.quantity}</span>
                                                            <button 
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="p-2 hover:bg-neutral-50 transition-colors"
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-lg font-bold text-neutral-900">
                                                    Rp {(item.product?.price * item.quantity).toLocaleString()}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-neutral-50 p-10 sticky top-32">
                                    <h2 className="text-xl font-bold mb-8 text-gray-700 uppercase tracking-widest">Order Summary</h2>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-neutral-600">
                                            <span>Subtotal</span>
                                            <span>Rp {totalPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-neutral-600">
                                            <span>Shipping</span>
                                            <span className="text-emerald-600 uppercase text-xs font-bold tracking-widest">Calculated at next step</span>
                                        </div>
                                        <div className="h-px bg-neutral-200 my-6"></div>
                                        <div className="flex justify-between text-xl font-bold text-neutral-900">
                                            <span>Total</span>
                                            <span>Rp {totalPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={handleCheckout}
                                        disabled={isCheckingOut}
                                        className="w-full py-5 bg-neutral-900 text-white text-sm font-bold tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 group disabled:bg-neutral-400 disabled:cursor-not-allowed"
                                    >
                                        {isCheckingOut ? (
                                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                        ) : (
                                            <>
                                                CHECKOUT NOW
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                    <p className="text-center text-xs text-neutral-400 mt-6 tracking-wide">
                                        Shipping & taxes calculated at checkout
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}