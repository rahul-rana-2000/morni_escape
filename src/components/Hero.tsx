"use client";

import { useState } from "react";
import { Search, Sparkles, Navigation, X } from "lucide-react";

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

export default function Hero({
  searchQuery,
  onSearchChange,
  onQuickChipClick,
  onStartPlanning,
}: HeroProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="relative overflow-hidden text-white pt-32 pb-20 md:pt-36 md:pb-28">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/mornihills.jpeg')" }}
      />

      {/* Dark + Green Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-emerald-950/55 to-black/75 pointer-events-none" />

      {/* Background Graphic Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-stone-50/90 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs sm:text-sm font-medium mb-6 shadow-inner backdrop-blur-sm animate-fade-in">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>The Hidden Hill Station of Shivalik Foothills</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 drop-shadow-lg">
          MORNI ESCAPE{" "}
          <span className="inline-block animate-bounce">🌄</span>
        </h1>

        {/* Sub Heading */}
        <p className="text-lg sm:text-xl md:text-2xl font-light text-stone-100 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md">
          Plan Your Perfect Morni Trip
        </p>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-6">
          <div
            className={`relative flex items-center bg-white rounded-2xl p-2 shadow-2xl transition-all duration-300 border-2 ${isFocused
              ? "border-emerald-500 ring-4 ring-emerald-500/20 shadow-emerald-950/40 scale-[1.01]"
              : "border-stone-200 shadow-stone-950/40"
              }`}
          >
            <div className="pl-3 pr-2 text-stone-400">
              <Search className="w-6 h-6 text-emerald-600" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Where do you want to go? (e.g. Tikkar Taal, Camping, Fort...)"
              className="w-full py-3 px-2 text-stone-800 text-base sm:text-lg focus:outline-none placeholder-stone-400 font-medium"
            />

            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 mr-1"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={onStartPlanning}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
            >
              <span>Explore</span>
              <Navigation className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Popular Quick Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto text-xs sm:text-sm">
          <span className="text-white/80 text-xs uppercase tracking-wider font-semibold mr-1">
            Popular:
          </span>

          {POPULAR_SEARCHES.map((chip) => (
            <button
              key={chip}
              onClick={() => onQuickChipClick(chip)}
              className="px-3 py-1.5 rounded-full bg-black/25 hover:bg-black/40 border border-white/20 text-white hover:text-white transition-all backdrop-blur-sm active:scale-95"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Quick Highlights Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mt-12 pt-8 border-t border-white/20 text-left">
          <div className="p-3 rounded-xl bg-black/25 border border-white/15 backdrop-blur-sm">
            <div className="text-emerald-300 font-bold text-lg sm:text-xl">
              42 km
            </div>
            <div className="text-white/85 text-xs">
              From Chandigarh (1 hr)
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/25 border border-white/15 backdrop-blur-sm">
            <div className="text-emerald-300 font-bold text-lg sm:text-xl">
              1,220 m
            </div>
            <div className="text-white/85 text-xs">
              Peak Elevation & Pines
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/25 border border-white/15 backdrop-blur-sm">
            <div className="text-emerald-300 font-bold text-lg sm:text-xl">
              Twin Lakes
            </div>
            <div className="text-white/85 text-xs">
              Tikkar Bada & Chhota
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/25 border border-white/15 backdrop-blur-sm">
            <div className="text-emerald-300 font-bold text-lg sm:text-xl">
              17th Cent.
            </div>
            <div className="text-white/85 text-xs">
              Historic Morni Fort
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

