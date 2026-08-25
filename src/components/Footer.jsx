import React, { useState } from "react";
import { Phone, MessageSquare, MapPin } from "lucide-react";
import { RESTAURANT_INFO } from "../data/menuData";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
    }
  };

  return (
    <footer
      id="contact"
      className="bg-[#1E6FBA] text-white pt-14 sm:pt-16 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-13"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-blue-400/30">
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {RESTAURANT_INFO.name}
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-sm">
              The rich flavors of home, reimagined for all seasons. Serving
              freshly seasoned Jollof, traditional soups, and mouth-watering
              sides every day.
            </p>
          </div>

          {/* Contact Col (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5 sm:space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/90">
              <li>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="hover:underline flex items-center gap-2"
                >
                  {/* <Phone className="w-3.5 h-3.5 fill-white shrink-0" /> */}
                  <span>{RESTAURANT_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-2"
                >
                  {/* <MessageSquare className="w-3.5 h-3.5 shrink-0" /> */}
                  <span>WhatsApp Chat</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-white">
                {/* <MapPin className="w-3.5 h-3.5 shrink-0" />  */}
                <span>
                  {RESTAURANT_INFO.address}, {RESTAURANT_INFO.city}
                </span>
              </li>
            </ul>
          </div>

          {/* Join the table / Newsletter Col (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5 sm:space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Join the Table
            </h4>
            <p className="text-xs text-white">
              Get Sunday schedule alerts and seasonal chef specials delivered to
              your inbox.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-white/20 text-xs font-bold text-white">
                Thank you for subscribing! 🎉
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
              >
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/15 border border-white/25 text-white placeholder-blue-200 text-xs focus:outline-none focus:bg-white/25"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white text-[#1E6FBA] font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] text-blue-200 text-center sm:text-left">
          <p>
            © {currentYear} {RESTAURANT_INFO.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="#hero" className="hover:underline">
              Home
            </a>
            <a href="#status" className="hover:underline">
              Opening Hours & Status
            </a>
            <a href="#menu" className="hover:underline">
              Menu
            </a>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="hover:underline"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
