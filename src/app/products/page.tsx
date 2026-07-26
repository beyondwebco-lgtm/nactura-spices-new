"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaArrowLeft, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Preloader from "@/components/Preloader";

// Products Data Structure
interface Product {
  id: string;
  name: string;
  category: "combos" | "spices" | "dryfruits" | "honey" | "laddus";
  subtitle: string;
  description: string;
  uses: string;
  benefits: string;
  weights: string[];
  image: string;
}

const products: Product[] = [
  // Combos
  {
    id: "spices-combo",
    name: "12 Premium Spices Combo",
    category: "combos",
    subtitle: "Complete Spice Gift Box",
    description: "An exquisite collection of 12 premium grade whole spices hand-selected from our Kerala estate plantations. Beautifully packed to lock in authentic aroma and freshness.",
    uses: "Perfect for gifting, authentic traditional Indian cooking, biryanis, and premium curries.",
    benefits: "Rich in antioxidants, aids digestion, boosts metabolism, and builds immunity.",
    weights: ["25g Combo", "50g Combo", "100g Combo"],
    image: "/images/spices_combo.png",
  },
  {
    id: "dryfruits-combo",
    name: "7 Premium Dry Fruits Combo",
    category: "combos",
    subtitle: "Nutrient Rich Power Box",
    description: "A combination of jumbo cashews, golden almonds, whole walnuts, delicious dates, green pistachios, sweet raisins, and premium apricots. Pure premium quality.",
    uses: "Daily healthy snacking, premium festive gifts, energy booster shakes, and desserts.",
    benefits: "High in healthy fats, proteins, essential vitamins, and minerals. Promotes heart health.",
    weights: ["100g Combo", "250g Combo", "500g Combo", "1kg Combo"],
    image: "/images/dryfruits_combo.png",
  },
  // Honey
  {
    id: "wild-honey",
    name: "Wild Forest Honey",
    category: "honey",
    subtitle: "Pure, Raw & Unfiltered",
    description: "Viscous raw forest honey sourced directly from wild honeycombs. Free from artificial syrup, added sugars, or chemical processing.",
    uses: "Natural sweetener, health tonic with warm water, pancake syrup, tea enhancer.",
    benefits: "Anti-bacterial, rich source of natural enzymes, boosts immunity, heals sore throats.",
    weights: ["250g", "500g"],
    image: "/images/honey.png",
  },
  // Laddus
  {
    id: "millet-laddus",
    name: "Organic Millet Laddus (7 Varieties)",
    category: "laddus",
    subtitle: "Healthy Traditional Sweets",
    description: "Wholesome millet laddus crafted from 7 different millet grains, organic jaggery, and pure A2 cow ghee. Guilt-free premium sweets.",
    uses: "Healthy sweet snack, kids tiffin box, post-workout energy bite, festival celebrations.",
    benefits: "No refined sugar, gluten-friendly, high in dietary fiber, low glycemic index.",
    weights: ["250g Box", "500g Box"],
    image: "/images/millet_laddus.png",
  },
  // Spices (16 Spices)
  {
    id: "cardamom",
    name: "Premium Cardamom (Elaichi)",
    category: "spices",
    subtitle: "Queen of Spices",
    description: "Bold green cardamom pods with intense sweet-spicy fragrance sourced directly from Idukki, Kerala.",
    uses: "Breads, cakes, tea, chai masalas, biryanis, Kheer, and desserts.",
    benefits: "Natural mouth freshener, improves digestion, lowers blood pressure.",
    weights: ["50g", "100g", "250g"],
    image: "/images/spices_combo.png",
  },
  {
    id: "black-pepper",
    name: "Premium Black Pepper",
    category: "spices",
    subtitle: "King of Spices",
    description: "High-piperine organic black pepper berries offering a strong, punchy aroma and heat.",
    uses: "Soups, salads, meat preparations, daily seasoning, and herbal teas.",
    benefits: "Boosts nutrient absorption, supports gut health, pain-relieving properties.",
    weights: ["50g", "100g", "250g"],
    image: "/images/spices_combo.png",
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
    image: "/images/spices_combo.png",
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
    image: "/images/spices_combo.png",
  },
  {
    id: "cinnamon-ceylon",
    name: "Ceylon Cinnamon",
    category: "spices",
    subtitle: "True Soft Cinnamon",
    description: "Ultra-premium soft Ceylon cinnamon. Delicate flavor with extremely low coumarin levels.",
    uses: "High-end baking, medicinal tea infusions, delicate sauces, and daily health drinks.",
    benefits: "Safest cinnamon for daily long-term use, highly anti-diabetic, fights free radicals.",
    weights: ["50g", "100g"],
    image: "/images/spices_combo.png",
  },
  {
    id: "clove",
    name: "Premium Cloves",
    category: "spices",
    subtitle: "Intense Flower Buds",
    description: "Highly fragrant sun-dried clove buds rich in eugenol oil.",
    uses: "Biryani rice, masala chai, tooth powders, dental pastes, and pickle spices.",
    benefits: "Excellent for toothaches, high antioxidant content, protects liver.",
    weights: ["50g", "100g"],
    image: "/images/spices_combo.png",
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
  },
  {
    id: "nutmeg-flower",
    name: "Nutmeg Flower (Mace/Jathipathiri)",
    category: "spices",
    subtitle: "Golden Laced Spice",
    description: "Delicate dried red-orange webbing of the nutmeg seed offering a warm, sweet, refined flavor.",
    uses: "Royal Mughlai dishes, white sauces, light soups, and fine spice blends.",
    benefits: "Relieves joint pain, treats insomnia, improves brain function.",
    weights: ["25g", "50g"],
    image: "/images/spices_combo.png",
  },
  {
    id: "poppy-seeds",
    name: "Poppy Seeds (Kasakasa)",
    category: "spices",
    subtitle: "Rich Creamy Base",
    description: "Premium quality tiny cream seeds perfect for adding texture and nutty flavor.",
    uses: "Kurmas, gravies, baking toppings, and traditional desserts like Payasam.",
    benefits: "Induces sleep, rich in protein, promotes skin health.",
    weights: ["50g", "100g"],
    image: "/images/spices_combo.png",
  },
  {
    id: "bay-leaf",
    name: "Bay Leaf (Biryani Ilai)",
    category: "spices",
    subtitle: "Fragrant Herb",
    description: "Whole dried bay leaves sourced from the hills, preserving their green tint and oils.",
    uses: "Biryanis, rich gravies, slow-cooking marinades, and soups.",
    benefits: "Improves digestion, supports heart wellness, helps clear congestion.",
    weights: ["25g", "50g"],
    image: "/images/spices_combo.png",
  },
  {
    id: "dry-ginger",
    name: "Dry Ginger (Sukku)",
    category: "spices",
    subtitle: "Traditional Warmth",
    description: "Sun-dried whole ginger roots, perfect for traditional immunity teas.",
    uses: "Sukku Coffee, dry ginger tea, cookie spice mixes, and herbal medicines.",
    benefits: "Excellent cure for morning sickness and indigestion, anti-cold.",
    weights: ["50g", "100g"],
    image: "/images/spices_combo.png",
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
  },
  {
    id: "nutmeg",
    name: "Nutmeg (Jadhikkai)",
    category: "spices",
    subtitle: "Sweet Aromatic Nut",
    description: "Premium whole nutmeg seeds, freshly grated to bring out maximum warmth and woody sweetness.",
    uses: "Potato dishes, cheese sauces, eggnogs, and sweet spice rubs.",
    benefits: "Induces deep sleep, improves concentration, detoxifies kidneys.",
    weights: ["50g", "100g"],
    image: "/images/spices_combo.png",
  },
  {
    id: "cumin-seed",
    name: "Cumin Seed (Seeragam)",
    category: "spices",
    subtitle: "Earthy Warmth",
    description: "Selected tiny dried cumin seeds, rich in essential oils and flavor.",
    uses: "Tempering, dal preparations, cumin rice, and general spice blends.",
    benefits: "Very rich in iron, aids fat loss, improves digestion and digestion-enzyme activity.",
    weights: ["100g", "250g"],
    image: "/images/spices_combo.png",
  },
  {
    id: "fennel-seeds",
    name: "Fennel Seeds (Sombu)",
    category: "spices",
    subtitle: "Licorice Sweet Spice",
    description: "Premium large green fennel seeds with high anise flavor notes.",
    uses: "After-meal digestives, fish curries, pickles, tea infusions, and sweet biscuits.",
    benefits: "Purifies blood, regulates water retention, controls bad breath.",
    weights: ["100g", "250g"],
    image: "/images/spices_combo.png",
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
  },
  // Dry fruits
  {
    id: "cashew",
    name: "Jumbo Cashew Nuts",
    category: "dryfruits",
    subtitle: "Buttery & Rich",
    description: "W180 grade premium jumbo cashews, roasted slightly or packed raw, offering a sweet buttery crunch.",
    uses: "Luxury snacking, festive sweet preparation, rich kaju katlis, and gravies.",
    benefits: "Good for brain health, source of copper and magnesium.",
    weights: ["250g", "500g", "1kg"],
    image: "/images/dryfruits_combo.png",
  },
  {
    id: "almond",
    name: "Premium Golden Almonds",
    category: "dryfruits",
    subtitle: "Crisp & Nutrient Dense",
    description: "California-grade premium raw almonds with excellent skin texture and nut size.",
    uses: "Daily pre-soaked snack, healthy milkshakes, dessert garnishing, healthy baking.",
    benefits: "High in Vitamin E, improves memory, good for skin and hair health.",
    weights: ["250g", "500g", "1kg"],
    image: "/images/dryfruits_combo.png",
  },
  {
    id: "walnuts",
    name: "Premium Whole Walnuts",
    category: "dryfruits",
    subtitle: "Brain Health Nutrition",
    description: "Shell-less light halves premium walnuts, completely fresh and non-bitter.",
    uses: "Breakfast oatmeal toppings, salads, walnut pies, and memory boosting snacks.",
    benefits: "Rich in Omega-3 fatty acids, supports cognitive function.",
    weights: ["200g", "500g"],
    image: "/images/dryfruits_combo.png",
  },
  {
    id: "pistachios",
    name: "Green Pistachios (Pista)",
    category: "dryfruits",
    subtitle: "Roasted & Salted",
    description: "Premium salted and roasted shell-on pistachios with rich green nut color.",
    uses: "Snacking, ice-creams, milkshakes, baklavas, and energy bars.",
    benefits: "Great for weight management, high lutein for eye health.",
    weights: ["250g", "500g"],
    image: "/images/dryfruits_combo.png",
  },
  {
    id: "dates",
    name: "Premium Soft Dates",
    category: "dryfruits",
    subtitle: "Natural Energy Bite",
    description: "Directly imported large soft black dates. Natural sweet bites with high pulp quality.",
    uses: "Daily sweet craving, sugar replacement in shakes, date rolls.",
    benefits: "Instant energy booster, highly rich in iron and fiber.",
    weights: ["500g", "1kg"],
    image: "/images/dryfruits_combo.png",
  },
  {
    id: "raisins",
    name: "Golden Raisins",
    category: "dryfruits",
    subtitle: "Tangy & Sweet",
    description: "Clean green-golden seedless raisins with an intense sweet and slightly tangy bite.",
    uses: "Kheer, sweet rice dishes, cakes, and morning cereal mix.",
    benefits: "Supports digestion, cleanses system, high in calcium.",
    weights: ["250g", "500g"],
    image: "/images/dryfruits_combo.png",
  },
  {
    id: "apricots",
    name: "Premium Dried Apricots",
    category: "dryfruits",
    subtitle: "Plump & Zesty",
    description: "Sun-dried orange apricots, soft texture and rich tangy taste profile.",
    uses: "Middle eastern salads, premium fruit platters, direct snack.",
    benefits: "Excellent for eye health, full of iron and vitamin A.",
    weights: ["250g", "500g"],
    image: "/images/dryfruits_combo.png",
  },
];

function generateWhatsAppLink(productName: string) {
  const msg = encodeURIComponent(
    `Hello NACTURA,\nI would like to enquire about this product.\nProduct:\n${productName}\nPlease share:\n• Price\n• Available Weight\n• Delivery Details\nThank you.`
  );
  return `https://wa.me/918870107301?text=${msg}`;
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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
    { id: "combos", name: "Exclusive Combos" },
    { id: "spices", name: "Premium Spices" },
    { id: "dryfruits", name: "Dry Fruits" },
    { id: "honey", name: "Wild Honey" },
    { id: "laddus", name: "Millet Laddus" },
  ];

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <main className="min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-[#C89B3C]/30 selection:text-[#E8C777]">
          <Navbar />

          {/* Hero Section */}
          <section className="relative pt-44 pb-20 overflow-hidden bg-gradient-to-b from-[#0F1C14]/40 via-[#050505] to-[#050505]">
            <div className="absolute inset-0 z-0">
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#C89B3C]/5 rounded-full blur-[180px]"></div>
            </div>

            <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs tracking-widest text-[#C89B3C] hover:text-[#E8C777] uppercase font-bold mb-8 transition-colors duration-300"
              >
                <FaArrowLeft size={10} /> Back to Home
              </Link>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              >
                Premium <span className="text-gradient-gold">Collections</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base md:text-lg text-[#F5F5F5]/60 max-w-2xl mx-auto font-light leading-relaxed mb-10"
              >
                Handpicked with Purity. Crafted for Every Kitchen. Explore our luxury spices, dry fruit blends, wild forest honey, and artisan millet laddus.
              </motion.p>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-5 py-2.5 text-xs tracking-widest uppercase border transition-all duration-500 font-medium ${
                      selectedCategory === cat.id
                        ? "border-[#C89B3C] bg-[#C89B3C] text-[#050505]"
                        : "border-[#C89B3C]/20 hover:border-[#C89B3C]/50 text-[#F5F5F5]/70"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Catalog Grid */}
          <section className="py-12 pb-32">
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
                      className="group cursor-pointer glass-panel overflow-hidden border border-[#C89B3C]/10 hover-gold-glow hover:-translate-y-2 transition-all duration-500"
                    >
                      {/* Product Image */}
                      <div className="relative w-full h-64 bg-[#0F1C14]/10 overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <span className="text-[#C89B3C] text-[10px] tracking-widest uppercase font-bold block mb-1">
                          {p.subtitle}
                        </span>
                        <h3 className="font-serif text-xl text-[#F5F5F5] group-hover:text-[#E8C777] transition-colors duration-300 mb-3">
                          {p.name}
                        </h3>
                        <p className="text-xs text-[#F5F5F5]/50 leading-relaxed line-clamp-2">
                          {p.description}
                        </p>
                        
                        <div className="mt-5 flex items-center justify-between border-t border-[#C89B3C]/15 pt-4">
                          <span className="text-[10px] text-[#F5F5F5]/40 tracking-wider">
                            Available in: {p.weights.join(", ")}
                          </span>
                          <span className="text-[10px] text-[#C89B3C] tracking-widest uppercase font-bold group-hover:underline">
                            View Details
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          {/* Product Detail Modal */}
          <AnimatePresence>
            {selectedProduct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/95 backdrop-blur-md overflow-y-auto"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 30 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 30 }}
                  transition={{ type: "spring", damping: 25, stiffness: 180 }}
                  className="relative w-full max-w-4xl bg-[#050505] border border-[#C89B3C]/30 p-6 md:p-10 max-h-[90vh] overflow-y-auto hover-gold-glow"
                >
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-5 right-5 text-[#C89B3C] hover:text-[#E8C777] p-2 transition-colors duration-300 z-10"
                  >
                    <FaTimes size={24} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-6">
                    {/* Left image column */}
                    <div className="relative w-full h-80 md:h-[400px] overflow-hidden border border-[#C89B3C]/20">
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Right details column */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <span className="text-[#C89B3C] text-xs tracking-[0.25em] uppercase font-bold block mb-2">
                          {selectedProduct.subtitle}
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F5] mb-4">
                          {selectedProduct.name}
                        </h2>
                        
                        <p className="text-sm text-[#F5F5F5]/70 leading-relaxed mb-6 font-light">
                          {selectedProduct.description}
                        </p>

                        <div className="space-y-4 mb-8">
                          <div>
                            <h4 className="text-xs tracking-wider uppercase text-[#E8C777] font-bold mb-1">
                              Best Uses
                            </h4>
                            <p className="text-xs text-[#F5F5F5]/60 leading-relaxed">
                              {selectedProduct.uses}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xs tracking-wider uppercase text-[#E8C777] font-bold mb-1">
                              Health Benefits
                            </h4>
                            <p className="text-xs text-[#F5F5F5]/60 leading-relaxed">
                              {selectedProduct.benefits}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xs tracking-wider uppercase text-[#E8C777] font-bold mb-1.5">
                              Available Sizes
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedProduct.weights.map((w) => (
                                <span
                                  key={w}
                                  className="px-3 py-1 text-[10px] tracking-wider uppercase border border-[#C89B3C]/30 text-[#E8C777] bg-[#0F1C14]/30"
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
                        className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#C89B3C] to-[#E8C777] text-[#050505] text-xs tracking-widest uppercase font-bold hover:shadow-[0_0_30px_rgba(200,155,60,0.4)] transition-all duration-500"
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
      )}
    </>
  );
}
