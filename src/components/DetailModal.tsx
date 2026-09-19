"use client";

import { useEffect } from "react";
import { ExploreItem } from "@/data/morniData";
import {
  X,
  Star,
  MapPin,
  Clock,
  ExternalLink,
  Phone,
  Check,
  Compass,
} from "lucide-react";

interface DetailModalProps {
  item: ExploreItem | null;
  onClose: () => void;
}

export default function DetailModal({ item, onClose }: DetailModalProps) {
  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [item, onClose]);

  if (!item) return null;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    item.name + " Morni Hills Panchkula"
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-8 transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Container */}
        <div className="relative h-64 sm:h-72 w-full bg-stone-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badge & Category */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            {item.badge && (
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-sm">
                {item.badge}
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-stone-200 text-xs font-medium uppercase tracking-wider">
              {item.category}
            </span>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-2xl sm:text-3xl font-extrabold drop-shadow-sm">
              {item.name}
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 font-medium mt-1">
              {item.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Key Facts Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
              <div className="text-stone-400 text-[10px] uppercase font-bold">
                Rating
              </div>
              <div className="flex items-center gap-1 font-bold text-stone-800 mt-0.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{item.rating}</span>
                <span className="text-stone-400 font-normal">
                  ({item.reviewsCount} reviews)
                </span>
              </div>
            </div>

            {item.priceOrFee && (
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                <div className="text-stone-400 text-[10px] uppercase font-bold">
                  Price / Entry
                </div>
                <div className="font-bold text-emerald-700 mt-0.5">
                  {item.priceOrFee}
                </div>
              </div>
            )}

            {item.timing && (
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs col-span-2 sm:col-span-1">
                <div className="text-stone-400 text-[10px] uppercase font-bold">
                  Timings
                </div>
                <div className="font-medium text-stone-800 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{item.timing}</span>
                </div>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{item.location}</span>
          </div>

          {/* Full Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-2">
              About this destination
            </h4>
            <p className="text-stone-700 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-2">
              Highlights & Experiences
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {item.highlights.map((hl, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-stone-700 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Best For Tags */}
          <div>
            <span className="text-xs text-stone-400 uppercase font-bold tracking-wider mr-2">
              Best suited for:
            </span>
            <div className="inline-flex flex-wrap gap-1.5 mt-1">
              {item.bestFor.map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 capitalize"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3 text-stone-500" />
          </a>

          {item.contactPhone ? (
            <a
              href={`tel:${item.contactPhone}`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Host / Booking</span>
            </a>
          ) : (
            <a
              href={`https://wa.me/919888877777?text=${encodeURIComponent(
                `Hi! I want more info/help visiting "${item.name}" in Morni Hills.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <span>Ask Local Guide on WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

