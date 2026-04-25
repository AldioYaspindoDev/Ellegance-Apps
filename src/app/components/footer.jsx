"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-12 bg-neutral-900 border-t border-neutral-800">
      <div className="section-container flex flex-col md:flex-row justify-between items-center gap-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-neutral-500 text-lg"
        >
          © 2026 Ellegance. All Rights Reserved.
        </motion.div>
        
        <div className="flex gap-8 text-neutral-400 text-lg">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}