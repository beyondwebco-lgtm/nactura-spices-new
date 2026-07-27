"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import confetti from "canvas-confetti";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic gold particles effect
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 15, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        return; // Disable confetti on mobile to save main thread
      }

      const particleCount = 20 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: ["#C89B3C", "#E8C777", "#F5F5F5"],
        shapes: ["circle"],
        scalar: randomInRange(0.3, 0.8),
        disableForReducedMotion: true,
      });
    }, 500); // reduced frequency to 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#050505] pt-20"
    >
      {/* Background cinematic lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-radial from-[#C89B3C]/10 to-transparent rounded-full blur-none md:blur-[120px] mix-blend-screen hidden md:block animate-pulse-gold"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-[500px] md:h-[500px] bg-gradient-radial from-[#0F1C14]/80 to-transparent rounded-full blur-none md:blur-[150px]"></div>
        
        {/* Soft Smoke/Vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(5,5,5,0.8)_80%,rgba(5,5,5,1)_100%)]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        {/* Animate Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8 relative w-40 h-40 md:w-56 md:h-56 animate-float-slow"
        >
          <Image
            src="/images/logo.png"
            alt="Nactura Luxury Spices"
            fill
            sizes="(max-width: 768px) 160px, 224px"
            className="object-contain drop-shadow-[0_0_25px_rgba(200,155,60,0.3)]"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 text-[#F5F5F5]"
        >
          NACTURA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-[#E8C777] font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2"
        >
          Luxury Spices & Dry Fruits
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="text-sm md:text-base text-[#F5F5F5]/60 italic font-serif tracking-wider mb-12"
        >
          &quot;Purity in Every Pinch&quot;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto"
        >
          <a
            href="#collections"
            className="px-8 py-4 w-full sm:w-auto bg-transparent border border-[#C89B3C] text-[#E8C777] text-xs sm:text-sm tracking-widest uppercase font-medium hover:bg-[#C89B3C] hover:text-[#050505] transition-all duration-500 hover-gold-glow text-center"
          >
            Explore Collections
          </a>
          
          <button
            onClick={() => window.open("https://wa.me/918870107301?text=Hello%20NACTURA,%0A%0AI’m%20interested%20in%20ordering%0AProduct:%0AQuantity:%0A%0APlease%20share%20the%20details.", "_blank")}
            className="px-10 py-4 bg-gradient-to-r from-[#C89B3C] to-[#E8C777] text-[#050505] text-sm tracking-widest uppercase font-bold hover:shadow-[0_0_30px_rgba(200,155,60,0.5)] transition-all duration-500 flex items-center justify-center gap-3 w-full sm:w-auto"
          >
            <FaWhatsapp size={20} />
            Order on WhatsApp
          </button>
        </motion.div>
      </div>

      {/* Floating Spices Effect (Next Image optimized) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-[20%] left-[10%] w-16 h-16 blur-[2px] animate-float" style={{ animationDelay: '0s' }}>
          <Image src="/images/spices_combo.png" alt="" fill sizes="64px" className="object-contain" />
        </div>
        <div className="absolute top-[60%] right-[15%] w-24 h-24 blur-[4px] animate-float-slow" style={{ animationDelay: '2s' }}>
          <Image src="/images/spices_combo.png" alt="" fill sizes="96px" className="object-contain" />
        </div>
        <div className="absolute bottom-[20%] left-[25%] w-12 h-12 blur-[1px] animate-float" style={{ animationDelay: '1s' }}>
          <Image src="/images/dryfruits_combo.png" alt="" fill sizes="48px" className="object-contain" />
        </div>
      </div>
    </section>
  );
}
