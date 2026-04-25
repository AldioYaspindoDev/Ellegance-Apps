"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Featured3() {
  return (
    <section className="py-32 bg-neutral-50 overflow-hidden">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left Side: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="title-md text-neutral-400 mb-4">Our Progress</h2>
              <h3 className="title-lg text-neutral-900 leading-tight">
                Design for your elegant presence.
              </h3>
            </div>
            
            <p className="text-body">
              Ellegance creates formal shoes designed to elevate your style, strengthen your confidence, and provide comfort throughout your working day. Every pair is a testament to our commitment to quality.
            </p>

            <motion.div 
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-neutral-900 font-semibold cursor-pointer group"
            >
              <span className="text-xl underline decoration-2 underline-offset-8">Explore Our Story</span>
              <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
            </motion.div>
          </motion.div>

          {/* Right Side: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/HeroSection.png" // Reusing an existing high-quality image or could generate a new one
                alt="Craftsmanship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neutral-900 -z-10 rounded-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
