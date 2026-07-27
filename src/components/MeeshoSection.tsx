"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function MeeshoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-[#FFFFFF]">
      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative overflow-hidden glass-panel border border-[#D4AF37]/30 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 hover-gold-glow bg-[#FAFAFA] rounded-2xl shadow-lg"
        >
          {/* Subtle gold ray background */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 text-center md:text-left">
            <span className="inline-block bg-[#D4AF37] text-white text-[10px] tracking-[0.3em] uppercase font-bold py-1 px-3 rounded-full mb-4">
              Available on Meesho
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0A321E] mb-4 font-bold">
              We are now live on <span className="text-gradient-gold">Meesho</span>
            </h2>
            <p className="text-[#0A321E]/70 text-sm max-w-xl font-medium">
              Prefer shopping on Meesho? Enjoy direct checkout, fast delivery, and standard online payments for your favorite NACTURA spice combos and dry fruits.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <button
              onClick={() => window.open("https://www.meesho.com", "_blank")}
              className="px-10 py-4 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:bg-[#D4AF37] hover:text-white transition-all duration-500 shadow-md hover:shadow-lg rounded-md"
            >
              Shop on Meesho
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
