"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductCategories from "@/components/ProductCategories";
import IndividualSpices from "@/components/IndividualSpices";
import FeaturedSection from "@/components/FeaturedSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FounderSection from "@/components/FounderSection";
import Testimonials from "@/components/Testimonials";
import MeeshoSection from "@/components/MeeshoSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Preloader from "@/components/Preloader";

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
      <Preloader onComplete={() => setIsLoading(false)} />
      {!isLoading && (
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
      )}
    </>
  );
}
