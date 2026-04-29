"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="max-w-md"
      >
        <h2 className="title-md text-gray-900 mb-4">Newsletter</h2>
        <p className="text-xl text-neutral-600">
          Join our list for exclusive releases and updates.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="w-full max-w-lg"
      >
        <div className="relative group">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full bg-transparent border-b-2 border-neutral-200 py-6 text-2xl font-light text-gray-900 focus:outline-none focus:border-neutral-900 transition-colors placeholder-gray-500"
          />
          <button className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-neutral-400 group-focus-within:text-neutral-900 transition-colors">
            <ArrowRight className="w-8 h-8" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
