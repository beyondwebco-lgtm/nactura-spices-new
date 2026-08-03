"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const phoneNumbers = ["8870107301", "7010432123"];
  const address1 = "No 38, Vetri Vinayagar Street, Near SS Hospital, Ganapathima Nagar, Coimbatore – 641006";
  const address2 = "142/E, Ajith Complex, Estate Poopara, Village office junction, Idukki, Poopara, 685619";

  const googleMapsLink1 = "https://maps.google.com/?q=" + encodeURIComponent(address1);
  const googleMapsLink2 = "https://maps.google.com/?q=" + encodeURIComponent(address2);
  const waLink = "https://wa.me/918870107301?text=" + encodeURIComponent("Hello NACTURA,\n\nI'm interested in ordering some spices/dry fruits. Please share details.");

  return (
    <section id="contact" ref={ref} className="relative py-32 overflow-hidden bg-[#FFFFFF]">
      {/* Background glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FAFAFA] rounded-full blur-[150px] opacity-40"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-bold block mb-4">
            Connect With Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F5F5F5]">
            Contact <span className="text-gradient-gold font-bold">NACTURA</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel p-8 md:p-12 border border-[#D4AF37]/30 hover-gold-glow transition-all duration-700 bg-[#FAFAFA] rounded-2xl shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-lg text-[#0A321E] mb-3 flex items-center gap-2 font-bold">
                  <FaMapMarkerAlt size={16} /> Locations
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-[#D4AF37] block mb-1">Coimbatore Office (Registered Office)</span>
                    <p className="text-sm text-[#0A321E]/80 leading-relaxed font-medium">
                      {address1}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#D4AF37] block mb-1">Idukki Office (Processing Unit)</span>
                    <p className="text-sm text-[#0A321E]/80 leading-relaxed font-medium">
                      {address2}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-serif text-lg text-[#0A321E] mb-3 flex items-center gap-2 font-bold">
                  <FaPhoneAlt size={14} /> Call Us
                </h3>
                <div className="space-y-1">
                  {phoneNumbers.map((num) => (
                    <a
                      key={num}
                      href={`tel:${num}`}
                      className="block text-sm text-[#0A321E]/80 hover:text-[#D4AF37] transition-colors duration-300 font-medium"
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
                className="w-full flex items-center justify-center gap-3 py-4 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 rounded-md hover:bg-[#D4AF37] hover:text-white"
              >
                <FaWhatsapp size={18} />
                Message on WhatsApp
              </button>

              <a
                href={`tel:${phoneNumbers[0]}`}
                className="w-full text-center py-4 border border-[#0A321E] text-[#0A321E] text-xs tracking-widest uppercase font-bold hover:bg-[#0A321E] hover:text-[#D4AF37] transition-all duration-500 rounded-md"
              >
                Call Now
              </a>

              <button
                onClick={() => window.open(googleMapsLink1, "_blank")}
                className="w-full py-4 border border-[#0A321E]/20 text-[#0A321E]/70 text-xs tracking-widest uppercase font-bold hover:border-[#0A321E] hover:text-[#0A321E] transition-all duration-500 rounded-md"
              >
                Directions (Coimbatore)
              </button>

              <button
                onClick={() => window.open(googleMapsLink2, "_blank")}
                className="w-full py-4 border border-[#0A321E]/20 text-[#0A321E]/70 text-xs tracking-widest uppercase font-bold hover:border-[#0A321E] hover:text-[#0A321E] transition-all duration-500 rounded-md"
              >
                Directions (Idukki)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
