"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const duration = 1200; // 1.2 seconds max loading time
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const nextProgress = Math.min(Math.round((stepCount / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => {
            onComplete();
          }, 600); // Wait for fade-out and flash animations to finish
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAFAFA] overflow-hidden"
        >
          {/* Subtle background golden glow & particles */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,rgba(250,250,250,1)_70%)] pointer-events-none" />
          
          {/* Floating sparks (Next Image optimized) */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-screen pointer-events-none blur-[4px]">
            <Image
              src="/images/spices_combo.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="relative flex flex-col items-center justify-center">
            {/* Circular Gold Loading Ring */}
            <svg className="w-56 h-56 md:w-64 md:h-64 -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="46%"
                stroke="rgba(212, 175, 55, 0.1)"
                strokeWidth="1.5"
                fill="transparent"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="46%"
                stroke="#D4AF37"
                strokeWidth="1.5"
                fill="transparent"
                strokeDasharray="290"
                strokeDashoffset={290 - (290 * progress) / 100}
                className="transition-all duration-75 ease-out"
                style={{
                  filter: "drop-shadow(0px 0px 8px rgba(212, 175, 55, 0.5))"
                }}
              />
            </svg>

            {/* Logo in center */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0.5 }}
              animate={{ 
                scale: progress === 100 ? 1.05 : 0.95,
                opacity: 1 
              }}
              transition={{ duration: 0.5 }}
              className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden"
            >
              <img
                src="/images/logo.png"
                alt="Nactura Preloader"
                className="object-cover w-full h-full"
                loading="eager"
              />
            </motion.div>
          </div>

          {/* Progress Percentage Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex flex-col items-center gap-1"
          >
            <span className="font-serif text-3xl font-light tracking-[0.2em] text-[#0A321E]">
              {progress}%
            </span>
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#0A321E]/60 font-bold">
              Purity in Every Pinch
            </span>
          </motion.div>

          {/* Flash Effect on Completion */}
          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-[#D4AF37]/20 pointer-events-none mix-blend-multiply"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
