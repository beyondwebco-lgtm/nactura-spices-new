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
    <footer className="relative bg-[#050505] border-t border-[#C89B3C]/20 pt-16 pb-8 overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-center text-center md:text-left">
          {/* Logo Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="relative w-16 h-16 rounded-full border border-[#C89B3C]/40 overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Nactura Spices"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-2xl tracking-widest text-[#E8C777] uppercase font-bold">
                Nactura
              </h3>
              <p className="text-[10px] tracking-[0.22em] text-[#F5F5F5]/50 uppercase mt-1">
                Purity in Every Pinch
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center gap-8">
            <Link
              href="/#collections"
              className="text-xs tracking-widest uppercase text-[#F5F5F5]/60 hover:text-[#C89B3C] transition-colors duration-300"
            >
              Collections
            </Link>
            <Link
              href="/products"
              className="text-xs tracking-widest uppercase text-[#F5F5F5]/60 hover:text-[#C89B3C] transition-colors duration-300"
            >
              Catalog
            </Link>
            <Link
              href="/#testimonials"
              className="text-xs tracking-widest uppercase text-[#F5F5F5]/60 hover:text-[#C89B3C] transition-colors duration-300"
            >
              Testimonials
            </Link>
            <Link
              href="/#contact"
              className="text-xs tracking-widest uppercase text-[#F5F5F5]/60 hover:text-[#C89B3C] transition-colors duration-300"
            >
              Contact
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-[#C89B3C]/30 text-[#C89B3C] hover:bg-[#C89B3C] hover:text-[#050505] transition-all duration-300 rounded-full"
                aria-label={social.label}
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C89B3C]/30 to-transparent mb-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-[10px] text-[#F5F5F5]/40 tracking-wider">
            &copy; {currentYear} NACTURA Spices & Dry Fruits. All Rights Reserved. Sourced from Idukki, Packed with Love.
          </p>
        </div>
      </div>
    </footer>
  );
}
