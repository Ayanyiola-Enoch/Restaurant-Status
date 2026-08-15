import React from 'react';
import { Clock, Calendar, CheckCircle2, XCircle, Info, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { getUpcomingSundays, formatDate } from '../lib/utils';

export default function OpeningHoursSection({ status }) {
  const upcomingSundays = getUpcomingSundays(4);

  return (
    <section id="schedule" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          <span>Operational Hours</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Opening Schedule & <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Sunday Roster</span>
        </h2>

        <p className="text-slate-400 text-sm sm:text-base font-normal">
          We operate standard hours throughout the week and maintain an alternating Sunday opening schedule so our team can recharge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Weekly Standard Schedule (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>Weekly Schedule</span>
            </h3>
            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${status.badgeColor}`}>
              {status.statusText}
            </div>
          </div>

          <div className="space-y-4">
            {/* Monday - Saturday */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Monday – Saturday</h4>
                <p className="text-xs text-slate-400">Regular Service (Dine-in, Takeout, Delivery)</p>
              </div>
              <span className="text-sm font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-xl">
                8:00 AM – 8:00 PM
              </span>
            </div>

            {/* Sunday */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Sunday Service</h4>
                <p className="text-xs text-slate-400">Alternating Weeks Schedule</p>
              </div>
              <span className="text-sm font-black text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-xl">
                8:00 AM – 8:00 PM
              </span>
            </div>
          </div>

          {/* Important Note Box */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Info className="w-4 h-4" />
              <span>How our Sunday schedule works:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We open every other Sunday. If we are open this Sunday, we will be closed the following Sunday, and vice versa. Always check this status page or contact us before visiting on Sundays!
            </p>
          </div>

          {/* Quick Contact Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
            >
              <Phone className="w-4 h-4 fill-slate-950" />
              <span>Call: {RESTAURANT_INFO.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent("Hello G&G Restaurant, I'd like to check today's availability and place an order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>

        {/* Right Column: 4-Week Sunday Forecast Timeline (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-400" />
                <span>Sunday Opening Forecast</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Automated schedule for the next 4 consecutive Sundays</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingSundays.map((sun, index) => (
              <div
                key={index}
                className={`p-5 rounded-2xl border transition-all duration-300 ${
                  sun.isNext
                    ? sun.isOpen
                      ? 'bg-emerald-950/30 border-emerald-500/40 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-500/10'
                      : 'bg-rose-950/30 border-rose-500/40 ring-1 ring-rose-500/30 shadow-lg shadow-rose-500/10'
                    : 'bg-slate-900/70 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    {sun.isNext ? "Next Sunday (Upcoming)" : `Sunday +${index * 7} Days`}
                  </span>
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      sun.isOpen
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {sun.isOpen ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>OPEN</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>CLOSED</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-base font-extrabold text-white mb-1">
                  {sun.formattedDate}
                </div>

                <p className="text-xs text-slate-400">
                  {sun.isOpen
                    ? "Full menu service available from 8:00 AM to 8:00 PM."
                    : "Closed for scheduled rest week. Reopens Monday 8:00 AM."}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              Planning a weekend event or large group order? Contact us in advance for catering and special weekend bookings.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
