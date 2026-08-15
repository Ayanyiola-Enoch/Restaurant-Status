import React, { useState } from 'react';
import { Phone, MapPin, Clock, Calendar, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { getUpcomingSundays, formatDate, getNextSundayDate, isOpenThisSunday } from '../lib/utils';

export default function OpeningHoursSection({ status }) {
  const [showForecast, setShowForecast] = useState(false);
  const nextSunday = getNextSundayDate();
  const nextSundayIsOpen = isOpenThisSunday(nextSunday);
  const upcomingSundays = getUpcomingSundays(4);

  const daysSchedule = [
    { day: "Monday", time: "8:00 AM - 8:00 PM" },
    { day: "Tuesday", time: "8:00 AM - 8:00 PM" },
    { day: "Wednesday", time: "8:00 AM - 8:00 PM" },
    { day: "Thursday", time: "8:00 AM - 8:00 PM" },
    { day: "Friday", time: "8:00 AM - 8:00 PM" },
    { day: "Saturday", time: "8:00 AM - 8:00 PM" },
    { day: "Sunday", time: "8:00 AM - 8:00 PM (Alternating)" },
  ];

  return (
    <section id="hours" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        
        {/* Left Card: Opening Hours & Real-Time Status Card (Desktop: 8 cols, Mobile: full width) */}
        <div className="lg:col-span-8 bg-[#DCE9F4] p-5 sm:p-8 lg:p-10 rounded-3xl flex flex-col justify-between space-y-6 shadow-xs border border-blue-200/50">
          
          <div>
            {/* Title & Live Status Pill */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-blue-200/80">
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E6FBA] tracking-tight">
                Opening Hours
              </h2>
              
              {/* Real-time Status Badge */}
              <div className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs ${
                status.isOpen 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-rose-600 text-white'
              }`}>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>{status.statusText}</span>
              </div>
            </div>

            {/* Current Real-time Status Notice */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/85 border border-blue-200 text-xs sm:text-sm text-slate-700 mb-5 flex items-start gap-2.5 sm:gap-3 shadow-xs">
              <Clock className="w-4 h-4 text-[#1E6FBA] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-bold leading-snug">{status.message}</strong>
                <span className="text-slate-600 text-xs mt-0.5 block">
                  Monday – Saturday (8:00 AM – 8:00 PM) | Alternate Sundays (8:00 AM – 8:00 PM)
                </span>
              </div>
            </div>

            {/* Hours Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 sm:gap-y-3.5 text-xs sm:text-sm">
              {daysSchedule.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-blue-200/60">
                  <span className="font-bold text-[#1E6FBA]">{item.day}</span>
                  <span className="font-semibold text-slate-700">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sunday Alternation Info Pill */}
          <div className="pt-4 border-t border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Calendar className="w-4 h-4 text-[#1E6FBA] shrink-0" />
              <span>Next Sunday ({formatDate(nextSunday)}): <strong className={nextSundayIsOpen ? "text-emerald-700" : "text-rose-700"}>{nextSundayIsOpen ? "Open (8AM - 8PM)" : "Closed (Rest Week)"}</strong></span>
            </div>

            <button
              onClick={() => setShowForecast(!showForecast)}
              className="text-xs font-bold text-[#1E6FBA] hover:text-[#144d82] flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>{showForecast ? "Hide 4-Week Schedule" : "View 4-Week Sunday Roster"}</span>
              {showForecast ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Expandable 4-Week Sunday Forecast */}
          {showForecast && (
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 animate-in fade-in-50 duration-200">
              {upcomingSundays.map((sun, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                    sun.isOpen 
                      ? 'bg-emerald-50/95 border-emerald-300 text-emerald-800' 
                      : 'bg-rose-50/95 border-rose-300 text-rose-800'
                  }`}
                >
                  <span className="font-bold">{sun.formattedDate}</span>
                  <span className={`px-2 py-0.5 rounded-full font-black text-[10px] ${
                    sun.isOpen ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                  }`}>
                    {sun.isOpen ? "OPEN" : "CLOSED"}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Card: Reservations & Contact (Desktop: 4 cols, Mobile: full width) */}
        <div className="lg:col-span-4 bg-[#1E6FBA] p-5 sm:p-8 lg:p-10 rounded-3xl text-white flex flex-col justify-between space-y-6 shadow-xl border border-blue-400/20">
          
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Reservations & Orders
            </h3>

            <ul className="space-y-4 sm:space-y-5 text-sm">
              {/* Phone */}
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/15 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-white fill-white" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">Phone Order</span>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="font-extrabold text-sm sm:text-base text-white hover:underline">
                    {RESTAURANT_INFO.phoneDisplay}
                  </a>
                </div>
              </li>

              {/* Location */}
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/15 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">Address</span>
                  <p className="font-semibold text-xs sm:text-sm text-white/90 leading-snug">
                    {RESTAURANT_INFO.address}, {RESTAURANT_INFO.city}
                  </p>
                </div>
              </li>

              {/* WhatsApp */}
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/15 shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">WhatsApp Order</span>
                  <a 
                    href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace('+', '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-semibold text-xs sm:text-sm text-white hover:underline"
                  >
                    Direct Message Chat
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Action CTA Button */}
          <div className="pt-2 sm:pt-4">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent("Hello G&G Restaurant, I'd like to book a table / place an order!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-100 text-[#1E6FBA] font-black text-sm text-center shadow-lg transition-all hover:scale-[1.02] active:scale-95 block"
            >
              Order / Book a Table
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
