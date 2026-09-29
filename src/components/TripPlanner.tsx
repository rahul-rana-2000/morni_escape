"use client";

import { useState } from "react";
import {
  ITINERARY_DATABASE,
  ItineraryPlan,
} from "@/data/morniData";
import {
  Sparkles,
  Clock,
  Car,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  Coffee,
  Sun,
  Compass,
  Camera,
  Moon,
  Utensils,
  ChevronDown,
  PhoneCall,
  Hotel,
} from "lucide-react";

interface TripPlannerProps {
  onScrollToTaxi?: () => void;
}

type TravelerType = "family" | "couple" | "friends" | "solo";
type DurationType = "half-day" | "1-day" | "2-days";

const TRAVELERS: {
  id: TravelerType;
  label: string;
  emoji: string;
  desc: string;
}[] = [
  {
    id: "family",
    label: "Family",
    emoji: "👨‍👩‍👧",
    desc: "Gentle lake walks, boating & safe dining",
  },
  {
    id: "couple",
    label: "Couple",
    emoji: "❤️",
    desc: "Sunset points, cozy cafes & scenic chalets",
  },
  {
    id: "friends",
    label: "Friends",
    emoji: "👥",
    desc: "Adrenaline zipline, night camps & roadtrip",
  },
  {
    id: "solo",
    label: "Solo",
    emoji: "🎒",
    desc: "Peak summits, pine silence & mindful chill",
  },
];

const DURATIONS: {
  id: DurationType;
  label: string;
  badge: string;
  desc: string;
}[] = [
  {
    id: "half-day",
    label: "Half Day",
    badge: "4 - 5 Hours",
    desc: "Quick afternoon or morning escape",
  },
  {
    id: "1-day",
    label: "1 Day",
    badge: "Full Day Tour",
    desc: "Morning breakfast to sunset dinner",
  },
  {
    id: "2-days",
    label: "2 Days",
    badge: "Weekend Stay",
    desc: "Overnight camp or cozy resort stay",
  },
];

export default function TripPlanner({ onScrollToTaxi }: TripPlannerProps) {
  const [selectedTraveler, setSelectedTraveler] = useState<TravelerType>("couple");
  const [selectedDuration, setSelectedDuration] = useState<DurationType>("1-day");
  const [copied, setCopied] = useState(false);

  // Retrieve plan from itinerary database
  const planKey = `${selectedTraveler}_${selectedDuration}`;
  const currentPlan: ItineraryPlan =
    ITINERARY_DATABASE[planKey] || ITINERARY_DATABASE["couple_1-day"];

  const handleCopyItinerary = () => {
    const text = `🏞️ ${currentPlan.title}\n\nOverview: ${currentPlan.overview}\nBudget: ${currentPlan.estimatedBudget}\nTransport: ${currentPlan.transportAdvice}\n\nTimeline:\n${currentPlan.timeline
      .map((t) => `• ${t.time} - ${t.title} (${t.location}): ${t.description}`)
      .join("\n")}\n\nPlanned with Morni Escape 🌄`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getSlotIcon = (iconType: string) => {
    switch (iconType) {
      case "coffee":
        return <Coffee className="w-4 h-4 text-amber-600" />;
      case "sun":
        return <Sun className="w-4 h-4 text-amber-500" />;
      case "compass":
        return <Compass className="w-4 h-4 text-emerald-600" />;
      case "camera":
        return <Camera className="w-4 h-4 text-purple-600" />;
      case "moon":
        return <Moon className="w-4 h-4 text-indigo-600" />;
      case "utensils":
        return <Utensils className="w-4 h-4 text-orange-600" />;
      case "car":
      default:
        return <Car className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <section id="trip-planner" className="py-16 sm:py-24 bg-gradient-to-b from-stone-50 via-emerald-50/20 to-stone-100 border-t border-stone-200 text-stone-900 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-emerald-200/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-teal-200/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive AI Trip Builder</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900">
            Tailor Your Morni Escape
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg">
            Choose who you are traveling with and how long you want to stay. We will generate the exact itinerary for you.
          </p>
        </div>

        {/* STEP 1: Plan Your Escape */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shadow-xs">
              1
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
              Who Is Traveling?
            </h3>
          </div>
          <p className="text-center text-xs text-stone-500 mb-6">
            Pick your travel party to customize pace, stays & dining:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {TRAVELERS.map((item) => {
              const isSelected = selectedTraveler === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedTraveler(item.id)}
                  className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? "bg-gradient-to-br from-emerald-700 to-teal-800 text-white border-emerald-600 ring-2 ring-emerald-500/25 shadow-lg shadow-emerald-950/20 scale-[1.02]"
                      : "bg-white hover:bg-emerald-50/30 border-stone-200 hover:border-emerald-300 text-stone-800 shadow-xs"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                  )}
                  <div className="text-3xl sm:text-4xl mb-3">{item.emoji}</div>
                  <div
                    className={`font-bold text-base sm:text-lg mb-1 ${
                      isSelected ? "text-white" : "text-stone-900"
                    }`}
                  >
                    {item.label}
                  </div>
                  <div
                    className={`text-[11px] sm:text-xs leading-snug ${
                      isSelected ? "text-emerald-100" : "text-stone-500"
                    }`}
                  >
                    {item.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Down Arrow separator */}
        <div className="flex justify-center my-6">
          <div className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-xs flex items-center justify-center text-emerald-700 animate-bounce">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>

        {/* STEP 2: Choose Duration */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shadow-xs">
              2
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
              Choose Duration
            </h3>
          </div>
          <p className="text-center text-xs text-stone-500 mb-6">
            How much time do you want to spend in Morni Hills?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {DURATIONS.map((dur) => {
              const isSelected = selectedDuration === dur.id;
              return (
                <button
                  key={dur.id}
                  onClick={() => setSelectedDuration(dur.id)}
                  className={`p-4 sm:p-5 rounded-2xl border text-center transition-all duration-200 cursor-pointer relative ${
                    isSelected
                      ? "bg-gradient-to-br from-emerald-700 to-teal-800 text-white border-emerald-600 ring-2 ring-emerald-500/25 shadow-lg shadow-emerald-950/20 scale-[1.02]"
                      : "bg-white hover:bg-emerald-50/30 border-stone-200 hover:border-emerald-300 text-stone-800 shadow-xs"
                  }`}
                >
                  <div
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-2 border ${
                      isSelected
                        ? "bg-emerald-900/60 text-emerald-200 border-emerald-600/40"
                        : "bg-stone-100 text-stone-600 border-stone-200/80"
                    }`}
                  >
                    {dur.badge}
                  </div>
                  <div
                    className={`font-extrabold text-lg sm:text-xl mb-1 ${
                      isSelected ? "text-white" : "text-stone-900"
                    }`}
                  >
                    {dur.label}
                  </div>
                  <div
                    className={`text-xs ${
                      isSelected ? "text-emerald-100" : "text-stone-500"
                    }`}
                  >
                    {dur.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Down Arrow separator */}
        <div className="flex justify-center my-6">
          <div className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-xs flex items-center justify-center text-emerald-700">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>

        {/* STEP 3: Your Morni Escape (Personalized Result Card) */}
        <div className="max-w-4xl mx-auto bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-xl relative">
          {/* Header Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 text-xs uppercase tracking-widest font-bold mb-1">
                <span>⭐ Your Morni Escape Plan</span>
                <span>•</span>
                <span className="capitalize">{selectedTraveler}</span>
                <span>•</span>
                <span className="capitalize">{selectedDuration.replace("-", " ")}</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {currentPlan.title}
              </h4>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyItinerary}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 border border-stone-200 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copy Itinerary</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Check out this ${currentPlan.title} on Morni Escape:\nhttps://morniescape.com`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-xs font-semibold text-white shadow-xs transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </a>
            </div>
          </div>

          {/* Overview & Highlights Box */}
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
            {currentPlan.overview}
          </p>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
              <div className="text-stone-500 text-[11px] font-semibold uppercase tracking-wider mb-0.5">
                Estimated Budget
              </div>
              <div className="font-bold text-emerald-700 text-base">
                {currentPlan.estimatedBudget}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
              <div className="text-stone-500 text-[11px] font-semibold uppercase tracking-wider mb-0.5">
                Travel / Cab Advice
              </div>
              <div className="font-medium text-stone-800 text-xs line-clamp-2">
                {currentPlan.transportAdvice}
              </div>
            </div>

            {currentPlan.recommendedStay && (
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="text-stone-500 text-[11px] font-semibold uppercase tracking-wider mb-0.5 flex items-center gap-1">
                  <Hotel className="w-3 h-3 text-emerald-600" />
                  <span>Recommended Stay</span>
                </div>
                <div className="font-bold text-stone-900 text-xs line-clamp-2">
                  {currentPlan.recommendedStay}
                </div>
              </div>
            )}
          </div>

          {/* Step-by-Step Timeline */}
          <div className="mb-8">
            <h5 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Recommended Timeline & Route</span>
            </h5>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-300 space-y-6">
              {currentPlan.timeline.map((slot, index) => (
                <div key={index} className="relative group">
                  {/* Timeline icon dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center shadow-xs">
                    {getSlotIcon(slot.iconType)}
                  </div>

                  <div className="bg-stone-50/80 p-4 rounded-2xl border border-stone-200/80 hover:border-emerald-400 hover:bg-white transition-all shadow-2xs">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-emerald-800 tracking-wide uppercase">
                        {slot.time}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-stone-200 text-stone-700 font-medium">
                        📍 {slot.location}
                      </span>
                    </div>

                    <h6 className="font-bold text-base text-stone-900 mb-1">
                      {slot.title}
                    </h6>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-2">
                      {slot.description}
                    </p>

                    {slot.tip && (
                      <div className="text-[11px] bg-emerald-50 text-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>
                          <strong>Pro Tip:</strong> {slot.tip}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Packing checklist */}
          <div className="mb-8 p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <div className="text-xs uppercase tracking-wider text-stone-700 font-bold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Recommended Checklist For This Trip</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              {currentPlan.packingTips.map((tip, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Footer inside card */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-200">
            <div className="text-xs text-stone-500 text-center sm:text-left">
              Need a custom driver or verified cab for this route?
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onScrollToTaxi}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 text-xs font-semibold px-4 py-3 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                <Car className="w-3.5 h-3.5" />
                <span>View Taxi Fares</span>
              </button>
              <a
                href={`https://wa.me/919888877777?text=${encodeURIComponent(
                  `Hi Morni Escape, I want to book a trip for: ${currentPlan.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Book This Itinerary</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
