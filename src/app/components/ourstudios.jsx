"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function OurStudios() {
  return (
    <section className="py-32 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-neutral-900 rounded-3xl p-12 md:p-24 text-center text-white relative overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            <span className="text-8xl md:text-9xl font-bold text-white/20">2026</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">GLOBAL EXPANSION</h2>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl">
              Bringing our minimalist philosophy and Italian craftsmanship to the Asian and North American markets.
            </p>
          </div>
        </motion.div>
      </div>

       {/* Studio Header */}
      <div className="py-32 section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center flex flex-col gap-6 mb-20"
        >
          <h2 className="title-md text-neutral-500 pt-50">Our Studios</h2>
          <h3 className="title-lg text-neutral-900">Where Ideas Bloom.</h3>
          <p className="text-body max-w-3xl mx-auto">
            Our studios in Milan and Stockholm are not just offices, but creative laboratories where designers, material engineers, and craftsmen collaborate directly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative aspect-video rounded-3xl overflow-hidden mb-32 shadow-2xl"
        >
          <Image
            src="/images/Shop1.jpeg" // Replaced placeholder with a project image
            alt="Our Studio"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

    </section>
  );
}
