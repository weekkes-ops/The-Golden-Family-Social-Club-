/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X, Heart, ShieldCheck } from "lucide-react";
import { CLUB_IMAGES } from "../data";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  totalDonationsAmount: number;
}

export default function Header({ onNavigate, activeSection, totalDonationsAmount }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "Our Mission" },
    { id: "programs", label: "Impact Programs" },
    { id: "events", label: "Gatherings & RSVP" },
    { id: "membership", label: "Membership Card" },
    { id: "donate", label: "Donation Gateway" },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-dark/95 backdrop-blur-md border-b border-gold-800/20 py-3 shadow-lg"
          : "bg-gradient-to-b from-brand-dark/85 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Branding */}
          <div
            id="brand-logo-container"
            onClick={() => handleItemClick("hero")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-full border border-gold-400 bg-brand-slate overflow-hidden flex items-center justify-center p-0.5">
              <img
                src={CLUB_IMAGES.logo}
                alt="Golden Family Club Logo"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gold-400/5 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div>
              <span className="font-display text-lg tracking-widest text-[#E5E5E5] group-hover:text-[#C5A059] transition-colors uppercase font-semibold">
                The Golden Family
              </span>
              <span className="hidden sm:block text-[9px] font-mono tracking-[0.25em] text-[#C5A059] uppercase leading-none mt-1">
                Social Club & Society
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-navigation" className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`py-1 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-200 border-b ${
                  activeSection === item.id
                    ? "text-[#C5A059] border-[#C5A059]"
                    : "text-gray-400 hover:text-[#C5A059] border-transparent"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Call to Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Real-time Donation Tracker Mini Widget */}
            <div
              id="donation-mini-widget"
              className="hidden md:flex flex-col items-end text-right px-4 py-1 border-r border-white/10"
            >
              <div className="flex items-center space-x-1.5">
                <Heart className="w-2.5 h-2.5 text-[#C5A059] fill-[#C5A059] animate-pulse" />
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.15em]">
                  Society Fundraiser
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#C5A059] tracking-wider">
                ${totalDonationsAmount.toLocaleString()} Raised
              </span>
            </div>

            <button
              id="header-cta-donate"
              onClick={() => handleItemClick("donate")}
              className="px-4 py-2 border border-[#C5A059] bg-[#C5A059]/5 hover:bg-[#C5A059]/15 text-[#C5A059] text-[10px] tracking-widest uppercase transition-colors duration-300 rounded-none cursor-pointer"
            >
              Donate Gateway
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            {/* Real-time mini total to the left of hamburger on narrow screens */}
            <div className="sm:hidden flex items-center space-x-0.5 text-xs font-mono font-bold text-gold-400 mr-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
              <span>${totalDonationsAmount}</span>
            </div>

            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-[#f3e3bc] hover:bg-brand-slate transition"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-navigation-drawer"
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-screen opacity-100 border-b border-white/10 bg-[#0C0C0C]" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-mobile-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              className={`block w-full text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest transition-colors ${
                activeSection === item.id
                  ? "bg-[#C5A059]/10 text-[#C5A059] border-l-2 border-[#C5A059]"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col space-y-3 px-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">FUNDRAISING IN PROGRESS</span>
              <span className="text-xs font-mono text-[#C5A059] font-bold">
                ${totalDonationsAmount.toLocaleString()} Raised
              </span>
            </div>
            
            <button
              id="mobile-dropdown-donate-cta"
              onClick={() => handleItemClick("donate")}
              className="w-full text-center py-3 text-[10px] uppercase tracking-widest font-bold text-[#E5E5E5] border border-[#C5A059] bg-[#C5A059]/10 active:scale-[0.98] transition-transform duration-100"
            >
              Contribute to the Gateway
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="tracking-wide uppercase text-[9px]">PayPal encrypted simulation platform</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
