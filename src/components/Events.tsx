/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, MapPin, Check, Plus, AlertCircle, Sparkles, UserCheck } from "lucide-react";
import { ClubEvent } from "../types";
import { useAuth } from "../context/AuthContext";

interface EventsProps {
  events: ClubEvent[];
  onRSVP: (eventId: string, guestName: string, guestEmail: string) => void;
  userRSVPs: string[]; // List of eventIds user already RSVP'd to
}

export default function Events({ events, onRSVP, userRSVPs }: EventsProps) {
  const { currentUser } = useAuth();
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [justBookedId, setJustBookedId] = useState<string | null>(null);

  // Auto-prefill coordinates for registered members when opening booking form
  useEffect(() => {
    if (currentUser && activeModalId) {
      setGuestName(currentUser.name);
      setGuestEmail(currentUser.email);
    }
  }, [currentUser, activeModalId]);

  const handleOpenRSVP = (eventId: string) => {
    setActiveModalId(eventId);
    if (!currentUser) {
      setGuestName("");
      setGuestEmail("");
    }
    setFormError("");
  };

  const handleCancel = () => {
    setActiveModalId(null);
  };

  const handleSubmit = (e: React.FormEvent, eventId: string) => {
    e.preventDefault();

    if (!guestName.trim()) {
      setFormError("Kindly supply your noble name.");
      return;
    }
    if (!guestEmail.trim() || !guestEmail.includes("@")) {
      setFormError("A legitimate email address is requested.");
      return;
    }

    // Process RSVP
    onRSVP(eventId, guestName, guestEmail);
    setActiveModalId(null);
    setJustBookedId(eventId);

    // Timeout toast representation
    setTimeout(() => {
      setJustBookedId(null);
    }, 4000);
  };

  return (
    <section
      id="events"
      className="py-24 bg-brand-dark text-[#fdfbf7] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div id="events-section-header" className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.3em] block font-bold">
            The Social Calendar
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white animate-fade-in">
            Upcoming Club Gatherings
          </h2>
          <div className="w-16 h-px bg-[#C5A059] mx-auto"></div>
          <p className="text-gray-400 font-sans font-light text-sm max-w-lg mx-auto">
            Our private salon gatherings, formal banquets, and friendly sports rounds are open to active society members and invited benefactors. Reserving your seat in advance is requested.
          </p>
        </div>

        {/* Floating Session RSVP Toast */}
        <AnimatePresence>
          {justBookedId && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 p-4 bg-[#141414] border-l-2 border-emerald-500 text-white shadow-2xl flex items-center space-x-3.5 max-w-sm rounded-none border border-white/5"
            >
              <div className="w-8 h-8 rounded-none bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Check className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                  RSVP Registration Success
                </p>
                <p className="text-xs text-gray-400 font-sans mt-0.5">
                  Your seat has been reserved. A gilded email invitation is en route to you!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Events Grid */}
        <div id="events-grid-layout" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((clubEvent) => {
            const hasJoined = userRSVPs.includes(clubEvent.id);
            const isFull = clubEvent.seatsBooked >= clubEvent.seatsTotal;
            const remainingSeats = clubEvent.seatsTotal - clubEvent.seatsBooked;

            return (
              <div
                key={clubEvent.id}
                id={`event-card-${clubEvent.id}`}
                className="group flex flex-col md:flex-row bg-[#141414] border border-white/5 hover:border-[#C5A059]/30 rounded-none overflow-hidden transition-all duration-300 shadow-2xl"
              >
                {/* Event Cover Image */}
                <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden shrink-0">
                  <img
                    src={clubEvent.image}
                    alt={clubEvent.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/40 to-transparent font-sans"></div>
                  
                  {/* Spots indicator pill */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase font-bold rounded-none bg-black border ${
                        isFull
                          ? "text-red-400 border-red-900/30"
                          : remainingSeats <= 5
                          ? "text-amber-400 border-amber-950/40"
                          : "text-[#C5A059] border-white/10"
                      }`}
                    >
                      {isFull ? "Gala Capacity Met" : `${remainingSeats} invitation seats left`}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl text-[#C5A059] font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                      {clubEvent.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-sans font-light leading-relaxed">
                      {clubEvent.description}
                    </p>
                  </div>

                  {/* Metadata Icons Grid */}
                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    <div className="flex items-center text-xs text-gray-300 gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span className="font-mono text-[10px] tracking-wider">{clubEvent.date}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-300 gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span className="font-mono text-[10px] text-gray-400 tracking-wider">{clubEvent.time}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-300 gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 opacity-80" />
                      <span className="font-sans font-light text-gray-400 truncate text-[11px] uppercase tracking-wide">{clubEvent.location}</span>
                    </div>
                  </div>

                  {/* RSVP Call-to-action button */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono tracking-widest text-[#C5A059] uppercase leading-none font-bold">
                        TICKET STATUS
                      </span>
                      <span className="text-xs font-serif italic text-white mt-1">
                        {isFull ? "Join Waitlist" : hasJoined ? "RSVP Confirmed" : "Sovereign Pass"}
                      </span>
                    </div>

                    <button
                      id={`rsvp-btn-${clubEvent.id}`}
                      disabled={hasJoined || isFull}
                      onClick={() => handleOpenRSVP(clubEvent.id)}
                      className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase rounded-none border transition-all duration-200 cursor-pointer ${
                        hasJoined
                          ? "bg-emerald-950/20 text-emerald-400 border-emerald-800/40"
                          : isFull
                          ? "bg-black text-gray-600 border-white/5 pointer-events-none"
                          : "bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-black hover:border-[#C5A059] active:translate-y-0.5"
                      }`}
                    >
                      {hasJoined ? (
                        <span className="flex items-center space-x-1">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Booked</span>
                        </span>
                      ) : isFull ? (
                        "Full House"
                      ) : (
                        "Book Seat"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic RSVP modal */}
        <AnimatePresence>
          {activeModalId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Blur backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCancel}
                className="absolute inset-0 bg-[#080808]/90 backdrop-blur-md"
              ></motion.div>

              {/* Modal Container */}
              {(() => {
                const modalEvent = events.find((e) => e.id === activeModalId);
                if (!modalEvent) return null;

                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md rounded-none bg-[#141414] border border-white/10 p-6 sm:p-8 shadow-2xl z-10"
                  >
                    <div className="text-center space-y-3 mb-6">
                      <div className="w-10 h-10 rounded-none bg-black border border-[#C5A059]/30 flex items-center justify-center mx-auto text-[#C5A059]">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                      </div>
                      <h4 className="text-lg text-white font-bold uppercase tracking-wider mt-2">
                        RSVP Registration Circular
                      </h4>
                      <p className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest leading-none">
                        Event: {modalEvent.title}
                      </p>
                      <p className="text-xs text-gray-400 font-sans font-light">
                        Kindly provide your coordinates. This registration holds your physical attendance seat under standard club rules.
                      </p>
                    </div>

                    <form onSubmit={(e) => handleSubmit(e, modalEvent.id)} className="space-y-4">
                      {formError && (
                        <div className="p-3 rounded-none bg-red-950/20 border border-red-800/30 text-xs text-red-500 flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{formError}</span>
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-gray-400 font-semibold">
                          Your Noble Name
                        </label>
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="e.g. Sterling Hayes"
                          className="w-full px-3.5 py-3 text-sm bg-black border border-white/10 rounded-none text-white placeholder-gray-700 focus:outline-none focus:border-[#C5A059] transition"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-gray-400 font-semibold">
                          Noble Email Coordinate
                        </label>
                        <input
                          type="email"
                          required
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="e.g. s.hayes@monarchestate.com"
                          className="w-full px-3.5 py-3 text-sm bg-black border border-white/10 rounded-none text-white placeholder-gray-700 focus:outline-none focus:border-[#C5A059] transition"
                        />
                      </div>

                      <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10 mt-6">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="px-4 py-2 text-[10px] font-mono tracking-widest uppercase text-gray-400 hover:text-white transition"
                        >
                          Revoke Invitation
                        </button>
                        
                        <button
                          type="submit"
                          className="px-5 py-2 text-[10px] font-mono tracking-widest uppercase bg-[#C5A059] text-black font-semibold rounded-none shadow-md hover:bg-[#C5A059]/90 transition"
                        >
                          Confirm RSVP
                        </button>
                      </div>
                    </form>
                  </motion.div>
                );
              })()}
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
