"use client";
import { useState, useRef } from "react";
import useBucket from "@/app/context/bucketContext";
import { updatePhotoProfile } from "@/services/userService";

export default function UpdatePhotoProfile() {
    const { user, fetchUser, loading: userLoading } = useBucket();
    const [updating, setUpdating] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !user) return;

        if (!file.type.startsWith("image/")) {
            alert("Harap pilih file gambar.");
            return;
        }

        setUpdating(true);
        try {
            const data = await updatePhotoProfile(user.id, file);
            if (data.success) {
                alert("Berhasil memperbarui foto profil");
                await fetchUser(); // Sinkronkan data profile di seluruh web
            } else {
                alert(data.message || "Gagal memperbarui foto profil");
            }
        } catch (error) {
            console.error("Error updating photo:", error);
            alert(error.response?.data?.message || error.message || "Gagal memperbarui foto profil");
        } finally {
            setUpdating(false);
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    if (userLoading) {
        return (
            <div className="bg-slate-50 shadow shadow-xl py-10 px-6 rounded rounded-xl flex items-center justify-center">
                <p className="text-neutral-500">Loading...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="bg-slate-50 shadow shadow-xl py-10 px-6 rounded rounded-xl flex items-center justify-center">
                <p className="text-red-500">Silakan login terlebih dahulu</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 shadow shadow-xl py-10 px-6 rounded rounded-xl flex items-center gap-4 text-black">
            <div className="relative w-20 h-20 bg-neutral-900 rounded-full overflow-hidden flex items-center justify-center shadow-md">
                {user.image ? (
                    <img 
                        src={`http://localhost:5000/${user.image}`} 
                        alt={user.username} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-2xl font-light text-white uppercase">
                        {user.username?.charAt(0)}
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
                <button 
                    onClick={triggerFileInput}
                    disabled={updating}
                    className="bg-neutral-900 text-white px-6 py-2 rounded-xl font-semibold hover:bg-neutral-800 disabled:bg-neutral-500 transition-colors"
                >
                    {updating ? "Mengunggah..." : "Update Foto"}
                </button>
            </div>
        </div>
    );
}