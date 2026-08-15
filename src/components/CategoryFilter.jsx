import React from 'react';
import { Search, X, UtensilsCrossed, Soup, Sparkles, Flame, Drumstick, GlassWater } from 'lucide-react';
import { MENU_CATEGORIES } from '../data/menuData';

const iconMap = {
  UtensilsCrossed,
  Soup,
  Sparkles,
  Flame,
  Drumstick,
  GlassWater
};

export default function CategoryFilter({ activeCategory, setActiveCategory, searchQuery, setSearchQuery, totalDishes }) {
  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <div className="relative max-w-xl mx-auto">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes (e.g., Jollof, Fried Rice, Asun, Egusi, Catfish)..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-slate-400 text-sm font-medium transition-all shadow-inner backdrop-blur-md outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Slider / Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center px-2">
        {MENU_CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon] || UtensilsCrossed;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-orange-500/25 scale-[1.02]'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950 stroke-[2.5]' : 'text-amber-400'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
