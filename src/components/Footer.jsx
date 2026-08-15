import React from 'react';
import { Phone, MessageSquare, MapPin, Clock, Heart, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <img 
                    src="/food-png.png" 
                    alt="Logo" 
                    className="h-6 w-6 object-contain" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <span className="text-xl font-black text-white">{RESTAURANT_INFO.name}</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Serving delicious, authentic, home-cooked Nigerian dishes made daily with love, premium spices, and the finest fresh ingredients.
            </p>
          </div>

          {/* Quick Contact Col */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">Order & Inquiries</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="flex items-center gap-2.5 hover:text-amber-400 transition-colors">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{RESTAURANT_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace('+', '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{RESTAURANT_INFO.address}, {RESTAURANT_INFO.city}</span>
              </li>
            </ul>
          </div>

          {/* Service Hours Col */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">Opening Hours</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start justify-between pb-1.5 border-b border-slate-900">
                <span className="text-slate-400">Mon – Sat:</span>
                <span className="font-semibold text-white">8:00 AM – 8:00 PM</span>
              </li>
              <li className="flex items-start justify-between pb-1.5 border-b border-slate-900">
                <span className="text-slate-400">Sunday:</span>
                <span className="font-semibold text-amber-400">8:00 AM – 8:00 PM (Alternating)</span>
              </li>
            </ul>
            <p className="text-[11px] text-slate-500 leading-tight">
              *Check our live status banner at the top of the page for real-time Sunday opening updates.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">Quick Links</h4>
            <div className="flex flex-col space-y-2 text-sm text-slate-400">
              <a href="#hero" className="hover:text-amber-400 transition-colors">Home & Status</a>
              <a href="#menu" className="hover:text-amber-400 transition-colors">Full Food Catalog</a>
              <a href="#schedule" className="hover:text-amber-400 transition-colors">Sunday Alternation Roster</a>
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-amber-400 transition-colors">Place Phone Order</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {RESTAURANT_INFO.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for authentic food lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
