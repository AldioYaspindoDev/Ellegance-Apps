"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Featured2() {
  const products = [
    { name: "Ellegance Brown", price: "Rp600.000", image: "/images/BrowbShoes.jpeg" },
    { name: "Ellegance Black White", price: "Rp550.000", image: "/images/BrownWhiteShoes.jpeg" },
    { name: "Ellegance Black", price: "Rp500.000", image: "/images/BlackShoes.jpeg" },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h2 className="title-lg text-neutral-900 mb-6">Designed for your elegance</h2>
          <p className="text-body max-w-2xl">
            Ellegance creates formal shoes designed to elevate your style, strengthen your confidence, and provide comfort throughout your working day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-3/4 overflow-hidden bg-neutral-100 mb-8">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-light text-neutral-900 group-hover:text-neutral-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xl font-semibold text-neutral-900">
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
