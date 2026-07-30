"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryItem {
  id: string;
  title: string;
  tagline: string;
  image: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "spices-combo",
    title: "12 Premium Spices Combo",
    tagline: "Hand-selected varieties for luxury kitchens.",
    image: "/images/All Spices.jpeg",
    category: "Signature Combo",
  },
  {
    id: "almond",
    title: "California Almonds",
    tagline: "Sun-dried, crisp, and nutrient-dense.",
    image: "/images/Badam.jpeg",
    category: "Premium Dry Fruit",
  },
  {
    id: "cashew",
    title: "W180 Jumbo Cashews",
    tagline: "Direct from plantations with buttery crunch.",
    image: "/images/Kaju.jpeg",
    category: "Premium Dry Fruit",
  },
  {
    id: "walnut",
    title: "Halves Walnuts",
    tagline: "Rich brain food selected for premium quality.",
    image: "/images/walnut.jpeg",
    category: "Premium Dry Fruit",
  },
  {
    id: "honey",
    title: "Wild Forest Honey",
    tagline: "Single-source forest nectar, pure and unfiltered.",
    image: "/images/honey.png",
    category: "Organic Nectar",
  },
  {
    id: "laddus",
    title: "Millet Laddus",
    tagline: "Zero refined sugar, wholesome health bites.",
    image: "/images/millet_laddus.png",
    category: "Healthy Bakes",
  },
  {
    id: "harvest",
    title: "Artisan Harvest Spices",
    tagline: "Fragrant cloves and cardamoms from Kerala.",
    image: "/images/WhatsApp Image 2026-07-30 at 10.49.16.jpeg",
    category: "Organic Harvest",
  },
  {
    id: "packaging",
    title: "Luxury Gift Pack",
    tagline: "Perfectly sealed to lock in freshness.",
    image: "/images/WhatsApp Image 2026-07-30 at 10.50.50.jpeg",
    category: "Exclusive Packaging",
  },
  {
    id: "lifestyle",
    title: "Curated for Taste",
    tagline: "Crafted by nature, perfect for gourmet dining.",
    image: "/images/WhatsApp Image 2026-07-30 at 10.53.42.jpeg",
    category: "Gourmet Lifestyle",
  },
  {
    id: "dryfruits-combo",
    title: "Luxury Dry Fruits Box",
    tagline: "An elegant combo pack of premium delicacies.",
    image: "/images/ALL Dry fruits.jpeg",
    category: "Signature Combo",
  },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<GalleryItem | null>(null);

  const slides = [
    "/images/hero_1.jpg",
    "/images/hero_2.jpg",
    "/images/hero_3.jpg",
    "/images/hero_4.jpg",
    "/images/hero_5.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Magnetic button hover properties using Framer Motion
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const springX = useSpring(btnX, { stiffness: 100, damping: 10 });
  const springY = useSpring(btnY, { stiffness: 100, damping: 10 });

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || !galleryRef.current || !pinRef.current) return;

    // 1. Horizontal Scroll Trigger Animation
    const scrollWidth = galleryRef.current.scrollWidth;
    const windowWidth = window.innerWidth;
    const amountToScroll = scrollWidth - windowWidth;

    const scrollTween = gsap.to(galleryRef.current, {
      x: -amountToScroll,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${amountToScroll * 1.5}`, // control speed of pinning
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          if (self.progress > 0.05) {
            setHasScrolled(true);
          } else {
            setHasScrolled(false);
          }
        },
      },
    });

    // 2. Individual Card Focal Animations (Blur/Scale/Rotate as they scroll center)
    const cards = gsap.utils.toArray(".gallery-card");
    cards.forEach((card: any) => {
      // Entrance Animation (from right to center)
      gsap.fromTo(
        card,
        { filter: "blur(6px) brightness(0.7)", scale: 0.88, rotation: -3, y: 15 },
        {
          filter: "blur(0px) brightness(1.05)",
          scale: 1.02,
          rotation: 1,
          y: 0,
          ease: "sine.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left right",
            end: "center center",
            scrub: true,
          },
        }
      );

      // Exit Animation (from center to left)
      gsap.to(card, {
        filter: "blur(6px) brightness(0.7)",
        scale: 0.88,
        rotation: -3,
        y: 15,
        ease: "sine.in",
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: "center center",
          end: "right left",
          scrub: true,
        },
      });
    });

    // 3. Hero Section Dissolve/Fade Out Transition at bottom
    gsap.fromTo(
      pinRef.current,
      { opacity: 1, scale: 1 },
      {
        opacity: 0,
        scale: 0.97,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: `bottom-=15% bottom`,
          end: "bottom bottom",
          scrub: true,
        },
      }
    );

    // 4. Custom luxury cursor follow logic
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && cursorDotRef.current) {
        gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power2.out" });
        gsap.to(cursorDotRef.current, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Magnetic button calculations
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btnX.set(x * 0.35);
    btnY.set(y * 0.35);
  };

  const handleBtnMouseLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  // Smooth scroll to catalog
  const scrollToCatalog = () => {
    const categoriesSection = document.getElementById("collections");
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative z-20 bg-[#FAFAFA]">
      {/* Pinned 100vh Hero Container */}
      <div ref={pinRef} className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between pt-6 pb-12">
        {/* Cinematic subtle light gradient backgrounds and landscape slideshow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {slides.map((slide, idx) => (
            <div
              key={slide}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                idx === currentSlide ? "opacity-25" : "opacity-0"
              }`}
            >
              <Image
                src={slide}
                alt="Plantation Background"
                fill
                sizes="100vw"
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          ))}
          {/* Subtle light vignette overlay to ensure text is fully readable */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,250,250,0.8)_0%,rgba(250,250,250,0.92)_100%)]" />
        </div>

        {/* Ambient Top logo header */}
        <header className="relative z-30 container mx-auto px-12 flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src="/images/logo.png"
                alt="Nactura Logo"
                fill
                sizes="48px"
                className="object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.25)]"
                priority
              />
            </div>
            <span className="font-serif text-xl tracking-[0.2em] font-bold text-[#0A321E]">NACTURA</span>
          </div>
          <button
            onClick={() => window.open("https://wa.me/918870107301", "_blank")}
            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-bold text-[#0A321E] hover:text-[#D4AF37] transition-colors duration-300"
          >
            <FaWhatsapp size={16} /> Contact
          </button>
        </header>

        {/* Horizontal scroll elements */}
        <div className="relative flex-grow flex items-center overflow-hidden">
          <div ref={galleryRef} className="horizontal-scroll-container px-[15vw] md:px-[25vw] gap-20 md:gap-40 items-center">
            
            {/* Slide 1: Welcome Intro */}
            <div className="w-[70vw] md:w-[45vw] flex-shrink-0 flex flex-col justify-center text-left">
              <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-semibold block mb-4">
                Premium Plantations
              </span>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 text-[#0A321E] leading-tight font-bold">
                Purity In <br />
                Every <span className="text-gradient-gold">Pinch</span>
              </h1>
              <p className="text-[#0A321E]/70 text-sm tracking-wider max-w-md leading-relaxed">
                Experience hand-selected spices and dry fruits sourced directly from the pristine hills of Idukki, Kerala. Crafted for standard luxury dining.
              </p>
              <div className="w-20 h-0.5 bg-[#D4AF37] mt-8" />
            </div>

            {/* Gallery Cards */}
            {galleryItems.map((item, idx) => (
              <div
                key={item.id}
                className="gallery-card relative w-[75vw] sm:w-[50vw] md:w-[32vw] lg:w-[26vw] flex-shrink-0"
              >
                <div
                  onMouseEnter={() => setHoveredProduct(item)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className="group relative cursor-none transition-all duration-700 bg-white rounded-2xl p-6 md:p-8 border border-transparent shadow-[0_15px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(212,175,55,0.18)] hover:scale-[1.05] hover:-translate-y-2 flex flex-col justify-between h-[50dvh] min-h-[350px] overflow-hidden"
                >
                  {/* Subtle Background Radial Reflection */}
                  <div className="absolute inset-0 bg-radial from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Card Header tag */}
                  <div className="flex justify-between items-center relative z-10">
                    <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                      {item.category}
                    </span>
                    <span className="text-xs font-serif text-[#0A321E]/30 font-medium">0{idx + 1}</span>
                  </div>

                  {/* Floating Product Image */}
                  <div className="relative w-full h-[22dvh] flex items-center justify-center my-4">
                    <div className="relative w-4/5 h-full transform group-hover:scale-110 group-hover:rotate-[3deg] transition-all duration-700 ease-out animate-float" style={{ animationDelay: `${idx * 0.4}s` }}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 60vw, 30vw"
                        className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)] filter group-hover:brightness-[1.05] transition-all duration-700"
                        priority={idx < 2}
                      />
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="relative z-10">
                    <h3 className="font-serif text-lg md:text-xl text-[#0A321E] font-bold group-hover:text-[#D4AF37] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#0A321E]/60 tracking-wider mt-2 line-clamp-2">
                      {item.tagline}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* End Gallery Slide */}
            <div className="w-[60vw] md:w-[35vw] flex-shrink-0 flex flex-col justify-center text-center items-center">
              <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-semibold block mb-4">
                Nactura Quality
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#0A321E] font-bold mb-6">
                Purely Curated
              </h2>
              <p className="text-[#0A321E]/60 text-xs tracking-wider max-w-xs mb-8">
                Every ingredient is cleaned, checked, and packed under premium standards.
              </p>
              <button
                onClick={scrollToCatalog}
                className="flex items-center gap-3 px-8 py-4 bg-[#0A321E] text-[#D4AF37] text-xs tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 rounded-full"
              >
                Catalog <FaArrowRight />
              </button>
            </div>

          </div>
        </div>

        {/* Scroll Indicator & floating elements */}
        <footer className="relative z-30 container mx-auto px-12 flex justify-between items-end">
          {/* Scroll to Explore Text */}
          <div className={`transition-opacity duration-500 flex flex-col gap-2 ${hasScrolled ? "opacity-0" : "opacity-100"}`}>
            <span className="text-xs uppercase tracking-[0.3em] text-[#0A321E]/60 font-semibold animate-pulse">
              ↓ Scroll to Explore
            </span>
          </div>

          <div className="text-[10px] uppercase tracking-[0.3em] text-[#0A321E]/40 font-semibold hidden md:block">
            Est. 2024 • Idukki, Kerala
          </div>
        </footer>
      </div>

      {/* Floating magnetic Shop Now CTA */}
      <div className="fixed bottom-10 right-10 z-50">
        <motion.button
          onClick={scrollToCatalog}
          onMouseMove={handleBtnMouseMove}
          onMouseLeave={handleBtnMouseLeave}
          style={{ x: springX, y: springY }}
          whileTap={{ scale: 0.9 }}
          className="relative group w-24 h-24 md:w-28 md:h-28 bg-[#0A321E] rounded-full flex items-center justify-center text-[#D4AF37] font-semibold text-xs md:text-sm tracking-widest uppercase shadow-[0_10px_35px_rgba(10,50,30,0.3)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.4)] transition-shadow duration-300"
        >
          {/* Magnetic Hover Expansion Ring */}
          <span className="absolute inset-0 bg-[#D4AF37]/10 rounded-full scale-100 group-hover:scale-110 transition-transform duration-500" />
          <span className="relative z-10 text-center flex flex-col items-center gap-1 font-bold">
            Shop <br /> Now
          </span>
        </motion.button>
      </div>

      {/* Desktop Custom luxury cursor element */}
      <div className="hidden lg:block">
        <div ref={cursorRef} className="luxury-cursor absolute top-0 left-0" />
        <div ref={cursorDotRef} className="luxury-cursor-dot absolute top-0 left-0" />
      </div>
    </div>
  );
}
