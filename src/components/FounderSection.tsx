"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FounderSection() {
  return (
    <section className="relative bg-[#FAFAFA] py-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
              <div className="absolute inset-0 border border-[#D4AF37]/40 translate-x-4 translate-y-4 rounded-t-[100px] z-0" />
              <div className="relative h-full w-full rounded-t-[100px] overflow-hidden border border-[#D4AF37]/60 z-10">
                <Image
                  src="/images/sharath_owner.jpg"
                  alt="Sharath R - Founder of Nactura"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
              <p className="text-[#D4AF37] tracking-[0.2em] uppercase text-xs font-bold">
                Meet the Founder
              </p>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl text-[#0A321E] mb-8 leading-tight font-bold">
              Crafting Purity from <br /> the Heart of Kerala
            </h2>
            
            <p className="text-[#0A321E]/80 leading-relaxed mb-6 font-medium">
              &quot;When I started Nactura, my vision was simple: to bring the uncompromised purity of nature directly to your kitchen. Growing up surrounded by the rich spice gardens of South India, I learned that true flavor cannot be manufactured—it must be nurtured.&quot;
            </p>
            
            <p className="text-[#0A321E]/80 leading-relaxed mb-10 font-medium">
              &quot;We partner directly with ethical farmers, carefully hand-picking every spice and nut to ensure it meets our uncompromising standard of luxury and health. Nactura is not just a brand; it is a promise of authenticity.&quot;
            </p>
            
            <div className="border-l-2 border-[#D4AF37] pl-6 py-2">
              <h3 className="text-xl text-[#0A321E] font-serif tracking-wider mb-1 font-bold">
                SHARATH R
              </h3>
              <p className="text-[#D4AF37] text-sm tracking-widest uppercase font-semibold">
                Owner & Founder
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
