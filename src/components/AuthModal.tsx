/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Mail, Lock, Phone, User, Sparkles, Loader2, KeyRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { MEMBERSHIP_TIERS } from "../data";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, defaultView = "login" }: AuthModalProps) {
  const { signUp, logIn } = useAuth();
  const [view, setView] = useState<"login" | "signup">(defaultView);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Signup specific fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedTierId, setSelectedTierId] = useState(MEMBERSHIP_TIERS[1].id); // Default to Individual Fellow ($600)

  const handleToggleView = () => {
    setView(view === "login" ? "signup" : "login");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (view === "login") {
        if (!email || !password) {
          throw new Error("Kindly provide both your registered email and secure passcode.");
        }
        await logIn(email, password);
      } else {
        if (!name.trim()) {
          throw new Error("Your noble name is required for credential printing.");
        }
        if (!email || !password) {
          throw new Error("Essential credential combinations (email & password) are missing.");
        }
        if (password.length < 5) {
          throw new Error("Passcode must contain at least 5 character digits for safety.");
        }
        await signUp(name, email, phone, password, selectedTierId);
      }
      onClose(); // Close modal on success!
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred. Please contact the Club Stewards.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop wrapper */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#080808]/90 backdrop-blur-md"
          ></motion.div>

          {/* Form Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg rounded-none bg-[#141414] text-white border border-white/15 shadow-2 network-gauge flex flex-col max-h-[90vh] overflow-y-auto"
          >
            {/* Elegant Golden Header Accent Bar */}
            <div className="h-1 w-full bg-[#C5A059]"></div>

            {/* Header Area */}
            <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-none border border-[#C5A059]/40 bg-black flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div>
                  <h3 className="text-sm font-mono tracking-[0.2em] text-white uppercase font-bold">
                    {view === "login" ? "Gilded Portal Access" : "Forge Gilded Credentials"}
                  </h3>
                  <span className="block text-[8px] font-mono tracking-widest text-[#C5A059] uppercase mt-0.5 font-semibold">
                    The Golden Family Registry
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-none hover:bg-white/5 text-gray-500 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body Area */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="p-3 bg-red-950/20 border border-red-850/40 text-xs text-red-500 rounded-none font-mono tracking-tight leading-normal">
                  {error}
                </div>
              )}

              {view === "signup" && (
                <>
                  {/* Signup inputs */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono uppercase tracking-[0.15em] text-gray-400 font-bold">
                      Official Full Name (Print Ready)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <User className="w-4 h-4 text-[#C5A059]" />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. ROBERT STIRLING"
                        className="w-full pl-10 pr-4 py-3 text-xs bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059] uppercase placeholder-gray-700 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono uppercase tracking-[0.15em] text-gray-400 font-bold">
                      Direct Telephone Line
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Phone className="w-4 h-4 text-gray-500" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +44 20 7946 0192 (optional)"
                        className="w-full pl-10 pr-4 py-3 text-xs bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059] placeholder-gray-700"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-1.5">
                <label className="block text-[9px] font-mono uppercase tracking-[0.15em] text-gray-400 font-bold">
                  Authorized Email Coordinate
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 font-sans">
                    <Mail className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. vance@monarchestate.com"
                    className="w-full pl-10 pr-4 py-3 text-xs bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059] placeholder-gray-700 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-mono uppercase tracking-[0.15em] text-gray-400 font-bold">
                  Credentials Account Key (Passcode)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 text-xs bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059] placeholder-gray-700 font-mono"
                  />
                </div>
              </div>

              {view === "signup" && (
                <div className="space-y-2 mt-2">
                  <label className="block text-[9px] font-mono uppercase tracking-[0.15em] text-gray-400 font-bold">
                    Select Your Society Rank
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {MEMBERSHIP_TIERS.map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedTierId(tier.id)}
                        className={`p-3 border flex items-center justify-between rounded-none text-left transition duration-150 cursor-pointer ${
                          selectedTierId === tier.id
                            ? "bg-[#C5A059]/10 border-[#C5A059]"
                            : "bg-black border-white/5 hover:border-white/15"
                        }`}
                      >
                        <div>
                          <span className="block text-[11px] font-mono text-white font-bold uppercase tracking-wider">
                            {tier.name}
                          </span>
                          <span className="block text-[9px] text-gray-405 leading-none mt-1 font-sans">
                            {tier.description.slice(0, 50)}...
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block text-xs font-mono font-bold text-[#C5A059]">
                            ${tier.price}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 text-xs font-mono uppercase tracking-widest bg-[#C5A059] hover:bg-[#C5A059]/90 text-black font-bold border border-[#C5A059] rounded-none shadow-2 flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99] transition"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Verifying with Archival Registry...</span>
                    </>
                  ) : view === "login" ? (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Authenticate Registry Portal</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Engrave Registry Chronicles</span>
                    </>
                  )}
                </button>
              </div>

              {/* Navigation toggle */}
              <div className="text-center pt-2 border-t border-white/5">
                <p className="text-[10px] text-gray-500 font-mono uppercase">
                  {view === "login" ? "Not enrolled under Freetown's census?" : "Registered in previous generations?"}
                  {" "}
                  <button
                    type="button"
                    onClick={handleToggleView}
                    className="text-[#C5A059] hover:underline hover:text-white tracking-widest font-bold ml-1 cursor-pointer font-semibold"
                  >
                    {view === "login" ? "Forge Credentials Now" : "Portal Log In"}
                  </button>
                </p>
              </div>
            </form>

            {/* Footer Notice */}
            <div className="bg-black/40 px-6 py-4 border-t border-white/10 flex items-center justify-center gap-1.5 text-[9px] text-gray-500 font-mono uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Identity protected by Secure Local Sandbox Tokens</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
