"use client";

import {
  Compass,
  Phone,
  ShieldAlert,
  Heart,
  Calendar,
  Car,
} from "lucide-react";
import Image from "next/image";

interface FooterProps {
  onScrollToExplore: () => void;
  onScrollToPlanner: () => void;
  onScrollToTaxi: () => void;
}

export default function Footer({
  onScrollToExplore,
  onScrollToPlanner,
  onScrollToTaxi,
}: FooterProps) {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/95 rounded-xl p-1.5 shadow-md">
                <Image
                  src="/Morni-escape.png"
                  alt="Morni Escape"
                  width={130}
                  height={42}
                  className="h-9 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Your comprehensive local digital guide to exploring Morni Hills, Haryana. Plan personalized escapes, discover lakeside camping, boutique stays, authentic Pahadi food, and book verified cabs.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Welcoming travelers 365 days a year</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onScrollToExplore}
                  className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Tikkar Taal Lakes</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToExplore}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Morni Fort & Museum
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToExplore}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Karoh Peak Hike
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToExplore}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Adventure Park Zipline
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToExplore}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Lakeside Camping
                </button>
              </li>
            </ul>
          </div>

          {/* Planning & Cabs */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Plan & Transit
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onScrollToPlanner}
                  className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Family Day Trips</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToPlanner}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Romantic Couple Escapes
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToPlanner}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Friends Camping Weekend
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToTaxi}
                  className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Chandigarh Cabs</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Helpline */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Emergency Helplines</span>
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-stone-500" />
                <span>Morni Police Chowki: 112</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-stone-500" />
                <span>Panchkula Civil Hospital: 108</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-stone-500" />
                <span>Forest Range Office: 01733-250123</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Phone className="w-3 h-3" />
                <span>Taxi Dispatch: +91 98888 77777</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} MORNI ESCAPE. Crafted for nature lovers and weekend explorers.
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Shivalik Hills Tourism</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

