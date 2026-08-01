"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaTimes, FaSearch, FaPhone, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });
const FloatingWhatsApp = dynamic(() => import("@/components/FloatingWhatsApp"), { ssr: false });

interface Product {
  id: string;
  name: string;
  category: "spices" | "dryfruits" | "honey" | "laddus";
  subtitle: string;
  description: string;
  uses: string;
  benefits: string;
  weights: string[];
  image: string;
  images: string[];
  aromaProfile?: string;
  storageRec?: string;
  badge?: string;
  ingredients?: string;
}

const products: Product[] = [
  // 12 Spices Combo (featured under spices/combos)
  {
    id: "spices-combo",
    name: "12 Premium Spices Combo",
    category: "spices",
    subtitle: "Complete Spice Gift Box",
    description: "An exquisite collection of 12 premium grade whole spices hand-selected from our Kerala estate plantations. Beautifully packed to lock in authentic aroma and freshness.",
    uses: "Perfect for gifting, authentic traditional Indian cooking, biryanis, and premium curries.",
    benefits: "Rich in antioxidants, aids digestion, boosts metabolism, and builds immunity.",
    weights: ["25g Combo", "50g Combo", "100g Combo"],
    image: "/images/12 premium spices.jpeg",
    images: ['/images/12 premium spices.jpeg', '/images/12 premium spices 2.jpeg', '/images/spices bowl.jpeg', '/images/spices bowl flatlay.jpeg', '/images/spices spoons.jpeg', '/images/roasted spices mix.jpeg', '/images/wooden bowl spices.jpeg'],
    aromaProfile: "Rich, complex, and intensely fragrant spice harmony",
    storageRec: "Store in a cool, dry place inside an airtight glass container",
    badge: "Best Seller",
  },
  // Spices (16 Spices)
  {
    id: "cardamom",
    name: "Cardamom (Elaichi)",
    category: "spices",
    subtitle: "Queen of Spices",
    description: "Bold green cardamom pods with intense sweet-spicy fragrance sourced directly from Idukki, Kerala.",
    uses: "Breads, cakes, tea, chai masalas, biryanis, Kheer, and desserts.",
    benefits: "Natural mouth freshener, improves digestion, lowers blood pressure.",
    weights: ["50g", "100g", "250g"],
    image: "/images/cardamom.jpeg",
    images: ['/images/cardamom.jpeg', '/images/green cardamom pods.jpeg', '/images/green cardamom harvest.jpeg', '/images/cardamom pod close-up.jpeg', '/images/cardamom plantation.jpeg'],
    aromaProfile: "Sweet, minty, citrusy, and extremely floral",
    storageRec: "Store in cool airtight jars away from sunlight",
    badge: "100% Organic",
  },
  {
    id: "black-pepper",
    name: "Black Pepper",
    category: "spices",
    subtitle: "King of Spices",
    description: "High-piperine organic black pepper berries offering a strong, punchy aroma and heat.",
    uses: "Soups, salads, meat preparations, daily seasoning, and herbal teas.",
    benefits: "Boosts nutrient absorption, supports gut health, pain-relieving properties.",
    weights: ["50g", "100g", "250g"],
    image: "/images/black_pepper_single.png",
    images: ['/images/black_pepper_single.png', '/images/black pepper berries.jpeg', '/images/black pepper seeds.jpeg'],
    aromaProfile: "Pungent, woody, and intensely hot",
    storageRec: "Keep in a dark, dry container to preserve oils",
    badge: "Top Grade",
  },
  {
    id: "cinnamon-normal",
    name: "Cinnamon (Normal)",
    category: "spices",
    subtitle: "Rich & Sweet Bark",
    description: "Selected flat bark segments of high-grade cinnamon, rich in essential oils.",
    uses: "Curry bases, garam masala blends, mulled beverages, and stews.",
    benefits: "Regulates blood sugar levels, anti-inflammatory, improves heart health.",
    weights: ["50g", "100g"],
    image: "/images/cinnamon_single.png",
    images: ['/images/cinnamon_single.png', '/images/cinnamon bark.jpeg'],
    aromaProfile: "Sweet, woody, and classic warm aroma",
    storageRec: "Airtight jar in a cool pantry cupboard",
    badge: "Premium Quality",
  },
  {
    id: "cinnamon-spring",
    name: "Cinnamon (Spring)",
    category: "spices",
    subtitle: "Decorative Quills",
    description: "Premium spring-rolled cinnamon quills offering standard warm aroma and presentation.",
    uses: "Bakery goods, luxury cocktails, dessert decoration, and hot chocolate.",
    benefits: "Aids digestion, full of antioxidants, supports dental hygiene.",
    weights: ["50g", "100g"],
    image: "/images/cinnamon_single.png",
    images: ['/images/cinnamon_single.png', '/images/cinnamon bark.jpeg'],
    aromaProfile: "Highly fragrant, sweet, and decorative",
    storageRec: "Store quills vertically in tall glass containers",
    badge: "Selected Grade",
  },
  {
    id: "cinnamon-ceylon",
    name: "Cinnamon (Ceylon)",
    category: "spices",
    subtitle: "True Soft Cinnamon",
    description: "Ultra-premium soft Ceylon cinnamon. Delicate flavor with extremely low coumarin levels.",
    uses: "High-end baking, medicinal tea infusions, delicate sauces, and daily health drinks.",
    benefits: "Safest cinnamon for daily long-term use, highly anti-diabetic, fights free radicals.",
    weights: ["50g", "100g"],
    image: "/images/cinnamon_single.png",
    images: ['/images/cinnamon_single.png', '/images/cinnamon bark.jpeg'],
    aromaProfile: "Delicate, sweet, and warm subtle notes",
    storageRec: "Store in a cool dry space away from direct light",
    badge: "Import Grade",
  },
  {
    id: "clove",
    name: "Clove",
    category: "spices",
    subtitle: "Intense Flower Buds",
    description: "Highly fragrant sun-dried clove buds rich in eugenol oil.",
    uses: "Biryani rice, masala chai, tooth powders, dental pastes, and pickle spices.",
    benefits: "Excellent for toothaches, high antioxidant content, protects liver.",
    weights: ["50g", "100g"],
    image: "/images/cloves.jpeg",
    images: ['/images/cloves.jpeg', '/images/cloves_spice.jpeg', '/images/whole cloves.jpeg'],
    aromaProfile: "Intensely pungent, warm, and highly medicinal",
    storageRec: "Store in airtight jar in cool dark place",
    badge: "High Eugenol",
  },
  {
    id: "star-anise",
    name: "Star Anise",
    category: "spices",
    subtitle: "Exotic Licorice Aroma",
    description: "Perfect star-shaped spice pods yielding a strong sweet aniseed flavor.",
    uses: "Chinese five-spice, biryanis, slow-cooked broths, and masala gravies.",
    benefits: "Fights flu, rich in shikimic acid, promotes respiratory health.",
    weights: ["50g", "100g"],
    image: "/images/spices_combo.png",
    images: ['/images/star anise.jpeg', '/images/spices bowl.jpeg'],
    aromaProfile: "Sweet, licorice-like, and highly aromatic",
    storageRec: "Store in small spice jars in cool location",
    badge: "Export Quality",
  },
  {
    id: "nutmeg-flower",
    name: "Nutmeg Flower (Mace)",
    category: "spices",
    subtitle: "Golden Laced Spice",
    description: "Delicate dried red-orange webbing of the nutmeg seed offering a warm, sweet, refined flavor.",
    uses: "Royal Mughlai dishes, white sauces, light soups, and fine spice blends.",
    benefits: "Relieves joint pain, treats insomnia, improves brain function.",
    weights: ["25g", "50g"],
    image: "/images/spices_combo.png",
    images: ['/images/spices_bowl_single.jpeg', '/images/spices bowl.jpeg'],
    aromaProfile: "Delicately sweet, warm, nutmeg-like but lighter",
    storageRec: "Airtight containers in dark areas",
    badge: "Rare Selection",
  },
  {
    id: "poppy-seeds",
    name: "Poppy Seeds",
    category: "spices",
    subtitle: "Rich Creamy Base",
    description: "Premium quality tiny cream seeds perfect for adding texture and nutty flavor.",
    uses: "Kurmas, gravies, baking toppings, and traditional desserts like Payasam.",
    benefits: "Induces sleep, rich in protein, promotes skin health.",
    weights: ["50g", "100g"],
    image: "/images/spices_combo.png",
    images: ['/images/poppy seeds.jpeg', '/images/sunflower seeds.jpeg', '/images/seeds assortment.jpeg'],
    aromaProfile: "Nutty, mild, and rich when crushed",
    storageRec: "Keep in a cool place or refrigerator to preserve freshness",
    badge: "Pure White",
  },
  {
    id: "bay-leaf",
    name: "Bay Leaf",
    category: "spices",
    subtitle: "Fragrant Herb",
    description: "Whole dried bay leaves sourced from the hills, preserving their green tint and oils.",
    uses: "Biryanis, rich gravies, slow-cooking marinades, and soups.",
    benefits: "Improves digestion, supports heart wellness, helps clear congestion.",
    weights: ["25g", "50g"],
    image: "/images/spices_combo.png",
    images: ['/images/spices_bowl_single.jpeg', '/images/spices bowl.jpeg'],
    aromaProfile: "Herbal, floral, slightly sweet, and woodsy",
    storageRec: "Store dry leaves flat to avoid cracking",
    badge: "Wild Grown",
  },
  {
    id: "dry-ginger",
    name: "Dry Ginger",
    category: "spices",
    subtitle: "Traditional Warmth",
    description: "Sun-dried whole ginger roots, perfect for traditional immunity teas.",
    uses: "Sukku Coffee, dry ginger tea, cookie spice mixes, and herbal medicines.",
    benefits: "Excellent cure for morning sickness and indigestion, anti-cold.",
    weights: ["50g", "100g"],
    image: "/images/spices_combo.png",
    images: ['/images/spices_bowl_single.jpeg', '/images/spices bowl.jpeg'],
    aromaProfile: "Warm, spicy, sweet, and highly invigorating",
    storageRec: "Keep in a dry container away from moisture",
    badge: "Immunity Booster",
  },
  {
    id: "kapok-bud",
    name: "Kapok Bud (Marathi Moggu)",
    category: "spices",
    subtitle: "Exotic Chettinad Spice",
    description: "Unopened flower buds of the Kapok tree, popular in South Indian specialty cuisines.",
    uses: "Bisi Bele Bath, Chettinad curries, and authentic masala powders.",
    benefits: "Anti-diarrheal, highly anti-inflammatory, helps relieve gas.",
    weights: ["50g", "100g"],
    image: "/images/spices_combo.png",
    images: ['/images/spices_bowl_single.jpeg', '/images/spices bowl.jpeg'],
    aromaProfile: "Earthy, mustard-like, warm, and highly complex",
    storageRec: "Store in a cool dark spice drawer",
    badge: "Estate Harvest",
  },
  {
    id: "nutmeg",
    name: "Nutmeg",
    category: "spices",
    subtitle: "Sweet Aromatic Nut",
    description: "Premium whole nutmeg seeds, freshly grated to bring out maximum warmth and woody sweetness.",
    uses: "Potato dishes, cheese sauces, eggnogs, and sweet spice rubs.",
    benefits: "Induces deep sleep, improves concentration, detoxifies kidneys.",
    weights: ["50g", "100g"],
    image: "/images/spices_combo.png",
    images: ['/images/spices_bowl_single.jpeg', '/images/spices bowl.jpeg'],
    aromaProfile: "Sweet, nutty, warm, and highly aromatic",
    storageRec: "Store whole seeds in small jars; grate only when needed",
    badge: "Premium Whole",
  },
  {
    id: "cumin-seeds",
    name: "Cumin Seeds",
    category: "spices",
    subtitle: "Earthy Warmth",
    description: "Selected tiny dried cumin seeds, rich in essential oils and flavor.",
    uses: "Tempering, dal preparations, cumin rice, and general spice blends.",
    benefits: "Very rich in iron, aids fat loss, improves digestion and digestion-enzyme activity.",
    weights: ["100g", "250g"],
    image: "/images/jeera.jpeg",
    images: ['/images/jeera.jpeg', '/images/fennel seeds.jpeg'],
    aromaProfile: "Earthy, warm, woody, and slightly bitter",
    storageRec: "Store in dry airtight glass containers",
    badge: "High Oil Content",
  },
  {
    id: "fennel-seeds",
    name: "Fennel Seeds",
    category: "spices",
    subtitle: "Licorice Sweet Spice",
    description: "Premium large green fennel seeds with high anise flavor notes.",
    uses: "After-meal digestives, fish curries, pickles, tea infusions, and sweet biscuits.",
    benefits: "Purifies blood, regulates water retention, controls bad breath.",
    weights: ["100g", "250g"],
    image: "/images/spices_combo.png",
    images: ['/images/fennel seeds.jpeg', '/images/jeera.jpeg'],
    aromaProfile: "Sweet, licorice-like, refreshing",
    storageRec: "Keep in a cool dry spice jar",
    badge: "Clean Quality",
  },
  {
    id: "kalpasi",
    name: "Kalpasi (Black Stone Flower)",
    category: "spices",
    subtitle: "Umami Forest Lichen",
    description: "Rare aromatic stone flower lichen providing a distinct earthy umami aroma to spice blends.",
    uses: "Biryani spices, Chettinad dishes, Maharashtrian Goda Masala.",
    benefits: "Promotes kidney health, heals minor skin wounds, anti-bacterial.",
    weights: ["25g", "50g"],
    image: "/images/spices_combo.png",
    images: ['/images/spices_bowl_single.jpeg', '/images/spices bowl.jpeg'],
    aromaProfile: "Earthy, musky, forest-like, and savory",
    storageRec: "Airtight containers away from high humidity",
    badge: "Lichen Grade A",
  },
  // Dry fruits
  {
    id: "cashew",
    name: "Cashew",
    category: "dryfruits",
    subtitle: "Buttery & Rich",
    description: "W180 grade premium jumbo cashews, roasted slightly or packed raw, offering a sweet buttery crunch.",
    uses: "Luxury snacking, festive sweet preparation, rich kaju katlis, and gravies.",
    benefits: "Good for brain health, source of copper and magnesium.",
    weights: ["250g", "500g", "1kg"],
    image: "/images/cashew.jpeg",
    images: ['/images/cashew.jpeg', '/images/7 premium dry fruits.jpeg', '/images/premium dry fruits.jpeg'],
    aromaProfile: "Creamy, buttery, and fresh",
    storageRec: "Store in air-tight container or keep refrigerated",
    badge: "Jumbo Grade",
  },
  {
    id: "almond",
    name: "Almond",
    category: "dryfruits",
    subtitle: "Crisp & Nutrient Dense",
    description: "California-grade premium raw almonds with excellent skin texture and nut size.",
    uses: "Daily pre-soaked snack, healthy milkshakes, dessert garnishing, healthy baking.",
    benefits: "High in Vitamin E, improves memory, good for skin and hair health.",
    weights: ["250g", "500g", "1kg"],
    image: "/images/almonds.jpeg",
    images: ['/images/almonds.jpeg', '/images/7 premium dry fruits.jpeg', '/images/premium dry fruits.jpeg'],
    aromaProfile: "Nutty, earthy, and crispy",
    storageRec: "Airtight jar in a cool place",
    badge: "Nutrient Rich",
  },
  {
    id: "walnut",
    name: "Walnut",
    category: "dryfruits",
    subtitle: "Brain Health Nutrition",
    description: "Shell-less light halves premium walnuts, completely fresh and non-bitter.",
    uses: "Breakfast oatmeal toppings, salads, walnut pies, and memory boosting snacks.",
    benefits: "Rich in Omega-3 fatty acids, supports cognitive function.",
    weights: ["200g", "500g"],
    image: "/images/walnut.jpeg",
    images: ['/images/walnut.jpeg', '/images/walnuts kernels.jpeg', '/images/7 premium dry fruits.jpeg'],
    aromaProfile: "Earthy, rich, and mildly tannic",
    storageRec: "Keep refrigerated for long-term storage to prevent rancidity",
    badge: "Halves Grade",
  },
  {
    id: "pistachio",
    name: "Pistachio",
    category: "dryfruits",
    subtitle: "Roasted & Salted",
    description: "Premium salted and roasted shell-on pistachios with rich green nut color.",
    uses: "Snacking, ice-creams, milkshakes, baklavas, and energy bars.",
    benefits: "Great for weight management, high lutein for eye health.",
    weights: ["250g", "500g"],
    image: "/images/pista.jpeg",
    images: ['/images/pista.jpeg', '/images/7 premium dry fruits.jpeg', '/images/premium dry fruits.jpeg'],
    aromaProfile: "Salty, nutty, roasted goodness",
    storageRec: "Keep in a moisture-free glass jar",
    badge: "Shell-on Premium",
  },
  {
    id: "dates",
    name: "Dates",
    category: "dryfruits",
    subtitle: "Natural Energy Bite",
    description: "Directly imported large soft black dates. Natural sweet bites with high pulp quality.",
    uses: "Daily sweet craving, sugar replacement in shakes, date rolls.",
    benefits: "Instant energy booster, highly rich in iron and fiber.",
    weights: ["500g", "1kg"],
    image: "/images/ALL Dry fruits.jpeg",
    images: ['/images/dates_single.jpeg', '/images/dates sweet bites.jpeg', '/images/7 premium dry fruits.jpeg'],
    aromaProfile: "Rich caramel sweetness",
    storageRec: "Store in a cool dry cupboard or refrigerator",
    badge: "Medjool Soft",
  },
  {
    id: "raisins",
    name: "Raisins",
    category: "dryfruits",
    subtitle: "Tangy & Sweet",
    description: "Clean green-golden seedless raisins with an intense sweet and slightly tangy bite.",
    uses: "Kheer, sweet rice dishes, cakes, and morning cereal mix.",
    benefits: "Supports digestion, cleanses system, high in calcium.",
    weights: ["250g", "500g"],
    image: "/images/kismis.jpeg",
    images: ['/images/kismis.jpeg', '/images/7 premium dry fruits.jpeg', '/images/premium dry fruits.jpeg'],
    aromaProfile: "Sweet and mildly tart",
    storageRec: "Airtight jars inside dark pantry",
    badge: "Seedless Choice",
  },
  {
    id: "apricot",
    name: "Apricot",
    category: "dryfruits",
    subtitle: "Plump & Zesty",
    description: "Sun-dried orange apricots, soft texture and rich tangy taste profile.",
    uses: "Middle eastern salads, premium fruit platters, direct snack.",
    benefits: "Excellent for eye health, full of iron and vitamin A.",
    weights: ["250g", "500g"],
    image: "/images/ALL Dry fruits.jpeg",
    images: ['/images/ALL Dry fruits.jpeg', '/images/7 premium dry fruits.jpeg', '/images/premium dry fruits.jpeg'],
    aromaProfile: "Tangy, sweet, and deeply fruity",
    storageRec: "Keep in an airtight jar to preserve soft texture",
    badge: "Plump Sun-Dried",
  },
  // Honey Mix
  {
    id: "honey-mix",
    name: "Honey Mix",
    category: "honey",
    subtitle: "Premium Honey Nectar",
    description: "Viscous raw forest honey sourced directly from wild honeycombs. Free from artificial syrup, added sugars, or chemical processing.",
    uses: "Natural sweetener, health tonic with warm water, pancake syrup, tea enhancer.",
    benefits: "Anti-bacterial, rich source of natural enzymes, boosts immunity, heals sore throats.",
    weights: ["250g", "500g"],
    image: "/images/honey.png",
    images: ['/images/honey.png', '/images/dates sweet bites.jpeg'],
    aromaProfile: "Warm, sweet, and floral woodsy notes",
    storageRec: "Keep at room temperature. Honey preserves naturally",
    badge: "Wild Raw",
  },
  {
    id: "honey-mixed-dryfruits",
    name: "Honey Mixed Dry Fruits",
    category: "honey",
    subtitle: "Nutrient Rich Powerhouse",
    description: "A premium blend of roasted almonds, cashews, pistachios, and walnuts, perfectly submerged in our wild forest honey. A daily dose of health and energy.",
    uses: "Direct healthy snacking, energy bites, luxury dessert toppings.",
    benefits: "High in antioxidants, healthy fats, vitamins, and minerals. Instant energy boost.",
    weights: ["250g", "500g", "1kg"],
    image: "/images/honey.png",
    images: ['/images/honey.png', '/images/dates sweet bites.jpeg'],
    aromaProfile: "Sweet, nutty, and rich caramelized honey",
    storageRec: "Keep at room temperature. Do not refrigerate.",
    badge: "New Arrival",
  },
  // Millet Laddus
  {
    id: "millet-laddus",
    name: "Millet Laddus",
    category: "laddus",
    subtitle: "Healthy Traditional Sweets",
    description: "Wholesome millet laddus crafted from 7 different millet grains, organic jaggery, and pure A2 cow ghee. Guilt-free premium sweets.",
    uses: "Healthy sweet snack, kids tiffin box, post-workout energy bite, festival celebrations.",
    benefits: "No refined sugar, gluten-friendly, high in dietary fiber, low glycemic index.",
    weights: ["250g Box", "500g Box"],
    image: "/images/millet_laddus.png",
    images: ['/images/millet_laddus.png', '/images/millet laddus box.jpeg'],
    aromaProfile: "Nutty, toasted grains with rich cardamon ghee aroma",
    storageRec: "Store in dry cool space; consume within 30 days",
    badge: "7 Grains",
    ingredients: "Kodo, Barnyard, Foxtail, Little, Ragi, Pearl Millets, Ghee, Organic Jaggery, Almonds, Cashews, Cardamom",
  },
];

function generateWhatsAppLink(productName: string) {
  const msg = encodeURIComponent(
    `Hello NACTURA,\nI would like to enquire about the following product:\nProduct:\n${productName}\nPlease share:\n• Price\n• Available Weight\n• Delivery Details\n• Stock Availability\nThank you.`
  );
  return `https://wa.me/918870107301?text=${msg}`;
}

function ProductGallery({ images, productName }: { images: string[]; productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStart = useRef<number | null>(null);

  const galleryImages = images && images.length > 0 ? images : ["/images/spices_combo.png"];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryImages]);

  // Touch Swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStart.current = null;
  };

  // Zoom Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Main image container */}
      <div 
        className="relative w-full aspect-[4/3] sm:aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-[#D4AF37]/20 bg-white group cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main image with Framer Motion slide-fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full h-full relative"
            style={{
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              transform: isZoomed ? "scale(1.8)" : "scale(1)",
              transition: isZoomed ? "transform 0.05s ease-out" : "transform 0.3s ease-out"
            }}
          >
            <Image
              src={galleryImages[activeIndex]}
              alt={`${productName} - Image ${activeIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-contain p-4"
            />
          </motion.div>
        </AnimatePresence>

        {/* Floating Arrows */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[#0A321E] hover:bg-white/40 hover:scale-105 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 opacity-100"
              aria-label="Previous image"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[#0A321E] hover:bg-white/40 hover:scale-105 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 opacity-100"
              aria-label="Next image"
            >
              <FaChevronRight size={16} />
            </button>
          </>
        )}

        {/* Pagination Indicator dots */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {galleryImages.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "w-4 bg-[#D4AF37]" : "w-1.5 bg-[#0A321E]/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails strip */}
      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-[#D4AF37]/30">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border bg-white flex-shrink-0 transition-all duration-300 ${
                idx === activeIndex 
                  ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/30" 
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  const categoriesList = [
    { id: "all", name: "All Collections" },
    { id: "spices", name: "Spices" },
    { id: "dryfruits", name: "Dry Fruits" },
    { id: "honey", name: "Honey Mix" },
    { id: "laddus", name: "Millet Laddus" },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <main className="min-h-screen bg-[#FAFAFA] text-[#0A321E] selection:bg-[#D4AF37]/30 selection:text-[#0A321E]">
        <Navbar />

          {/* Hero Section */}
          <section className="relative pt-44 pb-20 overflow-hidden bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA] to-[#FAFAFA]">
            <div className="absolute inset-0 z-0">
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[180px]"></div>
            </div>

            <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
              {/* Breadcrumb */}
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#0A321E]/60 mb-6 flex items-center justify-center gap-2 font-bold">
                <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
                <span>&rarr;</span>
                <span className="text-[#D4AF37] font-bold">Collections</span>
              </div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              >
                Our Premium <span className="text-gradient-gold font-bold">Collection</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base md:text-lg text-[#0A321E]/80 max-w-2xl mx-auto font-medium leading-relaxed mb-10"
              >
                Handpicked from Nature. Packed with Purity. Crafted for Every Kitchen.
              </motion.p>

              <button
                onClick={() => window.open(generateWhatsAppLink("Entire Premium Collection"), "_blank")}
                className="px-10 py-4 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:bg-[#D4AF37] hover:text-white transition-all duration-500 flex items-center justify-center gap-3 mx-auto rounded-md"
              >
                <FaWhatsapp size={16} />
                Enquire on WhatsApp
              </button>

              {/* Scroll Indicator */}
              <div className="mt-16 animate-bounce text-[#D4AF37] text-xs tracking-widest uppercase flex flex-col items-center gap-2 font-bold">
                <span>Scroll to Explore</span>
                <span>&darr;</span>
              </div>
            </div>
          </section>

          {/* Search & Filter Controls */}
          <section className="py-6 border-y border-[#D4AF37]/20 bg-[#FFFFFF]/80 backdrop-blur-sm sticky top-[72px] z-30">
            <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Filter pills */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 text-[10px] tracking-widest uppercase border transition-all duration-500 font-medium ${
                      selectedCategory === cat.id
                        ? "border-[#D4AF37] bg-[#D4AF37] text-white"
                        : "border-[#D4AF37]/20 hover:border-[#D4AF37]/50 text-[#0A321E]/70 hover:text-[#0A321E] bg-white"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                  className="w-full bg-white border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-md py-2.5 pl-10 pr-4 text-xs text-[#0A321E] placeholder-[#0A321E]/40 outline-none transition-all duration-300 shadow-sm"
                />
                <FaSearch className="absolute left-3.5 top-3.5 text-[#D4AF37] text-xs" />
              </div>
            </div>
          </section>

          {/* Catalog Grid */}
          <section className="py-16 pb-32">
            <div className="container mx-auto px-6 max-w-6xl">
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => setSelectedProduct(p)}
                      className="group cursor-pointer glass-panel overflow-hidden border border-[#D4AF37]/20 hover-gold-glow hover:-translate-y-2 transition-all duration-500 relative bg-white shadow-sm rounded-xl"
                    >
                      {/* Product Image */}
                      <div className="relative w-full h-64 bg-[#FAFAFA] overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA]/90 via-transparent to-transparent" />
                        
                        {/* Custom Badging */}
                        {p.badge && (
                          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#D4AF37] text-white text-[8px] tracking-widest uppercase font-bold rounded">
                            {p.badge}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase font-bold block mb-1">
                          {p.subtitle}
                        </span>
                        <h3 className="font-serif text-xl text-[#0A321E] group-hover:text-[#D4AF37] transition-colors duration-300 mb-3 font-bold">
                          {p.name}
                        </h3>
                        <p className="text-xs text-[#0A321E]/70 leading-relaxed line-clamp-2 mb-4 font-medium">
                          {p.description}
                        </p>
                        
                        <div className="flex items-center justify-between border-t border-[#D4AF37]/20 pt-4">
                          <span className="text-[10px] text-[#0A321E]/60 tracking-wider font-bold">
                            {p.weights.join(" / ")}
                          </span>
                          <span className="text-[10px] text-[#D4AF37] tracking-widest uppercase font-bold group-hover:underline">
                            Enquire Now
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          {/* Premium Call to Action Ending Section */}
          <section className="py-24 border-t border-[#D4AF37]/20 bg-[#FFFFFF]">
            <div className="container mx-auto px-6 text-center max-w-3xl">
              <h2 className="font-serif text-3xl md:text-5xl text-[#0A321E] mb-6">
                Looking for <span className="text-gradient-gold font-bold">Premium Natural Products?</span>
              </h2>
              <p className="text-sm md:text-base text-[#0A321E]/80 leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                &ldquo;Connect with us directly on WhatsApp and we&rsquo;ll help you choose the perfect products for your home or business.&rdquo;
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => window.open(generateWhatsAppLink("General Collections Inquiry"), "_blank")}
                  className="px-10 py-4 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:bg-[#D4AF37] hover:text-white transition-all duration-500 flex items-center justify-center gap-2 w-full sm:w-auto rounded-md"
                >
                  <FaWhatsapp size={16} />
                  Enquire on WhatsApp
                </button>
                <a
                  href="tel:8870107301"
                  className="px-10 py-4 border border-[#0A321E] text-[#0A321E] text-xs tracking-widest uppercase font-bold hover:bg-[#0A321E] hover:text-[#D4AF37] transition-all duration-500 flex items-center justify-center gap-2 w-full sm:w-auto rounded-md"
                >
                  <FaPhone size={12} />
                  Call Now
                </a>
              </div>
            </div>
          </section>

          {/* Product Detail Modal */}
          <AnimatePresence>
            {selectedProduct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/95 backdrop-blur-md overflow-y-auto"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 30 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 30 }}
                  transition={{ type: "spring", damping: 25, stiffness: 180 }}
                  className="relative w-full max-w-4xl bg-[#FAFAFA] border border-[#D4AF37]/30 p-6 md:p-10 max-h-[90vh] overflow-y-auto hover-gold-glow rounded-xl shadow-2xl"
                >
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-5 right-5 text-[#D4AF37] hover:text-[#0A321E] p-2 transition-colors duration-300 z-10"
                  >
                    <FaTimes size={24} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-6">
                    {/* Left image column */}
                    <div className="w-full">
                      <ProductGallery images={selectedProduct.images} productName={selectedProduct.name} />
                    </div>

                    {/* Right details column */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-bold">
                            {selectedProduct.subtitle}
                          </span>
                          {selectedProduct.badge && (
                            <span className="px-2 py-0.5 border border-[#D4AF37]/30 text-white text-[8px] tracking-wider uppercase bg-[#D4AF37] rounded">
                              {selectedProduct.badge}
                            </span>
                          )}
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-[#0A321E] mb-4 font-bold">
                          {selectedProduct.name}
                        </h2>
                        
                        <p className="text-sm text-[#0A321E]/80 leading-relaxed mb-6 font-medium">
                          {selectedProduct.description}
                        </p>

                        <div className="space-y-4 mb-8">
                          {selectedProduct.aromaProfile && (
                            <div>
                              <h4 className="text-xs tracking-wider uppercase text-[#D4AF37] font-bold mb-1">
                                Aroma & Flavor Profile
                              </h4>
                              <p className="text-xs text-[#0A321E]/70 leading-relaxed font-medium">
                                {selectedProduct.aromaProfile}
                              </p>
                            </div>
                          )}
                          {selectedProduct.ingredients && (
                            <div>
                              <h4 className="text-xs tracking-wider uppercase text-[#D4AF37] font-bold mb-1">
                                Ingredients
                              </h4>
                              <p className="text-xs text-[#0A321E]/70 leading-relaxed font-medium">
                                {selectedProduct.ingredients}
                              </p>
                            </div>
                          )}
                          <div>
                            <h4 className="text-xs tracking-wider uppercase text-[#D4AF37] font-bold mb-1">
                              Culinary Uses
                            </h4>
                            <p className="text-xs text-[#0A321E]/70 leading-relaxed font-medium">
                              {selectedProduct.uses}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xs tracking-wider uppercase text-[#D4AF37] font-bold mb-1">
                              Health Benefits
                            </h4>
                            <p className="text-xs text-[#0A321E]/70 leading-relaxed font-medium">
                              {selectedProduct.benefits}
                            </p>
                          </div>
                          {selectedProduct.storageRec && (
                            <div>
                              <h4 className="text-xs tracking-wider uppercase text-[#D4AF37] font-bold mb-1">
                                Storage Recommendation
                              </h4>
                              <p className="text-xs text-[#0A321E]/70 leading-relaxed font-medium">
                                {selectedProduct.storageRec}
                              </p>
                            </div>
                          )}
                          <div>
                            <h4 className="text-xs tracking-wider uppercase text-[#D4AF37] font-bold mb-1.5">
                              Available Sizes
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedProduct.weights.map((w) => (
                                <span
                                  key={w}
                                  className="px-3 py-1 text-[10px] tracking-wider uppercase border border-[#D4AF37]/30 text-[#D4AF37] bg-white rounded shadow-sm font-bold"
                                >
                                  {w}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          window.open(
                            generateWhatsAppLink(selectedProduct.name),
                            "_blank"
                          )
                        }
                        className="w-full flex items-center justify-center gap-3 py-4 bg-[#0A321E] text-[#D4AF37] text-xs tracking-widest uppercase font-bold hover:bg-[#D4AF37] hover:text-white transition-all duration-500 rounded-md mt-6"
                      >
                        <FaWhatsapp size={18} />
                        Enquire on WhatsApp
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <Footer />
        <FloatingWhatsApp />
      </main>
    </>
  );
}
