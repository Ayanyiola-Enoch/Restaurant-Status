import React from 'react';
import { Clock, Calendar, Phone, Sparkles, MessageCircle, ChevronDown, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { formatDate, getNextSundayDate, isOpenThisSunday } from '../lib/utils';

export default function HeroStatus({ status, onOpenSchedule }) {
  const nextSunday = getNextSundayDate();
  const nextSundayIsOpen = isOpenThisSunday(nextSunday);

  return (
    <header id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background with Ambient Glow and Image Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-[url(/assets/food.jpg)] bg-cover bg-center filter brightness-[0.22] scale-105 transform transition-transform duration-1000"
          style={{ willChange: 'transform' }}
        />
        {/* Colorful Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs sm:text-sm font-semibold mb-6 shadow-inner backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>Taste the Heart of Authentic Cooking</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight max-w-4xl leading-[1.1]">
          Fresh, Spicy & <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
            Unforgettable Flavors
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
          Welcome to <strong className="text-white font-semibold">{RESTAURANT_INFO.name}</strong>. Enjoy hot smoky Jollof, specialty fried rice, native soups, and crispy sides cooked daily from fresh ingredients.
        </p>

        {/* Real-time Status Card Component Container */}
        <div className="mt-8 w-full max-w-3xl glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/15 backdrop-blur-xl relative overflow-hidden group">
          
          {/* Subtle top edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Status Left Column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Current Status</span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400 font-medium">8:00 AM – 8:00 PM</span>
              </div>

              <div className="flex items-center gap-3">
                <div className={`px-4 py-1.5 rounded-full text-base sm:text-lg font-bold border flex items-center gap-2.5 shadow-sm ${status.badgeColor}`}>
                  <span className={`w-3 h-3 rounded-full ${status.isOpen ? "bg-emerald-500" : "bg-red-500"} animate-pulse`} />
                  <span>{status.statusText}</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 font-medium pt-1">
                {status.message}
              </p>
            </div>

            {/* Sunday Alternation Highlight Right Column */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Next Sunday Schedule
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${nextSundayIsOpen ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"}`}>
                  {nextSundayIsOpen ? "OPEN" : "CLOSED"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {nextSundayIsOpen ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <span className="text-xs sm:text-sm text-slate-200 font-medium">
                  {formatDate(nextSunday)}: <strong className="text-white">{nextSundayIsOpen ? "Open (8AM - 8PM)" : "Closed (Rest Week)"}</strong>
                </span>
              </div>

              <button
                onClick={onOpenSchedule}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 hover:underline transition-all cursor-pointer"
              >
                <span>View 4-Week Sunday Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action CTAs inside Status Card */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#menu"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-orange-500/20 hover:shadow-orange-500/35 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <span>View Full Menu & Prices</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent("Hello G&G Restaurant, I would like to place an order!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Order on WhatsApp</span>
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm border border-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Us</span>
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Mon - Sat: 8:00 AM - 8:00 PM</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Dine-in, Takeout & Delivery</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            <span>100% Fresh Daily Preparation</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <a 
          href="#menu" 
          className="mt-12 inline-flex items-center justify-center p-2 rounded-full text-slate-500 hover:text-amber-400 transition-colors animate-bounce"
          aria-label="Scroll to Menu"
        >
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </header>
  );
}
