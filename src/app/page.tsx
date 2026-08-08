"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface CarItem {
  id: string;
  name: string;
  brandTitle: string;
  subtitle: string;
  image: string;
  enginePrimary: string;
  engineSecondary: string;
  power: string;
  description: string;
  years: string;
}

const CARS: CarItem[] = [
  {
    id: "g63",
    name: "Mercedes-Benz G 63 AMG",
    brandTitle: "Mercedes-Benz",
    subtitle: "G 63 AMG",
    image: "/mercedes.webp",
    enginePrimary: "6.2 - Liter",
    engineSecondary: "Naturally aspirated V8",
    power: "622 Horsepower",
    description: "Unleash performance without compromise where luxury meets adrenaline.",
    years: "2024–present",
  },
  {
    id: "aventador",
    name: "Lamborghini Aventador LP 700-4",
    brandTitle: "Lamborghini",
    subtitle: "Aventador LP 700-4",
    image: "/aventador.webp",
    enginePrimary: "6.5 - Liter",
    engineSecondary: "Naturally aspirated V12",
    power: "700 Horsepower",
    description: "Mid-engine V12 flagship super sports car, icon of Italian aerodynamic speed.",
    years: "2011–2016",
  },
  {
    id: "bmw",
    name: "BMW XM",
    brandTitle: "BMW XM",
    subtitle: "Plug-in Hybrid V8",
    image: "/bmw.webp",
    enginePrimary: "4.4 - Liter",
    engineSecondary: "Biturbo V8 + Electric Motor",
    power: "644 Horsepower",
    description: "High-performance plug-in hybrid SUV featuring BMW's illuminated kidney grille.",
    years: "2023–present",
  },
  {
    id: "fortuner",
    name: "Toyota Fortuner",
    brandTitle: "Toyota Fortuner",
    subtitle: "Hilux Platform SUV",
    image: "/fortuner.webp",
    enginePrimary: "2.8 - Liter",
    engineSecondary: "Turbo Diesel Inline-4",
    power: "201 Horsepower",
    description: "Mid-size body-on-frame SUV built on the rugged Hilux platform.",
    years: "2015–2020",
  },
  {
    id: "ev9",
    name: "Kia EV9",
    brandTitle: "Kia EV9",
    subtitle: "Digital Tiger Flagship",
    image: "/kia.webp",
    enginePrimary: "Dual Motor",
    engineSecondary: "All-Electric AWD",
    power: "379 Horsepower",
    description: "All-electric, three-row flagship SUV featuring Kia's 'Digital Tiger Face' design.",
    years: "2024–present",
  },
];

interface InventoryItem {
  id: string;
  brand: string;
  name: string;
  year: string;
  price: string;
  image: string;
  logoImg: string;
}

const CAR_INVENTORY: InventoryItem[] = [
  {
    id: "mistral",
    brand: "Bugatti",
    name: "W16 Mistral",
    year: "2025",
    price: "$5,000,000",
    image: "/card_mistral.avif",
    logoImg: "/logo_bugatti.webp",
  },
  {
    id: "jesko",
    brand: "Koenigsegg",
    name: "Jesko Attack",
    year: "2023",
    price: "$3,400,000",
    image: "/card_jesko.avif",
    logoImg: "/logo_koenigsegg.webp",
  },
  {
    id: "battista",
    brand: "Pininfarina",
    name: "Battista Furiosa Package",
    year: "2022",
    price: "$2,200,000",
    image: "/card_battista.avif",
    logoImg: "/logo_pininfarina.webp",
  },
  {
    id: "pur_sang",
    brand: "Bugatti",
    name: "Type 35 Pur Sang",
    year: "1924",
    price: "$1,850,000",
    image: "/card_pur_sang.avif",
    logoImg: "/logo_bugatti.webp",
  },
  {
    id: "911",
    brand: "Porsche",
    name: "911 S/T",
    year: "2024",
    price: "$291,650",
    image: "/card_911.avif",
    logoImg: "/logo_porsche.webp",
  },
  {
    id: "amg_one",
    brand: "Mercedes-AMG",
    name: "AMG ONE",
    year: "2023",
    price: "$2,720,000",
    image: "/card_amg_one.avif",
    logoImg: "/logo_mercedes.webp",
  },
  {
    id: "carrera",
    brand: "Porsche",
    name: "Carrera GT",
    year: "2006",
    price: "$1,600,000",
    image: "/card_carrera.avif",
    logoImg: "/logo_porsche.webp",
  },
];

interface QuickActionItem {
  id: string;
  title: string;
  image: string;
}

const QUICK_ACTIONS: QuickActionItem[] = [
  {
    id: "available-cars",
    title: "Available Cars",
    image: "/bento_available_cars.webp",
  },
  {
    id: "sold-cars",
    title: "Sold Cars",
    image: "/bento_sold_cars.webp",
  },
  {
    id: "compare-cars",
    title: "Compare Cars",
    image: "/bento_compare_cars.webp",
  },
  {
    id: "car-specs",
    title: "Car Specs",
    image: "/bento_sold_hilux.webp",
  },
  {
    id: "sell-my-car",
    title: "Sell My Car",
    image: "/bento_sell_your_car.avif",
  },
];

interface NewsItem {
  id: string;
  category: string;
  date: string;
  title: string;
  summary: string;
  image: string;
  readTime: string;
}

const RECENT_NEWS: NewsItem[] = [
  {
    id: "news-1",
    category: "Hypercar Release",
    date: "AUG 2026",
    title: "Inside the W16 Mistral Aerodynamics Test in Nardò",
    summary: "How Bugatti pushed 1,600 horsepower to the open-top record limit.",
    image: "/card_mistral.avif",
    readTime: "4 min read",
  },
  {
    id: "news-2",
    category: "Track Review",
    date: "JUL 2026",
    title: "Koenigsegg Jesko Attack Breaks Circuit Lap Record",
    summary: "Unprecedented downforce and 1,280 bhp twin-turbo V8 engineered for apex precision.",
    image: "/card_jesko.avif",
    readTime: "5 min read",
  },
  {
    id: "news-3",
    category: "Collector Market",
    date: "JUL 2026",
    title: "Classic V10 Icons Surge in Auction Valuations",
    summary: "Analysing the historic rise of analog supercars and iconic manual transmission era models.",
    image: "/card_carrera.avif",
    readTime: "3 min read",
  },
  {
    id: "news-4",
    category: "Innovation",
    date: "JUN 2026",
    title: "Pininfarina Battista Furiosa Edition Unveiled",
    summary: "Electric hyper GT performance meets custom carbon-weave artistry.",
    image: "/card_battista.avif",
    readTime: "6 min read",
  },
  {
    id: "news-5",
    category: "Heritage",
    date: "JUN 2026",
    title: "Restoring the 1924 Type 35 Pur Sang Legacy",
    summary: "A deep dive into handcrafted vintage racing chassis restoration techniques.",
    image: "/card_pur_sang.avif",
    readTime: "4 min read",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Cars");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [carIndex, setCarIndex] = useState(0);
  const [switchKey, setSwitchKey] = useState(0);
  const [isCarHovered, setIsCarHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const newsCarouselRef = useRef<HTMLDivElement>(null);
  const [truckProgress, setTruckProgress] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [isNewsHovered, setIsNewsHovered] = useState(false);
  const [activeReason, setActiveReason] = useState<number | null>(null);

  const activeCar = CARS[carIndex];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll-driven drive-in & reverse physics for the red truck (Early triggers & fluid motion)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const startThreshold = vh * 1.25;
      const endThreshold = vh * 0.45;
      const rawProgress = (startThreshold - rect.top) / (startThreshold - endThreshold);
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      setTruckProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy useEffect: sync activeTab with real-time viewport section position
  useEffect(() => {
    const sectionMap = [
      { id: "cars", name: "CARS" },
      { id: "about", name: "ABOUT" },
      { id: "shop", name: "SHOP" },
      { id: "media", name: "MEDIA" },
      { id: "news", name: "NEWS" },
      { id: "contact", name: "CONTACT" },
    ];

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const match = sectionMap.find((s) => s.id === entry.target.id);
          if (match) {
            setActiveTab(match.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-25% 0px -40% 0px",
      threshold: 0.1,
    });

    sectionMap.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (isCarHovered) return;
    const timer = setInterval(() => {
      setCarIndex((prev) => (prev + 1) % CARS.length);
      setSwitchKey((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [isCarHovered]);

  const handleSelectCar = (idx: number) => {
    setIsCarHovered(false);
    setCarIndex(idx);
    setSwitchKey((prev) => prev + 1);
  };

  const navItems: Array<{ label: string; id: string; sup?: string }> = [
    { label: "Cars",    id: "cars" },
    { label: "Shop",    id: "shop" },
    { label: "Media",   id: "media" },
    { label: "News",    id: "news" },
    { label: "About",   id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="relative w-screen min-h-screen bg-[#b8733e] overflow-x-hidden flex flex-col">
      <section id="cars" className="relative w-full h-[100dvh] min-h-[600px] max-md:min-h-0 overflow-hidden flex flex-col justify-between">
        <div className="absolute inset-0 z-[1] w-full h-full bg-[#162e42]">
          {/* Background image filling backdrop naturally without hard offsets */}
          <div className="relative w-full h-full">
            <Image
              src="/desert_bg.webp"
              alt="Desert Sand Dunes Background"
              fill
              priority
              sizes="100vw"
              quality={85}
              className="object-cover object-[center_60%] max-md:object-[center_70%] brightness-[0.96] contrast-[1.02] transition-transform duration-200 ease-out"
              style={{ transform: `scale(1.05) translate(${mousePos.x * -6}px, ${mousePos.y * -6}px)` }}
            />
          </div>
        </div>
        {/* Mobile Top Sky Gradient Mask (Flawless melt, zero hard seam line) */}
        <div
          className="md:hidden absolute top-0 left-0 right-0 h-[65%] z-[3] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #162e42 0%, #162e42 42%, rgba(22,46,66,0.95) 54%, rgba(22,46,66,0.8) 64%, rgba(22,46,66,0.5) 75%, rgba(22,46,66,0.2) 86%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ background: "radial-gradient(circle at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.25) 100%)" }}
        />
        <header className="animate-nav-down fixed top-0 left-0 right-0 z-[120] w-full flex items-center justify-between px-12 pt-6 pb-6 max-lg:px-8 max-md:px-4 max-sm:px-3">
          {/* True Optical Progressive Blur Layer (matching reference Navbar.module.css) */}
          <div
            className="absolute top-0 left-0 w-full h-full z-[-1] pointer-events-none"
            style={{
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
            }}
          />
          <div className="flex items-center gap-3">
            <div className="relative w-44 h-12 max-sm:w-36 max-sm:h-10 flex items-center justify-start">
              <Image
                src="/motor_page_logo.webp"
                alt="Motor Page Logo"
                width={176}
                height={48}
                priority
                className="object-contain w-full h-full filter drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
              />
            </div>
          </div>
          <nav>
            <ul className="hidden md:flex items-center list-none" style={{ gap: "3.5rem" }}>
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className={`nav-item text-[0.95rem] font-normal text-white/90 tracking-[0.02em] cursor-pointer transition-colors duration-300 hover:text-white${
                    activeTab === item.label ? " nav-item-active text-white" : ""
                  }`}
                  onClick={() => {
                    setActiveTab(item.label);
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Animated Hamburger / Close Button (Maintains exact navbar position) */}
          <button
            className="hidden max-md:flex w-11 h-11 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white items-center justify-center text-xl cursor-pointer transition-all duration-300 active:scale-95 shadow-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`transition-transform duration-300 ease-out inline-block ${mobileMenuOpen ? "rotate-90 scale-110" : ""}`}>
              {mobileMenuOpen ? "✕" : String.fromCharCode(9776)}
            </span>
          </button>
        </header>

        {/* ── Apple Motion Blur & Fade Mobile Menu Overlay with Slow Directional Line Tracing ── */}
        <div
          className={`fixed inset-0 z-[100] bg-[#162e42]/92 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* ── Intersecting Grid Lines (Tracing live across screen edges left-to-right, right-to-left, top-to-bottom, bottom-to-top) ── */}
          <div className="absolute inset-0 pointer-events-none z-[105] overflow-hidden">
            {/* Top Horizontal Line (Traces Left -> Right) */}
            <div className={`absolute top-[125px] -left-[100vw] -right-[100vw] h-px bg-white/40 origin-left transition-transform duration-[1100ms] delay-150 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              mobileMenuOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`} />
            
            {/* Bottom Horizontal Line (Traces Right -> Left) */}
            <div className={`absolute bottom-[95px] -left-[100vw] -right-[100vw] h-px bg-white/40 origin-right transition-transform duration-[1100ms] delay-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              mobileMenuOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`} />

            {/* Left Vertical Line (Traces Top -> Bottom) */}
            <div className={`absolute -top-[100vh] -bottom-[100vh] left-6 w-px bg-white/40 origin-top transition-transform duration-[1100ms] delay-[450ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
              mobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`} />

            {/* Right Vertical Line (Traces Bottom -> Top) */}
            <div className={`absolute -top-[100vh] -bottom-[100vh] right-6 w-px bg-white/40 origin-bottom transition-transform duration-[1100ms] delay-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
              mobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`} />
          </div>

          {/* ── Main Content Container Framed Perfectly Inside Grid Box ── */}
          <div className={`relative z-[110] flex-1 flex flex-col justify-between max-w-lg mx-auto w-full px-10 pt-[125px] pb-[105px] h-full transition-all duration-700 delay-[650ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
            mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            
            {/* List of Menu Items starting flush with top grid line */}
            <div className="flex flex-col w-full mt-0">
              {[
                { num: "01", label: "CARS", id: "cars" },
                { num: "02", label: "SHOP", id: "shop" },
                { num: "03", label: "MEDIA", id: "media" },
                { num: "04", label: "NEWS", id: "news" },
                { num: "05", label: "ABOUT", id: "about" },
                { num: "06", label: "CONTACT", id: "contact" },
              ].map((item) => (
                <div
                  key={item.num}
                  onClick={() => {
                    setActiveTab(item.label);
                    setMobileMenuOpen(false);
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative flex items-center justify-between py-3.5 sm:py-4.5 border-b border-white/20 cursor-pointer transition-all duration-300 active:bg-white/10 px-2 rounded-[2px]"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#c8102e] tracking-widest w-6">
                      {item.num}
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-[0.08em] uppercase font-mono group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300">
                      {item.label}
                    </span>
                  </div>

                  {/* Right Chevron Icon */}
                  <span className="text-white/40 text-base sm:text-lg group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300 font-mono">
                    &gt;
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom Grid Space (Below the bottom horizontal grid line in empty space) ── */}
          <div className={`absolute bottom-3.5 left-10 right-10 z-[110] flex flex-col gap-2.5 transition-all duration-700 delay-[750ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
            mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            {/* Phone Line with Vector Phone Icon */}
            <div className="flex items-center gap-2.5 text-white font-mono font-extrabold text-base sm:text-lg tracking-wider">
              <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.828-1.472-5.112-3.756-6.584-6.584l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span>800 MOTOR</span>
            </div>

            {/* Vector Social Icons (Instagram, Facebook, YouTube, TikTok) */}
            <div className="flex items-center gap-4 text-white/80">
              <a href="#instagram" aria-label="Instagram" className="hover:text-white hover:scale-110 transition-all">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#facebook" aria-label="Facebook" className="hover:text-white hover:scale-110 transition-all">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a href="#youtube" aria-label="YouTube" className="hover:text-white hover:scale-110 transition-all">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
              <a href="#tiktok" aria-label="TikTok" className="hover:text-white hover:scale-110 transition-all">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12.525 0h3.08c.12 1.01.67 2.1 1.54 2.87.87.77 2.01 1.2 3.19 1.26v3.19c-1.57-.02-3.08-.55-4.34-1.5-.02 3.51-.02 7.02-.02 10.53 0 1.55-.47 3.06-1.36 4.33-.89 1.27-2.14 2.22-3.6 2.73-1.46.51-3.04.51-4.5 0-1.46-.51-2.71-1.46-3.6-2.73-.89-1.27-1.36-2.78-1.36-4.33 0-1.55.47-3.06 1.36-4.33.89-1.27 2.14-2.22 3.6-2.73 1.07-.37 2.22-.47 3.33-.3v3.25c-.56-.12-1.14-.1-1.69.07-.55.17-1.04.49-1.43.92-.39.43-.65.96-.75 1.53-.1.57-.02 1.16.22 1.69.24.53.64.97 1.15 1.27.51.3 1.1.44 1.7.4.6-.04 1.17-.26 1.64-.63.47-.37.81-.88.98-1.46.07-.3.1-.61.1-.92V0z"/></svg>
              </a>
            </div>
          </div>
        </div>
        {/* ── Brand Title Text (Desktop: top-[18%], Mobile: top-[55%] pushed down into lighter image region) ── */}
        <div className="absolute z-[6] top-[18%] max-md:top-[55%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-auto px-4 max-md:px-2">
          <h1
            key={`title-${switchKey}`}
            className="hero-title relative inline-block font-[600] text-[rgba(20,46,62,0.92)] tracking-[-0.01em] leading-[0.82] whitespace-nowrap select-none transition-transform duration-150 ease-out max-md:text-[clamp(3.5rem,14vw,4.5rem)]"
            style={{
              fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.45)",
              textShadow: "0 4px 20px rgba(0,0,0,0.18), 0 0 12px rgba(255,255,255,0.2)",
              transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)`,
            }}
          >
            {activeCar.brandTitle.split("").map((char, i, arr) => {
              const reverseIndex = arr.length - 1 - i;
              const delaySec = (reverseIndex * 0.06 + 0.1).toFixed(3);
              return (
                <span
                  key={`${i}-${char}`}
                  className="inline-block animate-letter"
                  style={{ animationDelay: `${delaySec}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
            <div key={`stroke-${switchKey}`} className="animate-stroke-line" />
          </h1>
        </div>

        {/* ── Front Car Image Standing Tall at Bottom Center (Slightly reduced size for optimal title clearance) ── */}
        <div
          onMouseEnter={() => {
            if (!window.matchMedia("(hover: none)").matches) {
              setIsCarHovered(true);
            }
          }}
          onMouseLeave={() => setIsCarHovered(false)}
          onTouchStart={() => setIsCarHovered(false)}
          onTouchEnd={() => setIsCarHovered(false)}
          onClick={() => {
            setIsCarHovered(false);
            handleSelectCar((carIndex + 1) % CARS.length);
          }}
          className="car-container absolute left-1/2 z-10 bottom-[4%] max-md:bottom-[1.5%] flex justify-center items-end pointer-events-auto cursor-pointer max-md:w-full touch-manipulation h-[260px] sm:h-[340px] w-full max-w-[500px]"
          style={{ transform: "translateX(-50%)" }}
        >
          <div
            className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-[90%] h-6 z-[9] pointer-events-none blur-[4px]"
            style={{ background: "radial-gradient(ellipse at center, rgba(35,18,8,0.65) 0%, rgba(45,24,10,0.35) 45%, rgba(0,0,0,0) 75%)" }}
          />
          {CARS.map((car, idx) => {
            const isActive = idx === carIndex;
            return (
              <div
                key={car.id}
                className={`absolute inset-0 flex items-end justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive ? "opacity-100 scale-100 z-10 pointer-events-auto" : "opacity-0 scale-95 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={car.image}
                  alt={car.name}
                  width={520}
                  height={340}
                  priority
                  quality={90}
                  className="car-image transition-transform duration-300 ease-out hover:scale-[1.02] max-w-[480px] w-auto h-auto max-md:w-[62%] max-md:max-w-[310px] object-contain"
                  style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 8}px)` }}
                />
              </div>
            );
          })}
        </div>

        {/* ── DESKTOP HERO OVERLAY (Anchored at BOTTOM-0, hidden on mobile) ── */}
        <div className="hidden md:flex absolute bottom-0 left-0 right-0 z-[15] w-full justify-between items-end px-12 pb-14 pointer-events-none">
          {/* Left Specs Overlay (Bottom-Left) */}
          <div key={`specs-desktop-${switchKey}`} className="apple-content-switch relative z-[15] flex flex-col gap-[2.2rem] max-w-[280px] pointer-events-auto">
            <div className="flex flex-col gap-[0.35rem]">
              <h2
                className="spec-header font-[500] text-[1.65rem] text-white tracking-[0.02em]"
                style={{ fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)" }}
              >
                Engine
              </h2>
              <p className="text-[0.95rem] font-[300] text-white/90 tracking-[0.02em] mt-1">{activeCar.enginePrimary}</p>
              <p className="text-[0.95rem] font-[300] text-white/80 tracking-[0.01em]">{activeCar.engineSecondary}</p>
            </div>
            <div className="flex flex-col gap-[0.35rem]">
              <h2
                className="spec-header font-[500] text-[1.65rem] text-white tracking-[0.02em]"
                style={{ fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)" }}
              >
                Power
              </h2>
              <p className="text-[0.95rem] font-[300] text-white/90 tracking-[0.02em] mt-1">{activeCar.power}</p>
              <p className="text-[0.75rem] font-[300] text-white/60 tracking-[0.04em] uppercase mt-0.5">{activeCar.subtitle} • {activeCar.years}</p>
            </div>
          </div>

          {/* Minimalist Floating Indicators (Bottom-Center) */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-14 z-[25] flex items-center gap-2.5 pointer-events-auto">
            {CARS.map((car, idx) => {
              const isActive = idx === carIndex;
              return (
                <button
                  key={car.id}
                  onClick={() => handleSelectCar(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer border-0 relative overflow-hidden ${
                    isActive ? "w-9 bg-white/30" : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Select ${car.name}`}
                >
                  {isActive && (
                    <div
                      key={`loader-${switchKey}`}
                      className="absolute inset-y-0 left-0 bg-white rounded-full"
                      style={{
                        animation: "progressTimer 3s linear forwards",
                        animationPlayState: isCarHovered ? "paused" : "running",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right CTA Overlay (Bottom-Right) */}
          <div key={`action-desktop-${switchKey}`} className="apple-content-switch relative z-[15] flex flex-col items-end gap-6 max-w-[320px] text-right pointer-events-auto">
            <button
              className="bg-white text-[#0f172a] font-[600] text-[0.92rem] px-[2.2rem] py-[0.85rem] rounded-[2px] border-0 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)] tracking-[0.03em] inline-flex items-center gap-2 transition-all duration-300 hover:bg-[#f1f5f9] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,255,255,0.25)] active:translate-y-0"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
              onClick={() => {
                const el = document.getElementById("shop");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Now
            </button>
            <p className="text-[0.92rem] font-[300] leading-[1.5] text-white/90 tracking-[0.01em]">
              {activeCar.description}
            </p>
          </div>
        </div>

        {/* ── MOBILE HERO OVERLAY (Top Specs & CTA, hidden on desktop) ── */}
        <div className="md:hidden absolute inset-0 z-[15] pointer-events-none flex flex-col justify-between pt-20 pb-4 px-5">
          {/* Top Row: Specs Overlay (Left) & Explore Now + Description (Right) */}
          <div className="w-full flex justify-between items-start pointer-events-auto z-[20]">
            {/* Mobile Left Specs */}
            <div key={`specs-mobile-${switchKey}`} className="apple-content-switch flex flex-col gap-3 max-w-[170px]">
              <div className="flex flex-col gap-[0.2rem]">
                <h2
                  className="spec-header font-[500] text-[1.15rem] text-white tracking-[0.02em] border-b border-white/50 pb-0.5 w-fit min-w-[70px]"
                  style={{ fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)" }}
                >
                  Engine
                </h2>
                <p className="text-[0.76rem] font-[300] text-white/95 tracking-[0.02em] mt-0.5">{activeCar.enginePrimary}</p>
                <p className="text-[0.72rem] font-[300] text-white/80 tracking-[0.01em]">{activeCar.engineSecondary}</p>
              </div>
              <div className="flex flex-col gap-[0.2rem]">
                <h2
                  className="spec-header font-[500] text-[1.15rem] text-white tracking-[0.02em] border-b border-white/50 pb-0.5 w-fit min-w-[65px]"
                  style={{ fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)" }}
                >
                  Power
                </h2>
                <p className="text-[0.76rem] font-[300] text-white/95 tracking-[0.02em] mt-0.5">{activeCar.power}</p>
              </div>
            </div>

            {/* Mobile Right CTA: White Button & Description Right Below (Lowered on right, matching Image 2) */}
            <div key={`action-mobile-${switchKey}`} className="apple-content-switch flex flex-col items-end gap-2.5 max-w-[175px] text-right mt-36">
              <button
                className="bg-white text-[#0f172a] font-[600] text-[0.75rem] px-4 py-1.5 rounded-[2px] border-0 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)] tracking-[0.03em] inline-flex items-center gap-2 transition-all duration-300 hover:bg-[#f1f5f9] active:translate-y-0"
                style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                onClick={() => {
                  const el = document.getElementById("shop");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Now
              </button>
              <p className="text-[0.72rem] font-[300] leading-[1.4] text-white/90 tracking-[0.01em]">
                {activeCar.description}
              </p>
            </div>
          </div>

          {/* Mobile Minimalist Indicators (Bottom) */}
          <div className="w-full flex justify-center items-center pointer-events-auto z-[25] pb-2">
            <div className="flex items-center gap-2.5">
              {CARS.map((car, idx) => {
                const isActive = idx === carIndex;
                return (
                  <button
                    key={car.id}
                    onClick={() => handleSelectCar(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer border-0 relative overflow-hidden ${
                      isActive ? "w-9 bg-white/30" : "w-2.5 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Select ${car.name}`}
                  >
                    {isActive && (
                      <div
                        key={`loader-${switchKey}`}
                        className="absolute inset-y-0 left-0 bg-white rounded-full"
                        style={{
                          animation: "progressTimer 3s linear forwards",
                          animationPlayState: isCarHovered ? "paused" : "running",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[320px] z-[12] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(184,115,62,0.04) 20%, rgba(184,115,62,0.18) 40%, rgba(184,115,62,0.48) 65%, rgba(184,115,62,0.82) 85%, #b8733e 100%)",
          }}
        />
      </section>

      {/* ── Why Choose Us Section (Equal Height Panels, Scroll-driven Truck Motion) ── */}
      <section ref={sectionRef} id="about" className="bg-[#b8733e] px-12 py-24 max-lg:px-8 max-md:px-6 max-md:pt-8 max-md:pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-stretch">
          
          {/* Left Column: Heading & Sideways Truck Image (Scroll-driven Drive-in / Reverse) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <span className="uppercase tracking-[0.2em] text-[0.8rem] text-white/80 font-mono">
                02 / WHY CHOOSE US
              </span>
              <h2
                className="text-4xl lg:text-6xl font-[400] text-white tracking-[-0.01em] leading-[1.1] mt-2 mb-2 max-md:mb-1"
                style={{ fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)" }}
              >
                We Have All That You Could Expect
              </h2>
            </div>

            <div className="mt-2 max-md:mt-0 relative w-full flex justify-start items-end -ml-16 lg:-ml-36 pointer-events-none select-none">
              <Image
                src="/truck_sideways.webp"
                alt="Truck Sideways Profile"
                width={950}
                height={540}
                quality={85}
                loading="lazy"
                className="object-contain w-[140%] max-md:w-[150%] lg:w-[165%] max-w-none h-auto filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                style={{
                  transform: `translateX(${-78 + truckProgress * 65}%)`,
                  transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                  willChange: "transform",
                }}
              />
            </div>
          </div>

          {/* Right Column: 4 Service Reasons (Contiguous flex-1 tiles, Full Edge-to-Edge Dividers on Mobile) */}
          <div className="lg:col-span-7 relative flex flex-col h-full mt-2 lg:mt-0 max-md:-mx-6 max-md:w-[calc(100%+3rem)]">
            
            {/* Straight Vertical Divider Line running down through the list behind hover images */}
            <div className="absolute top-0 bottom-0 left-[3.8rem] w-px bg-white/25 pointer-events-none z-[0]" />

            {/* Reason 01 */}
            <div
              onMouseEnter={() => setActiveReason(1)}
              onMouseLeave={() => setActiveReason(null)}
              onClick={() => setActiveReason((prev) => (prev === 1 ? null : 1))}
              onTouchStart={() => setActiveReason((prev) => (prev === 1 ? null : 1))}
              className={`relative flex-1 min-h-[90px] max-md:min-h-0 overflow-hidden group border-t border-white/40 py-4 lg:py-8 px-6 flex items-center justify-between cursor-pointer transition-all duration-300 touch-manipulation ${
                activeReason === 1 ? "bg-white/10" : ""
              }`}
            >
              {/* Hover / Touch Image Reveal (stretches 100% edge-to-edge covering entire tile z-[1]) */}
              <div
                className={`absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out pointer-events-none ${
                  activeReason === 1 ? "!opacity-100" : ""
                }`}
              >
                <Image
                  src="/hover_evija.jpg"
                  alt="Rent, Buy & Sell Luxury Vehicles"
                  fill
                  sizes="(max-width: 1200px) 100vw, 50vw"
                  className="object-cover object-center brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
              </div>

              {/* Row Content (z-[2] relative floating on top of hover image) */}
              <div className="relative z-[2] flex items-center gap-8">
                <span className="font-mono text-sm text-white/80 group-hover:text-white transition-colors w-6">01</span>
                <h3 className="text-lg lg:text-[1.2rem] font-normal text-white group-hover:text-white transition-colors">
                  Rent, Buy &amp; Sell Luxury Vehicles
                </h3>
              </div>
              <div
                className={`relative z-[2] w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white/90 group-hover:border-white group-hover:bg-white group-hover:text-slate-950 group-hover:scale-105 transition-all duration-300 shrink-0 ml-4 shadow-sm ${
                  activeReason === 1 ? "!bg-white !text-slate-950 !border-white !scale-105" : ""
                }`}
              >
                →
              </div>
            </div>

            {/* Reason 02 */}
            <div
              onMouseEnter={() => setActiveReason(2)}
              onMouseLeave={() => setActiveReason(null)}
              onClick={() => setActiveReason((prev) => (prev === 2 ? null : 2))}
              onTouchStart={() => setActiveReason((prev) => (prev === 2 ? null : 2))}
              className={`relative flex-1 min-h-[90px] max-md:min-h-0 overflow-hidden group border-t border-white/40 py-4 lg:py-8 px-6 flex items-center justify-between cursor-pointer transition-all duration-300 touch-manipulation ${
                activeReason === 2 ? "bg-white/10" : ""
              }`}
            >
              <div
                className={`absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out pointer-events-none ${
                  activeReason === 2 ? "!opacity-100" : ""
                }`}
              >
                <Image
                  src="/hover_trucks.webp"
                  alt="Heavy-Duty Trucks & Commercial Fleets"
                  fill
                  sizes="(max-width: 1200px) 100vw, 50vw"
                  className="object-cover object-center brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
              </div>

              <div className="relative z-[2] flex items-center gap-8">
                <span className="font-mono text-sm text-white/80 group-hover:text-white transition-colors w-6">02</span>
                <h3 className="text-lg lg:text-[1.2rem] font-normal text-white group-hover:text-white transition-colors">
                  Heavy-Duty Trucks &amp; Commercial Fleets
                </h3>
              </div>
              <div
                className={`relative z-[2] w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white/90 group-hover:border-white group-hover:bg-white group-hover:text-slate-950 group-hover:scale-105 transition-all duration-300 shrink-0 ml-4 shadow-sm ${
                  activeReason === 2 ? "!bg-white !text-slate-950 !border-white !scale-105" : ""
                }`}
              >
                →
              </div>
            </div>

            {/* Reason 03 */}
            <div
              onMouseEnter={() => setActiveReason(3)}
              onMouseLeave={() => setActiveReason(null)}
              onClick={() => setActiveReason((prev) => (prev === 3 ? null : 3))}
              onTouchStart={() => setActiveReason((prev) => (prev === 3 ? null : 3))}
              className={`relative flex-1 min-h-[90px] max-md:min-h-0 overflow-hidden group border-t border-white/40 py-4 lg:py-8 px-6 flex items-center justify-between cursor-pointer transition-all duration-300 touch-manipulation ${
                activeReason === 3 ? "bg-white/10" : ""
              }`}
            >
              <div
                className={`absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out pointer-events-none ${
                  activeReason === 3 ? "!opacity-100" : ""
                }`}
              >
                <Image
                  src="/hover_mercedes.jpg"
                  alt="100% Verified Transparency & Trustworthiness"
                  fill
                  sizes="(max-width: 1200px) 100vw, 50vw"
                  className="object-cover object-center brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
              </div>

              <div className="relative z-[2] flex items-center gap-8">
                <span className="font-mono text-sm text-white/80 group-hover:text-white transition-colors w-6">03</span>
                <h3 className="text-lg lg:text-[1.2rem] font-normal text-white group-hover:text-white transition-colors">
                  100% Verified Transparency &amp; Trustworthiness
                </h3>
              </div>
              <div
                className={`relative z-[2] w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white/90 group-hover:border-white group-hover:bg-white group-hover:text-slate-950 group-hover:scale-105 transition-all duration-300 shrink-0 ml-4 shadow-sm ${
                  activeReason === 3 ? "!bg-white !text-slate-950 !border-white !scale-105" : ""
                }`}
              >
                →
              </div>
            </div>

            {/* Reason 04 (With explicit bottom divider line border-b border-white/40) */}
            <div
              onMouseEnter={() => setActiveReason(4)}
              onMouseLeave={() => setActiveReason(null)}
              onClick={() => setActiveReason((prev) => (prev === 4 ? null : 4))}
              onTouchStart={() => setActiveReason((prev) => (prev === 4 ? null : 4))}
              className={`relative flex-1 min-h-[90px] max-md:min-h-0 overflow-hidden group border-t border-b border-white/40 py-4 lg:py-8 px-6 flex items-center justify-between cursor-pointer transition-all duration-300 touch-manipulation ${
                activeReason === 4 ? "bg-white/10" : ""
              }`}
            >
              <div
                className={`absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out pointer-events-none ${
                  activeReason === 4 ? "!opacity-100" : ""
                }`}
              >
                <Image
                  src="/hover_bugatti.jpg"
                  alt="Photoshoots & VIP Event Hire"
                  fill
                  sizes="(max-width: 1200px) 100vw, 50vw"
                  className="object-cover object-center brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
              </div>

              <div className="relative z-[2] flex items-center gap-8">
                <span className="font-mono text-sm text-white/80 group-hover:text-white transition-colors w-6">04</span>
                <h3 className="text-lg lg:text-[1.2rem] font-normal text-white group-hover:text-white transition-colors">
                  Photoshoots &amp; VIP Event Hire
                </h3>
              </div>
              <div
                className={`relative z-[2] w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white/90 group-hover:border-white group-hover:bg-white group-hover:text-slate-950 group-hover:scale-105 transition-all duration-300 shrink-0 ml-4 shadow-sm ${
                  activeReason === 4 ? "!bg-white !text-slate-950 !border-white !scale-105" : ""
                }`}
              >
                →
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Exotic Fleet Inventory Cards Section (Edge-to-Edge List, Zero Bottom Gap) ── */}
      <section id="shop" className="bg-[#b8733e] px-0 pt-10 lg:pt-16 pb-0 overflow-hidden w-full">
        <div className="w-full">
          
          {/* Section Header with View All Button (Same Box Format as Explore Button) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 lg:mb-10 px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="flex flex-col">
              <span className="uppercase tracking-[0.2em] text-[0.75rem] text-white/80 font-mono">
                03 / EXOTIC FLEET INVENTORY
              </span>
              <h2
                className="text-3xl lg:text-5xl font-[400] text-white tracking-[-0.01em] leading-[1.1] mt-2"
                style={{ fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)" }}
              >
                Curated Supercars
              </h2>
            </div>
            {/* View All Button matching Explore Now box format */}
            <button
              className="bg-white text-[#0f172a] font-[600] text-[0.82rem] px-5 py-2.5 rounded-[2px] border-0 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)] tracking-[0.03em] inline-flex items-center gap-2 transition-all duration-300 hover:bg-[#f1f5f9] hover:-translate-y-0.5 active:translate-y-0 shrink-0 w-fit"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
            >
              View All Inventory
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Cards Horizontal Carousel Container with Floating Hover Arrows */}
          <div
            className="relative w-full group/carousel"
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
          >
            {/* Left Hover Navigation Arrow (BG color #b8733e, Pure White Border) */}
            <button
              onClick={() => carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
              className={`absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#b8733e] border border-white text-white text-base flex items-center justify-center shadow-2xl transition-all duration-300 hover:bg-white hover:text-[#b8733e] hover:scale-110 cursor-pointer ${
                isCarouselHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
              aria-label="Scroll left"
            >
              ←
            </button>

            {/* Cards Carousel */}
            <div ref={carouselRef} className="relative w-full flex overflow-x-auto scrollbar-none snap-x py-0">
              {CAR_INVENTORY.map((car, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === CAR_INVENTORY.length - 1;
                return (
                  <div
                    key={car.id}
                    className={`w-[280px] lg:w-[320px] shrink-0 snap-start p-5 lg:p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:bg-white/10 active:bg-white/20 active:scale-[0.98] touch-manipulation border-t border-b border-white/40 ${
                      isFirst ? "border-l-0" : ""
                    } ${isLast ? "border-r-0" : "border-r border-white/40"}`}
                  >
                    {/* 1. TOP: Square Image Container */}
                    <div className="aspect-square relative w-full overflow-hidden bg-black/20 mb-4 border border-white/15">
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        sizes="310px"
                        className="object-cover object-center filter brightness-[0.95] group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>

                    {/* 2. MIDDLE: Brand Row (Original Authentic Brand Colors - No Inversion) */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="relative w-5 h-5 flex items-center justify-center">
                          <Image
                            src={car.logoImg}
                            alt={`${car.brand} Logo`}
                            width={20}
                            height={20}
                            className="object-contain w-full h-full filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
                          />
                        </div>
                        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white/80 font-medium">
                          {car.brand}
                        </span>
                      </div>
                      <span className="font-mono text-[0.7rem] text-white/60">
                        {car.year}
                      </span>
                    </div>

                    {/* 3. BOTTOM: Top-Anchored Model Name & Bottom-Anchored Price (Aligned in Same Lane) */}
                    <div className="flex items-start justify-between pt-1 gap-3">
                      <div className="flex flex-col flex-1 min-w-0 justify-between h-[4.8rem]">
                        {/* Title anchored at top baseline */}
                        <h3
                          className="text-xl lg:text-[1.35rem] font-[500] text-white leading-[1.25] group-hover:text-white transition-colors"
                          style={{ fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)" }}
                        >
                          {car.name}
                        </h3>
                        {/* Price anchored at bottom baseline lane (Prominent, Bold Monospace Display) */}
                        <span className="text-lg lg:text-[1.25rem] font-bold text-white font-mono tracking-[0.02em] filter drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
                          {car.price}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#b8733e] border border-white flex items-center justify-center text-white text-xs group-hover:bg-white group-hover:text-[#b8733e] group-hover:scale-105 transition-all duration-300 shrink-0 shadow-sm mt-0.5">
                        →
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Hover Navigation Arrow (BG color #b8733e, Pure White Border) */}
            <button
              onClick={() => carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
              className={`absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#b8733e] border border-white text-white text-base flex items-center justify-center shadow-2xl transition-all duration-300 hover:bg-white hover:text-[#b8733e] hover:scale-110 cursor-pointer ${
                isCarouselHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
              aria-label="Scroll right"
            >
              →
            </button>
          </div>

        </div>
      </section>

      {/* ── Services / Quick Actions Section (5 Compact Bento Tiles, Edge-to-Edge Dividers) ── */}
      <section id="media" className="w-full bg-[#b8733e] p-0 m-0 border-b border-white/40 overflow-hidden">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {QUICK_ACTIONS.map((action, idx) => {
            const isLastColLg = idx === 4;
            const isLastColMd = (idx + 1) % 3 === 0;
            const isLastColSm = (idx + 1) % 2 === 0;
            const isLastItemMobile = idx === 4;
            return (
              <div
                key={action.id}
                className={`group relative h-[180px] sm:h-[210px] lg:h-[235px] w-full overflow-hidden cursor-pointer flex flex-col justify-end p-4 lg:p-5 transition-all duration-300 active:scale-[0.98] active:bg-white/10 touch-manipulation border-b border-r border-white/40 ${
                  isLastItemMobile ? "max-sm:col-span-2 max-sm:border-r-0" : ""
                } ${isLastColSm ? "sm:max-md:border-r-0" : ""} ${
                  isLastColMd ? "md:max-lg:border-r-0" : ""
                } ${isLastColLg ? "lg:border-r-0 lg:border-b-0" : ""}`}
              >
                {/* Background Image with Hover Scale Zoom */}
                <Image
                  src={action.image}
                  alt={action.title}
                  fill
                  quality={90}
                  className="object-cover object-center brightness-[0.85] contrast-[1.05] transition-transform duration-500 ease-out group-hover:scale-110"
                />

                {/* Dark Gradient Backdrop Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-95" />

                {/* Content Layer (Bottom Aligned) */}
                <div className="relative z-10 flex items-end justify-between w-full">
                  <div className="flex flex-col items-start pr-2">
                    <h3
                      className="text-base sm:text-lg lg:text-[1.18rem] font-bold text-white tracking-wide leading-[1.2] drop-shadow-md"
                      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                    >
                      {action.title}
                    </h3>
                    {/* Red Underline Accent Line matching reference screenshot */}
                    <div className="w-6 h-[2.5px] bg-red-600 rounded-full mt-2 transition-all duration-300 group-hover:w-9 group-hover:bg-red-500" />
                  </div>

                  {/* Circular Chevron Action Arrow Button */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/40 bg-black/40 backdrop-blur-md flex items-center justify-center text-white text-xs shrink-0 group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:scale-105 transition-all duration-300 shadow-xl">
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Recent News Horizontal Carousel Section ── */}
      <section id="news" className="bg-[#b8733e] px-0 pt-12 lg:pt-16 pb-0 overflow-hidden w-full border-b border-white/40">
        <div className="w-full">
          {/* Section Header with View All Button (Same Box Format as Explore Button) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 lg:mb-10 px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="flex flex-col">
              <span className="uppercase tracking-[0.2em] text-[0.75rem] text-white/80 font-mono">
                04 / AUTOMOTIVE JOURNAL &amp; INSIGHTS
              </span>
              <h2
                className="text-3xl lg:text-5xl font-[400] text-white tracking-[-0.01em] leading-[1.1] mt-2"
                style={{ fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)" }}
              >
                Recent News &amp; Articles
              </h2>
            </div>
            {/* View All Button matching Explore Now box format */}
            <button
              className="bg-white text-[#0f172a] font-[600] text-[0.82rem] px-5 py-2.5 rounded-[2px] border-0 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)] tracking-[0.03em] inline-flex items-center gap-2 transition-all duration-300 hover:bg-[#f1f5f9] hover:-translate-y-0.5 active:translate-y-0 shrink-0 w-fit"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
            >
              View All Articles
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* News Horizontal Carousel */}
          <div
            className="relative w-full group/news"
            onMouseEnter={() => setIsNewsHovered(true)}
            onMouseLeave={() => setIsNewsHovered(false)}
          >
            {/* Left Hover Navigation Arrow */}
            <button
              onClick={() => newsCarouselRef.current?.scrollBy({ left: -340, behavior: "smooth" })}
              className={`absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#b8733e] border border-white text-white text-base flex items-center justify-center shadow-2xl transition-all duration-300 hover:bg-white hover:text-[#b8733e] hover:scale-110 cursor-pointer ${
                isNewsHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
              aria-label="Scroll left"
            >
              ←
            </button>

            {/* News Carousel Container */}
            <div ref={newsCarouselRef} className="relative w-full flex overflow-x-auto scrollbar-none snap-x py-0">
              {RECENT_NEWS.map((item, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === RECENT_NEWS.length - 1;
                return (
                  <div
                    key={item.id}
                    className={`w-[270px] sm:w-[330px] lg:w-[380px] shrink-0 snap-start p-4 sm:p-5 lg:p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:bg-white/10 active:bg-white/20 active:scale-[0.98] touch-manipulation border-t border-b border-white/40 ${
                      isFirst ? "border-l-0" : ""
                    } ${isLast ? "border-r-0" : "border-r border-white/40"}`}
                  >
                    {/* Image Container */}
                    <div className="aspect-[16/10] relative w-full overflow-hidden bg-black/20 mb-3 sm:mb-4 border border-white/15">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="380px"
                        className="object-cover object-center filter brightness-[0.92] group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>



                    {/* News Title & Summary */}
                    <div className="flex flex-col flex-1 justify-between mt-0.5 min-h-[4.8rem] sm:min-h-[5.5rem]">
                      <h3
                        className="text-base sm:text-lg lg:text-[1.2rem] font-[500] text-white leading-[1.3] group-hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-[0.78rem] sm:text-[0.8rem] font-[300] text-white/75 line-clamp-2 mt-1.5 sm:mt-2 leading-[1.4]">
                        {item.summary}
                      </p>
                    </div>

                    {/* Bottom Action Arrow */}
                    <div className="flex items-center justify-between pt-3 sm:pt-4 mt-2.5 sm:mt-3 border-t border-white/15">
                      <span className="text-[0.72rem] sm:text-[0.75rem] font-medium text-white/90 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                        Read Story
                      </span>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#b8733e] border border-white flex items-center justify-center text-white text-xs group-hover:bg-white group-hover:text-[#b8733e] group-hover:scale-105 transition-all duration-300 shrink-0 shadow-sm">
                        →
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Hover Navigation Arrow */}
            <button
              onClick={() => newsCarouselRef.current?.scrollBy({ left: 340, behavior: "smooth" })}
              className={`absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#b8733e] border border-white text-white text-base flex items-center justify-center shadow-2xl transition-all duration-300 hover:bg-white hover:text-[#b8733e] hover:scale-110 cursor-pointer ${
                isNewsHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* ── Contact Us / Newsletter Section (Grid Guidelines & Full-Bleed Map Divider) ── */}
      <section id="contact" className="relative w-full bg-[#b8733e] py-16 lg:py-24 px-6 lg:px-12 border-t border-b border-white/40 overflow-hidden">
        
        {/* Centered Main Layout Container */}
        <div className="relative z-10 max-w-6xl mx-auto">
          
          {/* Vertical Guidelines framing the left and right sides */}
          <div className="absolute -top-16 lg:-top-24 -bottom-16 lg:-bottom-24 left-0 w-px bg-white/40 pointer-events-none z-[20]" />
          <div className="absolute -top-16 lg:-top-24 -bottom-16 lg:-bottom-24 right-0 w-px bg-white/40 pointer-events-none z-[20]" />

          {/* Top Architectural Grid Box: Natural Green Google Map pointing to Kampala, Uganda */}
          <div className="relative w-full h-[240px] sm:h-[300px] lg:h-[340px] -mt-16 lg:-mt-24 mb-0 overflow-hidden group z-[15]">
            <iframe
              title="Kampala Uganda Location Map"
              src="https://maps.google.com/maps?q=Kampala,%20Uganda&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 transition-opacity duration-500 opacity-95 group-hover:opacity-100"
              loading="lazy"
            />
          </div>
        </div>

        {/* ── FULL-BLEED HORIZONTAL DIVIDER LINE: Goes through middle of map & form, hitting both screen edges ── */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 h-px bg-white/40 z-[30] pointer-events-none my-0" />

        {/* Form Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Vertical Guidelines continuing through the form container */}
          <div className="absolute top-0 -bottom-16 lg:-bottom-24 left-0 w-px bg-white/40 pointer-events-none z-[20]" />
          <div className="absolute top-0 -bottom-16 lg:-bottom-24 right-0 w-px bg-white/40 pointer-events-none z-[20]" />

          {/* Fully Transparent Content Container (No background color - letting rich theme brown show through) */}
          <div className="relative w-full bg-transparent p-6 sm:p-10 lg:p-12 overflow-hidden">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
              
              {/* Left Column: Text & Pill Input Form */}
              <div className="lg:col-span-6 flex flex-col justify-center pr-0 lg:pr-4 z-[5]">
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-[700] text-white tracking-[-0.01em] leading-[1.15] mb-4"
                  style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                >
                  Stay Ahead of the Curve
                </h2>
                <p className="text-white/80 text-sm sm:text-base leading-[1.6] max-w-lg mb-8 font-[300]">
                  Stay up to date with the latest trends in luxury automobiles, exclusive brand features, and insider news from the world of high-end vehicles.
                </p>

                {/* Email Input Box with Red Chevron Action Button */}
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="relative w-full max-w-md flex items-center"
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-[#26282b]/90 border border-white/20 rounded-full py-3.5 pl-6 pr-14 text-white text-sm placeholder:text-white/45 focus:outline-none focus:border-white/50 transition-all duration-300 shadow-inner"
                    style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                  />
                  <button
                    type="submit"
                    aria-label="Submit Email"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#c8102e] hover:bg-[#e01435] text-white flex items-center justify-center cursor-pointer shadow-[0_4px_15px_rgba(200,16,46,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 border-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </form>
              </div>

              {/* Right Column: Red Supercar & Floating Envelope Graphic */}
              <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end mt-4 lg:mt-0 z-[5]">
                <div className="relative w-full max-w-[500px] aspect-[16/10] flex items-center justify-center">
                  
                  {/* Floating Supercar Image */}
                  <Image
                    src="/motor_page_car.webp"
                    alt="Red Exotic Supercar with Butterfly Doors"
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    loading="lazy"
                    quality={85}
                    className="object-contain object-center filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── FULL-BLEED HORIZONTAL DIVIDER LINE: Bottom bound of card touching screen edges left-to-right ── */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 h-px bg-white/40 z-[30] pointer-events-none my-0" />
      </section>

      {/* ── High-End Footer (Matching Reference Layout, Rich Theme Brown, Vector SVG Icons) ── */}
      <footer id="contacts" className="bg-[#aa6533] text-white pt-16 pb-8 px-6 lg:px-16 border-t border-white/30 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/20">
          
          {/* Col 1: Brand Info, Visit & Vector Social Icons (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left gap-5">
            {/* Motor Page Logo */}
            <div className="relative w-48 h-12 flex items-center justify-start mb-1">
              <Image
                src="/motor_page_logo.webp"
                alt="Motor Page Logo"
                width={190}
                height={50}
                className="object-contain object-left w-full h-full"
              />
            </div>

            <p className="text-[0.88rem] font-[300] text-white/85 leading-[1.6] max-w-md">
              Established in 2021. Over 1,000 vehicles sold. Curated inventory of automotive excellence on Kampala Road, Uganda.
            </p>

            {/* Visit Details */}
            <div className="flex flex-col gap-2.5 mt-2">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#c8102e] font-bold">
                VISIT
              </span>
              <p className="text-[0.92rem] font-[400] text-white/90">
                Kampala Road · Uganda
              </p>
              <div className="flex items-center gap-2 text-[0.95rem] font-bold text-white font-mono tracking-wide">
                <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.828-1.472-5.112-3.756-6.584-6.584l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>+256 800 MOTOR</span>
              </div>
              <a href="mailto:info@motopage.com" className="text-[0.88rem] text-white/80 hover:text-white transition-colors">
                info@motopage.com
              </a>
            </div>

            {/* SVG Vector Social Icons (No Emojis) */}
            <div className="flex items-center gap-4 mt-3 text-white/80">
              <a href="#instagram" aria-label="Instagram" className="hover:text-white hover:scale-110 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#facebook" aria-label="Facebook" className="hover:text-white hover:scale-110 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a href="#youtube" aria-label="YouTube" className="hover:text-white hover:scale-110 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
              <a href="#tiktok" aria-label="TikTok" className="hover:text-white hover:scale-110 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525 0h3.08c.12 1.01.67 2.1 1.54 2.87.87.77 2.01 1.2 3.19 1.26v3.19c-1.57-.02-3.08-.55-4.34-1.5-.02 3.51-.02 7.02-.02 10.53 0 1.55-.47 3.06-1.36 4.33-.89 1.27-2.14 2.22-3.6 2.73-1.46.51-3.04.51-4.5 0-1.46-.51-2.71-1.46-3.6-2.73-.89-1.27-1.36-2.78-1.36-4.33 0-1.55.47-3.06 1.36-4.33.89-1.27 2.14-2.22 3.6-2.73 1.07-.37 2.22-.47 3.33-.3v3.25c-.56-.12-1.14-.1-1.69.07-.55.17-1.04.49-1.43.92-.39.43-.65.96-.75 1.53-.1.57-.02 1.16.22 1.69.24.53.64.97 1.15 1.27.51.3 1.1.44 1.7.4.6-.04 1.17-.26 1.64-.63.47-.37.81-.88.98-1.46.07-.3.1-.61.1-.92V0z"/></svg>
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="hover:text-white hover:scale-110 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: CARS (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[#c8102e] font-bold">
              CARS
            </h3>
            <ul className="flex flex-col gap-3 text-[0.88rem] font-[400] text-white/85">
              <li><a href="#shop" className="hover:text-white transition-colors">Available Cars</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Sold Cars</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Specs</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Compare</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Sell My Car</a></li>
            </ul>
          </div>

          {/* Col 3: DISCOVER (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[#c8102e] font-bold">
              DISCOVER
            </h3>
            <ul className="flex flex-col gap-3 text-[0.88rem] font-[400] text-white/85">
              <li><a href="#shop" className="hover:text-white transition-colors">Shop</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Image Gallery</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Video Gallery</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">360 Tour</a></li>
              <li><a href="#news" className="hover:text-white transition-colors">News</a></li>
              <li><a href="#news" className="hover:text-white transition-colors">Blogs</a></li>
            </ul>
          </div>

          {/* Col 4: COMPANY (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[#c8102e] font-bold">
              COMPANY
            </h3>
            <ul className="flex flex-col gap-3 text-[0.88rem] font-[400] text-white/85">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Rights Reserved & Terms / Privacy */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono tracking-wider text-white/60">
          <p>© 2026 MOTOPAGE L.L.C ALL RIGHTS RESERVED</p>
          <div className="flex items-center gap-3">
            <a href="#privacy" className="hover:text-white transition-colors">TERMS</a>
            <span>/</span>
            <a href="#privacy" className="hover:text-white transition-colors">PRIVACY</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
