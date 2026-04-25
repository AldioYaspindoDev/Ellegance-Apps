"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
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

      <div className="flex items-center gap-12">
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={item.href}
                className="text-lg font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative cursor-pointer p-2 rounded-full hover:bg-neutral-100 transition-colors"
        >
          <ShoppingBag className="w-6 h-6 text-neutral-900" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-neutral-950 rounded-full border-2 border-white"></span>
        </motion.div>
      </div>
    </nav>
  );
}
