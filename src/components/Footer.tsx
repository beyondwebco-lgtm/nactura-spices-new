"use client";

import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaInstagram, href: "https://instagram.com/Nactura_spices", label: "Instagram" },
    { icon: FaFacebookF, href: "https://www.facebook.com/share/1C8Hs2tQwJ/", label: "Facebook" },
    { icon: FaWhatsapp, href: "https://wa.me/918870107301", label: "WhatsApp" },
  ];

  return (
    <footer className="relative bg-[#0A321E] border-t border-[#D4AF37]/20 pt-16 pb-8 overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-center text-center md:text-left">
          {/* Logo Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="relative w-16 h-16 rounded-full border border-[#D4AF37]/40 overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Nactura Spices"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-2xl tracking-widest text-[#D4AF37] uppercase font-bold">
                Nactura
              </h3>
              <p className="text-[10px] tracking-[0.22em] text-[#FAFAFA]/70 uppercase mt-1">
                Purity in Every Pinch
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-8">
            <Link
              href="/#collections"
              className="text-xs tracking-widest uppercase text-[#FAFAFA]/80 hover:text-[#D4AF37] transition-colors duration-300 py-3 sm:py-2 px-4"
            >
              Collections
            </Link>
            <Link
              href="/collections"
              className="text-xs tracking-widest uppercase text-[#FAFAFA]/80 hover:text-[#D4AF37] transition-colors duration-300 py-3 sm:py-2 px-4"
            >
              Catalog
            </Link>
            <Link
              href="/#testimonials"
              className="text-xs tracking-widest uppercase text-[#FAFAFA]/80 hover:text-[#D4AF37] transition-colors duration-300 py-3 sm:py-2 px-4"
            >
              Testimonials
            </Link>
            <Link
              href="/#contact"
              className="text-xs tracking-widest uppercase text-[#FAFAFA]/80 hover:text-[#D4AF37] transition-colors duration-300 py-3 sm:py-2 px-4"
            >
              Contact
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end gap-4 sm:gap-5 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A321E] transition-all duration-300 rounded-full"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mb-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-[10px] text-[#FAFAFA]/70 tracking-wider">
            &copy; {currentYear} NACTURA Spices & Dry Fruits. All Rights Reserved. Sourced from Idukki, Packed with Love.
          </p>
        </div>
      </div>
    </footer>
  );
}
