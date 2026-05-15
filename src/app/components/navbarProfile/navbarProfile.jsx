"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Package } from 'lucide-react';
import Link from 'next/link';
import useBucket from '../../context/bucketContext';

export default function NavbarProfile() {
    const { user, loading: userLoading } = useBucket();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

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

    return (
        /* Sidebar / User Info */
        <main>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1"
            >
                <div className="bg-neutral-50 p-8 sticky top-32 border border-neutral-100">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-24 h-24 bg-neutral-900 rounded-full flex items-center justify-center mb-4 shadow-xl">
                            <span className="text-3xl font-light text-white uppercase">{user?.username?.charAt(0)}</span>
                        </div>
                        <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-tight mb-1">{user?.username}</h2>
                        <p className="text-sm text-neutral-500 lowercase">{user?.email}</p>
                        <div className="mt-4 px-3 py-1 bg-neutral-200 text-[10px] font-bold tracking-[0.2em] text-neutral-600 uppercase rounded-full">
                            {user?.role}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Link 
                        href='/profile'
                        className={pathname === '/profile' ? 'w-full flex items-center gap-3 px-4 py-3 bg-white text-neutral-900 text-xs font-bold tracking-widest border border-neutral-900 transition-all' : 'w-full flex items-center gap-3 px-4 py-3 text-neutral-400 text-xs font-bold tracking-widest hover:text-neutral-900 transition-all'}>
                            <Package className="w-4 h-4" />
                            MY ORDERS
                        </Link>
                        <Link
                            href="/accountSettings"
                            className={pathname === '/accountSettings' ? 'w-full flex items-center gap-3 px-4 py-3 bg-white text-neutral-900 text-xs font-bold tracking-widest border border-neutral-900 transition-all' : 'w-full flex items-center gap-3 px-4 py-3 text-neutral-400 text-xs font-bold tracking-widest hover:text-neutral-900 transition-all'}
                        >
                            <User className="w-4 h-4" />
                            ACCOUNT SETTINGS
                        </Link>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}