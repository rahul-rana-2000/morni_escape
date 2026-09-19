"use client";

import { useMemo } from "react";
import {
  EXPLORE_CATEGORIES,
  EXPLORE_ITEMS,
  ExploreItem,
} from "@/data/morniData";
import {
  Star,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  Phone,
  Sparkles,
} from "lucide-react";

interface ExploreSectionProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onItemSelect: (item: ExploreItem) => void;
  onScrollToTaxi: () => void;
}

export default function ExploreSection({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onItemSelect,
  onScrollToTaxi,
}: ExploreSectionProps) {
  // Filter items based on activeCategory and searchQuery
  const filteredItems = useMemo(() => {
    let items = EXPLORE_ITEMS;

    if (activeCategory !== "all") {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }

    return items;
  }, [activeCategory, searchQuery]);

  return (
    <section id="explore" className="py-16 sm:py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover Morni Hills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Explore Morni
          </h2>
          <p className="mt-2 text-base sm:text-lg text-stone-600">
            Click on any category to explore hidden gems, lake activities, authentic hill food, and luxury stays.
          </p>
        </div>

        {/* User Prompt Categories:
            Places 🏞️, Stay 🏨, Food 🍴, Camping 🏕️, Activities 🥾, Photo Spots 📸, Taxi 🚕
        */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 pt-1 gap-2.5 no-scrollbar">
          <button
            onClick={() => onSelectCategory("all")}
            className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shadow-xs cursor-pointer ${
              activeCategory === "all"
                ? "bg-emerald-800 text-white shadow-emerald-900/20 scale-105"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <span>✨</span>
            <span>All Categories</span>
          </button>

          {EXPLORE_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.id === "taxi") {
                    onSelectCategory(cat.id);
                    onScrollToTaxi();
                  } else {
                    onSelectCategory(cat.id);
                  }
                }}
                className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                  isSelected
                    ? "bg-emerald-800 text-white shadow-emerald-900/20 scale-105"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Filter & Count Bar */}
        <div className="flex items-center justify-between mt-6 mb-8 text-sm text-stone-600 border-b border-stone-200/80 pb-3">
          <div>
            Showing <strong className="text-stone-900">{filteredItems.length}</strong>{" "}
            {activeCategory === "all" ? "destinations & services" : activeCategory}
            {searchQuery && (
              <span>
                {" "}
                matching &quot;<strong className="text-emerald-700">{searchQuery}</strong>&quot;
              </span>
            )}
          </div>
          {searchQuery && (
            <button
              onClick={() => onSelectCategory("all")}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-300 p-8">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-stone-900">No results found</h3>
            <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto">
              We couldn&apos;t find anything matching your search. Try searching for &quot;Tikkar Taal&quot;, &quot;Camping&quot;, or &quot;Fort&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300"
              >
                {/* Image & Badge Container */}
                <div className="relative h-56 w-full overflow-hidden bg-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-80" />

                  {/* Top Badge */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                      {item.badge}
                    </div>
                  )}

                  {/* Rating Tag */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-stone-800 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{item.rating}</span>
                    <span className="text-stone-400 font-normal">
                      ({item.reviewsCount})
                    </span>
                  </div>

                  {/* Category Pill on Image Bottom Left */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-stone-200 font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="truncate max-w-[220px]">{item.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs font-medium text-emerald-700 mt-0.5 mb-2">
                      {item.tagline}
                    </p>
                    <p className="text-stone-600 text-sm line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Highlights tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.highlights.slice(0, 3).map((hl) => (
                        <span
                          key={hl}
                          className="text-[11px] font-medium bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md"
                        >
                          {hl}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing / Timing Info & Actions */}
                  <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      {item.timing && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span>{item.timing}</span>
                        </div>
                      )}
                      {item.priceOrFee && (
                        <div className="font-semibold text-stone-800 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-sm">
                          {item.priceOrFee}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onItemSelect(item)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {item.contactPhone ? (
                        <a
                          href={`tel:${item.contactPhone}`}
                          className="p-2.5 rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50 text-stone-700 hover:text-emerald-700 transition-colors"
                          title="Call directly"
                          aria-label={`Call ${item.name}`}
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      ) : (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            item.name + " Morni Hills Panchkula"
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50 text-stone-700 hover:text-emerald-700 transition-colors"
                          title="Google Maps"
                          aria-label={`Open ${item.name} in Google Maps`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

