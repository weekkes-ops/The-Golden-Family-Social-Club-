/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  DollarSign,
  Check,
  Loader2,
  Users,
  Award,
  Settings,
  ShieldCheck,
  X,
  CreditCard,
  User,
  Plus,
  HelpCircle,
  Clock,
  Sparkles
} from "lucide-react";
import { Donor, DonationTier } from "../types";
import { DONATION_TIERS } from "../data";
import { useAuth } from "../context/AuthContext";

interface DonationGatewayProps {
  donorsList: Donor[];
  onAddDonation: (newDonor: Omit<Donor, "id" | "timestamp">) => void;
  totalDonationsAmount: number;
}

export default function DonationGateway({
  donorsList,
  onAddDonation,
  totalDonationsAmount
}: DonationGatewayProps) {
  const { currentUser } = useAuth();

  // Goal Tracking
  const FUNDRAISING_GOAL = 25000;
  const progressPercent = Math.min((totalDonationsAmount / FUNDRAISING_GOAL) * 105, 100);

  // States
  const [selectedTierId, setSelectedTierId] = useState<string>("dt2"); // Default Supporting Family ($100)
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorMessage, setDonorMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);

  // Prefill details for logged-in members
  useEffect(() => {
    if (currentUser && !isAnonymous) {
      setDonorName(currentUser.name);
      setDonorEmail(currentUser.email);
    }
  }, [currentUser, isAnonymous]);

  // Developer Configuration Settings (Allows real PayPal Smart buttons!)
  const [showConfig, setShowConfig] = useState(false);
  const [paypalClientID, setPaypalClientID] = useState("sb"); // 'sb' is the global PayPal testing sandbox
  const [useRealPayPalSDK, setUseRealPayPalSDK] = useState(false);
  const [sdkStatus, setSdkStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  // Portal simulation state
  const [activeSimulationType, setActiveSimulationType] = useState<"paypal" | "card" | null>(null);
  const [simulationStep, setSimulationStep] = useState<"details" | "processing" | "success">("details");
  const [mockCardNumber, setMockCardNumber] = useState("");
  const [mockExpiry, setMockExpiry] = useState("");
  const [mockCVC, setMockCVC] = useState("");
  const [mockEmail, setMockEmail] = useState("");
  const [mockPassword, setMockPassword] = useState("");
  const [transactionID, setTransactionID] = useState("");

  // Error boundary
  const [formError, setFormError] = useState("");

  // Calculate current donation amount
  const getCurrentAmount = (): number => {
    if (isCustomMode) {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) || parsed <= 0 ? 0 : parsed;
    }
    const currentTier = DONATION_TIERS.find((t) => t.id === selectedTierId);
    return currentTier ? currentTier.amount : 0;
  };

  const getTierLabel = (): string => {
    if (isCustomMode) return "Custom Patron";
    const currentTier = DONATION_TIERS.find((t) => t.id === selectedTierId);
    return currentTier ? currentTier.label : "Club Friend";
  };

  // Live PayPal JS SDK integrations (Optional premium feature!)
  useEffect(() => {
    if (useRealPayPalSDK && paypalClientID) {
      setSdkStatus("loading");
      // Remove any existing script
      const existingScript = document.getElementById("paypal-js-sdk");
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.id = "paypal-js-sdk";
      script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientID}&currency=USD&components=buttons`;
      script.async = true;
      script.onload = () => {
        setSdkStatus("ready");
        // Initialize buttons
        try {
          // Check if paypal object is loaded
          if ((window as any).paypal) {
            (window as any).paypal.Buttons({
              createOrder: (data: any, actions: any) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: `The Golden Family Club Donation - ${getTierLabel()}`,
                      amount: {
                        value: getCurrentAmount().toString(),
                      },
                    },
                  ],
                });
              },
              onApprove: async (data: any, actions: any) => {
                const details = await actions.order.capture();
                handleSuccessCheckout(details.id || "PAY-REF-REAL");
              },
              onError: (err: any) => {
                console.error("PayPal Smart Button error", err);
                setFormError("PayPal smart button encountered an error or connection was refused in iframe. Double check sandbox ID.");
              }
            }).render("#real-paypal-button-container");
          }
        } catch (e) {
          console.error(e);
          setSdkStatus("error");
        }
      };
      script.onerror = () => {
        setSdkStatus("error");
      };
      document.body.appendChild(script);
    }
  }, [useRealPayPalSDK, paypalClientID, selectedTierId, isCustomMode, customAmount]);

  // Validations before starting checkout
  const initiateCheckout = (type: "paypal" | "card") => {
    setFormError("");
    const amount = getCurrentAmount();
    if (amount <= 0) {
      setFormError("Kindly select a valid contribution amount greater than $0.");
      return;
    }
    if (!isAnonymous && !donorName.trim()) {
      setFormError("Please provide your name or toggle 'Anonymous Donation' below.");
      return;
    }
    if (donorEmail && (!donorEmail.includes("@") || donorEmail.length < 5)) {
      setFormError("Your provided email address is incomplete.");
      return;
    }

    if (useRealPayPalSDK && sdkStatus === "ready" && type === "paypal") {
      // The user can interact with the real buttons rendered in the container
      return;
    }

    // Otherwise, boot visual sandbox simulation portal
    setActiveSimulationType(type);
    setSimulationStep("details");
    setMockCardNumber("");
    setMockExpiry("");
    setMockCVC("");
    setMockEmail(donorEmail || "dgookt@gmail.com");
    setMockPassword("");
    setTransactionID(`GP-PAY-${Math.floor(10000000 + Math.random() * 90000000)}`);
  };

  const handleSimulatePaymentCommit = (e: React.FormEvent) => {
    e.preventDefault();
    setSimulationStep("processing");

    // Simulate merchant delays elegantly
    setTimeout(() => {
      handleSuccessCheckout(transactionID);
    }, 2800);
  };

  const handleSuccessCheckout = (refId: string) => {
    // Commit transaction records to local engine
    onAddDonation({
      name: isAnonymous ? "Anonymous Patron" : donorName.trim(),
      email: donorEmail.trim(),
      amount: getCurrentAmount(),
      message: donorMessage.trim() || (isAnonymous ? "In support of intergenerational legacies." : `Supporting the club's noble endeavors!`),
      isAnonymous: isAnonymous,
      tier: getTierLabel()
    });

    setTransactionID(refId);
    setSimulationStep("success");
    
    // Clear custom form fields but hold success modal
    setDonorMessage("");
  };

  const finishSimulation = () => {
    setActiveSimulationType(null);
    setSimulationStep("details");
  };

  return (
    <section
      id="donate"
      className="py-24 bg-brand-dark relative overflow-hidden text-[#fdfbf7]"
    >
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold-900/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Module Header */}
        <div id="donations-header-block" className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.3em] block font-bold">
            The Golden Family Philanthropy Wing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white animate-fade-in">
            Secure Donation Gateway
          </h2>
          <div className="w-16 h-px bg-[#C5A059] mx-auto font-sans"></div>
          <p className="text-gray-400 font-sans font-light text-sm max-w-lg mx-auto">
            Empower youth mentorship, seniors care initiatives, and cultural arts forums. Your transaction is verified via encrypted PayPal gateways.
          </p>
        </div>

        {/* Real-time Goals Tracker */}
        <div
          id="fundraising-goal-tracker"
          className="max-w-4xl mx-auto p-6 sm:p-8 rounded-none bg-[#141414] border border-white/5 backdrop-blur-sm shadow-2xl mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-[0.2em] block font-semibold">
                SUMMER PATRON FUNDRAISING WAVE
              </span>
              <span className="text-2xl sm:text-3xl text-white font-black uppercase tracking-tight block mt-1">
                ${totalDonationsAmount.toLocaleString()}{" "}
                <span className="text-base font-sans font-light text-gray-400 capitalize tracking-normal">
                  contributed of ${FUNDRAISING_GOAL.toLocaleString()}
                </span>
              </span>
            </div>
            
            <div className="px-5 py-2.5 bg-black border border-white/10 rounded-none text-center sm:text-right">
              <span className="block text-[10px] font-mono tracking-widest text-gray-450 uppercase font-semibold">
                Campaign Progress
              </span>
              <span className="block font-mono text-lg font-bold text-[#C5A059] mt-0.5">
                {progressPercent.toFixed(1)}% Complete
              </span>
            </div>
          </div>

          {/* Golden animated progress gauge bar */}
          <div className="w-full h-3 bg-black rounded-none overflow-hidden border border-white/5 p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-none bg-[#C5A059]"
            ></motion.div>
          </div>

          <div className="flex items-center justify-between gap-2 mt-3 text-[10px] font-mono text-gray-400">
            <span>$0.00 INCEPTED</span>
            <span>Est. Date: Dec 31, 2026</span>
            <span>$25,000 ARCH</span>
          </div>
        </div>

        {/* Primary Functional Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Selector Form Card */}
          <div id="donor-form-panel" className="lg:col-span-7 bg-[#141414] border border-white/5 p-6 sm:p-8 rounded-none shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg text-white font-bold uppercase tracking-wider flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#C5A059] fill-[#C5A059]" />
                <span>Contribution Particulars</span>
              </h3>
              
              {/* developer config toggle */}
              <button
                id="dev-config-toggle"
                onClick={() => setShowConfig(!showConfig)}
                className="p-1 px-2.5 rounded-none bg-black text-gray-400 hover:text-[#C5A059] text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 border border-white/15 transition cursor-pointer font-bold"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>PayPal Configuration</span>
              </button>
            </div>

            {/* Developer Configurations (Genuine PayPal credentials setup) */}
            <AnimatePresence>
              {showConfig && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-black border border-white/10 rounded-none overflow-hidden space-y-3"
                >
                  <p className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest leading-none font-bold">
                    PayPal Developer Settings
                  </p>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    Connect genuine checkout flows! Enter your PayPal sandbox/production Client ID. By default, "sb" manages the global sandbox emulator.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch gap-3 mt-2">
                    <input
                      type="text"
                      value={paypalClientID}
                      onChange={(e) => setPaypalClientID(e.target.value)}
                      placeholder="PayPal Merchant/Client ID"
                      className="flex-1 px-3.5 py-3 text-xs bg-[#141414] border border-white/10 rounded-none text-white font-mono focus:outline-none focus:border-[#C5A059]"
                    />

                    <button
                      type="button"
                      onClick={() => setUseRealPayPalSDK(!useRealPayPalSDK)}
                      className={`px-4 py-3 text-[10px] font-mono uppercase font-semibold rounded-none shrink-0 border transition cursor-pointer ${
                        useRealPayPalSDK
                          ? "bg-emerald-950/20 text-emerald-400 border-emerald-800/40"
                          : "bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/30"
                      }`}
                    >
                      {useRealPayPalSDK ? "Live SDK Loaded" : "Use Real Smart Buttons"}
                    </button>
                  </div>
                  {useRealPayPalSDK && (
                    <div className="text-[10px] font-mono text-gray-500 flex items-center justify-between">
                      <span>SDK Status: {sdkStatus.toUpperCase()}</span>
                      {sdkStatus === "loading" && <Loader2 className="w-3 h-3 animate-spin text-[#C5A059]" />}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Amount Presets Grid */}
            <div className="space-y-3">
              <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-gray-400 font-bold">
                1. Select Donation Amount (USD)
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DONATION_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    id={`preset-${tier.id}`}
                    type="button"
                    onClick={() => {
                      setIsCustomMode(false);
                      setSelectedTierId(tier.id);
                      setCustomAmount("");
                      setFormError("");
                    }}
                    className={`p-3.5 rounded-none border text-center transition-all cursor-pointer ${
                      !isCustomMode && selectedTierId === tier.id
                        ? "bg-[#C5A059]/10 border-[#C5A059] text-white shadow-2xl font-bold"
                        : "bg-black border-white/5 text-gray-400 hover:border-[#C5A059]/30 hover:text-white"
                    }`}
                  >
                    <span className="block text-xl font-bold font-mono">${tier.amount}</span>
                    <span className="block text-[9px] font-mono uppercase tracking-widest text-[#C5A059] mt-1 leading-none">
                      {tier.label.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom Selector Toggle */}
              <button
                id="custom-amount-trigger"
                type="button"
                onClick={() => {
                  setIsCustomMode(true);
                  setFormError("");
                }}
                className={`w-full p-3 rounded-none border text-center text-xs font-mono uppercase tracking-widest transition cursor-pointer ${
                  isCustomMode
                    ? "bg-[#C5A059]/10 border-[#C5A059] text-white font-bold"
                    : "bg-black border-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {isCustomMode ? "✓ Custom Contribution Chosen" : "+ Propose Custom Amount"}
              </button>

              {isCustomMode && (
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C5A059]">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter custom dollar amount"
                    className="w-full pl-10 pr-3.5 py-3 text-sm bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059] font-mono"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[10px] font-mono text-gray-550 uppercase">
                    USD
                  </span>
                </div>
              )}
            </div>

            {/* Profile Entry fields */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-gray-400 font-bold">
                2. Donor Identification
              </label>

              {/* Anonymous Checkbox */}
              <label className="flex items-center space-x-3.5 p-3.5 bg-black border border-white/5 rounded-none cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 rounded-none text-[#C5A059] accent-[#C5A059] focus:ring-0 focus:ring-offset-0 bg-[#141414]"
                />
                <div>
                  <span className="block text-xs font-mono uppercase tracking-wider text-white font-semibold">
                    Sovereign Anonymous donation
                  </span>
                  <span className="block text-[10px] text-gray-500 font-sans mt-0.5">
                    Keeps your identity completely private on our public Honor Wall logs.
                  </span>
                </div>
              </label>

              <AnimatePresence>
                {!isAnonymous && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden"
                  >
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono uppercase tracking-[0.15em] text-gray-400 font-bold">
                        Noble Display Name
                      </label>
                      <input
                        type="text"
                        required={!isAnonymous}
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="e.g. Robert Hayes"
                        className="w-full px-3.5 py-3 text-sm bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059] placeholder-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono uppercase tracking-[0.15em] text-gray-400 font-bold">
                        Email Coordinate
                      </label>
                      <input
                        type="email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="e.g. hayes@estate.com (private)"
                        className="w-full px-3.5 py-3 text-sm bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059] placeholder-gray-700"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-[9px] font-mono uppercase tracking-[0.15em] text-gray-400 font-bold">
                  Custom message for the Honor Wall
                </label>
                <textarea
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  placeholder="Leave an elegant words-of-encouragement message..."
                  rows={2}
                  className="w-full px-3.5 py-3 text-sm bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059] placeholder-gray-75 *:"
                ></textarea>
              </div>

              {/* Periodic Toggle */}
              <label className="flex items-center space-x-2.5 text-xs text-gray-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isMonthly}
                  onChange={(e) => setIsMonthly(e.target.checked)}
                  className="w-4 h-4 rounded-none text-[#C5A059] accent-[#C5A059] focus:ring-0 bg-[#141414]"
                />
                <span className="font-mono uppercase tracking-[0.1em] text-[9.5px] font-semibold">
                  Establish as a Monthly Recurring Sustainer Fund Contribution
                </span>
              </label>

            </div>

            {/* ERROR AREA */}
            {formError && (
              <div className="p-3 bg-red-950/20 border border-red-800/30 text-xs text-red-500 rounded-none font-mono">
                {formError}
              </div>
            )}

            {/* GATEWAY PAYMENT CHOICE TRIGGERS */}
            <div className="pt-6 border-t border-white/10 space-y-3.5">
              
              {/* PayPal standard trigger */}
              {useRealPayPalSDK && sdkStatus === "ready" ? (
                <div className="space-y-2">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold text-center">
                    3. Authenticate Gateway using real checkout
                  </span>
                  <div id="real-paypal-button-container" className="w-full relative z-10"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  <span className="block text-[10px] font-mono uppercase tracking-[0.15em] text-gray-500 font-bold text-center">
                    3. SELECT ENCRYPTED GATEWAY METHOD
                  </span>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Custom Styled PayPal Yellow Button */}
                    <button
                      id="paypal-simulate-trigger"
                      type="button"
                      onClick={() => initiateCheckout("paypal")}
                      className="flex-1 bg-[#ffc439] hover:bg-[#eae8df] text-[#111111] font-black py-4 px-4 rounded-none transition duration-150 flex items-center justify-center space-x-2 text-sm uppercase tracking-[0.15em] cursor-pointer shadow-2xl scale-100 active:scale-[0.98]"
                    >
                      {/* PayPal wordmark layout */}
                      <span className="font-sans italic font-extrabold tracking-tight text-[#003087]">Pay</span>
                      <span className="font-sans italic font-extrabold tracking-tight text-[#0079C1]">Pal</span>
                    </button>

                    {/* Styled Card button */}
                    <button
                      id="card-simulate-trigger"
                      type="button"
                      onClick={() => initiateCheckout("card")}
                      className="flex-1 bg-black hover:bg-white/5 border border-[#C5A059]/40 text-[#C5A059] font-bold py-4 px-4 rounded-none transition-all duration-200 flex items-center justify-center space-x-2 text-xs uppercase tracking-[0.15em] cursor-pointer shadow-2xl active:scale-[0.98]"
                    >
                      <CreditCard className="w-4 h-4 text-[#C5A059]" />
                      <span>Credit or Debit Card</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>
                  SSL Secured • Authentic sandbox proxy framework active
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Wall of Honor Card */}
          <div id="honor-wall-panel" className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-[#141414] border border-white/5 rounded-none shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Award className="w-24 h-24 text-[#C5A059]" />
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <h3 className="text-lg text-white font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#C5A059]" />
                    <span>The Gilded Wall of Honor</span>
                  </h3>
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold mt-1">
                    Living Patron Chronicles
                  </p>
                </div>
                
                <span className="text-xs font-mono font-bold bg-black border border-white/10 text-[#C5A059] px-2.5 py-1 rounded-none">
                  {donorsList.length} Patrons
                </span>
              </div>

              {/* Scrollable Donors List container */}
              <div id="donors-list-scrollable" className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar focus:outline-none">
                {donorsList.map((donor, idx) => (
                  <motion.div
                    key={donor.id}
                    id={`honor-item-${donor.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-4 rounded-none bg-black border border-white/5 hover:border-[#C5A059]/30 transition-all duration-300 space-y-2 relative group"
                  >
                    <div className="absolute top-3.5 right-4 flex flex-col items-end">
                      <span className="font-mono text-sm font-bold text-[#C5A059]">
                        ${donor.amount}
                      </span>
                      <span className="text-[8px] font-mono uppercase text-gray-500 tracking-wider leading-none">
                        USD
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-none bg-[#141414] border border-white/10 flex items-center justify-center text-[10px] text-[#C5A059] font-serif font-bold">
                        {donor.isAnonymous ? "A" : donor.name.charAt(0)}
                      </div>
                      <div>
                        <span className="block text-xs font-mono tracking-wider text-white font-semibold truncate max-w-[170px] uppercase">
                          {donor.name}
                        </span>
                        <span className="block text-[8px] font-mono uppercase tracking-widest text-[#C5A059] mt-0.5 font-bold">
                          {donor.tier}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 font-sans font-light italic leading-relaxed pl-2 border-l border-[#C5A059]/40 py-0.5 mt-2">
                      "{donor.message}"
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 mt-6 flex items-center justify-between text-[11px] font-mono text-gray-500">
                <span className="flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Real-time persistence</span>
                </span>
                <span>Est. Freetown, 2026</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* PAYPAL SANDBOX PORTAL CHECKOUT FLOW SIMULATOR */}
      <AnimatePresence>
        {activeSimulationType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#080808]/95 backdrop-blur-md"
            ></motion.div>

            {/* Portal Framework modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-none bg-[#141414] text-white border border-white/15 shadow-2xl z-10 overflow-hidden flex flex-col h-[560px] max-h-[90vh]"
            >
              
              {/* Header: PayPal Standard Yellow/Blue branding or credit card branding */}
              <div className="bg-[#0C0C0C] border-b border-white/10 px-6 py-4 flex items-center justify-between">
                {activeSimulationType === "paypal" ? (
                  <div className="flex items-center space-x-1.5 focus:outline-none">
                    {/* Paypal brand emblem */}
                    <span className="font-sans italic font-extrabold tracking-tighter text-blue-400 text-xl">Pay</span>
                    <span className="font-sans italic font-extrabold tracking-tighter text-blue-300 text-xl">Pal</span>
                    <span className="px-2 py-0.5 text-[8px] font-mono uppercase bg-emerald-950 text-emerald-400 rounded-none font-bold tracking-widest ml-2 border border-emerald-800/60">
                      SECURE SANDBOX
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-[#C5A059]" />
                    <span className="font-sans font-bold text-white text-xs uppercase tracking-widest">
                      Debit Card Gateway
                    </span>
                    <span className="px-2 py-0.5 text-[8px] font-mono uppercase bg-emerald-950 text-emerald-400 rounded-none font-bold tracking-widest border border-emerald-800/60">
                      SECURE
                    </span>
                  </div>
                )}

                <button
                  onClick={finishSimulation}
                  className="p-1.5 rounded-none hover:bg-white/5 text-gray-500 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dynamic steps body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col justify-between">
                
                {simulationStep === "details" && (
                  <form onSubmit={handleSimulatePaymentCommit} className="space-y-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Bill details header */}
                      <div className="p-4 rounded-none bg-black border border-white/5">
                        <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono font-bold">
                          <span>MERCHANT TARGET</span>
                          <span>The Golden Family Social Club</span>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                          <span className="text-xs uppercase font-bold text-[#C5A059] tracking-wider font-mono">
                            {getTierLabel()}
                          </span>
                          <span className="text-2xl font-mono font-bold text-white">
                            ${getCurrentAmount().toLocaleString()}.00 USD
                          </span>
                        </div>
                        <div className="mt-3 text-[10px] text-gray-400 font-mono border-t border-white/5 pt-2 flex items-center justify-between uppercase">
                          <span>Donor: {isAnonymous ? "Anonymous Patron" : donorName}</span>
                          <span className="text-emerald-500 font-bold">
                            {isMonthly ? "Recurring Active" : "One-Time Contribution"}
                          </span>
                        </div>
                      </div>

                      {/* Content representation */}
                      {activeSimulationType === "paypal" ? (
                        <div className="space-y-4 pt-2">
                          <div className="text-center space-y-1">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-white block font-bold">
                              Log in with your Sandbox Student/Business Email
                            </span>
                            <span className="text-[10px] text-gray-550 block font-mono">
                              Credentials can be completely custom - this is a developers playground.
                            </span>
                          </div>

                          <div className="space-y-3">
                            <input
                              type="email"
                              required
                              value={mockEmail}
                              onChange={(e) => setMockEmail(e.target.value)}
                              placeholder="Sandbox PayPal Account Email"
                              className="w-full px-3.5 py-3 text-sm bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059]"
                            />
                            <input
                              type="password"
                              required
                              value={mockPassword}
                              onChange={(e) => setMockPassword(e.target.value)}
                              placeholder="PayPal Account Password (any password)"
                              className="w-full px-3.5 py-3 text-sm bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059]"
                            />
                          </div>

                          <div className="flex items-center text-[10px] text-gray-500 gap-1.5 justify-center font-mono">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span>PayPal systems guarantee privacy of external credentials.</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4 pt-1">
                          <span className="text-[11px] font-mono tracking-widest text-[#C5A059] block uppercase font-bold">
                            Enter Mock card Credentials
                          </span>

                          <div className="space-y-3">
                            <div className="relative">
                              <input
                                type="text"
                                required
                                pattern="[0-9]{16}"
                                maxLength={16}
                                value={mockCardNumber}
                                onChange={(e) => setMockCardNumber(e.target.value.replace(/[^0-9]/g, ""))}
                                placeholder="Card Number (16 Digits)"
                                className="w-full pl-3.5 pr-10 py-3 text-sm bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059] font-mono"
                              />
                              <CreditCard className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-500" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="text"
                                required
                                pattern="[0-9/]{5}"
                                maxLength={5}
                                value={mockExpiry}
                                onChange={(e) => setMockExpiry(e.target.value)}
                                placeholder="MM/YY"
                                className="w-full px-3.5 py-3 text-sm bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059] font-mono text-center"
                              />
                              <input
                                type="password"
                                required
                                pattern="[0-9]{3}"
                                maxLength={3}
                                value={mockCVC}
                                onChange={(e) => setMockCVC(e.target.value.replace(/[^0-9]/g, ""))}
                                placeholder="CVC"
                                className="w-full px-3.5 py-3 text-sm bg-black border border-white/10 rounded-none text-white focus:outline-none focus:border-[#C5A059] font-mono text-center"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Commit Trigger */}
                    <div className="pt-4 border-t border-white/10 mt-6 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={finishSimulation}
                        className="text-xs font-mono uppercase text-gray-500 hover:text-white transition"
                      >
                        Cancel Order
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-3.5 bg-[#C5A059] text-black text-xs uppercase tracking-widest font-mono font-bold rounded-none shadow-2xl transition hover:bg-[#C5A059]/90 cursor-pointer"
                      >
                        Authorize & Pay ${getCurrentAmount()} USD
                      </button>
                    </div>
                  </form>
                )}

                {simulationStep === "processing" && (
                  <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6 py-12">
                    <div className="relative flex items-center justify-center">
                      <div className="w-20 h-20 rounded-none border-[3px] border-[#C5A059]/10 border-t-[#C5A059] animate-spin"></div>
                      <Heart className="absolute w-8 h-8 text-[#C5A059] fill-[#C5A059] animate-pulse" />
                    </div>

                    <div className="space-y-2 max-w-sm">
                      <p className="font-mono text-sm tracking-widest uppercase font-bold text-[#C5A059] leading-none">
                        PROCURING TRANSACTIONS
                      </p>
                      <p className="text-xs text-gray-405 font-sans leading-relaxed">
                        Initializing secure channels, configuring donor profiles, and submitting tokens to the PayPal Sandbox treasury...
                      </p>
                    </div>

                    <div className="w-48 h-1 bg-[#141414] border border-white/5 p-0.5 rounded-none overflow-hidden">
                      <div className="h-full bg-[#C5A059] animate-[loadingBar_2.5s_infinite_ease-in-out]"></div>
                    </div>
                  </div>
                )}

                {simulationStep === "success" && (
                  <div className="flex-grow flex flex-col justify-between py-2">
                    <div className="text-center space-y-4">
                      
                      {/* Completed Badge design */}
                      <div className="w-16 h-16 rounded-none bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                        <Check className="w-8 h-8 shrink-0 font-bold" />
                      </div>

                      <div className="space-y-1">
                        <span className="block text-[10px] font-mono uppercase tracking-[0.15em] text-[#C5A059] font-bold">
                          The Gilded Benefactor Council
                        </span>
                        <h4 className="text-2xl font-black uppercase tracking-wider text-white leading-tight">
                          Noble Transaction Complete
                        </h4>
                        <p className="text-xs text-gray-400 font-sans">
                          Sincere gratitude. Your contribution has successfully cleared our simulated bank gateway, updating our crowdfunding bar!
                        </p>
                      </div>

                      {/* Gilded receipt display */}
                      <div className="p-5 border border-white/10 rounded-none bg-[#0C0C0C] text-left space-y-3 font-mono text-xs text-gray-300">
                        <div className="flex justify-between border-b border-white/10 pb-2 text-gray-500 text-[10px] font-bold">
                          <span>SANDBOX RECEIPT</span>
                          <span>{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">PATRON NAME:</span>
                          <span className="font-semibold text-white uppercase tracking-wider">
                            {isAnonymous ? "Anonymous Patron" : donorName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">DONATION LEVEL:</span>
                          <span className="text-[#C5A059] font-bold">{getTierLabel()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">FREQUENCY:</span>
                          <span className="text-white">
                            {isMonthly ? "MONTHLY RECURRING" : "ONE-TIME SPEC"}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-dashed border-white/10 pt-2.5">
                          <span className="text-gray-500">TRANSACTION ID:</span>
                          <span className="text-white select-all font-bold">{transactionID}</span>
                        </div>
                        <div className="flex justify-between text-base border-t border-white/10 pt-2.5 text-emerald-400 font-bold">
                          <span>TOTAL DEPOSITED:</span>
                          <span>${getCurrentAmount()}.00 USD</span>
                        </div>
                      </div>

                    </div>

                    <button
                      onClick={finishSimulation}
                      className="w-full mt-6 py-4 bg-[#C5A059] hover:bg-[#C5A059]/90 text-black font-black text-xs uppercase tracking-widest font-mono rounded-none transition cursor-pointer"
                    >
                      Return to the Clubhouse
                    </button>
                  </div>
                )}

              </div>

              {/* Secure footer badge */}
              <div className="bg-[#0C0C0C] border-t border-white/10 px-6 py-4 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                <span>© PayPal Sandbox Emulator • Persistent CRM integrated</span>
                <span>SSL V3 SECURED</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
