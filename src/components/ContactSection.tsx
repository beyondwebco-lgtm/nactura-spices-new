"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const phoneNumbers = ["8870107301", "7010432123"];
  const address = "No 38, Vetri Vinayagar Street, Near SS Hospital, Ganapathima Nagar, Coimbatore – 641006";

  const googleMapsLink = "https://maps.google.com/?q=" + encodeURIComponent(address);
  const waLink = "https://wa.me/918870107301?text=" + encodeURIComponent("Hello NACTURA,\n\nI'm interested in ordering some spices/dry fruits. Please share details.");

  return (
    <section id="contact" ref={ref} className="relative py-32 overflow-hidden bg-[#050505]">
      {/* Background glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0F1C14] rounded-full blur-[150px] opacity-40"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#C89B3C] text-xs tracking-[0.4em] uppercase font-medium block mb-4">
            Connect With Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F5F5F5]">
            Contact <span className="text-gradient-gold">NACTURA</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent mx-auto mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel p-8 md:p-12 border border-[#C89B3C]/30 hover-gold-glow transition-all duration-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h4 className="font-serif text-lg text-[#E8C777] mb-3 flex items-center gap-2">
                  <FaMapMarkerAlt size={16} /> Location
                </h4>
                <p className="text-sm text-[#F5F5F5]/70 leading-relaxed font-light">
                  {address}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg text-[#E8C777] mb-3 flex items-center gap-2">
                  <FaPhoneAlt size={14} /> Call Us
                </h4>
                <div className="space-y-1">
                  {phoneNumbers.map((num) => (
                    <a
                      key={num}
                      href={`tel:${num}`}
                      className="block text-sm text-[#F5F5F5]/70 hover:text-[#C89B3C] transition-colors duration-300"
                    >
                      +91 {num}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col justify-center gap-4">
              <button
                onClick={() => window.open(waLink, "_blank")}
                className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#C89B3C] to-[#E8C777] text-[#050505] text-xs tracking-widest uppercase font-bold hover:shadow-[0_0_30px_rgba(200,155,60,0.4)] transition-all duration-500"
              >
                <FaWhatsapp size={18} />
                Message on WhatsApp
              </button>

              <a
                href={`tel:${phoneNumbers[0]}`}
                className="w-full text-center py-4 border border-[#C89B3C] text-[#C89B3C] text-xs tracking-widest uppercase font-bold hover:bg-[#C89B3C] hover:text-[#050505] transition-all duration-500"
              >
                Call Now
              </a>

              <button
                onClick={() => window.open(googleMapsLink, "_blank")}
                className="w-full py-4 border border-[#F5F5F5]/20 text-[#F5F5F5]/70 text-xs tracking-widest uppercase font-bold hover:border-[#F5F5F5] hover:text-[#F5F5F5] transition-all duration-500"
              >
                Google Maps Directions
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
