import React, { useState } from 'react';
import { Phone, UtensilsCrossed, Menu as MenuIcon, X, Clock, MessageSquare } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Navbar({ status, onOpenSchedule }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border-2 border-[#1E6FBA] flex items-center justify-center p-1 bg-white shadow-xs">
              <img 
                src="/food-png.png" 
                alt="G&G Logo" 
                className="h-7 w-7 object-contain" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-[#1E6FBA]">
                {RESTAURANT_INFO.name}
              </span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#hero" className="hover:text-[#1E6FBA] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#1E6FBA] transition-colors">About Us</a>
            <a href="#hours" className="hover:text-[#1E6FBA] transition-colors">Hours & Status</a>
            <a href="#menu" className="hover:text-[#1E6FBA] transition-colors">Menu</a>
            <a href="#contact" className="hover:text-[#1E6FBA] transition-colors">Contact</a>
          </div>

          {/* Right Action & Live Status Badge */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Live Status Pill */}
            <button
              onClick={onOpenSchedule}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 cursor-pointer ${
                status.isOpen 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
              title="Click to view full schedule & Sunday alternating roster"
            >
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-emerald-500" : "bg-rose-500"} animate-pulse`} />
              <span>{status.statusText}</span>
              <span className="text-[11px] font-normal text-slate-500">| 8AM - 8PM</span>
            </button>

            {/* Blue Order Now CTA */}
            <a
              href="#menu"
              className="px-5 py-2.5 rounded-xl bg-[#1E6FBA] hover:bg-[#185d9c] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Order Now
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-black focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Today's Status</span>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
              status.isOpen ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-emerald-500" : "bg-rose-500"} animate-pulse`} />
              <span>{status.statusText}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-base font-semibold text-slate-800">
            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              About G&G
            </a>
            <a 
              href="#hours" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Opening Hours & Status
            </a>
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Full Menu
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Contact Us
            </a>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1E6FBA] text-white font-bold text-sm shadow-md"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Call Us: {RESTAURANT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
