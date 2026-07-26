"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function MeeshoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-[#050505]">
      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative overflow-hidden glass-panel border border-[#C89B3C]/30 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 hover-gold-glow"
        >
          {/* Subtle gold ray background */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-[#C89B3C]/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 text-center md:text-left">
            <span className="text-[#C89B3C] text-[10px] tracking-[0.3em] uppercase font-bold block mb-3">
              Shop Online
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F5] mb-4">
              We are now live on <span className="text-gradient-gold">Meesho</span>
            </h2>
            <p className="text-[#F5F5F5]/60 text-sm max-w-xl">
              Prefer shopping on Meesho? Enjoy direct checkout, fast delivery, and standard online payments for your favorite NACTURA spice combos and dry fruits.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <button
              onClick={() => window.open("https://www.meesho.com", "_blank")}
              className="px-10 py-4 bg-[#F5F5F5] text-[#050505] text-xs tracking-widest uppercase font-bold hover:bg-[#C89B3C] hover:text-[#050505] transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(200,155,60,0.3)]"
            >
              Shop on Meesho
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
