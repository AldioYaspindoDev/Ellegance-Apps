"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
            const res = await fetch("http://localhost:5000/user/me", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) {
                setUser(data.data);
                return data.data;
            } else {
                // Jika token tidak valid, hapus dari storage
                localStorage.removeItem("token");
                setUser(null);
                return null;
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
            return null;
        }
    };
    // ambil keranjang
    const fetchBucket = async (userId) => {
        if (!userId) return;
        try {
            const res = await fetch(`http://localhost:5000/bucket/${userId}`);
            const data = await res.json();
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
            const res = await fetch("http://localhost:5000/bucket/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    userId: user.id, // Gunakan ID asli dari user
                    productId, 
                    selectedSize, 
                    quantity 
                })
            });
            const data = await res.json();
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
            const res = await fetch(`http://localhost:5000/bucket/${itemId}`, {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.success) {
                if (user) await fetchBucket(user.id);
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: "Gagal menghapus item" };
        }
    };

    return (
        <BucketContext.Provider value={{ 
            bucketItems, 
            bucketCount: bucketItems.length, 
            user, 
            addToBucket, 
            removeFromBucket,
            logout,
            loading 
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