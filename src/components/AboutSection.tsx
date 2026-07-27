"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0F1C14]/40 to-[#050505]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 max-w-5xl">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <span className="text-[#C89B3C] text-xs tracking-[0.4em] uppercase font-medium">
            Our Story
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-center mb-6 leading-tight"
        >
          From the Hills of{" "}
          <span className="text-gradient-gold">Idukki</span>
          <br />
          to Your Kitchen
        </motion.h2>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent mx-auto mb-10"
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-[#F5F5F5]/70 text-center leading-relaxed max-w-3xl mx-auto mb-16 font-light"
        >
          We handpick every spice and dry fruit to deliver unmatched purity,
          aroma, and freshness. Sourced directly from the lush plantations of
          Kerala&apos;s Idukki hills, every product carries the essence of nature&apos;s
          finest offerings.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-24"
        >
          {[
            "No Preservatives",
            "No Artificial Colours",
            "100% Authentic",
            "Premium Quality",
          ].map((item) => (
            <div
              key={item}
              className="px-6 py-3 border border-[#C89B3C]/30 text-[#E8C777] text-sm tracking-widest uppercase glass-panel hover:border-[#C89B3C] transition-all duration-500"
            >
              {item}
            </div>
          ))}
        </motion.div>

        {/* Owner Founder Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
          className="relative overflow-hidden glass-panel border border-[#C89B3C]/20 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-4xl mx-auto hover-gold-glow"
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-[#C89B3C]/5 to-transparent pointer-events-none" />

          {/* Owner Image */}
          <div className="relative w-44 h-44 md:w-56 md:h-56 flex-shrink-0 border border-[#C89B3C]/30 overflow-hidden relative z-10 shadow-[0_0_25px_rgba(200,155,60,0.15)]">
            <Image
              src="/images/sharath_owner.jpg"
              alt="Sharath R - Owner & Founder"
              fill
              sizes="(max-width: 768px) 176px, 224px"
              className="object-cover object-top hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Bio text */}
          <div className="relative z-10 text-center md:text-left flex-grow">
            <span className="text-[#C89B3C] text-[10px] tracking-[0.3em] uppercase font-bold block mb-2">
              Founder & Owner
            </span>
            <h3 className="font-serif text-3xl text-[#F5F5F5] mb-4">
              Sharath R
            </h3>
            <p className="text-sm text-[#F5F5F5]/70 leading-relaxed font-light mb-6 italic">
              &ldquo;At NACTURA, our core philosophy is simple: honesty and purity in every single pinch. Sourcing directly from our home plantations allows us to ensure that the aroma, oils, and freshness remain absolutely unaltered from forest to table.&rdquo;
            </p>
            <div className="w-16 h-0.5 bg-[#C89B3C]/40 mx-auto md:mx-0" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
