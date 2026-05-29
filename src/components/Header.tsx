/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Menu, X, Heart, ShieldCheck, LogOut, User, ChevronDown, IdCard, Sparkles } from "lucide-react";
import { CLUB_IMAGES, MEMBERSHIP_TIERS } from "../data";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  totalDonationsAmount: number;
  onAuthTrigger: (view: "login" | "signup") => void;
}

export default function Header({ onNavigate, activeSection, totalDonationsAmount, onAuthTrigger }: HeaderProps) {
  const { currentUser, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getMemberTierName = () => {
    if (!currentUser) return "";
    const tier = MEMBERSHIP_TIERS.find((t) => t.id === currentUser.selectedTierId);
    return tier ? tier.name : "Member Fellow";
  };

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
              className="hidden md:flex flex-col items-end text-right px-4 py-1 border-r border-[#C5A059]/15"
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

            {/* Profile Dropdown or Log In Portal */}
            {currentUser ? (
              <div ref={dropdownRef} className="relative">
                <button
                  id="profile-dropdown-trigger"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-3.5 py-2 border border-[#C5A059] bg-[#C5A059]/5 hover:bg-[#C5A059]/15 text-[#E5E5E5] text-[10px] font-mono tracking-widest uppercase transition-colors flex items-center space-x-2 rounded-none cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="max-w-[100px] truncate">{currentUser.name.split(" ")[0]}</span>
                  <ChevronDown className={`w-3 h-3 text-[#C5A059] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Gilded Dropdown Card */}
                {dropdownOpen && (
                  <div
                    id="profile-menu-dropdown"
                    className="absolute right-0 mt-3 w-64 bg-[#141414] border border-white/15 shadow-2xl rounded-none py-4 px-4 space-y-3.5 z-50 text-left font-sans"
                  >
                    <div className="border-b border-white/10 pb-2.5">
                      <span className="block text-[8px] font-mono tracking-widest text-[#C5A059] uppercase font-bold">
                        Gilded Member Rank
                      </span>
                      <span className="block text-xs font-mono font-bold text-white tracking-wide uppercase mt-0.5 truncate">
                        {currentUser.name}
                      </span>
                      <span className="block text-[9px] text-[#C5A059] font-mono tracking-wider mt-0.5 uppercase font-medium">
                        {getMemberTierName()}
                      </span>
                    </div>

                    <div className="space-y-1 text-[10px] font-mono text-gray-400">
                      <div className="flex justify-between">
                        <span>CARD KEY:</span>
                        <span className="text-white font-bold">{currentUser.cardNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DECREED:</span>
                        <span>{currentUser.decreedDate.replace("Est. Freetown, ", "")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>RSVPs:</span>
                        <span className="text-[#C5A059] font-bold">{currentUser.rsvps.length} Booked</span>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-2.5 space-y-1.5">
                      <button
                        onClick={() => {
                          handleItemClick("membership");
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left py-2 px-2.5 hover:bg-white/5 text-[10px] uppercase font-mono tracking-widest text-gray-300 hover:text-white flex items-center space-x-2 transition cursor-pointer"
                      >
                        <IdCard className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Interactive Card</span>
                      </button>

                      <button
                        onClick={() => {
                          logOut();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left py-2 px-2.5 hover:bg-red-950/10 text-[10px] uppercase font-mono tracking-widest text-red-400 hover:text-red-300 flex items-center space-x-2 transition cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Revoke Access</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="header-cta-login"
                onClick={() => onAuthTrigger("login")}
                className="px-3.5 py-2 border border-white/10 hover:border-[#C5A059]/40 bg-black text-[#E5E5E5] hover:text-[#C5A059] text-[10px] tracking-widest uppercase transition-colors rounded-none cursor-pointer font-bold"
              >
                Member Portal
              </button>
            )}

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
          <div className="pt-4 border-t border-white/10 flex flex-col space-y-4 px-4 font-mono">
            {currentUser ? (
              <div className="bg-[#141414] border border-white/5 p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-none border border-[#C5A059]/30 bg-black flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-widest text-[#C5A059] uppercase font-bold leading-none">
                      {getMemberTierName()}
                    </span>
                    <span className="block text-xs text-white uppercase font-bold mt-1.5 max-w-[180px] truncate">
                      {currentUser.name}
                    </span>
                  </div>
                </div>

                <div className="text-[9px] text-gray-400 space-y-1 border-t border-white/5 pt-2 flex flex-col">
                  <span>CARD: {currentUser.cardNumber}</span>
                  <span>BOOKINGS: {currentUser.rsvps.length} CALENDAR RSVPs</span>
                </div>

                <button
                  onClick={() => {
                    logOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 bg-red-950/20 text-red-400 border border-red-900/30 text-[9px] uppercase tracking-widest font-bold transition rounded-none cursor-pointer"
                >
                  Revoke My Session
                </button>
              </div>
            ) : (
              <button
                id="mobile-portal-login-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAuthTrigger("login");
                }}
                className="w-full text-center py-3 bg-black hover:bg-white/5 text-[#C5A059] border border-white/15 text-[10px] uppercase tracking-widest font-bold transition rounded-none cursor-pointer"
              >
                Authenticate Member Portal
              </button>
            )}

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">FUNDRAISING IN PROGRESS</span>
              <span className="text-xs text-[#C5A059] font-bold">
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
            <div className="flex items-center justify-center gap-1.5 text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="tracking-wide uppercase text-[9px]">PayPal encrypted simulation platform</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
