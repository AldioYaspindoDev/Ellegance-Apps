"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Link from "next/link";
import useBucket from "../../context/bucketContext";
import { Check, ShoppingCart, AlertCircle } from "lucide-react";

export default function DetailCollection() {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  
  const params = useParams();
  const { addToBucket } = useBucket();

  const sizes = ['S', 'M', 'L', 'XL', '2XL'];

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await fetch(`http://localhost:5000/product/${params.id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          setCollection(data.data);
        } else if (data && !data.success) {
           setCollection(data);
        }
      } catch (err) {
        console.error(err.message);
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCollection();
    }
  }, [params.id]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setToastMsg("Please select a size first");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setAddingToCart(true);
    const result = await addToBucket(collection.id, selectedSize, 1);
    
    setAddingToCart(false);
    setToastMsg(result.message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 border-4 border-neutral-900 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-500 tracking-widest text-sm uppercase">Loading details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !collection) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center text-center px-4">
          <div>
            <h2 className="text-2xl font-light text-neutral-900 mb-4">{error || "Product not found"}</h2>
            <Link href="/collection" className="inline-block px-8 py-3 bg-neutral-900 text-white text-sm font-medium tracking-widest hover:bg-neutral-800 transition-colors">
              BACK TO COLLECTION
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Simple Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-100 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 min-w-75 justify-center"
          >
            {toastMsg.includes("select") ? <AlertCircle className="w-4 h-4 text-amber-400" /> : <Check className="w-4 h-4 text-emerald-400" />}
            <span className="text-sm font-medium">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-white pt-32 pb-20">
        <div className="section-container">
          
          <div className="mb-12">
            <Link href="/collection" className="text-sm tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors uppercase flex items-center gap-2">
              <span>&larr;</span> Back to Collection
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Image Gallery Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-4/5 bg-neutral-50"
            >
              <img
                src={collection.productImages ? `http://localhost:5000/${collection.productImages}` : "/placeholder.jpg"}
                alt={collection.productName || "Product image"}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Product Info Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-32"
            >
              <div className="mb-8">
                <span className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase block mb-4">
                  {collection.category || "PREMIUM COLLECTION"}
                </span>
                <h1 className="title-xl text-neutral-900 mb-6">
                  {collection.productName}
                </h1>
                <p className="text-2xl font-medium text-neutral-900 mb-8">
                  Rp {collection.price ? parseInt(collection.price).toLocaleString() : "0"}
                </p>
                
                {/* Size Selection */}
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold tracking-widest text-neutral-900 uppercase">Select Size</span>
                    <button className="text-xs text-neutral-400 hover:text-neutral-900 underline transition-colors">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-14 h-14 flex items-center justify-center text-sm font-medium transition-all border ${
                          selectedSize === size 
                            ? "border-neutral-900 bg-neutral-900 text-white" 
                            : "border-neutral-200 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-neutral-200 mb-8"></div>
                <p className="text-body text-neutral-500 mb-10 leading-relaxed">
                  {collection.description || "Experience unparalleled comfort and style with our premium leather footwear. Each piece is meticulously crafted to elevate your daily ensemble, combining traditional artisanship with modern design sensibilities."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="w-full py-4 bg-neutral-900 text-white text-sm font-bold tracking-widest hover:bg-neutral-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {addingToCart ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      ADD TO CART
                    </>
                  )}
                </button>
                <button className="w-full py-4 bg-white border border-neutral-900 text-neutral-900 text-sm font-bold tracking-widest hover:bg-neutral-50 transition-all active:scale-[0.98]">
                  BUY IT NOW
                </button>
              </div>

              {/* Additional Details */}
              <div className="mt-12 space-y-6 pt-8 border-t border-neutral-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-500 uppercase tracking-wider">Materials</span>
                  <span className="text-neutral-900 font-medium">Premium Leather</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-500 uppercase tracking-wider">Shipping</span>
                  <span className="text-neutral-900 font-medium">Free standard shipping</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
