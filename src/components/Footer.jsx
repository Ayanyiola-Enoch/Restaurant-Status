import React, { useState, useEffect, useCallback } from "react";
import { Phone, MessageSquare, MapPin } from "lucide-react";
import { RESTAURANT_INFO } from "../data/menuData";

const API_KEY = import.meta.env.VITE_INBOXIT_API_KEY;
const WIDGET_URL = import.meta.env.VITE_WIDGET_URL;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [emailInput, setEmailInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Dynamically load the InboxIt widget script
  useEffect(() => {
    if (window.inboxit) return;
    const script = document.createElement("script");
    script.src = WIDGET_URL;
    script.async = true;
    script.onload = () => console.log("InboxIt widget loaded");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubscribe = useCallback(
    async (e) => {
      e.preventDefault();
      const email = emailInput.trim();
      const message = messageInput.trim();
      if (!email || !message) return;

      const inboxit = window.inboxit;
      if (typeof inboxit !== "function") {
        setError("Service unavailable. Please try again later.");
        return;
      }

      setIsSubmitting(true);
      setError("");

      try {
        inboxit("init", {
          apiKey: API_KEY,
          subject: `G&G Restaurant: New Message`,
          successMessage: "Message sent successfully!",
          errorMessage: "Something went wrong. Please try again.",
        });

        await inboxit("sendEmail", { email, message });

        setSubscribed(true);
        setEmailInput("");
        setMessageInput("");
      } catch (err) {
        setError("Failed to send. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [emailInput, messageInput],
  );

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

          {/* Send us a message / Contact Col (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5 sm:space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Send Us a Message
            </h4>
            <p className="text-xs text-white">
              Have a question, feedback, or special request? Drop us a message.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-white/20 text-xs font-bold text-white">
                Message sent successfully! We'll get back to you soon. 🎉
              </div>
            ) : (
              <form
                id="contact-form"
                onSubmit={handleSubscribe}
                className="space-y-2.5"
              >
                <input
                  type="email"
                  name="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Your email address"
                  required
                  disabled={isSubmitting}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/15 border border-white/25 text-white placeholder-blue-200 text-xs focus:outline-none focus:bg-white/25 disabled:opacity-50"
                />
                <textarea
                  name="message"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Your message..."
                  required
                  rows={3}
                  disabled={isSubmitting}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/15 border border-white/25 text-white placeholder-blue-200 text-xs focus:outline-none focus:bg-white/25 disabled:opacity-50 resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 rounded-xl bg-white text-[#1E6FBA] font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-[#1E6FBA] border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
                {error && (
                  <p className="text-red-200 text-[11px] font-medium">{error}</p>
                )}
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
