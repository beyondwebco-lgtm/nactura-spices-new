"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  const waLink = "https://wa.me/918870107301?text=" + encodeURIComponent("Hello NACTURA,\n\nI'm interested in ordering some spices/dry fruits. Please share details.");

  return (
    <button
      onClick={() => window.open(waLink, "_blank")}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-[#C89B3C] to-[#E8C777] hover:from-[#E8C777] hover:to-[#C89B3C] text-[#050505] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(200,155,60,0.4)] hover:shadow-[0_0_30px_rgba(200,155,60,0.6)] hover:scale-110 transition-all duration-300 animate-pulse-gold"
      aria-label="Contact on WhatsApp"
    >
      <FaWhatsapp className="text-[24px] md:text-[28px]" />
    </button>
  );
}
