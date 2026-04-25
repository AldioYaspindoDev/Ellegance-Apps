"use client";
import { motion } from "framer-motion";

export default function Progress() {
  const footerLinks = [
    {
      title: "Shop",
      links: ["All Collections", "New Arrivals", "Limited Editions"]
    },
    {
      title: "Support",
      links: ["Shipping & Return", "Size Guide", "Care Instructions", "Contact Us"]
    }
  ];

  return (
    <section className="py-24 bg-neutral-900 text-white">
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="md:col-span-2"
          >
            <h2 className="title-lg mb-8">Ellegance</h2>
            <p className="text-neutral-400 text-xl max-w-sm">
              Elevating every step with premium quality and timeless design.
            </p>
          </motion.div>

          {footerLinks.map((group, i) => (group && (
            <motion.div 
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-6"
            >
              <h3 className="text-xl font-bold uppercase tracking-widest text-white">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-neutral-400 hover:text-white transition-colors text-lg">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )))}
        </div>
      </div>
    </section>
  );
}