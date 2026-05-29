/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Donor, ClubEvent } from "./types";
import { INITIAL_DONORS, INITIAL_EVENTS, CLUB_IMAGES } from "./data";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Programs from "./components/Programs";
import Events from "./components/Events";
import Membership from "./components/Membership";
import DonationGateway from "./components/DonationGateway";
import Contact from "./components/Contact";
import AuthModal from "./components/AuthModal";
import { ShieldCheck, Heart, Sparkles, MessageSquare } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [donors, setDonors] = useState<Donor[]>([]);
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [userRSVPs, setUserRSVPs] = useState<string[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<"login" | "signup">("login");

  // Initialize data from mock data or local storage
  useEffect(() => {
    // 1. Donors persistence
    const savedDonors = localStorage.getItem("gf_social_club_donors");
    if (savedDonors) {
      try {
        setDonors(JSON.parse(savedDonors));
      } catch (err) {
        setDonors(INITIAL_DONORS);
      }
    } else {
      setDonors(INITIAL_DONORS);
    }

    // 2. Events seats persistence
    const savedEvents = localStorage.getItem("gf_social_club_events");
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
      } catch (err) {
        setEvents(INITIAL_EVENTS);
      }
    } else {
      setEvents(INITIAL_EVENTS);
    }

    // 3. User RSVPs lists
    const savedRSVPs = localStorage.getItem("gf_social_club_user_rsvps");
    if (savedRSVPs) {
      try {
        setUserRSVPs(JSON.parse(savedRSVPs));
      } catch (err) {
        setUserRSVPs([]);
      }
    }
  }, []);

  // Compute total dynamic dynamic donations raised
  const totalDonationsAmount = donors.reduce((sum, d) => sum + d.amount, 0);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Add a brand new donation
  const handleAddDonation = (newDonor: Omit<Donor, "id" | "timestamp">) => {
    const freshDonor: Donor = {
      ...newDonor,
      id: `donor-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString()
    };

    const updatedDonors = [freshDonor, ...donors];
    setDonors(updatedDonors);
    localStorage.setItem("gf_social_club_donors", JSON.stringify(updatedDonors));
  };

  // Process RSVP booking
  const handleRSVP = (eventId: string, guestName: string, guestEmail: string) => {
    // Check if seats remaining
    const updatedEvents = events.map((ev) => {
      if (ev.id === eventId) {
        if (ev.seatsBooked < ev.seatsTotal) {
          return { ...ev, seatsBooked: ev.seatsBooked + 1 };
        }
      }
      return ev;
    });

    setEvents(updatedEvents);
    localStorage.setItem("gf_social_club_events", JSON.stringify(updatedEvents));

    const updatedRSVPs = [...userRSVPs, eventId];
    setUserRSVPs(updatedRSVPs);
    localStorage.setItem("gf_social_club_user_rsvps", JSON.stringify(updatedRSVPs));
  };

  // Synchronize Scroll Spy with Header Highlight
  useEffect(() => {
    const sections = ["hero", "about", "programs", "events", "membership", "donate"];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const handleAuthTrigger = (view: "login" | "signup") => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  return (
    <div id="app-root-canvas" className="min-h-screen bg-brand-dark overflow-x-hidden antialiased font-sans">
      
      {/* Scrollable Nav bar */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        totalDonationsAmount={totalDonationsAmount}
        onAuthTrigger={handleAuthTrigger}
      />

      {/* Hero splash introduction */}
      <Hero
        onDonateNowClick={() => handleNavigate("donate")}
        onBrowseMembershipClick={() => handleNavigate("membership")}
      />

      {/* Structured core values */}
      <About />

      {/* Key impact initiatives */}
      <Programs />

      {/* Dynamic Seat Bookings with state updates */}
      <Events
        events={events}
        userRSVPs={userRSVPs}
        onRSVP={handleRSVP}
      />

      {/* Interactive live Gold Social ID Card Generator */}
      <Membership onAuthTrigger={handleAuthTrigger} />

      {/* Dynamic Authorization Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultView={authModalView}
      />

      {/* Encrypted Sandbox + Actual Paypal Smart Buttons */}
      <DonationGateway
        donorsList={donors}
        totalDonationsAmount={totalDonationsAmount}
        onAddDonation={handleAddDonation}
      />

      {/* Aesthetic map coordinates, stewards logs & form */}
      <Contact />

      {/* Luxurious Gilded Page Footer */}
      <footer id="club-footer" className="bg-[#0b0c10] border-t border-gold-800/20 text-[#fdfbf7] py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo Brand Detail */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <img
                src={CLUB_IMAGES.logo}
                alt="Golden Family Club Crest"
                className="w-10 h-10 object-cover rounded-full border border-gold-400"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="block font-display text-base tracking-widest text-[#eeddae] uppercase font-bold leading-none">
                  The Golden Family
                </span>
                <span className="block text-[8px] font-mono tracking-widest text-gold-500 uppercase leading-none mt-1">
                  Social Club & Society
                </span>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 font-sans font-light leading-relaxed">
              Securing historical bonds, fostering professional networks, and investing directly in county-wide children healthcare, schools, and climate initiatives.
            </p>
          </div>

          {/* Quick navigations anchors */}
          <div className="space-y-4">
            <span className="block text-[10px] font-mono tracking-widest text-gold-500 uppercase font-semibold">
              Society Sectors
            </span>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button onClick={() => handleNavigate("about")} className="hover:text-gold-300 transition duration-150">
                  Mission Statement
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate("programs")} className="hover:text-gold-300 transition duration-150">
                  Mentorship & Grants
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate("events")} className="hover:text-gold-300 transition duration-150">
                  The Gilded Calendar
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate("membership")} className="hover:text-gold-300 transition duration-150">
                  Interactive ID Card Creator
                </button>
              </li>
            </ul>
          </div>

          {/* Verification & Legal */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <span className="block text-[10px] font-mono tracking-widest text-gold-500 uppercase font-semibold">
              Gateway Guarantee Circular
            </span>
            
            <div className="p-4 rounded bg-brand-slate/40 border border-gold-800/10 space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2 text-[#eeddae] font-mono text-[10px] font-bold">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>PAYPAL ENCRYPTED EMBEDDED SYSTEM</span>
              </div>
              <p className="font-sans font-light leading-relaxed text-[11px]">
                In compliance with PayPal Sandbox security frameworks, this development prototype executes realistic transaction simulators matching API schema requirements. Developers may load standard widgets securely.
              </p>
            </div>
            
            <div className="flex items-center gap-1 text-[10px] text-gray-500">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 shrink-0" />
              <span>Created for Freetown community development and software campaigns. All mock card checks are completely client-safe.</span>
            </div>
          </div>

        </div>

        {/* Copy bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-brand-slate/30 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500">
          <span>
            © 1988 - 2026 The Golden Family Social Club and Foundations Limited. Registered in Sierra Leone.
          </span>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span>Freetown, Sierra Leone</span>
            <span>PayPal Encrypted</span>
            <span>Est. 1988</span>
          </div>
        </div>

      </footer>
    </div>
  );
}
