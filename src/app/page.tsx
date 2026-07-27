"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Preloader from "@/components/Preloader";

const AboutSection = dynamic(() => import("@/components/AboutSection"), { ssr: true });
const ProductCategories = dynamic(() => import("@/components/ProductCategories"), { ssr: true });
const IndividualSpices = dynamic(() => import("@/components/IndividualSpices"), { ssr: true });
const FeaturedSection = dynamic(() => import("@/components/FeaturedSection"), { ssr: true });
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), { ssr: true });
const FounderSection = dynamic(() => import("@/components/FounderSection"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const MeeshoSection = dynamic(() => import("@/components/MeeshoSection"), { ssr: true });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });
const FloatingWhatsApp = dynamic(() => import("@/components/FloatingWhatsApp"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <main className="min-h-screen bg-brand-bg text-brand-white selection:bg-brand-gold/30 selection:text-brand-gold-light">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProductCategories />
        <FeaturedSection />
        <IndividualSpices />
        <WhyChooseUs />
        <FounderSection />
        <Testimonials />
        <MeeshoSection />
        <ContactSection />
        <Footer />
        <FloatingWhatsApp />
      </main>
    </>
  );
}
