"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Hand, Award, ShieldCheck, Sparkles, Package, MapPin, Crown } from "lucide-react";

const features = [
  { icon: Leaf, title: "100% Natural", desc: "No chemicals, only nature's finest" },
  { icon: Hand, title: "Handpicked", desc: "Selected by experienced harvesters" },
  { icon: Crown, title: "Premium Quality", desc: "Only the finest grade products" },
  { icon: ShieldCheck, title: "No Preservatives", desc: "Pure, unadulterated goodness" },
  { icon: Sparkles, title: "Authentic Aroma", desc: "Rich, fragrant, and intense" },
  { icon: Package, title: "Fresh Packing", desc: "Sealed for maximum freshness" },
  { icon: MapPin, title: "Direct from Idukki", desc: "Farm to your doorstep" },
  { icon: Award, title: "Premium Packaging", desc: "Luxury gifting experience" },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0F1C14]/30 to-[#050505]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#C89B3C] text-xs tracking-[0.4em] uppercase font-medium block mb-4">
            The NACTURA Promise
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            Why Choose <span className="text-gradient-gold">NACTURA</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="group text-center p-6 glass-panel hover-gold-glow hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center border border-[#C89B3C]/30 group-hover:border-[#C89B3C] transition-colors duration-500 group-hover:bg-[#C89B3C]/10">
                <feature.icon
                  size={24}
                  className="text-[#C89B3C] group-hover:text-[#E8C777] transition-colors duration-500"
                />
              </div>
              <h4 className="font-serif text-sm md:text-base text-[#F5F5F5] mb-2 group-hover:text-[#E8C777] transition-colors duration-300">
                {feature.title}
              </h4>
              <p className="text-[#F5F5F5]/70 text-xs leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
