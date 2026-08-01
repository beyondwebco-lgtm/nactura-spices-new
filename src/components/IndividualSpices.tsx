"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const spices = [
  { name: "Cardamom", tamil: "ஏலக்காய்", aka: "Elaichi", price: "₹299", image: "/images/cardamom.jpeg" },
  { name: "Black Pepper", tamil: "மிளகு", aka: "Pepper", price: "₹199", image: "/images/black_pepper_single.png" },
  { name: "Cinnamon", tamil: "பட்டை", aka: "Pattai", price: "₹149", image: "/images/cinnamon_single.png" },
  { name: "Clove", tamil: "கிராம்பு", aka: "Grambu", price: "₹349", image: "/images/cloves.jpeg" },
  { name: "Honey Mixed Dry Fruits", tamil: "தேன் உலர் பழங்கள்", aka: "Dry Fruits Honey", price: "₹499", image: "/images/kismis.jpeg" },
  { name: "Millet Laddus", tamil: "தினை லட்டு", aka: "Healthy Laddus", price: "₹199", image: "/images/millet_laddus.png" },
];

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
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden bg-[#FAFAFA]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#FAFAFA] to-[#FFFFFF]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-medium block mb-4">
            The Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-[#0A321E]">
            Our <span className="text-gradient-gold">Premium</span> Selection
          </h2>
          <p className="text-[#0A321E]/70 text-sm tracking-wider max-w-lg mx-auto">
            Each product handpicked from the finest plantations of Idukki, Kerala
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 max-w-5xl mx-auto">
          {spices.map((spice, i) => (
            <motion.div
              key={spice.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              onClick={() => window.open(generateWhatsAppLink(spice.name), "_blank")}
              className="group cursor-pointer glass-panel p-6 md:p-8 text-center hover-gold-glow hover:border-[#D4AF37]/60 transition-all duration-500 hover:-translate-y-1 bg-white rounded-xl shadow-sm"
            >
              <div className="relative w-full h-40 md:h-48 mb-6 overflow-hidden rounded-lg">
                <Image
                  src={spice.image}
                  alt={spice.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-lg md:text-xl text-[#0A321E] mb-2 group-hover:text-[#D4AF37] transition-colors duration-300 font-bold">
                {spice.name}
              </h3>
              <p className="text-xs text-[#0A321E]/60 tracking-wider">
                {spice.aka}
              </p>
              <p className="text-xs text-[#0A321E]/40 mt-1">
                {spice.tamil}
              </p>
              {/* Hover order hint */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs tracking-widest uppercase text-[#D4AF37] flex items-center justify-center gap-1 font-medium">
                  <FaWhatsapp size={14} /> Order Now
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
