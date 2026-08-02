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
          }, 600);
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
          {/* Subtle background golden glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12)_0%,rgba(250,250,250,1)_70%)] pointer-events-none" />

          {/* Centered Ring + Centered Logo Container */}
          <div className="relative flex items-center justify-center">
            {/* Refined Gold Progress Ring */}
            <svg className="w-52 h-52 sm:w-60 sm:h-60 md:w-68 md:h-68 -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="44%"
                stroke="rgba(212, 175, 55, 0.15)"
                strokeWidth="2"
                fill="transparent"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="44%"
                stroke="#D4AF37"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray="280"
                strokeDashoffset={280 - (280 * progress) / 100}
                className="transition-all duration-75 ease-out"
                style={{
                  filter: "drop-shadow(0px 0px 10px rgba(212, 175, 55, 0.5))"
                }}
              />
            </svg>

            {/* Official Centered Brand Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ 
                scale: progress === 100 ? 1.05 : 1,
                opacity: 1 
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 m-auto w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center"
            >
              <Image
                src="/images/logo.png"
                alt="NACTURA"
                fill
                sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
                className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                priority
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

          {/* Completion Flash Effect */}
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
