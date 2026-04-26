"use client";
import { motion } from "framer-motion";

export default function History() {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center py-32 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8"
        >
          <span className="text-xl md:text-2xl font-light tracking-widest text-neutral-500 uppercase">
            Since 2023
          </span>
          
          <h1 className="title-xl text-neutral-900">
            <span className="font-light">THE ART OF </span>
            <span className="font-bold">ELLEGANT</span>
          </h1>
          
          <p className="text-body max-w-3xl">
            Crafted formal shoes designed for professionals who value comfort and timeless style.
          </p>
        </motion.div>
      </div>
    </section>
  );
}