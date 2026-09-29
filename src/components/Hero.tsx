"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Sparkles,
  Navigation,
  X,
} from "lucide-react";

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onQuickChipClick: (term: string) => void;
  onStartPlanning: () => void;
}

const POPULAR_SEARCHES = [
  "Tikkar Taal",
  "Morni Fort",
  "Lakeside Camping",
  "Adventure Park",
  "Karoh Peak",
  "Taxi to Morni",
  "Hill Dhaba",
];

const HERO_SLIDES = [
  {
    url: "/mornihills.jpeg",
    tagline: "The Hidden Hill Station of Shivalik Foothills",
    badge: "Morni Hills View 🌄",
  },
  {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80",
    tagline: "Serene Boating & Twin Lakes at Tikkar Taal",
    badge: "Tikkar Taal Lakes 🚣",
  },
  {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80",
    tagline: "Karoh Peak Trails & Ancient 17th Century Fort",
    badge: "Highest Peak in Haryana 🥾",
  },
  {
    url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=2000&q=80",
    tagline: "Starry Night Camping & Campfire Retreats",
    badge: "Pine Forest Camping 🏕️",
  },
];

export default function Hero({
  searchQuery,
  onSearchChange,
  onQuickChipClick,
  onStartPlanning,
}: HeroProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic slide rotation every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden text-white min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex flex-col justify-center py-4 sm:py-6">
      {/* Background Carousel Images with Smooth Crossfade */}
      <div className="absolute inset-0 overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
              idx === currentSlide
                ? "opacity-100 scale-105"
                : "opacity-0 scale-100 pointer-events-none"
            }`}
            style={{ backgroundImage: `url('${slide.url}')` }}
          />
        ))}
      </div>

      {/* Dark + Emerald Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-emerald-950/60 to-black/85 pointer-events-none" />

      {/* Subtle Aurora Lighting Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
      </div>

      {/* Main Content Container - Compact & Fits in Single Screen */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20 flex flex-col items-center justify-center">
        {/* Dynamic Top Tagline Pill */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 text-xs font-medium mb-2 sm:mb-3 shadow-inner backdrop-blur-md animate-fade-in transition-all">
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          <span>{HERO_SLIDES[currentSlide].tagline}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-1 sm:mb-2 drop-shadow-xl text-white">
          MORNI ESCAPE{" "}
          <span className="inline-block animate-bounce">🌄</span>
        </h1>

        {/* Sub Heading */}
        <p className="text-sm sm:text-base md:text-lg font-light text-stone-100 max-w-xl mx-auto mb-3 sm:mb-4 leading-relaxed drop-shadow-md">
          Plan Your Perfect Morni Trip
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-xl mx-auto mb-3 sm:mb-4">
          <div
            className={`relative flex items-center bg-white rounded-2xl p-1.5 sm:p-2 shadow-2xl transition-all duration-300 border-2 ${
              isFocused
                ? "border-emerald-500 ring-4 ring-emerald-500/20 shadow-emerald-950/40 scale-[1.01]"
                : "border-stone-200 shadow-stone-950/40"
            }`}
          >
            <div className="pl-3 pr-2 text-stone-400">
              <Search className="w-5 h-5 text-emerald-600" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Where do you want to go? (e.g. Tikkar Taal, Camping, Fort...)"
              className="w-full py-1.5 sm:py-2 px-1 text-stone-800 text-sm sm:text-base focus:outline-none placeholder-stone-400 font-medium"
            />

            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 mr-1 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onStartPlanning}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer text-xs sm:text-sm"
            >
              <span>Explore</span>
              <Navigation className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Popular Quick Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-2xl mx-auto text-[11px] sm:text-xs mb-3 sm:mb-4">
          <span className="text-white/80 text-[11px] uppercase tracking-wider font-semibold mr-1">
            Popular:
          </span>

          {POPULAR_SEARCHES.map((chip) => (
            <button
              key={chip}
              onClick={() => onQuickChipClick(chip)}
              className="px-2.5 py-1 rounded-full bg-black/35 hover:bg-black/55 border border-white/20 text-white hover:text-white transition-all backdrop-blur-sm active:scale-95 cursor-pointer shadow-xs"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Quick Highlights Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-3xl w-full mx-auto mt-2 sm:mt-3 pt-3 sm:pt-4 border-t border-white/20 text-left">
          <div className="p-2 sm:p-2.5 rounded-xl bg-black/30 border border-white/15 backdrop-blur-sm">
            <div className="text-emerald-300 font-bold text-base sm:text-lg">
              42 km
            </div>
            <div className="text-white/85 text-[11px] sm:text-xs">
              From Chandigarh (1 hr)
            </div>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-black/30 border border-white/15 backdrop-blur-sm">
            <div className="text-emerald-300 font-bold text-base sm:text-lg">
              1,220 m
            </div>
            <div className="text-white/85 text-[11px] sm:text-xs">
              Peak Elevation & Pines
            </div>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-black/30 border border-white/15 backdrop-blur-sm">
            <div className="text-emerald-300 font-bold text-base sm:text-lg">
              Twin Lakes
            </div>
            <div className="text-white/85 text-[11px] sm:text-xs">
              Tikkar Bada & Chhota
            </div>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-black/30 border border-white/15 backdrop-blur-sm">
            <div className="text-emerald-300 font-bold text-base sm:text-lg">
              17th Cent.
            </div>
            <div className="text-white/85 text-[11px] sm:text-xs">
              Historic Morni Fort
            </div>
          </div>
        </div>

        {/* Carousel Indicator Dots ("dot dot krke crousel chlta rhe") */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4 z-30 relative">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.badge}`}
              className={`transition-all duration-500 rounded-full cursor-pointer ${
                idx === currentSlide
                  ? "w-7 h-2 bg-emerald-400 shadow-md shadow-emerald-500/50"
                  : "w-2 h-2 bg-white/40 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
