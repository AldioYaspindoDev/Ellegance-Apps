"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactUs() {
  const studios = [
    {
      name: "Stockholm Studio",
      address: "Vasagatan 12, 111 20 Stockholm, Sweden",
      phone: "+46 8 123 456 78",
      email: "stockholm@ELLEGANCE.com",
    },
    {
      name: "Milan Atelier",
      address: "Via Montenapoleone 27, 20121 Milano, Italy",
      phone: "+39 02 987 654 32",
      email: "milano@ELLEGANCE.com",
    },
  ];

  return (
    <section className="bg-white">
     

      {/* Quote Section */}
      <div className="bg-neutral-900 py-40">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-12"
          >
            <h2 className="text-4xl md:text-7xl font-light text-white leading-tight italic">
              “ Quality is no longer a luxury, <br className="hidden md:block" /> but a responsibility. ”
            </h2>
            <div className="w-40 h-px bg-white/30 mx-auto"></div>
          </motion.div>
        </div>
      </div>

      {/* Studio Details & CTA */}
      <div className="py-32 section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32 mt-32">
          {studios.map((studio, index) => (
            <motion.div
              key={studio.name}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <h4 className="text-3xl font-semibold text-neutral-900">{studio.name}</h4>
              <div className="flex flex-col gap-6 text-xl text-neutral-500">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 mt-1">📍</span>
                  <p>{studio.address}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span>📞</span>
                  <p>{studio.phone}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span>✉️</span>
                  <p>{studio.email}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-10 pt-20 border-t border-neutral-100"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center text-neutral-900">
            Do you have any questions or need further assistance?
          </h3>
          <button className="btn-primary mb-32 rounded-full hover:scale-105 transform transition-all">
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
}
