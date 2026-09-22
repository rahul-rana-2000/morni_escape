"use client";

import React, { useState } from "react";
import { MessageSquareShare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExploreSection from "@/components/ExploreSection";
import TripPlanner from "@/components/TripPlanner";
import TaxiSection from "@/components/TaxiSection";
import TravelTips from "@/components/TravelTips";
import DetailModal from "@/components/DetailModal";
import Footer from "@/components/Footer";
import { ExploreItem } from "@/data/morniData";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedDetailItem, setSelectedDetailItem] = useState<ExploreItem | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-emerald-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollTo("explore");
        }}
        onScrollToPlanner={() => scrollTo("trip-planner")}
        onScrollToExplore={() => scrollTo("explore")}
        onScrollToTaxi={() => scrollTo("taxi-section")}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onQuickChipClick={(chip) => {
            setSearchQuery(chip);
            scrollTo("explore");
          }}
          onStartPlanning={() => scrollTo("explore")}
        />

        {/* Explore Categories & Spots Section */}
        <ExploreSection
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onItemSelect={setSelectedDetailItem}
          onScrollToTaxi={() => scrollTo("taxi-section")}
        />

        {/* Interactive Trip Planner Itineraries */}
        <TripPlanner onScrollToTaxi={() => scrollTo("taxi-section")} />

        {/* Taxi / Cab Bookings */}
        <TaxiSection />

        {/* Essential Travel Tips & FAQs */}
        <TravelTips />
      </main>

      {/* Floating WhatsApp Trip Assistant */}
      <aside className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/919888877777?text=Hi!%20I%20am%20planning%20a%20trip%20to%20Morni%20Hills%20and%20need%20assistance."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all group font-semibold text-xs sm:text-sm border-2 border-white/40 cursor-pointer"
          title="Chat with Morni Travel Assistant"
        >
          <MessageSquareShare className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline">Trip Assistant</span>
        </a>
      </aside>

      {/* Detailed Modal Dialog */}
      <DetailModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
      />

      {/* Footer */}
      <Footer
        onScrollToExplore={() => scrollTo("explore")}
        onScrollToPlanner={() => scrollTo("trip-planner")}
        onScrollToTaxi={() => scrollTo("taxi-section")}
      />
    </div>
  );
}