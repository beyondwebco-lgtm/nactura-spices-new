"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    quote: "The aroma of Nactura spices is absolutely incredible. The Cardamom and Pepper feel so fresh, just like they were plucked yesterday. The premium packaging makes it a great gift too!",
    author: "Anjali Menon",
    location: "Kochi, Kerala",
  },
  {
    quote: "I ordered the Premium Dry Fruits combo. The walnuts and cashews are jumbo-sized and have a rich, clean taste. No bitter taste, just pure premium quality.",
    author: "Dr. Vikram Seth",
    location: "Coimbatore, Tamil Nadu",
  },
  {
    quote: "This is not your average grocery store spice. The Ceylon Cinnamon and Star Anise are of a completely different league. They elevate my baking and cooking to restaurant quality.",
    author: "Chef Rohan D'Souza",
    location: "Mumbai, Maharashtra",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden bg-[#050505]">
      {/* Ambient lighting */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#C89B3C]/5 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-[#C89B3C] text-xs tracking-[0.4em] uppercase font-medium block mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F5F5F5]">
            Loved by <span className="text-gradient-gold">Connoisseurs</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent mx-auto mt-6" />
        </div>

        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-8 md:p-12 text-center w-full relative"
            >
              <FaQuoteLeft className="text-[#C89B3C]/20 text-5xl md:text-6xl absolute top-6 left-6" />
              
              <p className="text-lg md:text-xl text-[#F5F5F5]/80 italic leading-relaxed mb-8 relative z-10">
                &quot;{testimonials[activeIndex].quote}&quot;
              </p>

              <div>
                <h4 className="font-serif text-base md:text-lg text-[#E8C777] font-bold">
                  {testimonials[activeIndex].author}
                </h4>
                <p className="text-xs text-[#F5F5F5]/70 tracking-widest uppercase mt-1">
                  {testimonials[activeIndex].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                startAutoPlay();
              }}
              aria-label={`Go to testimonial slide ${i + 1}`}
              className={`h-3 rounded-full transition-all duration-500 ${
                activeIndex === i ? "bg-[#C89B3C] w-8" : "bg-[#F5F5F5]/40 hover:bg-[#C89B3C]/50 w-3"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
