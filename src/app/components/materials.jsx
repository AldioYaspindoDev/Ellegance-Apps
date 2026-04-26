"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Materials() {
  const materials = [
    {
      title: "High-Quality Materials",
      description: "Using high-quality premium leather materials that are specially selected to produce shoes that are strong, durable, and remain elegant.",
      image: "/images/CraftmanShip1.jpeg",
    },
    {
      title: "Craftsmanship",
      description: "Handmade by skilled Italian professionals, with neat stitching details and high craftsmanship to produce exclusive quality shoes.",
      image: "/images/CraftmanShip2.jpeg",
    },
  ];

  return (
    <section className="py-32 bg-neutral-900 text-white overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="title-lg text-white mb-6">Materials & Craft</h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            The foundation of every ELLEGANCE shoe lies in the quality of our materials and the hands that shape them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {materials.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col gap-10 group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
              </div>
              <div className="flex flex-col gap-6">
                <h3 className="text-4xl font-semibold">{item.title}</h3>
                <p className="text-xl text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
