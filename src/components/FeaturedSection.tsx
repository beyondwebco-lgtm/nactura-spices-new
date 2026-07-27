"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

function generateWhatsAppLink(product: string) {
  const msg = encodeURIComponent(
    `Hello NACTURA,\n\nI'm interested in ordering\nProduct: ${product}\nQuantity:\n\nPlease share the details.`
  );
  return `https://wa.me/918870107301?text=${msg}`;
}

export default function FeaturedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      {/* Luxury background */}
      <div className="absolute inset-0 bg-[#FFFFFF]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-[250px]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-bold block mb-4">
            Signature Combos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            Two Exclusive <span className="text-gradient-gold font-bold">Combos</span>
          </h2>
          <p className="text-[#0A321E]/60 font-serif italic text-lg font-medium">
            One Premium Experience
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Spices Combo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="group relative glass-panel overflow-hidden hover-gold-glow transition-all duration-700 bg-[#FAFAFA] rounded-2xl shadow-lg border border-[#D4AF37]/20"
          >
            <div className="relative w-full h-80 overflow-hidden">
              <Image
                src="/images/spices_combo.png"
                alt="12 Premium Spices Combo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/10 to-transparent" />
              
              {/* Floating tag */}
              <div className="absolute top-5 left-5 px-4 py-2 bg-[#D4AF37] text-white text-[10px] tracking-widest uppercase font-bold rounded-md">
                Best Seller
              </div>
            </div>

            <div className="p-8 md:p-10">
              <h3 className="font-serif text-3xl text-[#0A321E] mb-2 font-bold">
                12 Premium Spices
              </h3>
              <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4 font-bold">
                Handpicked Collection
              </p>
              <p className="text-[#0A321E]/80 text-sm leading-relaxed mb-6 font-medium">
                12 powerful spices, 1 perfect combo. Cardamom, black pepper, cinnamon,
                clove, star anise, nutmeg flower, poppy seeds, bay leaf, dry ginger,
                kapok bud, nutmeg, and cumin — all in one premium box.
              </p>

              {/* Price Grid */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { weight: "25g", price: "₹699" },
                  { weight: "50g", price: "₹999" },
                  { weight: "100g", price: "₹1799" },
                ].map((p) => (
                  <div
                    key={p.weight}
                    className="text-center py-3 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-colors duration-300 rounded-md bg-white shadow-sm hover:shadow-md"
                  >
                    <div className="text-[#D4AF37] font-serif text-lg font-bold">
                      {p.price}
                    </div>
                    <div className="text-[#0A321E]/60 text-[10px] tracking-wider uppercase font-bold mt-1">
                      {p.weight} Combo
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  window.open(
                    generateWhatsAppLink("12 Premium Spices Combo"),
                    "_blank"
                  )
                }
                className="w-full flex items-center justify-center gap-3 py-4 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:bg-[#D4AF37] hover:text-white transition-all duration-500 rounded-md"
              >
                <FaWhatsapp size={18} />
                Order Spices Combo
              </button>
            </div>
          </motion.div>

          {/* Dry Fruits Combo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="group relative glass-panel overflow-hidden hover-gold-glow transition-all duration-700 bg-[#FAFAFA] rounded-2xl shadow-lg border border-[#D4AF37]/20"
          >
            <div className="relative w-full h-80 overflow-hidden">
              <Image
                src="/images/dryfruits_combo.png"
                alt="7 Premium Dry Fruits Combo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/10 to-transparent" />
              
              <div className="absolute top-5 left-5 px-4 py-2 bg-[#D4AF37] text-white text-[10px] tracking-widest uppercase font-bold rounded-md">
                Premium
              </div>
            </div>

            <div className="p-8 md:p-10">
              <h3 className="font-serif text-3xl text-[#0A321E] mb-2 font-bold">
                7 Premium Dry Fruits
              </h3>
              <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4 font-bold">
                Nutritious Selection
              </p>
              <p className="text-[#0A321E]/80 text-sm leading-relaxed mb-6 font-medium">
                7 nutritious dry fruits, 1 ultimate combo. Jumbo cashews, golden
                almonds, whole walnuts, medjool dates, green pistachios, raisins,
                and dried apricots — premium quality guaranteed.
              </p>

              {/* Price Grid */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { weight: "100g", price: "₹899" },
                  { weight: "250g", price: "₹1799" },
                  { weight: "500g", price: "₹3499" },
                ].map((p) => (
                  <div
                    key={p.weight}
                    className="text-center py-3 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-colors duration-300 rounded-md bg-white shadow-sm hover:shadow-md"
                  >
                    <div className="text-[#D4AF37] font-serif text-lg font-bold">
                      {p.price}
                    </div>
                    <div className="text-[#0A321E]/60 text-[10px] tracking-wider uppercase font-bold mt-1">
                      {p.weight} Combo
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  window.open(
                    generateWhatsAppLink("7 Premium Dry Fruits Combo"),
                    "_blank"
                  )
                }
                className="w-full flex items-center justify-center gap-3 py-4 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:bg-[#D4AF37] hover:text-white transition-all duration-500 rounded-md"
              >
                <FaWhatsapp size={18} />
                Order Dry Fruits Combo
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
