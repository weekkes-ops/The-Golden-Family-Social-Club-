/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CreditCard, ShieldCheck, Mail, Phone, ArrowUpRight, Sparkles, User, Gift, Check, Award, Loader2, Lock } from "lucide-react";
import { MEMBERSHIP_TIERS, CLUB_IMAGES } from "../data";
import { useAuth } from "../context/AuthContext";

interface MembershipProps {
  onAuthTrigger?: (view: "login" | "signup") => void;
}

export default function Membership({ onAuthTrigger }: MembershipProps) {
  const { currentUser, signUp, logOut } = useAuth();
  
  // Local state for registration form
  const [selectedTierIndex, setSelectedTierIndex] = useState(1); // Standard Individual Fellow ($600)
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("GF-2026-8809X");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Re-generate card details when member updates name (local state fallback)
  useEffect(() => {
    if (currentUser) return;
    const nameSeed = memberName.length ? memberName.toUpperCase().replace(/[^A-Z]/g, "") : "CLASSIC_FELLOW";
    const sum = nameSeed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 1988);
    setCardNumber(`GF-2026-${sum}`);
  }, [memberName, currentUser]);

  const handleRegisterOnboard = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!memberName.trim()) {
      setFormError("Kindly declare your official name for printing.");
      return;
    }
    if (!memberEmail.trim() || !memberEmail.includes("@")) {
      setFormError("An authorized email is needed.");
      return;
    }
    if (!password) {
      setFormError("A secure passcode is required to lock your credentials.");
      return;
    }
    if (password.length < 5) {
      setFormError("Passcode must be at least 5 character digits for registry safety.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp(
        memberName.trim(),
        memberEmail.trim(),
        memberPhone.trim(),
        password,
        MEMBERSHIP_TIERS[selectedTierIndex].id
      );
    } catch (err: any) {
      setFormError(err?.message || "An unexpected error occurred during onboarding.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRevokeCredentials = () => {
    logOut();
    setMemberName("");
    setMemberPhone("");
    setMemberEmail("");
    setPassword("");
  };

  // State derived from auth context
  const isJoined = !!currentUser;
  const activeMemberName = currentUser ? currentUser.name : memberName;
  const activeCardNumber = currentUser ? currentUser.cardNumber : cardNumber;
  const activeTierIndex = currentUser 
    ? MEMBERSHIP_TIERS.findIndex((t) => t.id === currentUser.selectedTierId)
    : selectedTierIndex;
  
  const finalTierIndex = activeTierIndex !== -1 ? activeTierIndex : 1;
  const activeTier = MEMBERSHIP_TIERS[finalTierIndex];

  return (
    <section
      id="membership"
      className="py-24 bg-brand-dark/95 text-[#fdfbf7] relative border-b border-white/10"
    >
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-gold-900/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Module Header */}
        <div id="membership-header" className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.3em] block font-bold">
            Onboarding Forum
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white animate-fade-in">
            Membership & Digital ID
          </h2>
          <div className="w-16 h-px bg-[#C5A059] mx-auto"></div>
          <p className="text-gray-400 font-sans font-light text-sm max-w-lg mx-auto">
            Align yourself with our premier community circle in Freetown. Choose your tier, fill in your credentials, and watch your personalized Golden Family Social Club Card render instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Interactive Form & Selector */}
          <div id="membership-selectors-card" className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-gray-400 font-bold">
                1. SELECT PREFERRED MEMBERSHIP TIER
              </label>

              {/* Tiers List */}
              <div className="space-y-3">
                {MEMBERSHIP_TIERS.map((tier, idx) => (
                  <div
                    key={tier.id}
                    id={`membership-tier-option-${idx}`}
                    onClick={() => {
                      if (!isJoined) {
                        setSelectedTierIndex(idx);
                        setFormError("");
                      }
                    }}
                    className={`p-4 sm:p-5 rounded-none border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 ${
                      isJoined 
                      ? "opacity-50 pointer-events-none" 
                      : selectedTierIndex === idx
                      ? "bg-[#C5A059]/10 border-[#C5A059] shadow-2xl"
                      : "bg-[#141414] border-white/5 hover:border-[#C5A059]/30 cursor-pointer"
                    }`}
                  >
                    <div className="space-y-1 max-w-md">
                      <div className="flex items-center space-x-2.5">
                        <span className={`block w-2.5 h-2.5 rounded-none ${selectedTierIndex === idx ? "bg-[#C5A059]" : "bg-gray-700"}`}></span>
                        <h4 className="text-base text-white font-bold uppercase tracking-wider leading-none">
                          {tier.name}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed mt-2">
                        {tier.description}
                      </p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span className="block text-xl font-mono font-bold text-[#C5A059]">
                        ${tier.price}
                      </span>
                      <span className="block text-[8px] font-mono uppercase tracking-widest text-[#C5A059] leading-none mt-1">
                        PER {tier.frequency.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Information fields */}
            {!isJoined ? (
              <form onSubmit={handleRegisterOnboard} className="space-y-4 bg-[#141414] border border-white/5 p-6 rounded-none">
                <span className="block text-[10px] font-mono uppercase tracking-[0.15em] text-[#C5A059] font-bold mb-4">
                  2. SUBMIT MEMBER DETAILS
                </span>

                {formError && (
                  <div className="p-3 rounded-none bg-red-950/20 border border-red-800/30 text-xs text-red-500">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono uppercase tracking-[0.15em] text-gray-400 font-semibold">
                      Official Full Name (for ID card)
                    </label>
                    <input
                      type="text"
                      required
                      value={memberName}
                      onChange={(e) => setMemberName(e.target.value)}
                      placeholder="e.g. STERLING VANCE"
                      className="w-full px-3.5 py-3 text-sm bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059] uppercase placeholder-gray-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono uppercase tracking-[0.15em] text-gray-400 font-semibold">
                      Primary telephone coordinate
                    </label>
                    <input
                      type="tel"
                      value={memberPhone}
                      onChange={(e) => setMemberPhone(e.target.value)}
                      placeholder="e.g. +44 20 7946 0192"
                      className="w-full px-3.5 py-3 text-sm bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059] placeholder-gray-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono uppercase tracking-[0.15em] text-gray-400 font-semibold">
                      Primary Email Coordinate (Secure notifications)
                    </label>
                    <input
                      type="email"
                      required
                      value={memberEmail}
                      onChange={(e) => setMemberEmail(e.target.value)}
                      placeholder="e.g. s.vance@monarchestate.com"
                      className="w-full px-3.5 py-3 text-sm bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059] placeholder-gray-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono uppercase tracking-[0.15em] text-gray-400 font-semibold">
                      Society Account Passcode (To log in later)
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full px-3.5 py-3 text-sm bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059] placeholder-gray-700"
                    />
                  </div>
                </div>

                <button
                  id="submit-onboarding-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-4 text-xs font-mono uppercase tracking-widest bg-[#C5A059] hover:bg-[#C5A059]/90 text-black font-bold border border-[#C5A059] rounded-none shadow-2xl flex items-center justify-center space-x-2 cursor-pointer transition-transform duration-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Forging Credentials...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Engrave My Membership Credentials</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-gray-500 font-mono uppercase text-center mt-2.5">
                  Already registered in our archives?{" "}
                  <button
                    type="button"
                    onClick={() => onAuthTrigger?.("login")}
                    className="text-[#C5A059] hover:underline font-bold font-semibold cursor-pointer"
                  >
                    Authenticate Portal Access
                  </button>
                </p>
              </form>
            ) : (
              <div className="p-6 rounded-none bg-emerald-950/10 border border-emerald-800/35 flex flex-col items-center justify-center text-center space-y-5">
                <div className="w-12 h-12 rounded-none bg-black border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                
                <div className="space-y-2">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold">
                    STATUS: ACTIVATED & REGISTERED
                  </span>
                  <h4 className="text-xl font-bold text-white uppercase tracking-wider">
                    Credentials Successfully Minted!
                  </h4>
                  <p className="max-w-md mx-auto text-xs text-gray-400 font-sans font-light leading-relaxed">
                    Welcome to the Golden Circle, <strong className="text-white uppercase">{activeMemberName}</strong>. Your digitized identity has been signed, secured in local storage, and published across our concierge directories.
                  </p>
                </div>

                <button
                  id="revoke-credentials-btn"
                  onClick={handleRevokeCredentials}
                  className="px-5 py-2.5 rounded-none border border-red-500/30 text-red-400 hover:bg-red-950/20 font-mono text-[9px] uppercase tracking-widest transition cursor-pointer"
                >
                  Revoke My Gilded Credentials
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Dynamic Golden Social Card Preview */}
          <div id="membership-card-preview-panel" className="lg:col-span-5 flex flex-col justify-center items-center">
            
            <div className="space-y-4 w-full max-w-sm">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-center text-gray-500">
                Gilded Credential Token Preview
              </span>

              {/* Card visualization container */}
              <motion.div
                id="digital-id-card-frame"
                whileHover={{ rotateY: 3, rotateX: 3, scale: 1.01 }}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                className="w-full aspect-[1.586/1] bg-black border-2 border-[#C5A059] p-5 rounded-none shadow-2xl flex flex-col justify-between relative overflow-hidden group select-none"
              >
                {/* Embedded luxury watermark visual texture */}
                <div className="absolute inset-0 bg-[#0C0C0C] pointer-events-none opacity-40"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#C5A059]/5 rounded-full pointer-events-none"></div>

                {/* Card Header */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-2">
                    <img
                      src={CLUB_IMAGES.logo}
                      alt="Gold Club Logo"
                      className="w-8 h-8 rounded-none border border-[#C5A059]/40 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="block font-display text-[10px] text-white tracking-[0.2em] uppercase font-bold leading-none">
                        The Golden Family
                      </span>
                      <span className="block text-[7px] font-mono tracking-widest text-[#C5A059] uppercase leading-none mt-1">
                        Social Club & Society
                      </span>
                    </div>
                  </div>
                  
                  {/* Digital chip graphic */}
                  <div className="w-8 h-6 rounded-none bg-gradient-to-br from-[#e2d2ad] to-[#B48D46] overflow-hidden flex flex-col p-1 gap-0.5 border border-[#C5A059]/60">
                    <div className="flex justify-between h-full gap-0.5">
                      <div className="flex-1 bg-black/20"></div>
                      <div className="flex-1 bg-black/20"></div>
                    </div>
                    <div className="flex justify-between h-full gap-0.5">
                      <div className="flex-1 bg-black/20"></div>
                      <div className="flex-1 bg-black/20"></div>
                    </div>
                  </div>
                </div>

                {/* Card Main info */}
                <div className="relative z-10 space-y-3 mt-6">
                  <span className="text-[14px] text-[#E5E5E5] font-black tracking-widest block truncate uppercase">
                    {activeMemberName.trim() ? activeMemberName.toUpperCase() : "MEMBER NAME HERE"}
                  </span>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-[6px] font-mono uppercase tracking-[0.15em] text-gray-500 leading-none">
                        MEMBER TYPE
                      </span>
                      <span className="block text-[9.5px] font-mono uppercase tracking-widest text-[#C5A059] font-bold mt-1">
                        {activeTier.name}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="block text-[6px] font-mono uppercase tracking-[0.15em] text-gray-500 leading-none">
                        DECREED ON
                      </span>
                      <span className="block text-[9.5px] font-mono uppercase tracking-widest text-gray-350 mt-1">
                        {currentUser ? currentUser.decreedDate : "Est. Freetown, 2026/05"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between relative z-10 border-t border-white/10 pt-2.5">
                  <span className="text-[9px] font-mono text-gray-400 select-all tracking-widest font-semibold">
                    {activeCardNumber}
                  </span>

                  <div className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[7px] font-mono tracking-widest text-emerald-500 uppercase font-semibold">
                      SECURED & TRUSTED
                    </span>
                  </div>
                </div>

              </motion.div>

              {/* Print confirmation message */}
              <div className="p-4 rounded-none bg-[#141414] border border-white/5 space-y-3">
                <span className="text-[9px] font-mono text-[#C5A059] tracking-widest block uppercase font-bold">
                  ACTIVE TIER PERKS:
                </span>
                <ul className="space-y-1.5 focus:outline-none">
                  {activeTier.benefits.slice(0, 3).map((benefit, bIdx) => (
                    <li key={bIdx} className="text-[11px] text-gray-400 font-sans flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
