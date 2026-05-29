/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowRight, BadgePercent, Award, ShieldAlert, Sparkles } from "lucide-react";
import { INITIAL_PROGRAMS } from "../data";

export default function Programs() {
  return (
    <section
      id="programs"
      className="py-24 bg-brand-dark/95 border-t border-b border-white/10 text-white relative"
    >
      <div className="absolute inset-0 bg-[#0C0C0C] pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div id="programs-header" className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.3em] block font-bold">
            Social Action & Mandates
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#E5E5E5]">
            Direct Community Impact
          </h2>
          <div className="w-16 h-px bg-[#C5A059] mx-auto"></div>
          <p className="text-gray-400 font-sans font-light text-sm max-w-lg mx-auto">
            We convert social gatherings into engines of local growth. Discover our ongoing programs financed directly by membership fees and custom public donations.
          </p>
        </div>

        {/* Program Cards Layout */}
        <div id="programs-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_PROGRAMS.map((program, idx) => (
            <motion.div
              key={program.id}
              id={`program-card-${program.id}`}
              viewport={{ once: true, margin: "-50px" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group flex flex-col h-full bg-[#141414] border border-white/5 hover:border-[#C5A059]/30 rounded-none overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-2xl"
            >
              {/* Image Section */}
              <div className="relative h-56 w-full overflow-hidden shrink-0">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase font-bold rounded-none bg-black border border-white/10 text-[#C5A059]">
                    {program.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center">
                  <span className="text-xs font-serif font-light italic text-[#E5E5E5]">
                    {program.tagline}
                  </span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl text-[#C5A059] font-bold uppercase tracking-wider">
                    {program.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans font-light">
                    {program.description}
                  </p>
                </div>

                {/* Impact Indicator Tag */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <Award className="w-4 h-4 text-[#C5A059]" />
                    <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase font-bold">
                      Proven Impact:
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#E5E5E5] font-mono">
                    {program.impact}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic call to action prompt */}
        <div
          id="programs-prompt"
          className="mt-16 p-6 sm:p-8 rounded-none bg-[#141414] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-none bg-black border border-white/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <p className="text-xs text-mono tracking-widest text-[#C5A059] uppercase font-bold">
                Sovereign Member-Directed Funding
              </p>
              <p className="text-xs text-gray-500 font-sans font-light mt-0.5 max-w-xl">
                Each member can cast quarterly votes to decide exactly which percentage of the fundraising pool is routed to these initiatives.
              </p>
            </div>
          </div>

          <span className="text-[10px] sm:text-xs font-serif italic text-[#C5A059] bg-black px-4 py-2 border border-white/10 rounded-none inline-block shrink-0">
            "We build families, not just buildings."
          </span>
        </div>

      </div>
    </section>
  );
}
