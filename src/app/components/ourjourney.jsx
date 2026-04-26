"use client";
import { motion } from "framer-motion";

export default function OurJourney() {
  const events = [
    {
      year: "2023",
      title: "THE CONCEPT",
      description: "The initial vision for ELLEGANCE was conceived in a small studio in Stockholm.",
    },
    {
      year: "2024",
      title: "INNOVATION",
      description: "Developing materials using high-quality cowhide with advanced durability tests.",
    },
    {
      year: "2025",
      title: "MILAN STUDIO OPEN",
      description: "Opening a major design and production center in the heart of Italian fashion.",
    },
  ];

  return (
    <section className="py-32 bg-neutral-50 overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="title-lg text-neutral-900 mb-6">Our Journey</h2>
          <p className="text-body max-w-2xl">
            A timeline of our commitment to elegance and craftsmanship.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {events.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 relative"
            >
              <div className="text-6xl font-bold text-neutral-300">
                {event.year}
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-neutral-900 tracking-wider">
                  {event.title}
                </h3>
                <p className="text-xl text-neutral-600 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}