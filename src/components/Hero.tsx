/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowRight, Sparkles, MapPin, BadgeCheck } from "lucide-react";
import { CLUB_IMAGES } from "../data";

interface HeroProps {
  onDonateNowClick: () => void;
  onBrowseMembershipClick: () => void;
}

export default function Hero({ onDonateNowClick, onBrowseMembershipClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark pt-16"
    >
      {/* Background Graphic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={CLUB_IMAGES.hero}
          alt="The Golden Family Social Gathering"
          className="w-full h-full object-cover object-center opacity-40 scale-105 filter brightness-90 animate-[pulse_10s_infinite_ease-in-out]"
          referrerPolicy="no-referrer"
        />
        {/* Soft, beautiful multi-tier color gradient filters */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-brand-dark to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-brand-dark via-brand-dark/30 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 pb-20">
        
        {/* Elite Crest Wrapper */}
        <motion.div
          id="hero-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-[#141414] border border-white/10 backdrop-blur-md mb-10 text-shadow-gold shadow-2xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin" />
          <span className="text-[10px] sm:text-xs font-mono font-medium text-[#C5A059] uppercase tracking-[0.3em]">
            Est. 1988 • Celebrating Decades of Affinity
          </span>
        </motion.div>

        {/* Captivating Heading */}
        <motion.h1
          id="hero-main-title"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] leading-[0.85] font-black tracking-tighter uppercase mb-8"
        >
          <span className="block text-[#E5E5E5]">Golden</span>
          <span className="block text-[#C5A059]">Family</span>
          <span className="block italic font-display font-light lowercase text-4xl sm:text-6xl md:text-7xl lg:text-[90px] tracking-normal text-[#E5E5E5] mt-4">social club</span>
        </motion.h1>

        {/* Sophisticated Body Sub-title */}
        <motion.p
          id="hero-subtext"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400 font-sans font-light leading-relaxed mb-12 uppercase tracking-wider"
        >
          The Golden Family Social Club is a prestigious society dedicated to intergenerational mentorship, high-intellect forums, civic charity, and elegant active recreational circles.
        </motion.p>

        {/* Action Triggers */}
        <motion.div
          id="hero-actions-container"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
        >
          <button
            id="hero-cta-main-donate"
            onClick={onDonateNowClick}
            className="w-full sm:w-auto px-8 py-4 border border-[#C5A059] bg-[#C5A059] text-black text-xs tracking-widest font-bold uppercase hover:bg-transparent hover:text-[#C5A059] transition-all duration-300 rounded-none cursor-pointer"
          >
            Support Our Gateway
          </button>
          
          <button
            id="hero-cta-alternate"
            onClick={onBrowseMembershipClick}
            className="w-full sm:w-auto px-8 py-4 border border-white/20 bg-transparent text-[#E5E5E5] text-xs tracking-widest font-bold uppercase hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-300 rounded-none cursor-pointer"
          >
            Acquire Club Credentials
          </button>
        </motion.div>

        {/* Physical Club Estates / Interactive Micro Indicators */}
        <motion.div
          id="hero-indicators-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20 pt-10 border-t border-white/10 text-center text-gray-400"
        >
          <div className="flex items-center justify-center space-x-2">
            <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span className="text-[10px] tracking-[0.2em] font-mono uppercase text-gray-300">
              Surrey Manor Estates
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <BadgeCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span className="text-[10px] tracking-[0.2em] font-mono uppercase text-gray-300">
              1,240 Active Members
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-[#C5A059] font-mono font-bold text-xs tracking-[0.2em]">1988</span>
            <span className="text-[10px] tracking-[0.2em] font-mono uppercase text-gray-300">
              Founded Circle
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-[#C5A059] font-mono font-bold text-xs tracking-[0.2em]">$240K+</span>
            <span className="text-[10px] tracking-[0.2em] font-mono uppercase text-gray-300">
              Charitable Impact
            </span>
          </div>
        </motion.div>
      </div>

      {/* Absolute Bottom Border Highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-dark to-transparent opacity-90 pointer-events-none"></div>
    </section>
  );
}
