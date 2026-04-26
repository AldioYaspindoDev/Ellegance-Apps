"use client";
import { motion } from "framer-motion";

export default function OurValues() {
  const values = [
    {
      title: "Quality",
      description: "We don't compromise. Every stitch is placed with intention and every material is tested for longevity.",
    },
    {
      title: "Sustainability",
      description: "Our environmental footprint matters. We are committed to net-zero production by 2030.",
    },
    {
      title: "Innovation",
      description: "Minimalism doesn't mean basic. We leverage cutting-edge material science to improve comfort.",
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="title-lg text-neutral-900 mb-6">Our Core Values</h2>
          <div className="w-24 h-1 bg-neutral-900 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="flex flex-col gap-6 p-8 rounded-2xl hover:bg-neutral-50 transition-colors duration-300"
            >
              <h3 className="text-3xl font-semibold text-neutral-900">
                {value.title}
              </h3>
              <p className="text-xl text-neutral-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}