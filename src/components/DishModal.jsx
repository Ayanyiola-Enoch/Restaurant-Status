import React, { useState } from 'react';
import { X, Star, Clock, Flame, Plus, Minus, MessageCircle, Phone, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { formatNaira, formatDishPrice, parseDishPrice } from '../lib/utils';

export default function DishModal({ dish, onClose }) {
  if (!dish) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedProtein, setSelectedProtein] = useState(
    dish.proteinOptions && dish.proteinOptions.length > 0 ? dish.proteinOptions[0] : 'Standard Portion'
  );
  const [specialInstructions, setSpecialInstructions] = useState('');

  const calculateTotal = () => {
    let basePrice = parseDishPrice(dish.price).amount;
    if (selectedProtein.includes('+₦')) {
      const extraMatch = selectedProtein.match(/\+₦([\d,]+)/);
      if (extraMatch) {
        const extra = parseInt(extraMatch[1].replace(/,/g, ''), 10);
        basePrice += isNaN(extra) ? 0 : extra;
      }
    }
    return basePrice * quantity;
  };

  const totalPrice = calculateTotal();

  const handleWhatsAppOrder = () => {
    let message = 
      `Hello ${RESTAURANT_INFO.name}! 👋 I would like to place an order from your online menu:\n\n` +
      `🍽️ *Dish:* ${dish.name}\n` +
      `🍗 *Option / Choice:* ${selectedProtein}\n` +
      `🔢 *Quantity:* ${quantity}\n` +
      `💰 *Total:* ${formatNaira(totalPrice)}\n`;

    if (specialInstructions.trim()) {
      message += `📝 *Note:* ${specialInstructions.trim()}\n`;
    }

    message += `\nPlease confirm if this is available for pickup / delivery. Thank you!`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${RESTAURANT_INFO.whatsapp.replace('+', '')}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200" 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-4 sm:my-8 max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-white/90 text-slate-700 hover:text-black border border-slate-200 hover:bg-white transition-all cursor-pointer shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Top Header Image */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-100 overflow-hidden shrink-0">
          <img
            src={dish.image || '/assets/food.jpg'}
            alt={dish.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/food.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badges on image */}
          <div className="absolute bottom-3.5 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 flex items-end justify-between text-white">
            <div className="max-w-[70%]">
              {dish.badge && (
                <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-black bg-[#1E6FBA] text-white shadow-xs mb-1">
                  {dish.badge}
                </span>
              )}
              <h2 className="text-xl sm:text-3xl font-black drop-shadow-md leading-tight">
                {dish.name}
              </h2>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] sm:text-xs uppercase text-blue-200 font-bold block">Price</span>
              <span className="text-xl sm:text-3xl font-black text-white">
                {formatDishPrice(dish)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
          
          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold pb-3 sm:pb-4 border-b border-slate-100 text-slate-600">
            <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{dish.rating} ({dish.reviews})</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-[#1E6FBA]" />
              <span>Prep: {dish.prepTime}</span>
            </div>

            {dish.spiceLevel && dish.spiceLevel !== 'None' && (
              <div className="flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 text-rose-700">
                <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>{dish.spiceLevel}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Description</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {dish.description}
            </p>
          </div>

          {/* Key Ingredients */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Ingredients</h4>
              <div className="flex flex-wrap gap-1">
                {dish.ingredients.map((ing, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-[#EEF5FA] text-[#1E6FBA] border border-blue-100">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Protein / Options Customization */}
          {dish.proteinOptions && dish.proteinOptions.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Select Option / Protein Choice
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dish.proteinOptions.map((opt, i) => {
                  const isSelected = selectedProtein === opt;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedProtein(opt)}
                      className={`flex items-center justify-between px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                        isSelected
                          ? 'bg-[#1E6FBA] border-[#1E6FBA] text-white shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-1.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Special Requests (Optional)</h4>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra spicy, pack separately..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E6FBA]"
            />
          </div>

          {/* Quantity and Live Total */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#EEF5FA] border border-blue-200">
            <div>
              <span className="text-[11px] text-slate-500 block font-semibold">Quantity</span>
              <div className="flex items-center gap-2.5 mt-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 flex items-center justify-center font-bold transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-base sm:text-lg font-black text-slate-900 w-5 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 flex items-center justify-center font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Total</span>
              <span className="text-xl sm:text-2xl font-black text-[#1E6FBA] block">
                {formatNaira(totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions: stacked on mobile, row on sm+ */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={handleWhatsAppOrder}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#1E6FBA] hover:bg-[#185d9c] text-white font-black text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Order via WhatsApp ({formatNaira(totalPrice)})</span>
          </button>

          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#1E6FBA]" />
            <span>Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}
