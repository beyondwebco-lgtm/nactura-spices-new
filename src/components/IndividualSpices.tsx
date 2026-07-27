"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const spices = [
  { name: "Cardamom", tamil: "ஏலக்காய்", aka: "Elaichi" },
  { name: "Black Pepper", tamil: "மிளகு", aka: "Pepper" },
  { name: "Cinnamon – Normal", tamil: "பட்டை", aka: "Pattai" },
  { name: "Cinnamon – Spring", tamil: "பட்டை", aka: "Spring Pattai" },
  { name: "Cinnamon – Ceylon", tamil: "பட்டை", aka: "Ceylon Pattai" },
  { name: "Clove", tamil: "கிராம்பு", aka: "Grambu" },
  { name: "Star Anise", tamil: "அன்னாசிப்பூ", aka: "Annasipoo" },
  { name: "Nutmeg Flower (Mace)", tamil: "ஜாதிப்பத்திரி", aka: "Jadhipathiri" },
  { name: "Poppy Seeds", tamil: "கசகசா", aka: "Kasakasa" },
  { name: "Bay Leaf", tamil: "பிரியாணி இலை", aka: "Biryani Ilai" },
  { name: "Dry Ginger", tamil: "சுக்கு", aka: "Sukku" },
  { name: "Kapok Bud", tamil: "மராட்டி மொக்கு", aka: "Marathi Moggu" },
  { name: "Nutmeg", tamil: "ஜாதிக்காய்", aka: "Jadhikkai" },
  { name: "Cumin Seed", tamil: "சீரகம்", aka: "Seeragam" },
  { name: "Fennel Seeds", tamil: "சோம்பு", aka: "Sombu" },
  { name: "Kalpasi", tamil: "கல்பாசி", aka: "Black Stone Flower" },
];

const spiceEmojis = ["🌿", "🫛", "🍂", "🌾", "✨", "🌸", "⭐", "🍁", "🌰", "🍃", "🫚", "🌺", "🥜", "🌱", "🌼", "🪨"];

function generateWhatsAppLink(spice: string) {
  const msg = encodeURIComponent(
    `Hello NACTURA,\n\nI'm interested in ordering\nProduct: ${spice}\nQuantity:\n\nPlease share the details.`
  );
  return `https://wa.me/918870107301?text=${msg}`;
}

export default function IndividualSpices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0F1C14]/20 to-[#050505]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#C89B3C] text-xs tracking-[0.4em] uppercase font-medium block mb-4">
            The Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            16 <span className="text-gradient-gold">Premium</span> Spices
          </h2>
          <p className="text-[#F5F5F5]/50 text-sm tracking-wider max-w-lg mx-auto">
            Each spice handpicked from the finest plantations of Idukki, Kerala
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {spices.map((spice, i) => (
            <motion.div
              key={spice.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              onClick={() => window.open(generateWhatsAppLink(spice.name), "_blank")}
              className="group cursor-pointer glass-panel p-5 md:p-6 text-center hover-gold-glow hover:border-[#C89B3C]/60 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="text-3xl md:text-4xl mb-3 group-hover:scale-125 transition-transform duration-500">
                {spiceEmojis[i]}
              </div>
              <h3 className="font-serif text-sm md:text-base text-[#F5F5F5] mb-1 group-hover:text-[#E8C777] transition-colors duration-300">
                {spice.name}
              </h3>
              <p className="text-[10px] text-[#C89B3C]/70 tracking-wider">
                {spice.aka}
              </p>
              <p className="text-[10px] text-[#F5F5F5]/40 mt-1">
                {spice.tamil}
              </p>
              {/* Hover order hint */}
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[8px] tracking-widest uppercase text-[#C89B3C] flex items-center justify-center gap-1">
                  <FaWhatsapp size={10} /> Order
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
