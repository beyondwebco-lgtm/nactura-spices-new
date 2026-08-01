"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const categories = [
  {
    title: "Premium Spice Combos",
    subtitle: "12 Handpicked Varieties",
    description: "A curated collection of 12 premium spices sourced directly from the hills of Idukki. Each spice is handpicked for maximum aroma and purity.",
    image: "/images/12 premium spices.jpeg",
    tag: "Best Seller",
  },
  {
    title: "Premium Dry Fruits",
    subtitle: "7 Exquisite Selections",
    description: "Jumbo cashews, golden almonds, whole walnuts, dates, pistachios, raisins, and apricots — each one selected for unmatched quality.",
    image: "/images/premium dry fruits.jpeg",
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

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    }
  }
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

export default function ProductCategories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="collections" ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-[#FFFFFF]" />
      
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[200px]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-24 max-w-3xl mx-auto"
        >
          <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-bold block mb-4">
            Our Collections
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-[#0A321E] leading-tight font-bold flex flex-wrap justify-center gap-x-3">
            {"Discover Our Collection".split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <p className="text-[#0A321E]/75 text-sm md:text-base leading-relaxed tracking-wider mb-8 max-w-xl mx-auto flex flex-wrap justify-center gap-x-2">
            {"Crafted with premium ingredients, roasted to perfection, and designed for every craving.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
              className="group relative glass-panel overflow-hidden hover-gold-glow transition-all duration-700 bg-[#FAFAFA] rounded-xl shadow-lg border border-[#D4AF37]/20"
            >
              {/* Tag */}
              <div className="absolute top-5 right-5 z-20 px-4 py-1.5 bg-[#D4AF37] text-white text-[10px] tracking-widest uppercase font-bold rounded-md">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-bold mb-2">
                  {cat.subtitle}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-[#0A321E] mb-4 font-bold">
                  {cat.title}
                </h3>
                <p className="text-[#0A321E]/80 text-sm leading-relaxed mb-6 font-medium">
                  {cat.description}
                </p>
                <button
                  onClick={() => window.open(generateWhatsAppLink(cat.title), "_blank")}
                  className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:bg-[#D4AF37] hover:text-white transition-all duration-500 rounded-md"
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
