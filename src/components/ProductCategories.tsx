"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const categories = [
  {
    title: "Premium Spice Combos",
    subtitle: "12 Handpicked Varieties",
    description: "A curated collection of 12 premium spices sourced directly from the hills of Idukki. Each spice is handpicked for maximum aroma and purity.",
    image: "/images/spices_combo.png",
    tag: "Best Seller",
  },
  {
    title: "Premium Dry Fruits",
    subtitle: "7 Exquisite Selections",
    description: "Jumbo cashews, golden almonds, whole walnuts, dates, pistachios, raisins, and apricots — each one selected for unmatched quality.",
    image: "/images/dryfruits_combo.png",
    tag: "Premium",
  },
  {
    title: "Wild Forest Honey",
    subtitle: "Pure & Unfiltered",
    description: "Raw organic wild forest honey, single-source and unprocessed. Experience the golden nectar of nature in its purest form.",
    image: "/images/honey.png",
    tag: "Organic",
  },
  {
    title: "Millet Laddus",
    subtitle: "7 Healthy Varieties",
    description: "Artisan organic millet laddus — a perfect blend of health and taste. No refined sugar, no preservatives, only wholesome goodness.",
    image: "/images/millet_laddus.png",
    tag: "Healthy",
  },
];

function generateWhatsAppLink(product: string) {
  const msg = encodeURIComponent(
    `Hello NACTURA,\n\nI'm interested in ordering\nProduct: ${product}\nQuantity:\n\nPlease share the details.`
  );
  return `https://wa.me/918870107301?text=${msg}`;
}

export default function ProductCategories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="collections" ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C89B3C]/5 rounded-full blur-[200px]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#C89B3C] text-xs tracking-[0.4em] uppercase font-medium block mb-4">
            Our Collections
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            Curated <span className="text-gradient-gold">Premium</span> Collections
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
              className="group relative glass-panel overflow-hidden hover-gold-glow transition-all duration-700"
            >
              {/* Tag */}
              <div className="absolute top-5 right-5 z-20 px-4 py-1.5 bg-[#C89B3C] text-[#050505] text-[10px] tracking-widest uppercase font-bold">
                {cat.tag}
              </div>

              {/* Image */}
              <div className="relative w-full h-72 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <p className="text-[#C89B3C] text-xs tracking-[0.3em] uppercase font-medium mb-2">
                  {cat.subtitle}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-[#F5F5F5] mb-4">
                  {cat.title}
                </h3>
                <p className="text-[#F5F5F5]/60 text-sm leading-relaxed mb-6">
                  {cat.description}
                </p>
                <button
                  onClick={() => window.open(generateWhatsAppLink(cat.title), "_blank")}
                  className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#C89B3C] to-[#E8C777] text-[#050505] text-xs tracking-widest uppercase font-bold hover:shadow-[0_0_30px_rgba(200,155,60,0.4)] transition-all duration-500"
                >
                  <FaWhatsapp size={16} />
                  Order on WhatsApp
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
