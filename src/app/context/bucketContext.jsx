"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/services/userService";
import { getBucket, addToBucketApi, removeFromBucketApi, updateQuantityApi, clearBucketApi } from "@/services/bucketService";

const BucketContext = createContext();

export function BucketProvider({ children }) {
    const [bucketItems, setBucketItems] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Mulai dengan loading true
    const router = useRouter();

    // Fungsi untuk mengambil data user yang sedang login
    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            setLoading(false);
            return null;
        }

        try {
            const data = await getMe();
            if (data.success) {
                setUser(data.data);
                await fetchBucket(data.data.id);
                return data.data;
            } else {
                // Jika token tidak valid, hapus dari storage
                localStorage.removeItem("token");
                setUser(null);
                return null;
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            localStorage.removeItem("token");
            setUser(null);
            return null;
        }
    };
    // ambil keranjang
    const fetchBucket = async (userId) => {
        if (!userId) return;
        try {
            const data = await getBucket(userId);
            if (data.success && data.data) {
                setBucketItems(data.data.items || []);
            }
        } catch (error) {
            console.error("Error fetching bucket:", error);
        }
    };

    // tambahkan product kedalam keranjang
    const addToBucket = async (productId, selectedSize, quantity = 1) => {
        if (!user) {
            router.push("/kredensial/Login");
            return { success: false, message: "Silahkan login terlebih dahulu" };
        }


        try {
            const data = await addToBucketApi(user.id, productId, selectedSize, quantity);
            if (data.success) {
                await fetchBucket(user.id); // Refresh data
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: "Gagal menyambung ke server" };
        }
    };


    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setBucketItems([]);
    };

    // Inisialisasi data saat aplikasi dimuat
    useEffect(() => {
        const init = async () => {
            const userData = await fetchUser();
            if (userData) {
                await fetchBucket(userData.id);
            }
            setLoading(false);
        };
        init();
    }, []);

    const removeFromBucket = async (itemId) => {
        try {
            const data = await removeFromBucketApi(itemId);
            if (data.success) {
                if (user) await fetchBucket(user.id);
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: "Gagal menghapus item" };
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) return { success: false, message: "Quantity minimal 1" };
        
        try {
            const data = await updateQuantityApi(itemId, quantity);
            if (data.success) {
                if (user) await fetchBucket(user.id);
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: "Gagal update quantity" };
        }
    };

    const clearUserBucket = async () => {
        if (!user) return;
        try {
            const data = await clearBucketApi(user.id);
            if (data.success) {
                setBucketItems([]);
                return { success: true };
            }
            return { success: false };
        } catch (error) {
            console.error("Error clearing bucket:", error);
            return { success: false };
        }
    };

    return (
        <BucketContext.Provider value={{ 
            bucketItems, 
            bucketCount: bucketItems.length, 
            user, 
            addToBucket, 
            removeFromBucket,
            updateQuantity,
            clearUserBucket,
            logout,
            loading,
            fetchUser
        }}>

            {children}
        </BucketContext.Provider>
    );
}

export default function useBucket() {
    const context = useContext(BucketContext);
    if (!context) {
        throw new Error("useBucket must be used within a BucketProvider");
    }
    return context;
}