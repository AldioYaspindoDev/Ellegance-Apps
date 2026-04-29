"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, Loader2 } from "lucide-react";
import Navbar from "../../components/navbar";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const HandleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            
            if(!response.ok) throw new Error(data.message);

            // Simpan token ke localStorage untuk profesionalisme
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            alert("Selamat anda Berhasil Login");
            router.push("/")

        } catch (error) {
            console.error(error.message);
            alert(error.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen text-black bg-neutral-50 flex flex-col">
            
            <div className="flex-1 flex items-center justify-center p-6 mt-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-neutral-100">
                        <div className="mb-10 text-center">
                            <h1 className="text-4xl font-bold text-neutral-900 mb-2">Welcome Back</h1>
                            <p className="text-neutral-500">Please enter your details to sign in.</p>
                        </div>

                        <form onSubmit={HandleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-700 block ml-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                    <input 
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-700 block ml-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                    <input 
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900" />
                                    <span className="text-neutral-600 group-hover:text-neutral-900 transition-colors">Remember me</span>
                                </label>
                                <Link href="#" className="text-neutral-900 font-semibold hover:underline">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-neutral-900 text-white rounded-xl font-semibold text-lg transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
                            <p className="text-neutral-600">
                                Don't have an account?{" "}
                                <Link href="/kredensial/Register" className="text-neutral-900 font-bold hover:underline">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </div>

                    <Link 
                        href="/" 
                        className="mt-8 flex items-center justify-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </main>
    )
}
