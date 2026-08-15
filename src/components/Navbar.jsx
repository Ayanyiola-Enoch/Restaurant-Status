import React, { useState } from 'react';
import { Phone, Clock, UtensilsCrossed, Menu as MenuIcon, X, MessageSquare, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Navbar({ status, onOpenSchedule }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-0.5 shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/food-png.png" 
                  alt="G&G Logo" 
                  className="h-8 w-8 object-contain filter brightness-110 drop-shadow group-hover:rotate-6 transition-transform" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  {RESTAURANT_INFO.name}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
                  Authentic
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                {RESTAURANT_INFO.tagline}
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#menu" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <UtensilsCrossed className="w-4 h-4 text-amber-500" />
              <span>Explore Menu</span>
            </a>
            <a href="#schedule" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Opening Hours</span>
            </a>
            <a href="#contact" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-amber-500" />
              <span>Contact Us</span>
            </a>
          </div>

          {/* Status Badge & Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Live Status Pill */}
            <button
              onClick={onOpenSchedule}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold shadow-sm transition-all hover:scale-105 ${status.badgeColor} cursor-pointer`}
              title="Click to view Sunday schedule details"
            >
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-emerald-500" : "bg-red-500"} animate-pulse-glow`} />
              <span>{status.statusText}</span>
              <span className="text-[10px] opacity-75 font-normal">| 8AM - 8PM</span>
            </button>

            {/* Quick Call Button */}
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="w-3.5 h-3.5 fill-slate-950" />
              <span>{RESTAURANT_INFO.phoneDisplay}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Status</span>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${status.badgeColor}`}>
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-emerald-500" : "bg-red-500"} animate-pulse-glow`} />
              <span>{status.statusText}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-base font-semibold text-slate-200">
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-3"
            >
              <UtensilsCrossed className="w-5 h-5 text-amber-400" />
              <span>Our Menu & Specials</span>
            </a>
            <a 
              href="#schedule" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-3"
            >
              <Clock className="w-5 h-5 text-amber-400" />
              <span>Opening Hours & Sunday Schedule</span>
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-3"
            >
              <Phone className="w-5 h-5 text-amber-400" />
              <span>Contact & Directions</span>
            </a>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md"
            >
              <Phone className="w-4 h-4 fill-slate-950" />
              <span>Call Us: {RESTAURANT_INFO.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent("Hello G&G Restaurant, I want to place an order!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
