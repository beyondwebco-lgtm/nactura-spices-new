"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { generateWhatsAppLink } from "@/utils/whatsapp";

const signatureCombos = [
  {
    name: "Premium Spices 100 Gram Combo",
    subtitle: "Grand Spice Selection Box",
    description: "A substantial 100g collection of whole spices crafted for culinary enthusiasts.",
    image: "/images/catalog/Premium Spices 100 Gram Combo.jpg",
    badge: "Best Seller",
  },
  {
    name: "Dryfruits 250 Gram Combo",
    subtitle: "Premium Dry Fruit Gift Box",
    description: "A generous assortment of selected dry fruits, ideal for gifting or kitchen stocking.",
    image: "/images/catalog/dryfruits 250 gram combo.jpg",
    badge: "Best Value",
  },
  {
    name: "Mixed Seeds 1kg Combo",
    subtitle: "Complete 7-Seed Wellness Blend",
    description: "A comprehensive 1kg mixture of wholesome seeds combined for convenient daily use.",
    image: "/images/catalog/mixed seeds 1kg combo.jpg",
    badge: "Wellness Pack",
  },
  {
    name: "Premium Dry Berries Mixed",
    subtitle: "Antioxidant Berry Selection",
    description: "A colorful blend of dried berries combining sweet and tangy fruit flavors.",
    image: "/images/catalog/Premium Dry Berries mixed.jpg",
    badge: "Berry Special",
  },
];

export default function ComboOffers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} id="combos" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-bold block mb-4">
            Curated Combos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-[#0A321E] font-bold">
            Signature <span className="text-gradient-gold">Combo Packs</span>
          </h2>
          <p className="text-[#0A321E]/70 text-sm tracking-wider max-w-lg mx-auto font-medium">
            Experience NACTURA with our specially assembled selection boxes.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {signatureCombos.map((combo, i) => (
            <motion.div
              key={combo.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="group glass-panel rounded-2xl overflow-hidden shadow-lg border border-[#D4AF37]/20 bg-[#FAFAFA] flex flex-col justify-between"
            >
              <div className="relative w-full h-64 md:h-72 bg-white p-6">
                <Image
                  src={combo.image}
                  alt={combo.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#D4AF37] text-white text-[9px] tracking-widest uppercase font-bold rounded">
                  {combo.badge}
                </div>
              </div>
              <div className="p-8 text-center bg-[#FAFAFA] flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase font-bold block mb-1">
                    {combo.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#0A321E] mb-3 font-bold">
                    {combo.name}
                  </h3>
                  <p className="text-xs text-[#0A321E]/70 mb-6 leading-relaxed font-medium">
                    {combo.description}
                  </p>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => window.open(generateWhatsAppLink(combo.name), "_blank")}
                    className="w-full py-3.5 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:bg-[#D4AF37] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 rounded-md cursor-pointer"
                  >
                    <FaWhatsapp size={16} /> Enquire Combo
                  </button>
                  <Link
                    href="/collections?category=combos"
                    className="block text-[10px] text-[#0A321E]/60 tracking-wider uppercase font-bold hover:text-[#D4AF37]"
                  >
                    View All 10 Combos &rarr;
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
