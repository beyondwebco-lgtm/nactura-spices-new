"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { generateWhatsAppLink } from "@/utils/whatsapp";

export default function NacturaTeaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} id="tea" className="relative py-24 md:py-32 bg-[#FAFAFA] overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-bold block mb-4">
            Signature Essentials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 text-[#0A321E] font-bold">
            Nactura <span className="text-gradient-gold">Honey & Tea</span>
          </h2>
          <p className="text-[#0A321E]/70 text-sm md:text-base max-w-lg mx-auto font-medium">
            Pure forest nectar and estate-harvested tea leaves to elevate your daily routine.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Nactura Honey */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/30 bg-white shadow-lg flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-6 bg-[#FAFAFA]">
              <Image
                src="/images/catalog/nactura honey.jpg"
                alt="Nactura Honey"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-4 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#D4AF37] text-white text-[9px] tracking-widest uppercase font-bold rounded">
                Raw & Pure Nectar
              </div>
            </div>

            <span className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase font-bold block mb-1">
              Wild Forest Honey
            </span>
            <h3 className="font-serif text-3xl text-[#0A321E] mb-3 font-bold">
              Nactura Honey
            </h3>
            <p className="text-xs text-[#0A321E]/80 leading-relaxed mb-6 font-medium">
              Rich, golden nectar gathered with care, offering warm floral notes and uncompromised natural purity.
            </p>

            <button
              onClick={() => window.open(generateWhatsAppLink("Nactura Honey"), "_blank")}
              className="w-full py-3.5 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:bg-[#D4AF37] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 rounded-md cursor-pointer"
            >
              <FaWhatsapp size={16} /> Enquire Honey
            </button>
          </motion.div>

          {/* Nactura Tea */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/30 bg-white shadow-lg flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-6 bg-[#FAFAFA]">
              <Image
                src="/images/catalog/NACTURA TEA.jpg"
                alt="Nactura Tea"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-4 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#D4AF37] text-white text-[9px] tracking-widest uppercase font-bold rounded">
                Estate Tea Leaves
              </div>
            </div>

            <span className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase font-bold block mb-1">
              Plantation Selection
            </span>
            <h3 className="font-serif text-3xl text-[#0A321E] mb-3 font-bold">
              Nactura Tea
            </h3>
            <p className="text-xs text-[#0A321E]/80 leading-relaxed mb-6 font-medium">
              Hand-selected tea leaves offering a full-bodied brew with rich natural aroma and invigorating taste.
            </p>

            <button
              onClick={() => window.open(generateWhatsAppLink("Nactura Tea"), "_blank")}
              className="w-full py-3.5 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:bg-[#D4AF37] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 rounded-md cursor-pointer"
            >
              <FaWhatsapp size={16} /> Enquire Tea
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
