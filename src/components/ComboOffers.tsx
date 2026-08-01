"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

const combos = [
  {
    name: "Premium Spices Combo",
    description: "A curated collection of our finest Idukki spices, perfect for gifting or stocking your luxury kitchen.",
    price: "₹1499",
    image: "/images/12 premium spices.jpeg",
  },
  {
    name: "Luxury Dry Fruits Box",
    description: "Hand-selected, premium grade dry fruits packed with nutrients and unmatched taste.",
    price: "₹1899",
    image: "/images/7 premium dry fruits.jpeg",
  }
];

function generateWhatsAppLink(comboName: string) {
  const msg = encodeURIComponent(
    `Hello NACTURA,\n\nI'm interested in ordering the\nCombo: ${comboName}\nQuantity:\n\nPlease share the details.`
  );
  return `https://wa.me/918870107301?text=${msg}`;
}

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
          <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-medium block mb-4">
            Exclusive Offers
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-[#0A321E]">
            Signature <span className="text-gradient-gold">Combos</span>
          </h2>
          <p className="text-[#0A321E]/70 text-sm tracking-wider max-w-lg mx-auto">
            Experience the best of Nactura with our specially curated combo packs.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {combos.map((combo, i) => (
            <motion.div
              key={combo.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * i }}
              className="group glass-panel rounded-2xl overflow-hidden shadow-lg border border-[#D4AF37]/20 bg-[#FAFAFA]"
            >
              <div className="relative w-full h-64 md:h-80 bg-white p-6">
                <Image
                  src={combo.image}
                  alt={combo.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 text-center bg-[#FAFAFA]">
                <h3 className="font-serif text-2xl md:text-3xl text-[#0A321E] mb-3 font-bold">
                  {combo.name}
                </h3>
                <p className="text-sm text-[#0A321E]/70 mb-4 h-12">
                  {combo.description}
                </p>
                <button
                  onClick={() => window.open(generateWhatsAppLink(combo.name), "_blank")}
                  className="w-full py-3 bg-[#0A321E] text-[#D4AF37] text-sm tracking-widest uppercase font-medium hover:bg-[#D4AF37] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaWhatsapp size={16} /> Order Combo
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
