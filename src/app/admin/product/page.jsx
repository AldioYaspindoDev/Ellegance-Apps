"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, X, ChevronLeft } from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Link from "next/link";

export default function UploadProduct() {
  const [productImages, setProductImages] = useState(null);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [colors, setColors] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("productImages", productImages);
      formData.append("productName", productName);
      formData.append("category", category);
      formData.append("size", size);
      formData.append("colors", colors);
      formData.append("price", price);

      const response = await fetch("http://localhost:5000/product", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      alert("Produk berhasil diunggah!");
      // Reset form
      setProductName("");
      setCategory("");
      setSize("");
      setColors("");
      setPrice("");
      setProductImages(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="section-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link 
              href="/admin" 
              className="flex items-center text-neutral-400 hover:text-neutral-900 transition-colors mb-6 text-sm tracking-widest uppercase"
            >
              <ChevronLeft size={16} className="mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="title-lg text-neutral-900">New Product</h1>
            <p className="text-neutral-500 mt-2">Add a new item to your premium collection.</p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-7"
            >
              <form onSubmit={HandleUpload} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Product Name</label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="e.g. Classic Oxford Leather"
                      className="py-3 bg-transparent text-gray-600 placeholder-gray-400 border-b border-neutral-200 focus:border-neutral-900 outline-none transition-colors text-lg font-light"
                      required
                    />
                  </div>

                  {/* Price */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Price (IDR)</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 1500000"
                      className="py-3 bg-transparent text-gray-600 placeholder-gray-400 border-b border-neutral-200 focus:border-neutral-900 outline-none transition-colors text-lg font-light"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Category */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="py-3 bg-transparent border-b border-neutral-200 focus:border-neutral-900 outline-none transition-colors text-lg font-light text-gray-600 placeholder-gray-400 appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select</option>
                      <option value="man">Man</option>
                      <option value="woman">Woman</option>
                    </select>
                  </div>

                  {/* Size */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Base Size</label>
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="py-3 bg-transparent border-b border-neutral-200 focus:border-neutral-900 outline-none transition-colors text-lg text-gray-600 placeholder-gray-400 font-light appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="2XL">2XL</option>
                    </select>
                  </div>

                  {/* Colors */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Colors</label>
                    <input
                      type="text"
                      value={colors}
                      onChange={(e) => setColors(e.target.value)}
                      placeholder="e.g. Black, Brown"
                      className="py-3 bg-transparent text-gray-600 placeholder-gray-400 border-b border-neutral-200 focus:border-neutral-900 outline-none transition-colors text-lg font-light"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-rose-500 text-sm font-medium"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-neutral-900 text-white font-medium tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  <span className={loading ? "opacity-0" : "opacity-100 transition-opacity"}>
                    Upload Product
                  </span>
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-5"
            >
              <div className="sticky top-40">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4 block">Product Media</label>
                
                {!productImages ? (
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProductImages(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="aspect-square border-2 border-dashed border-neutral-200 rounded-lg flex flex-col items-center justify-center gap-4 group-hover:border-neutral-400 transition-colors bg-neutral-50">
                      <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-neutral-400 group-hover:text-neutral-900 transition-colors">
                        <UploadCloud size={32} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-neutral-900">Click to upload image</p>
                        <p className="text-xs text-neutral-400 mt-1">High quality JPEG or PNG (max. 2MB)</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-square rounded-lg overflow-hidden group shadow-2xl">
                    <img
                      src={URL.createObjectURL(productImages)}
                      alt="preview"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => setProductImages(null)}
                        className="bg-white text-neutral-900 p-3 rounded-full hover:bg-rose-500 hover:text-white transition-all transform hover:scale-110"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
