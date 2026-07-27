"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaLeaf, FaWhatsapp } from "react-icons/fa";

export default function NacturaTeaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} id="tea" className="relative py-24 md:py-32 bg-[#FAFAFA] overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none rounded-full overflow-hidden border-8 border-white shadow-2xl flex items-center justify-center bg-gradient-to-tr from-[#0A321E] to-[#145C38]">
              <div className="text-center p-8">
                <FaLeaf className="text-[#D4AF37] text-6xl md:text-8xl mx-auto mb-6 opacity-80" />
                <h3 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-widest uppercase">
                  Nactura
                </h3>
                <h4 className="font-serif text-xl md:text-2xl text-[#D4AF37] mt-2 italic">
                  Premium Tea
                </h4>
              </div>
              <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-overlay rounded-full"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-medium block mb-4">
              New Arrival
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-[#0A321E]">
              Introducing <br />
              <span className="text-gradient-gold">NACTURA Tea</span>
            </h2>
            <p className="text-[#0A321E]/70 text-lg mb-8 leading-relaxed">
              Experience the perfect blend of tradition and taste. Handpicked leaves from the misty hills, offering an authentic, refreshing, and aromatic cup of premium tea that revitalizes your senses.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="text-[#0A321E] font-bold text-3xl font-serif">₹249</div>
              <div className="hidden sm:block w-px h-8 bg-[#D4AF37]/40"></div>
              <button
                onClick={() => window.open("https://wa.me/918870107301?text=Hello NACTURA, I am interested in NACTURA Premium Tea.", "_blank")}
                className="px-8 py-4 bg-[#0A321E] text-[#D4AF37] text-sm tracking-widest uppercase font-medium hover:bg-[#D4AF37] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 hover-gold-glow"
              >
                <FaWhatsapp size={18} /> Order Now
              </button>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
