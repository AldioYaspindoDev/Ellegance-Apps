"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Whoweare() {
  return (
    <section className="py-32 bg-neutral-50 overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-12"
          >
            <div className="flex flex-col gap-8">
              <h2 className="title-lg text-neutral-900">Who We Are</h2>
              <div className="flex flex-col gap-6">
                <p className="text-body text-justify">
                  Ellegance is a dress shoe brand designed to meet the needs of office workers who prioritize a neat, professional appearance while remaining comfortable throughout the day. Starting from the concept that formal shoes are not just an outfit accessory, Ellegance was created with the aim of providing confidence with every step.
                </p>
                <p className="text-body text-justify">
                  Our primary focus is on delivering elegant, timeless designs suitable for various formal activities such as work, meetings, or other official events. With a modern yet classic style, Ellegance aims to be the top choice for those seeking to elevate their professional presence.
                </p>
                <p className="text-body text-justify">
                  In its production process, Ellegance uses high-quality leather combined with strong yet flexible soles, providing maximum comfort for long-term use. We target sales to office workers and young professionals who need premium formal shoes with long-lasting quality.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-8 border-t border-neutral-200">
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-bold text-neutral-900">100%</span>
                <span className="text-lg text-neutral-500 uppercase tracking-wider font-medium">Recycled Packaging</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-bold text-neutral-900">Artisan</span>
                <span className="text-lg text-neutral-500 uppercase tracking-wider font-medium">Italian Craftsmanship</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/BlackShoes.jpeg" // Replaced placeholder with a relevant image from the project
              alt="Craftsmanship"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}