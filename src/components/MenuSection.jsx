import React from 'react';
import DishCard from './DishCard';
import CategoryFilter from './CategoryFilter';
import { UtensilsCrossed, Sparkles } from 'lucide-react';
import { MENU_CATEGORIES } from '../data/menuData';

export default function MenuSection({
  dishes,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  onSelectDish
}) {
  const currentCategoryObj = MENU_CATEGORIES.find(c => c.id === activeCategory) || MENU_CATEGORIES[0];

  return (
    <section id="menu" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Delicious Catalog</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Explore Our <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Full Menu</span>
        </h2>

        <p className="text-slate-400 text-sm sm:text-base font-normal">
          {currentCategoryObj.subtitle ? `${currentCategoryObj.name} — ${currentCategoryObj.subtitle}` : "Select any dish to customize options, protein choices, and place your order directly via WhatsApp or call."}
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="mb-10">
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalDishes={dishes.length}
        />
      </div>

      {/* Dish Grid */}
      {dishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} onSelectDish={onSelectDish} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 px-4 glass-panel rounded-3xl max-w-md mx-auto border border-slate-800">
          <UtensilsCrossed className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-1">No dishes found</h3>
          <p className="text-sm text-slate-400 mb-6">
            We couldn't find any dishes matching "{searchQuery}". Try searching for Jollof, Fried Rice, or Swallows.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
