import React from 'react';
import { Star, Clock, Flame, Plus, MessageCircle } from 'lucide-react';
import { formatNaira } from '../lib/utils';

export default function DishCard({ dish, onSelectDish }) {
  const getSpiceBadge = (level) => {
    switch (level) {
      case 'Extra Hot':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1"><Flame className="w-3 h-3 fill-red-400" /> Extra Hot</span>;
      case 'Hot':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center gap-1"><Flame className="w-3 h-3 fill-orange-400" /> Spicy</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Medium</span>;
      case 'Mild':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Mild</span>;
      default:
        return null;
    }
  };

  return (
    <div 
      onClick={() => onSelectDish(dish)}
      className="group glass-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between cursor-pointer border border-white/5 hover:border-amber-500/30 hover:-translate-y-1.5"
    >
      {/* Top Image & Badges */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={dish.image || '/food.jpg'}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-95"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/food.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Custom badge top left */}
        {dish.badge && (
          <div className="absolute top-3.5 left-3.5">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md">
              {dish.badge}
            </span>
          </div>
        )}

        {/* Spice Level top right */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 backdrop-blur-md bg-slate-950/60 rounded-full px-2 py-1">
          {getSpiceBadge(dish.spiceLevel)}
        </div>

        {/* Price Tag Bottom Left */}
        <div className="absolute bottom-3 left-4">
          <span className="text-2xl font-black text-white drop-shadow-md tracking-tight">
            {formatNaira(dish.price)}
          </span>
        </div>

        {/* Prep Time Bottom Right */}
        <div className="absolute bottom-3 right-4 flex items-center gap-1 text-[11px] font-semibold text-slate-300 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>{dish.prepTime}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{dish.rating}</span>
              <span className="text-slate-500 font-normal">({dish.reviews})</span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-md">
              Available
            </span>
          </div>

          {/* Dish Name */}
          <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {dish.name}
          </h3>

          {/* Dish Description */}
          <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed font-normal">
            {dish.description}
          </p>
        </div>

        {/* Options & Order Button */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 truncate">
            {dish.proteinOptions && dish.proteinOptions.length > 0 ? (
              <span>Choice: <strong className="text-slate-300">{dish.proteinOptions[0]}</strong></span>
            ) : (
              <span>Freshly cooked</span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectDish(dish);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Order</span>
          </button>
        </div>
      </div>
    </div>
  );
}
