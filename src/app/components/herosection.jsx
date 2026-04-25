"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-start justify-center pt-24 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0.8, scale: 1.1 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/HeroSection.png"
          alt="Hero Background"
          width={300}
          height={300}
          // fill
          className="object-cover w-full"
          priority
        />
      </motion.div>

      <div className="section-container relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-2"
          >
            <h2 className="text-2xl md:text-5xl font-semibold text-neutral-800 tracking-wide">Elegance in</h2>
            <h1 className="text-8xl font-bold text-neutral-900 mb-6">Every Step.</h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-body max-w-xl mb-12"
          >
            <span
              className="text-gray-800"
            >
               Premium leather formal shoes designed for comfort, confidence, and everyday office wear.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-6"
          >
            <button className="btn-primary mt-20 flex items-center gap-4 group">
              Explore Collection
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-32 w-full text-center"
      >
      </motion.div>
    </section>
  );
}
