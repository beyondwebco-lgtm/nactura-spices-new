"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { generateWhatsAppLink } from "@/utils/whatsapp";

const seedProducts = [
  { name: "Chia Seeds", subtitle: "Wholesome Raw Chia", image: "/images/catalog/chia seeds.jpg" },
  { name: "Pumpkin Seeds", subtitle: "Raw Green Pepitas", image: "/images/catalog/pumpkin seeds.jpg" },
  { name: "Flax Seeds", subtitle: "Nutritious Brown Flax", image: "/images/catalog/flax seeds.jpg" },
  { name: "Sunflower Seeds", subtitle: "Kernel Sunflower Seeds", image: "/images/catalog/sunflower seeds.jpg" },
  { name: "Sabja Seeds", subtitle: "Cooling Basil Seeds", image: "/images/catalog/sabja seeds.jpg" },
  { name: "Watermelon Seeds", subtitle: "Melon Seed Kernels", image: "/images/catalog/watermelon seeds.jpg" },
  { name: "Cucumber Seeds", subtitle: "Crisp Melon Seeds", image: "/images/catalog/cucumber seeds.jpg" },
];

export default function IndividualSpices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden bg-[#FAFAFA]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#FAFAFA] to-[#FFFFFF]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-bold block mb-4">
            Daily Essentials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-[#0A321E] font-bold">
            Seeds & <span className="text-gradient-gold">Wellness Pantry</span>
          </h2>
          <p className="text-[#0A321E]/70 text-sm tracking-wider max-w-lg mx-auto font-medium">
            Wholesome seed varieties selected for natural crunch, texture, and daily nutrition.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {seedProducts.map((seed, i) => (
            <motion.div
              key={seed.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              onClick={() => window.open(generateWhatsAppLink(seed.name), "_blank")}
              className="group cursor-pointer glass-panel p-6 text-center hover-gold-glow hover:border-[#D4AF37]/60 transition-all duration-500 hover:-translate-y-1 bg-white rounded-xl shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-36 md:h-44 mb-4 overflow-hidden rounded-lg bg-[#FAFAFA]">
                  <Image
                    src={seed.image}
                    alt={seed.name}
                    fill
                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <span className="text-[#D4AF37] text-[9px] tracking-widest uppercase font-bold block mb-1">
                  {seed.subtitle}
                </span>
                <h3 className="font-serif text-base md:text-lg text-[#0A321E] group-hover:text-[#D4AF37] transition-colors duration-300 font-bold">
                  {seed.name}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-center gap-1.5 text-xs tracking-widest uppercase text-[#D4AF37] font-bold">
                <FaWhatsapp size={14} /> Enquire Now
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/collections?category=seeds"
            className="inline-block px-8 py-3 border border-[#0A321E] text-[#0A321E] text-xs tracking-widest uppercase font-bold hover:bg-[#0A321E] hover:text-[#D4AF37] transition-all rounded-md"
          >
            Explore All Seeds &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
