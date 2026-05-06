"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, User, LogOut } from "lucide-react";
import useBucket from "../context/bucketContext";

export default function Navbar() {
  const { bucketCount, user, logout } = useBucket();
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collection" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="w-full h-24 fixed top-0 left-0 bg-white/80 backdrop-blur-md z-50 border-b border-neutral-100 px-8 md:px-24 flex items-center justify-between">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 font-['Segoe_UI']"
      >
        <Link href="/">Ellegance</Link>
      </motion.div>

      <div className="flex items-center gap-10">
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={item.href}
                className="text-base font-medium text-neutral-600 hover:text-neutral-950 transition-colors uppercase tracking-widest"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/bucket">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer p-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <ShoppingBag className="w-6 h-6 text-neutral-900" />
              {bucketCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-950 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {bucketCount}
                </span>
              )}
            </motion.div>
          </Link>

          <div className="h-6 w-px bg-neutral-200 mx-2"></div>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center">
                  <Link href={user.role === 'customer' ? "/profile" : "/"}>
                    <User className="w-4 h-4 text-white" />
                  </Link>
                </div>
                <span className="text-sm font-bold text-neutral-900 uppercase tracking-tight hidden lg:block">{user.name || user.username}</span>
              </div>
              <button 
                onClick={logout}
                className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link 
              href="/kredensial/Login"
              className="px-6 py-2 bg-neutral-900 text-white text-xs font-bold tracking-widest hover:bg-neutral-800 transition-all uppercase"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}


