"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "/images/hero_1.jpg",
    "/images/hero_2.jpg",
    "/images/hero_3.jpg",
    "/images/hero_4.jpg",
    "/images/hero_5.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToCatalog = () => {
    const categoriesSection = document.getElementById("collections");
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAFAFA]">
      
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {slides.map((slide, idx) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              idx === currentSlide ? "opacity-75" : "opacity-0"
            }`}
          >
            <Image
              src={slide}
              alt="Plantation Background"
              fill
              sizes="100vw"
              className="object-cover scale-105"
              priority={idx === 0}
            />
          </div>
        ))}
        {/* Subtle light vignette overlay to ensure text is fully readable */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,250,250,0.4)_0%,rgba(250,250,250,0.7)_100%)]" />
      </div>

      {/* Hero Content */}
      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8 relative w-36 h-36 md:w-44 md:h-44"
        >
          <Image
            src="/images/logo.png"
            alt="Nactura Luxury Spices"
            fill
            sizes="(max-width: 768px) 144px, 176px"
            className="object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            priority
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 text-[#0A321E]"
        >
          NACTURA
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-[#D4AF37] font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2"
        >
          Luxury Spices & Dry Fruits
        </motion.p>
        
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="text-sm md:text-base text-[#0A321E]/70 italic font-serif tracking-wider mb-12"
        >
          &quot;Purity in Every Pinch&quot;
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto"
        >
          <button
            onClick={scrollToCatalog}
            className="px-8 py-4 w-full sm:w-auto bg-transparent border border-[#0A321E] text-[#0A321E] text-xs sm:text-sm tracking-widest uppercase font-bold hover:bg-[#0A321E] hover:text-[#D4AF37] transition-all duration-500 hover-gold-glow text-center cursor-pointer"
          >
            Explore Collections
          </button>
          
          <button
            onClick={() => window.open("https://wa.me/918870107301?text=Hello%20NACTURA,%0A%0AI’m%20interested%20in%20ordering%0AProduct:%0AQuantity:%0A%0APlease%20share%20the%20details.", "_blank")}
            className="px-10 py-4 bg-[#0A321E] text-[#D4AF37] text-sm tracking-widest uppercase font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-500 flex items-center justify-center gap-3 w-full sm:w-auto cursor-pointer"
          >
            <FaWhatsapp size={20} />
            Order on WhatsApp
          </button>
        </motion.div>
      </div>

    </section>
  );
}
