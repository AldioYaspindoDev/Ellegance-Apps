"use client";
import { motion } from "framer-motion";

export default function Featured() {
  const testimonials = [
    {
      name: "John Dae",
      role: "Software Engineer",
      content: "The most comfortable shoes I've ever worn. The design is really minimalist and goes with any style."
    },
    {
      name: "Erick",
      role: "Accountant",
      content: "The material quality feels very premium. It's very light to wear all day walking around the office."
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <h2 className="title-md text-neutral-400 mb-6">Our Philosophy</h2>
          <h3 className="title-lg text-neutral-900 mb-8">Your steps define your presence.</h3>
          <p className="text-body">
            At Ellegance, we craft formal shoes for professionals who demand more — more comfort, more durability, and more style. Because every step you take deserves elegance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mt-32">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-12 bg-neutral-50 rounded-2xl flex flex-col gap-6"
            >
              <p className="text-2xl italic text-neutral-800 font-light leading-relaxed">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-4">
                <h4 className="text-xl font-bold text-neutral-900">{t.name}</h4>
                <p className="text-neutral-500 uppercase tracking-widest text-sm">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
