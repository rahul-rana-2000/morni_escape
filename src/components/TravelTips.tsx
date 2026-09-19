"use client";

import { useState } from "react";
import { MORNI_FAQS } from "@/data/morniData";
import {
  HelpCircle,
  ChevronDown,
  AlertTriangle,
  Compass,
  Signal,
  CreditCard,
  SunMedium,
  CheckCircle2,
} from "lucide-react";

export default function TravelTips() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="travel-tips" className="py-16 sm:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Local Traveler Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Essential Morni Travel Tips & FAQs
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg">
            Everything you should know before starting your drive to the Shivaliks.
          </p>
        </div>

        {/* 4 Practical Advice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900 mb-2">
              Mountain Ghat Driving
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              The road from Panchkula / Chandimandir is well-paved with gentle winding hairpins. Drive in lower gear, use horn on blind curves, and avoid night driving in heavy fog.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <SunMedium className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900 mb-2">
              Best Timing & Season
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              September to March has pleasant, clear days (16°C – 24°C). For day-trippers, arrive by 10 AM to enjoy Tikkar Taal boating before afternoon crowd builds up.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
              <Signal className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900 mb-2">
              Mobile Network & Wi-Fi
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Jio and Airtel have strong 4G connectivity across Morni town, Tikkar Taal, and resorts. Deeper pine forest trails like Karoh Peak may see fluctuating signals.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900 mb-2">
              Cash & Online UPI
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              UPI (Google Pay / PhonePe / Paytm) works at most lakeside stalls and dhabas. However, ATMs in Morni village are limited, so carry ₹1,000–₹2,000 cash for entry tickets.
            </p>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-bold text-stone-900">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {MORNI_FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-stone-50/50 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-stone-900 hover:text-emerald-700 cursor-pointer"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-stone-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-emerald-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60 mt-1 pt-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{faq.a}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

