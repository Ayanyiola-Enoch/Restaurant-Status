import React from "react";
import { ArrowRight } from "lucide-react";
import { RESTAURANT_INFO } from "../data/menuData";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">
        {/* Left Column (Desktop: 6 cols, Mobile: full width) */}
        <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left">
          {/* Red Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-[#E11D48] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-widest shadow-xs">
            <span>Authentic Cuisine</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#1E6FBA] tracking-tight leading-[1.1] sm:leading-[1.08]">
            Our <br />
            Heritage <br />
            on a Plate
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed font-medium">
            A culinary journey through the flavors of Nigeria, reimagined with
            contemporary techniques and authentic, rich home-cooked ingredients.
          </p>

          {/* Quick Buttons: Full-width on mobile, auto width on desktop */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <a
              href="#menu"
              className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl bg-[#1E6FBA] hover:bg-[#185d9c] text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#hours"
              className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all"
            >
              View Opening Status
            </a>
          </div>
        </div>

        {/* Right Column (Desktop: 6 cols, Mobile: full width centered) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end mt-4 lg:mt-0">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl bg-slate-100 aspect-4/3 sm:aspect-square">
            <img
              src="/assets/HeroImage.png"
              alt="Authentic Nigerian Jollof Rice & Plantain"
              className="w-full h-full object-cover filter brightness-105 hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/logo.png";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
