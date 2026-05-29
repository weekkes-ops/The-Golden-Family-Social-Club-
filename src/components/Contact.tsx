/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, ShieldAlert, BadgeCheck } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Kindly declare your official name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setFormError("A verified email is required for the concierge.");
      return;
    }
    if (!message.trim() || message.length < 10) {
      setFormError("Kindly elaborate on your inquiry (minimum 10 characters).");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      // reset
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      // dynamic auto timeout
      setTimeout(() => {
        setIsSent(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-brand-dark text-[#fdfbf7] relative">
      {/* Decorative Blur elements */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div id="contact-header" className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono text-gold-500 uppercase tracking-widest block font-semibold">
            The Concierge Desk
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
            Reach Out to Our Society
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto"></div>
          <p className="text-gray-400 font-sans font-light text-sm">
            Interested in booking events, private estates touring, or proposing custom charitable endeavors? Submit a secure inquiry to the High Stewards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Physical Estates Info panel */}
          <div id="contact-info-panel" className="lg:col-span-4 bg-brand-slate border border-[#eeddae]/10 p-6 sm:p-8 rounded-lg flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-gold-500 font-semibold mb-2">
                COORDINATES OF THE ESTATE
              </span>

              {/* Physical Info listing */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-brand-dark rounded border border-gold-800/10 text-gold-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono uppercase text-gray-500 leading-none">
                      PHYSICAL SEAT
                    </span>
                    <span className="block text-xs font-sans text-gray-300 mt-1">
                      77 Golden Oak Dr, Richmond Surrey, TW10 6NW
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-brand-dark rounded border border-gold-800/10 text-gold-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono uppercase text-gray-500 leading-none">
                      SOCIETY LIAISON
                    </span>
                    <span className="block text-xs font-sans text-gray-300 mt-1 select-all hover:text-gold-300 transition-colors">
                      stewards@goldenfamilyclub.co.uk
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-brand-dark rounded border border-gold-800/10 text-gold-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono uppercase text-gray-500 leading-none">
                      CONCIERGE DIRECT
                    </span>
                    <span className="block text-xs font-sans text-gray-300 mt-1 select-all hover:text-gold-300 transition-colors">
                      +44 20 7946 0192
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-brand-dark rounded border border-gold-800/10 text-gold-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono uppercase text-gray-500 leading-none">
                      OFFICE HOURS
                    </span>
                    <span className="block text-xs font-sans text-gray-300 mt-1">
                      Daily: 09:00 AM - 06:00 PM GMT
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded maps simulation design block */}
            <div className="pt-6 border-t border-gold-800/20">
              <span className="block text-[8px] font-mono uppercase tracking-widest text-gray-500 leading-all">
                MAPPING SECTOR GPS
              </span>
              <div className="mt-2.5 w-full h-32 rounded bg-brand-dark border border-gold-800/15 overflow-hidden relative flex items-center justify-center text-center">
                
                {/* Mock Stylized Map Vector */}
                <div className="absolute inset-0 opacity-15 pointer-events-none scale-110">
                  <div className="absolute top-4 left-6 w-0.5 h-full bg-gold-400 pr-0.5 transform rotate-12"></div>
                  <div className="absolute top-16 left-0 w-full h-0.5 bg-gold-400 pr-0.5 transform -rotate-12"></div>
                  <div className="absolute top-8 right-12 w-0.5 h-full bg-gold-400 pr-0.5 transform -rotate-45"></div>
                  <div className="absolute top-2 w-12 h-12 bg-gold-400 rounded-lg"></div>
                  <div className="absolute bottom-4 right-1/4 w-16 h-16 rounded-full border border-gold-400"></div>
                </div>

                <div className="relative z-10 p-4">
                  <MapPin className="w-5 h-5 text-red-500 fill-red-500 animate-bounce mx-auto" />
                  <span className="block text-[10px] font-mono uppercase tracking-widest mt-1.5 text-gold-400 font-semibold leading-none">
                    Lakeside Pavillion
                  </span>
                  <span className="block text-[8px] text-gray-500 mt-0.5">
                    Surrey Gates Parking Available
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div id="contact-form-panel" className="lg:col-span-8 bg-brand-slate border border-[#eeddae]/10 p-6 sm:p-8 rounded-lg shadow-xl flex flex-col justify-between">
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-[#eeddae] font-semibold mb-2">
                PROPOSE SECURE INQUIRY
              </span>

              {formError && (
                <div className="p-3 bg-red-950/20 border border-red-800/30 text-xs text-red-500 rounded flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{formError}</span>
                </div>
              )}

              {isSent && (
                <div className="p-4 bg-emerald-950/20 border border-emerald-800/30 text-xs text-emerald-400 rounded flex items-center gap-3.5">
                  <BadgeCheck className="w-6 h-6 shrink-0 text-emerald-400 animate-pulse" />
                  <div>
                    <span className="block font-semibold">Concierge Ticket Dispatched</span>
                    <span className="block text-[10px] text-gray-400 font-sans leading-relaxed mt-0.5">
                      Your query has successfully filed inside our stewards registry folders. We seek to reply within 4 working hours.
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono uppercase tracking-wider text-gray-500">
                    Noble Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sterling Stirling"
                    className="w-full px-3.5 py-2 text-sm bg-brand-dark/60 border border-gold-800/20 rounded text-white focus:outline-none focus:border-gold-400 placeholder-gray-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono uppercase tracking-wider text-gray-500">
                    Noble Email Coordinate
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. s.stirling@estate.com"
                    className="w-full px-3.5 py-2 text-sm bg-brand-dark/60 border border-gold-800/20 rounded text-white focus:outline-none focus:border-gold-400 placeholder-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-mono uppercase tracking-wider text-gray-500">
                  Subject of Liaison
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Historic Manor Tour / Foundation Grant / Gala Seating Enquiry"
                  className="w-full px-3.5 py-2 text-sm bg-brand-dark/60 border border-gold-800/20 rounded text-white focus:outline-none focus:border-gold-400 placeholder-gray-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-mono uppercase tracking-wider text-gray-500">
                  Elaborate Your Message
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="State your requests or proposals with precision..."
                  rows={4}
                  className="w-full px-3.5 py-2 text-sm bg-brand-dark/60 border border-gold-800/20 rounded text-white focus:outline-none focus:border-gold-400 placeholder-gray-700"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-gold-800/20 flex items-center justify-between">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest leading-none">
                  SSL Encrypted Liaison
                </span>

                <button
                  id="submit-liaison-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-600 text-brand-dark font-mono text-xs uppercase tracking-widest font-semibold rounded shadow hover:from-gold-300 hover:to-gold-500 transition flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4.5 h-4.5 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
