"use client";

import { useRef } from "react";
import Image from "next/image";
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
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden border-4 border-[#D4AF37]/30 shadow-2xl group bg-white">
              <Image
                src="/images/WhatsApp Image 2026-08-01 at 11.15.07 PM.jpeg"
                alt="Nactura Premium Elachi Tea"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#D4AF37] text-white text-[10px] tracking-widest uppercase font-bold rounded">
                Natural Elachi Flavour
              </div>
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
              <button
                onClick={() => window.open("https://wa.me/918870107301?text=Hello NACTURA, I am interested in NACTURA Premium Tea.", "_blank")}
                className="px-8 py-4 bg-[#0A321E] text-[#D4AF37] text-sm tracking-widest uppercase font-medium hover:bg-[#D4AF37] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 hover-gold-glow w-full sm:w-auto"
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
