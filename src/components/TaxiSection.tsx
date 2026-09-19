"use client";

import { TAXI_PACKAGES, TaxiPackage } from "@/data/morniData";
import {
  Car,
  CheckCircle,
  PhoneCall,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

export default function TaxiSection() {
  const handleBookCab = (pkg: TaxiPackage) => {
    const text = `Hi Morni Escape! I want to inquire/book the cab package: "${pkg.route}" (${pkg.vehicleType}) for ${pkg.price}.`;
    window.open(
      `https://wa.me/919888877777?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <section id="taxi-section" className="py-16 sm:py-20 bg-stone-100/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-3">
            <span className="text-sm">🚕</span>
            <span>Morni Escape Official Cab Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Tricity to Morni Hills Taxis & Tours
          </h2>
          <p className="mt-2 text-stone-600 text-base sm:text-lg">
            Reliable, hill-expert drivers from Chandigarh, Panchkula, Mohali & Zirakpur to Morni Hills, Tikkar Taal, and retreats.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10 text-xs text-stone-700">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Certified Hill Drivers</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Transparent Flat Rates</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>24/7 Doorstep Pickup</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Clean AC Sedans & SUVs</span>
          </div>
        </div>

        {/* Taxi Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TAXI_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                {/* Popular badge */}
                <div className="text-[11px] font-bold text-amber-800 bg-amber-50 inline-block px-2.5 py-1 rounded-md mb-3 border border-amber-200/60">
                  {pkg.popularFor}
                </div>

                <h3 className="font-bold text-lg text-stone-900 mb-1 leading-snug">
                  {pkg.route}
                </h3>

                <div className="flex items-center gap-2 text-xs text-stone-500 mb-4">
                  <Car className="w-3.5 h-3.5 text-stone-400" />
                  <span>{pkg.vehicleType}</span>
                  <span>•</span>
                  <span>{pkg.capacity}</span>
                </div>

                {/* Price Display */}
                <div className="mb-4 pb-4 border-b border-stone-100">
                  <div className="text-2xl sm:text-3xl font-black text-stone-900">
                    {pkg.price}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    All inclusive price
                  </div>
                </div>

                <p className="text-stone-600 text-xs leading-relaxed mb-4">
                  {pkg.description}
                </p>

                {/* Inclusions */}
                <div className="space-y-1.5 mb-2">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-stone-400">
                    Included
                  </div>
                  {pkg.inclusions.map((inc, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-stone-700"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0 mt-auto">
                <button
                  onClick={() => handleBookCab(pkg)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-900 group-hover:bg-amber-600 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Book on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Route Callout Banner */}
        <div className="mt-12 bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span>Need Airport Pickup or Custom Multi-Stop Tempo Traveller?</span>
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
              We also arrange 12-16 seater Tempo Travellers for big family reunions and corporate college groups traveling from Delhi or Chandigarh Airport.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+919888877777"
              className="inline-flex items-center gap-2 bg-white text-stone-900 hover:bg-stone-100 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-emerald-700" />
              <span>Call +91 98888 77777</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

