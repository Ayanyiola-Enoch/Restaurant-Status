import React from "react";
import { RESTAURANT_INFO } from "../data/menuData";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Food Image with Floating Blue Quote Card */}
        <div className="lg:col-span-6 relative flex flex-col items-center">
          <div className="relative w-full max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-xl aspect-4/3 sm:aspect-square bg-slate-100">
            <img
              src="/assets/midImage.png"
              alt="Delicious Nigerian Soups and Delicacies"
              className="w-full h-full object-cover filter brightness-105"
            />
          </div>

          {/* Floating Blue Quote Card: Mobile friendly (integrated cleanly, absolute on sm+) */}
          <div className="w-full max-w-md sm:max-w-xs -mt-6 sm:mt-0 sm:absolute sm:-bottom-6 sm:left-4 p-5 sm:p-6 rounded-2xl bg-[#1E6FBA] text-white shadow-2xl space-y-2 border border-blue-400/30 z-10">
            <span className="text-3xl font-serif text-blue-200 leading-none select-none">
              “
            </span>
            <p className="text-xs sm:text-sm font-medium leading-relaxed italic text-white/95 -mt-2">
              Every dish is a celebration of bold, authentic flavors—rich,
              vibrant, and expertly crafted to delight your taste buds and keep
              you coming back for more.
            </p>
          </div>
        </div>

        {/* Right Column: About Content */}
        <div className="lg:col-span-6 space-y-5 sm:space-y-6 pt-4 sm:pt-6 lg:pt-0">
          <h2 className="text-3xl sm:text-5xl font-black text-[#1E6FBA] tracking-tight">
            About {RESTAURANT_INFO.name}
          </h2>

          <div className="space-y-3.5 sm:space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            <p>
              At <strong>{RESTAURANT_INFO.name}</strong>, we celebrate the
              warmth and richness of Nigerian hospitality through authentic,
              masterfully seasoned meals. From our renowned wood-smoked Party
              Jollof to our slow-simmered native soups, each recipe is built
              upon generational heritage and genuine culinary passion.
            </p>
            <p>
              We source our fresh bell peppers, herbs, and premium meats
              directly from trusted local markets every morning. Whether you are
              stopping by for a comforting lunch, ordering a family feast for
              the weekend, or sharing a meal with friends, we ensure every plate
              is served hot, fresh, and unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#DCE9F4]/50 border border-[#DCE9F4]">
              <span className="text-xl sm:text-2xl font-black text-[#1E6FBA] block">
                100%
              </span>
              <span className="text-xs text-slate-600 font-semibold">
                Fresh Daily Sourcing
              </span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#DCE9F4]/50 border border-[#DCE9F4]">
              <span className="text-xl sm:text-2xl font-black text-[#1E6FBA] block">
                10+
              </span>
              <span className="text-xs text-slate-600 font-semibold">
                Traditional Dishes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
