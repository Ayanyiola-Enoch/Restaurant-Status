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
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-slate-200 focus:border-[#1E6FBA] focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all shadow-xs outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center px-2">
        {MENU_CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon] || UtensilsCrossed;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#1E6FBA] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-[#1E6FBA] border border-slate-200/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#1E6FBA]'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
