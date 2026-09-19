"use client";

import { useState } from "react";
import {
  Compass,
  PhoneCall,
  Menu,
  X,
  MapPin,
  Calendar,
  CloudSun,
  Car,
  MessageSquareShare,
} from "lucide-react";
import Image from "next/image";

interface NavbarProps {
  onSelectCategory?: (category: string) => void;
  onScrollToPlanner?: () => void;
  onScrollToExplore?: () => void;
  onScrollToTaxi?: () => void;
}

export default function Navbar({
  onScrollToPlanner,
  onScrollToExplore,
  onScrollToTaxi,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (callback?: () => void) => {
    if (callback) callback();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-white/95 backdrop-blur-md transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Left Cluster: Bigger Logo + Navigation closer to it */}
          <div className="flex items-center gap-6 lg:gap-10">
            {/* Logo */}
            <a href="#" className="flex items-center group focus:outline-hidden py-1">
              <div className="relative flex items-center">
                <Image
                  src="/Morni-escape.png"
                  alt="Morni Escape Logo"
                  width={260}
                  height={90}
                  className="h-14 sm:h-18 w-auto object-contain group-hover:scale-105 transition-transform"
                  priority
                />
              </div>
            </a>

            {/* Desktop Navigation (Brought close to Logo) */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-semibold text-stone-700">
              <button
                onClick={() => handleNavClick(onScrollToExplore)}
                className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer py-2"
              >
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Explore Spots</span>
              </button>
              <button
                onClick={() => handleNavClick(onScrollToPlanner)}
                className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer py-2"
              >
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Trip Planner</span>
              </button>
              <button
                onClick={() => handleNavClick(onScrollToTaxi)}
                className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer py-2"
              >
                <Car className="w-4 h-4 text-emerald-600" />
                <span>Taxi & Cabs</span>
              </button>
              <a
                href="#travel-tips"
                className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 py-2"
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Travel Tips</span>
              </a>
            </nav>
          </div>

          {/* Weather & Call Action */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs text-stone-700 font-medium">
              <CloudSun className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Morni: 21°C • Clear Sky</span>
            </div>

            <a
              href="https://wa.me/919888877777?text=Hi!%20I%20am%20planning%20a%20trip%20to%20Morni%20Hills%20via%20Morni%20Escape."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all hover:shadow-md"
            >
              <MessageSquareShare className="w-3.5 h-3.5" />
              <span>WhatsApp Guide</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="tel:+919888877777"
              aria-label="Call Assistance"
              className="p-2 rounded-lg bg-emerald-50 text-emerald-700"
            >
              <PhoneCall className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 focus:outline-hidden"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-xs font-medium text-emerald-900">
            <div className="flex items-center gap-2">
              <CloudSun className="w-4 h-4 text-amber-500" />
              <span>Morni Hills Live Weather: 21°C • Pleasant</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-sm font-medium">
            <button
              onClick={() => handleNavClick(onScrollToExplore)}
              className="p-3 text-left rounded-xl bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-700 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              Explore Spots
            </button>
            <button
              onClick={() => handleNavClick(onScrollToPlanner)}
              className="p-3 text-left rounded-xl bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-700 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-emerald-600" />
              Trip Planner
            </button>
            <button
              onClick={() => handleNavClick(onScrollToTaxi)}
              className="p-3 text-left rounded-xl bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-700 flex items-center gap-2"
            >
              <Car className="w-4 h-4 text-emerald-600" />
              Taxis & Cabs
            </button>
            <a
              href="#travel-tips"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 text-left rounded-xl bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-700 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              Travel Tips
            </a>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/919888877777?text=Hi!%20I%20am%20planning%20a%20trip%20to%20Morni%20Hills."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white font-medium py-2.5 rounded-xl text-sm"
            >
              <MessageSquareShare className="w-4 h-4" />
              <span>Instant WhatsApp Trip Inquiry</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

