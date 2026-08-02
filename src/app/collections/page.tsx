"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaWhatsapp, FaTimes, FaSearch, FaPhone, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import { products, categoriesList, Product } from "@/data/products";
import { generateWhatsAppLink } from "@/utils/whatsapp";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });
const FloatingWhatsApp = dynamic(() => import("@/components/FloatingWhatsApp"), { ssr: false });

function ProductGallery({ images, productName }: { images: string[]; productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStart = useRef<number | null>(null);

  const galleryImages = images && images.length > 0 ? images : ["/images/catalog/elachi cardamom.jpg"];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch Swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStart.current = null;
  };

  // Zoom Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Main image container */}
      <div
        className="relative w-full aspect-square rounded-2xl overflow-hidden border border-[#D4AF37]/20 bg-white group cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full h-full relative"
            style={{
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              transform: isZoomed ? "scale(1.8)" : "scale(1)",
              transition: isZoomed ? "transform 0.05s ease-out" : "transform 0.3s ease-out"
            }}
          >
            <Image
              src={galleryImages[activeIndex]}
              alt={`${productName} - Image ${activeIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-contain p-4"
            />
          </motion.div>
        </AnimatePresence>

        {galleryImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[#0A321E] hover:bg-white/40 hover:scale-105 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 opacity-100"
              aria-label="Previous image"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[#0A321E] hover:bg-white/40 hover:scale-105 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 opacity-100"
              aria-label="Next image"
            >
              <FaChevronRight size={16} />
            </button>
          </>
        )}

        {galleryImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {galleryImages.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "w-4 bg-[#D4AF37]" : "w-1.5 bg-[#0A321E]/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto py-1">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border bg-white flex-shrink-0 transition-all duration-300 ${
                idx === activeIndex
                  ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/30"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CollectionsContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const activeCategory = (categoryFromUrl && categoriesList.some((c) => c.id === categoryFromUrl))
    ? categoryFromUrl
    : selectedCategory;

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(query) ||
      p.subtitle.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <main className="min-h-screen bg-[#FAFAFA] text-[#0A321E] selection:bg-[#D4AF37]/30 selection:text-[#0A321E]">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-44 pb-16 overflow-hidden bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA] to-[#FAFAFA]">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[180px]"></div>
          </div>

          <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
            {/* Breadcrumb */}
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#0A321E]/60 mb-6 flex items-center justify-center gap-2 font-bold">
              <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
              <span>&rarr;</span>
              <span className="text-[#D4AF37] font-bold">Collections</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Our Premium <span className="text-gradient-gold font-bold">Collection</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg text-[#0A321E]/80 max-w-2xl mx-auto font-medium leading-relaxed mb-10"
            >
              Handpicked from Nature. Packed with Purity. Crafted for Every Pantry.
            </motion.p>

            <button
              onClick={() => window.open(generateWhatsAppLink("Entire NACTURA Collection"), "_blank")}
              className="px-10 py-4 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:bg-[#D4AF37] hover:text-white transition-all duration-500 flex items-center justify-center gap-3 mx-auto rounded-md cursor-pointer"
            >
              <FaWhatsapp size={16} />
              Enquire on WhatsApp
            </button>
          </div>
        </section>

        {/* Search & Filter Controls */}
        <section className="py-6 border-y border-[#D4AF37]/20 bg-[#FFFFFF]/90 backdrop-blur-md sticky top-[72px] z-30">
          <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-[10px] tracking-widest uppercase border transition-all duration-300 font-bold rounded-md cursor-pointer ${
                    activeCategory === cat.id
                      ? "border-[#D4AF37] bg-[#D4AF37] text-white shadow-sm"
                      : "border-[#D4AF37]/20 hover:border-[#D4AF37]/60 text-[#0A321E]/70 hover:text-[#0A321E] bg-white"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-md py-2.5 pl-10 pr-4 text-xs text-[#0A321E] placeholder-[#0A321E]/40 outline-none transition-all duration-300 shadow-sm"
              />
              <FaSearch className="absolute left-3.5 top-3.5 text-[#D4AF37] text-xs" />
            </div>
          </div>
        </section>

        {/* Catalog Grid */}
        <section className="py-16 pb-32">
          <div className="container mx-auto px-6 max-w-6xl">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#D4AF37]/20">
                <p className="font-serif text-2xl text-[#0A321E] mb-2 font-bold">No Products Found</p>
                <p className="text-xs text-[#0A321E]/60 mb-6">Try searching for another keyword or change the category filter.</p>
                <button
                  onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                  className="px-6 py-2.5 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold rounded-md"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => setSelectedProduct(p)}
                      className="group cursor-pointer glass-panel overflow-hidden border border-[#D4AF37]/20 hover-gold-glow hover:-translate-y-2 transition-all duration-500 relative bg-white shadow-sm rounded-xl flex flex-col justify-between"
                    >
                      {/* Product Image */}
                      <div className="relative w-full h-60 bg-[#FAFAFA] overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          loading="lazy"
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none" />

                        {p.badge && (
                          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-[#D4AF37] text-white text-[8px] tracking-widest uppercase font-bold rounded">
                            {p.badge}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-grow justify-between">
                        <div>
                          <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase font-bold block mb-1">
                            {p.subtitle}
                          </span>
                          <h3 className="font-serif text-lg text-[#0A321E] group-hover:text-[#D4AF37] transition-colors duration-300 mb-2 font-bold leading-tight">
                            {p.name}
                          </h3>
                          <p className="text-xs text-[#0A321E]/70 leading-relaxed line-clamp-2 mb-4 font-medium">
                            {p.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-[#D4AF37]/20 pt-4 mt-auto">
                          <span className="text-[10px] text-[#0A321E]/60 tracking-wider font-bold uppercase">
                            {p.category.replace("-", " & ")}
                          </span>
                          <span className="text-[10px] text-[#D4AF37] tracking-widest uppercase font-bold group-hover:underline flex items-center gap-1">
                            <FaWhatsapp size={12} /> Enquire
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 border-t border-[#D4AF37]/20 bg-[#FFFFFF]">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="font-serif text-3xl md:text-5xl text-[#0A321E] mb-6 font-bold">
              Looking for <span className="text-gradient-gold">Custom Quantities?</span>
            </h2>
            <p className="text-sm md:text-base text-[#0A321E]/80 leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
              &ldquo;Connect with us directly on WhatsApp to inquire about custom orders, gift boxes, or bulk availability.&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.open(generateWhatsAppLink("General Catalog Inquiry"), "_blank")}
                className="px-10 py-4 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:bg-[#D4AF37] hover:text-white transition-all duration-500 flex items-center justify-center gap-2 w-full sm:w-auto rounded-md cursor-pointer"
              >
                <FaWhatsapp size={16} />
                Enquire on WhatsApp
              </button>
              <a
                href="tel:8870107301"
                className="px-10 py-4 border border-[#0A321E] text-[#0A321E] text-xs tracking-widest uppercase font-bold hover:bg-[#0A321E] hover:text-[#D4AF37] transition-all duration-500 flex items-center justify-center gap-2 w-full sm:w-auto rounded-md"
              >
                <FaPhone size={12} />
                Call Now
              </a>
            </div>
          </div>
        </section>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="relative w-full max-w-4xl bg-[#FAFAFA] border border-[#D4AF37]/30 p-6 md:p-10 max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-5 right-5 text-[#0A321E] hover:text-[#D4AF37] p-2 transition-colors duration-300 z-10 cursor-pointer"
                  aria-label="Close modal"
                >
                  <FaTimes size={24} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-4">
                  {/* Left Column: Image */}
                  <div className="w-full">
                    <ProductGallery images={selectedProduct.images} productName={selectedProduct.name} />
                  </div>

                  {/* Right Column: Information */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-bold">
                          {selectedProduct.subtitle}
                        </span>
                        {selectedProduct.badge && (
                          <span className="px-2.5 py-0.5 text-white text-[9px] tracking-wider uppercase bg-[#D4AF37] font-bold rounded">
                            {selectedProduct.badge}
                          </span>
                        )}
                      </div>

                      <h2 className="font-serif text-3xl md:text-4xl text-[#0A321E] mb-4 font-bold">
                        {selectedProduct.name}
                      </h2>

                      <p className="text-sm text-[#0A321E]/80 leading-relaxed mb-6 font-medium">
                        {selectedProduct.description}
                      </p>

                      <div className="space-y-4 mb-8">
                        <div>
                          <h4 className="text-xs tracking-wider uppercase text-[#D4AF37] font-bold mb-1">
                            Suggested Uses
                          </h4>
                          <p className="text-xs text-[#0A321E]/70 leading-relaxed font-medium">
                            {selectedProduct.uses}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs tracking-wider uppercase text-[#D4AF37] font-bold mb-1">
                            Highlights
                          </h4>
                          <p className="text-xs text-[#0A321E]/70 leading-relaxed font-medium">
                            {selectedProduct.benefits}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        window.open(
                          generateWhatsAppLink(selectedProduct.name),
                          "_blank"
                        )
                      }
                      className="w-full flex items-center justify-center gap-3 py-4 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:bg-[#D4AF37] hover:text-white transition-all duration-500 rounded-md mt-6 cursor-pointer"
                    >
                      <FaWhatsapp size={18} />
                      Enquire on WhatsApp
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
        <FloatingWhatsApp />
      </main>
    </>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-[#0A321E] font-serif text-lg">
        Loading NACTURA Collections...
      </div>
    }>
      <CollectionsContent />
    </Suspense>
  );
}
