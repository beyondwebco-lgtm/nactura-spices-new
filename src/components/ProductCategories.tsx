"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";

const categories = [
  {
    id: "spices",
    title: "Estate Spices",
    subtitle: "15 Handpicked Varieties",
    description: "Pure green cardamom, black pepper, cinnamon varieties, cloves, star anise, nutmeg, and regional aromatics sourced directly from estate harvesters.",
    image: "/images/catalog/elachi cardamom.jpg",
    tag: "Estate Fresh",
  },
  {
    id: "dryfruits",
    title: "Dry & Dried Fruits",
    subtitle: "16 Exquisite Selections",
    description: "Almonds, cashews, figs, dates, pistachios, raisins, dried berries, kiwi, dried gooseberry, mango slices, and dehydrated pineapple rings.",
    image: "/images/catalog/badam.jpg",
    tag: "Nutritious",
  },
  {
    id: "seeds",
    title: "Seeds & Pantry",
    subtitle: "7 Wholesome Varieties",
    description: "Chia seeds, flax seeds, pumpkin seeds, sunflower seeds, sabja, cucumber, and watermelon seeds for daily wholesome crunch.",
    image: "/images/catalog/chia seeds.jpg",
    tag: "Superfood",
  },
  {
    id: "honey-tea",
    title: "Nactura Honey & Tea",
    subtitle: "Nectar & Leaf",
    description: "Unfiltered forest honey and aromatic plantation tea leaves, crafted to bring pure natural warmth and aroma to your cup.",
    image: "/images/catalog/nactura honey.jpg",
    tag: "Signature",
  },
  {
    id: "combos",
    title: "Curated Combos",
    subtitle: "10 Selection Boxes",
    description: "Thoughtfully assembled spice boxes, dry fruit gift packs, berry mixes, and 1kg seed blends tailored for every home.",
    image: "/images/catalog/Premium Spices 100 Gram Combo.jpg",
    tag: "Best Value",
  },
];

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
    <section id="collections" ref={ref} className="relative py-32 md:py-44 overflow-hidden bg-white">
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
            Our Categories
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-[#0A321E] leading-tight font-bold flex flex-wrap justify-center gap-x-3">
            {"Explore Our Collections".split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <p className="text-[#0A321E]/75 text-sm md:text-base leading-relaxed tracking-wider mb-8 max-w-xl mx-auto flex flex-wrap justify-center gap-x-2 font-medium">
            {"Handpicked spices, crisp dry fruits, wholesome seeds, wild honey, and curated combos.".split(" ").map((word, i) => (
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              className="group relative glass-panel overflow-hidden hover-gold-glow transition-all duration-700 bg-[#FAFAFA] rounded-xl shadow-lg border border-[#D4AF37]/20 flex flex-col justify-between"
            >
              {/* Tag */}
              <div className="absolute top-5 right-5 z-20 px-4 py-1.5 bg-[#D4AF37] text-white text-[10px] tracking-widest uppercase font-bold rounded-md">
                {cat.tag}
              </div>

              {/* Image */}
              <div className="relative w-full h-64 overflow-hidden bg-white">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                <div>
                  <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-bold mb-2">
                    {cat.subtitle}
                  </p>
                  <h3 className="font-serif text-2xl text-[#0A321E] mb-3 font-bold">
                    {cat.title}
                  </h3>
                  <p className="text-[#0A321E]/80 text-xs leading-relaxed mb-6 font-medium">
                    {cat.description}
                  </p>
                </div>
                <Link
                  href={`/collections?category=${cat.id}`}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:bg-[#D4AF37] hover:text-white transition-all duration-500 rounded-md"
                >
                  Explore Category &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
