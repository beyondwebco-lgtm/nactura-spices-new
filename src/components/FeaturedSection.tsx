"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { generateWhatsAppLink } from "@/utils/whatsapp";

const featuredItems = [
  {
    id: "elachi-cardamom",
    name: "Elachi Cardamom",
    subtitle: "Aromatic Green Pods",
    description: "Fragrant whole green cardamom pods, carefully selected for intense natural aroma and rich essential oil content.",
    image: "/images/catalog/elachi cardamom.jpg",
    tag: "Estate Fresh",
  },
  {
    id: "cashew",
    name: "Cashew",
    subtitle: "Rich Creamy Cashews",
    description: "Plump cashew nuts offering a smooth, buttery texture and sweet crunch.",
    image: "/images/catalog/cashew.jpg",
    tag: "Jumbo Grade",
  },
  {
    id: "cinnamon-ceylon",
    name: "Cinnamon Ceylon",
    subtitle: "True Soft Cinnamon",
    description: "Delicate, multi-layered Ceylon cinnamon quills with a refined, subtle aroma.",
    image: "/images/catalog/cinnamon silon.jpg",
    tag: "Pure Ceylon",
  },
  {
    id: "chia-seeds",
    name: "Chia Seeds",
    subtitle: "Wholesome Raw Chia Seeds",
    description: "Clean, raw chia seeds that swell gracefully when soaked in liquids.",
    image: "/images/catalog/chia seeds.jpg",
    tag: "Superfood",
  },
];

export default function FeaturedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden bg-[#FAFAFA]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-[250px]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-bold block mb-4">
            Curated Highlights
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 text-[#0A321E] font-bold">
            Featured <span className="text-gradient-gold">Collection</span>
          </h2>
          <p className="text-[#0A321E]/70 text-sm md:text-base max-w-xl mx-auto font-medium">
            Hand-selected highlights from our new estate catalog
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {featuredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
              className="group relative glass-panel overflow-hidden hover-gold-glow transition-all duration-700 bg-white rounded-xl shadow-sm border border-[#D4AF37]/20 flex flex-col justify-between"
            >
              <div className="relative w-full h-56 bg-[#FAFAFA] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#D4AF37] text-white text-[8px] tracking-widest uppercase font-bold rounded">
                  {item.tag}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase font-bold block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-xl text-[#0A321E] font-bold mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#0A321E]/70 leading-relaxed line-clamp-3 mb-6 font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => window.open(generateWhatsAppLink(item.name), "_blank")}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:bg-[#D4AF37] hover:text-white transition-all duration-500 rounded-md cursor-pointer"
                  >
                    <FaWhatsapp size={14} />
                    Enquire
                  </button>
                  <Link
                    href={`/collections?category=all`}
                    className="block text-center text-[10px] text-[#0A321E]/60 tracking-wider uppercase hover:text-[#D4AF37] transition-colors py-1 font-bold"
                  >
                    View in Catalog &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
