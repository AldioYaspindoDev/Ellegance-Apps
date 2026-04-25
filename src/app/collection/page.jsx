"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Collection() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = ["ALL", "BEST SELLER", "LIMITED EDITION", "MAN", "WOMAN"];

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/product")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setProduct(data.data);
        } else {
          console.error("Format data tidak sesuai:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("gagal mengambil data product : ", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
    <Navbar/>
    
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="section-container">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h1 className="title-xl mb-6 text-neutral-900">Collection</h1>
          <p className="text-body text-neutral-500">
            Explore your signature look with premium leather footwear, crafted for those who appreciate the finer details in every step.
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 text-sm font-medium tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="w-full h-px bg-neutral-200 mb-16"></div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-neutral-100 aspect-4/5 mb-4"></div>
                <div className="h-6 bg-neutral-100 w-3/4 mb-2"></div>
                <div className="h-6 bg-neutral-100 w-1/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            <AnimatePresence>
              {product.length > 0 ? (
                product.map((item, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    key={item.id}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-4/5 overflow-hidden bg-neutral-50 mb-6">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        src={`http://localhost:5000/${item.productImages}`}
                        alt={item.productName}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/80 backdrop-blur-md">
                        <button className="w-full py-3 bg-neutral-900 text-white text-sm font-medium tracking-widest hover:bg-neutral-800 transition-colors">
                          QUICK VIEW
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-light text-neutral-900 tracking-tight">
                          {item.productName}
                        </h3>
                        <span className="text-xs font-bold tracking-tighter text-neutral-400 uppercase">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-lg font-medium text-neutral-900">
                        Rp {parseInt(item.price).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-neutral-400 text-xl font-light">
                    No products found in this collection.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}
