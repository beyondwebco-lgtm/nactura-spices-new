"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/#about" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-white/90 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-sm"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="relative z-50 flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-full border border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors duration-500">
              <Image
                src="/images/logo.png"
                alt="Nactura Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-widest text-[#0A321E] uppercase font-bold">
                Nactura
              </span>
              <span className="text-[10px] tracking-[0.2em] text-[#0A321E]/70 uppercase">
                Spices & Dryfruits
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wider text-[#0A321E]/80 hover:text-[#D4AF37] transition-colors duration-300 uppercase"
              >
                {link.name}
              </Link>
            ))}
            <a href="https://instagram.com/Nactura_spices" target="_blank" rel="noopener noreferrer" className="text-[#0A321E]/80 hover:text-[#D4AF37] transition-colors duration-300">
              <FaInstagram size={20} />
            </a>
            <button
              onClick={() => window.open("https://wa.me/918870107301", "_blank")}
              className="px-6 py-2.5 border border-[#D4AF37] text-[#D4AF37] text-sm tracking-wider uppercase font-medium hover:bg-[#D4AF37] hover:text-[#FFFFFF] transition-all duration-300 hover-gold-glow"
            >
              Order Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 text-[#C89B3C] p-3 -mr-3"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-32 px-6 flex flex-col items-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif text-[#0A321E] hover:text-[#D4AF37] transition-colors duration-300 py-4 w-full text-center"
              >
                {link.name}
              </Link>
            ))}
            <a href="https://instagram.com/Nactura_spices" target="_blank" rel="noopener noreferrer" className="text-[#0A321E] hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2">
              <FaInstagram size={24} /> <span className="font-serif tracking-wider uppercase">Instagram</span>
            </a>
            <button
              onClick={() => window.open("https://wa.me/918870107301", "_blank")}
              className="mt-4 w-full max-w-xs py-4 bg-[#D4AF37] text-white text-lg font-medium tracking-wider uppercase transition-all duration-300"
            >
              Order Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
