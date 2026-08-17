import React from "react";
import {
  Star,
  Clock,
  Flame,
  Plus,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { formatNaira, formatDishPrice } from "../lib/utils";
import CategoryFilter from "./CategoryFilter";

export default function MenuSection({
  dishes,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  onSelectDish,
}) {
  // If user is searching or has filtered specifically
  const isFiltered = activeCategory !== "all" || searchQuery.trim().length > 0;

  const regularDishes = dishes.filter((d) => d.category === "regular");
  const soupDishes = dishes.filter((d) => d.category === "swallows");
  const extraDishes = dishes.filter(
    (d) => d.category === "sides" || d.category === "drinks",
  );
  const specialDishes = dishes.filter((d) => d.category === "specials");

  return (
    <div
      id="menu"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-20 scroll-mt-20"
    >
      {/* Category Tabs & Search Bar */}
      <div className="space-y-4">
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalDishes={dishes.length}
        />
      </div>

      {/* FILTERED RESULTS VIEW (When searching or viewing specific category) */}
      {isFiltered ? (
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="text-xl sm:text-2xl font-black text-[#1E6FBA] capitalize">
              {activeCategory === "all"
                ? `Search: "${searchQuery}"`
                : `${activeCategory} Dishes`}
            </h3>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {dishes.length} {dishes.length === 1 ? "Dish" : "Dishes"}
            </span>
          </div>

          {dishes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {dishes.map((dish) => (
                <RegularDishCard
                  key={dish.id}
                  dish={dish}
                  onSelectDish={onSelectDish}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 bg-[#F8FAFC] rounded-3xl border border-slate-200 max-w-md mx-auto p-6">
              <UtensilsCrossed className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-800">
                No dishes match your search
              </h4>
              <p className="text-xs text-slate-500 mt-1 mb-5">
                Try searching for Jollof, Fried Rice, Egusi or Dodo.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#1E6FBA] text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      ) : (
        /* DEFAULT MOCKUP LAYOUT */
        <div className="space-y-16 sm:space-y-24">
          {/* 1. REGULAR SECTION */}
          <section className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b-2 border-slate-100">
              <h2 className="text-2xl sm:text-4xl font-black text-[#1E6FBA] tracking-tight">
                Regular
              </h2>
              <span className="text-[10px] sm:text-xs font-black tracking-widest text-slate-400 uppercase">
                The Foundation of Home
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {regularDishes.map((dish) => (
                <RegularDishCard
                  key={dish.id}
                  dish={dish}
                  onSelectDish={onSelectDish}
                />
              ))}
            </div>
          </section>

          {/* 2. SOUPS & SOLIDS SECTION */}
          <section className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b-2 border-slate-100">
              <h2 className="text-2xl sm:text-4xl font-black text-[#1E6FBA] tracking-tight">
                Soups & Solids
              </h2>
              <span className="text-[10px] sm:text-xs font-black tracking-widest text-slate-400 uppercase">
                Traditional Hearty Bowls
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
              {soupDishes.map((dish) => (
                <SoupHorizontalCard
                  key={dish.id}
                  dish={dish}
                  onSelectDish={onSelectDish}
                />
              ))}
            </div>
          </section>

          {/* 3. CHEF'S SPECIALS SECTION */}
          {specialDishes.length > 0 && (
            <section className="space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b-2 border-slate-100">
                <h2 className="text-2xl sm:text-4xl font-black text-[#1E6FBA] tracking-tight flex items-center gap-2">
                  <span>Chef's Specials</span>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                </h2>
                <span className="text-[10px] sm:text-xs font-black tracking-widest text-slate-400 uppercase">
                  Signature Delights
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                {specialDishes.map((dish) => (
                  <RegularDishCard
                    key={dish.id}
                    dish={dish}
                    onSelectDish={onSelectDish}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 4. EXTRAS SECTION */}
          <section className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b-2 border-slate-100">
              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#1E6FBA] tracking-tight">
                  Extras
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  The perfect accompaniments, drinks and proteins
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
              {/* Featured Tall Card on Left (Desktop: 6 cols, Mobile: full width) */}
              <div
                onClick={() => onSelectDish(extraDishes[0] || dishes[0])}
                className="md:col-span-6 group relative rounded-3xl overflow-hidden shadow-xl min-h-[300px] sm:min-h-[380px] bg-slate-900 cursor-pointer"
              >
                <img
                  src="/food.jpg"
                  alt="Crispy Chicken"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      Crispy Chicken Quarter
                    </h3>
                    <p className="text-xs text-slate-300 max-w-xs mt-0.5">
                      Deep seasoned and golden fried
                    </p>
                  </div>
                  <span className="text-lg sm:text-xl font-black text-amber-400 bg-slate-950/80 backdrop-blur-md px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl border border-white/10">
                    ₦2,200
                  </span>
                </div>
              </div>

              {/* Right Side Cards (Desktop: 6 cols, Mobile: full width grid) */}
              <div className="md:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
                {/* Wara / Beef Card (Full width on mobile grid) */}
                <div
                  onClick={() => onSelectDish(extraDishes[1] || dishes[1])}
                  className="col-span-2 group relative rounded-3xl overflow-hidden shadow-md h-36 sm:h-44 bg-slate-900 cursor-pointer"
                >
                  <img
                    src="/food.jpg"
                    alt="Peppered Beef"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 flex items-center justify-between">
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-white">
                        Spicy Peppered Beef
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-300">
                        Tender beef cuts in scotch bonnet glaze
                      </p>
                    </div>
                    <span className="text-sm sm:text-base font-black text-amber-400">
                      ₦2,500
                    </span>
                  </div>
                </div>

                {/* Dodo Card */}
                <div
                  onClick={() => onSelectDish(extraDishes[0] || dishes[0])}
                  className="group relative rounded-2xl overflow-hidden shadow-xs h-32 sm:h-40 bg-slate-900 cursor-pointer"
                >
                  <img
                    src="/food.jpg"
                    alt="Golden Fried Dodo"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-black text-white">
                      Dodo
                    </span>
                    <span className="text-xs font-black text-amber-400">
                      ₦1,000
                    </span>
                  </div>
                </div>

                {/* Zobo / Drink Card */}
                <div
                  onClick={() =>
                    onSelectDish(
                      extraDishes.find((d) => d.category === "drinks") ||
                        dishes[2],
                    )
                  }
                  className="group relative rounded-2xl overflow-hidden shadow-xs h-32 sm:h-40 bg-slate-900 cursor-pointer"
                >
                  <img
                    src="/food.jpg"
                    alt="Chilled Zobo Drink"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-black text-white">
                      Chilled Zobo
                    </span>
                    <span className="text-xs font-black text-amber-400">
                      ₦800
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

// 1. Regular Dish Card
function RegularDishCard({ dish, onSelectDish }) {
  return (
    <div
      onClick={() => onSelectDish(dish)}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
    >
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={dish.image || "/logo.png"}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/food.jpg";
          }}
        />
        {dish.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-[#1E6FBA] text-white shadow-xs">
            {dish.badge}
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-black text-[#1E6FBA] group-hover:text-blue-700 transition-colors">
              {dish.name}
            </h3>
            <span className="text-sm font-black text-slate-800 shrink-0">
              {formatDishPrice(dish)}
            </span>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
            {dish.description}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            Prep: {dish.prepTime}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectDish(dish);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-[#DCE9F4] hover:bg-[#1E6FBA] text-[#1E6FBA] hover:text-white font-bold transition-all cursor-pointer"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
}

// 2. Soup Card (Adapts to stacked on mobile, row on tablet/desktop)
function SoupHorizontalCard({ dish, onSelectDish }) {
  const swallows = ["Pounded Yam", "Semovita", "Eba / Garri", "Fufu"];

  return (
    <div
      onClick={() => onSelectDish(dish)}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 cursor-pointer hover:-translate-y-1"
    >
      <div className="relative w-full sm:w-44 h-40 sm:h-44 rounded-xl overflow-hidden bg-slate-100 shrink-0">
        <img
          src={dish.image || "/food.jpg"}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/food.jpg";
          }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 className="text-lg sm:text-xl font-black text-[#1E6FBA]">
              {dish.name}
            </h3>
            <span className="text-sm sm:text-base font-black text-slate-800">
              {formatDishPrice(dish)}
            </span>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
            {dish.description}
          </p>
        </div>

        {/* Swallow selection pills */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Available Swallows:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {swallows.map((s, idx) => (
              <span
                key={idx}
                className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#EEF5FA] text-[#1E6FBA] border border-blue-100"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
