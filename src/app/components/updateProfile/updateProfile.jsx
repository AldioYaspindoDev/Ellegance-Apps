"use client";
import { useState, useEffect } from "react";
import useBucket from "@/app/context/bucketContext";
import { updateUser } from "@/services/userService";

export default function UpdateProfile() {
    const { user, fetchUser, loading: userLoading } = useBucket();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (user) {
            setUsername(user.username || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!user) return;
        if (!username || !email) {
            alert("Username dan email tidak boleh kosong.");
            return;
        }

        setUpdating(true);
        try {
            const data = await updateUser(user.id, username, email, password);
            if (data.success) {
                alert("Berhasil update profile");
                setPassword("");
                await fetchUser(); // Update the global user state
            } else {
                alert(data.message || "Gagal update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert(error.response?.data?.message || error.message || "Gagal update profile");
        } finally {
            setUpdating(false);
        }
    };

    if (userLoading) {
        return (
            <div className="flex justify-center items-center p-10 bg-slate-50 rounded-xl shadow-xl">
                <p className="text-neutral-500 font-medium">Memuat data user...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center p-10 bg-slate-50 rounded-xl shadow-xl">
                <p className="text-red-500 font-medium">Silakan login terlebih dahulu.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleUpdate} className="bg-slate-50 rounded py-10 rounded-xl shadow shadow-xl text-black">
            <div className="flex flex-col justify-center items-center gap-5 w-100">
                <div className="flex flex-col gap-2 w-80">
                    <label className="font-bold text-xl">Username</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username" 
                        className="bg-gray-200 px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 w-80">
                    <label className="font-bold text-xl">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email" 
                        className="bg-gray-200 px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 w-80">
                    <label className="font-bold text-xl">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password untuk konfirmasi" 
                        className="bg-gray-200 px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                </div>

                <div>
                    <button 
                        type="submit" 
                        disabled={updating}
                        className="bg-neutral-900 text-white px-20 py-3 w-80 rounded-xl font-semibold hover:bg-neutral-800 disabled:bg-neutral-500 transition-colors"
                    >
                        {updating ? "Mengupdate..." : "Update"}
                    </button>
                </div>
            </div>
        </form>
    );
}