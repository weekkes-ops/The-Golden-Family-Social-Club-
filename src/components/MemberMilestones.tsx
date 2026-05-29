/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Award,
  Shield,
  Activity,
  Globe,
  Users,
  CheckCircle2,
  Bookmark,
  Calendar,
  Lock,
  Eye,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  Check
} from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  icon: React.ComponentType<any>;
  deeperContext: string;
  stats: string;
}

const CLUB_MILESTONES: Milestone[] = [
  {
    year: "1988",
    title: "Sovereign Club Charter",
    subtitle: "Inception in Freetown, SL",
    tag: "FOUNDATION",
    description: "The Golden Family Social Club is initially chartered at Upper Dwazak with a core emphasis on mutual support, educational sponsorship, and local community leadership schemes.",
    icon: Bookmark,
    deeperContext: "Originally founded by 12 community visionaries in Freetown's Western Area, establishing peer-to-peer scholarship accounts, physical reading materials, and direct vocational workshop groups.",
    stats: "12 Founding Guardians • Established Trust",
  },
  {
    year: "2014",
    title: "Grassroots Relief Mobilization",
    subtitle: "Civic Crisis Intervention",
    tag: "COMMUNITY AID",
    description: "Successfully coordinating neighborhood sanitations, food provision drives, and rapid medical assistance support systems during complex national public health emergencies.",
    icon: Shield,
    deeperContext: "Mobilized over 15 local water, sanitation, and hygiene stations. Delivered dry food rations to 400+ quarantine-impacted families, and coordinated direct safety corridors with municipality authorities.",
    stats: "15 Sanitation Hubs • 400+ Families",
  },
  {
    year: "2021",
    title: "Technological Pivot Phase",
    subtitle: "Bespoke Digital Operations",
    tag: "INNOVATION",
    description: "Expanding the legacy club mandate to incorporate professional software engineering services—directly designing responsive web and desktop portals for local institutions.",
    icon: Globe,
    deeperContext: "Shifted standard service blueprints to feature premium software design. Trained 150+ underprivileged youth in full-stack architecture, supplying bespoke administrative software free of charge.",
    stats: "150+ Code Scholars • 8 App Portals",
  },
  {
    year: "2025",
    title: "The Golden Census Roll",
    subtitle: "Sovereign ID & Portal Launch",
    tag: "SCALE",
    description: "Launching our client-safe Gold Social ID Card Generator database. Upgrading membership validation with active digital telemetry, enrolling 100+ secure fellows.",
    icon: Users,
    deeperContext: "Introduced military-grade localized cryptographic security checksums for digital credentials. Automated self-service enrollment protocols, guaranteeing secure client-database sandboxing.",
    stats: "100+ Secure Passes • zero leaks",
  },
  {
    year: "2026",
    title: "Institutional Synergy Hub",
    subtitle: "Upper Dwazak HQ Expansion",
    tag: "CURRENT",
    description: "Solidifying 24 corporate & government-backed partner deployment projects while sustaining localized outreach campaigns across Western Area, Sierra Leone.",
    icon: Award,
    deeperContext: "Actively constructing a modern community innovation laboratory space in Upper Dwazak. Securing direct operational paths with major technical schools to offer real-world job commissions.",
    stats: "24 Active Deliverables • Lab Renovation",
  },
];

export default function MemberMilestones() {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(CLUB_MILESTONES.length - 1);
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);
  const [openShareIndex, setOpenShareIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleShareClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setOpenShareIndex(openShareIndex === index ? null : index);
  };

  const handleShareOption = (e: React.MouseEvent, option: string, milestone: Milestone, index: number) => {
    e.stopPropagation();
    const text = `Read about The Golden Family Social Club milestone: ${milestone.year} - ${milestone.title}!`;
    const url = window.location.href;
    
    if (option === "copy") {
      navigator.clipboard.writeText(`${text} ${url}`);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    } else {
      let shareUrl = "";
      if (option === "twitter") {
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      } else if (option === "facebook") {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      } else if (option === "linkedin") {
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      }
      
      if (shareUrl) {
        window.open(shareUrl, "_blank", "noopener,noreferrer");
      }
    }
    setOpenShareIndex(null);
  };

  return (
    <section
      id="milestones"
      className="py-24 bg-[#070708] border-b border-white/10 text-white relative overflow-hidden"
    >
      {/* Subtle grid backing decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.3em] block font-bold">
            Historical Ledger
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#E5E5E5]">
            Member Milestones
          </h2>
          <div className="w-16 h-px bg-[#C5A059] mx-auto"></div>
          <p className="text-gray-400 font-sans font-light text-sm max-w-lg mx-auto">
            Stretches of civic responsibility, technological evolution, and community synergy that define our progress from 1988 to today.
          </p>
        </div>

        {/* Timeline Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Timeline Bar (7 cols on large desktop) */}
          <div className="lg:col-span-7 space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/[0.08]">
            {CLUB_MILESTONES.map((milestone, idx) => {
              const IconComponent = milestone.icon;
              const isActive = selectedMilestone === idx;

              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => setSelectedMilestone(idx)}
                  onMouseEnter={() => setHoveredMilestone(idx)}
                  onMouseLeave={() => setHoveredMilestone(null)}
                  className={`group relative pl-12 cursor-pointer transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-95"
                  }`}
                >
                  {/* Timeline bullet badge */}
                  <div
                    className={`absolute left-0 top-1.5 w-10 h-10 border flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#C5A059] border-[#C5A059] text-black scale-110 shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                        : "bg-[#141414] border-white/10 text-gray-400 group-hover:border-[#C5A059]/40"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  <div className="space-y-1.5 relative z-10">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-sm font-bold font-mono text-[#C5A059]">
                        {milestone.year}
                      </span>
                      <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 bg-white/5 text-gray-400 border border-white/5">
                        {milestone.tag}
                      </span>
                      {/* Interactive hover key indicator */}
                      <span className="text-[8px] font-mono tracking-widest text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity h-4 hidden sm:inline-flex items-center gap-1">
                        <Eye className="w-3 h-3" /> HOVER TO REVEAL TIMELINE LORE
                      </span>
                    </div>
                    
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base font-bold uppercase tracking-wide text-white group-hover:text-[#eeddae] transition-colors">
                        {milestone.title}
                      </h3>

                      {/* Clean micro-interaction share button dropdown */}
                      <div className="relative shrink-0 select-none z-30">
                        <button
                          type="button"
                          onClick={(e) => handleShareClick(e, idx)}
                          className="p-1 px-2 text-[9.5px] font-mono font-bold tracking-widest bg-white/5 hover:bg-[#C5A059] border border-white/5 hover:border-[#C5A059] text-gray-400 hover:text-black transition-all cursor-pointer flex items-center gap-1"
                          title="Share achievement"
                        >
                          <Share2 className="w-3 h-3" /> SHARE
                        </button>

                        <AnimatePresence>
                          {openShareIndex === idx && (
                            <>
                              <div 
                                className="fixed inset-0 z-40 cursor-default" 
                                onClick={(e) => { e.stopPropagation(); setOpenShareIndex(null); }}
                              />
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 mt-1.5 w-44 bg-[#141414] border border-[#C5A059]/40 py-1 shadow-2xl z-50 text-left rounded-none font-sans"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  type="button"
                                  onClick={(e) => handleShareOption(e, "twitter", milestone, idx)}
                                  className="w-full px-3.5 py-1.5 text-[10px] font-mono tracking-wider text-gray-300 hover:bg-[#C5A059] hover:text-black transition-colors flex items-center gap-2 cursor-pointer text-left"
                                >
                                  <Twitter className="w-3 h-3" /> SHARE ON X
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => handleShareOption(e, "facebook", milestone, idx)}
                                  className="w-full px-3.5 py-1.5 text-[10px] font-mono tracking-wider text-gray-300 hover:bg-[#C5A059] hover:text-black transition-colors flex items-center gap-2 cursor-pointer text-left"
                                >
                                  <Facebook className="w-3 h-3" /> FACEBOOK
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => handleShareOption(e, "linkedin", milestone, idx)}
                                  className="w-full px-3.5 py-1.5 text-[10px] font-mono tracking-wider text-gray-300 hover:bg-[#C5A059] hover:text-black transition-colors flex items-center gap-2 cursor-pointer text-left"
                                >
                                  <Linkedin className="w-3 h-3" /> LINKEDIN
                                </button>
                                <div className="border-t border-white/5 my-1" />
                                <button
                                  type="button"
                                  onClick={(e) => handleShareOption(e, "copy", milestone, idx)}
                                  className="w-full px-3.5 py-1.5 text-[10px] font-mono tracking-wider text-gray-300 hover:bg-[#C5A059] hover:text-black transition-colors flex items-center gap-2 cursor-pointer text-left"
                                >
                                  {copiedIndex === idx ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-500" />
                                      <span className="text-emerald-500">COPIED URL!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Link2 className="w-3 h-3" /> COPY LEDGER LINK
                                    </>
                                  )}
                                </button>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 font-sans leading-relaxed line-clamp-2 md:line-clamp-none">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Interactive Floating Detail Pop-up Overlay */}
                  <AnimatePresence>
                    {hoveredMilestone === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-[-12px] right-4 md:left-[50px] md:right-auto md:w-[350px] top-[75px] z-50 bg-[#161618] border border-[#C5A059]/40 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.95)] rounded-none pointer-events-none"
                      >
                        {/* Diagonal corner golden border aesthetic */}
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#C5A059]"></div>
                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-[#C5A059]"></div>
                        
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <span className="text-[9px] font-mono tracking-[0.2em] text-[#C5A059] uppercase font-bold flex items-center gap-1.5">
                              <Lock className="w-3 h-3" /> DEEPER HISTORY • {milestone.year}
                            </span>
                            <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest bg-emerald-950/40 border border-emerald-900/30 px-1 py-0.5">
                              SECURE REGISTRY
                            </span>
                          </div>
                          
                          <p className="text-[11.5px] text-gray-200 font-sans leading-relaxed">
                            {milestone.deeperContext}
                          </p>

                          <div className="bg-black/40 p-2.5 border border-white/[0.04] flex items-center justify-between">
                            <span className="text-[8.5px] font-mono text-gray-500 tracking-wider">
                              ESTABLISHED METRIC
                            </span>
                            <span className="text-[10px] font-mono font-black text-[#eeddae] tracking-wide">
                              {milestone.stats}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Feature Panel Detail (5 cols on large desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-[#141414] border border-white/5 p-6 sm:p-8 rounded-none relative overflow-hidden group">
              {/* Golden accent ornament in corners */}
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#C5A059]"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#C5A059]"></div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                  <div className="w-10 h-10 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block leading-none">
                      CURRENT COMPILATION INDEX
                    </span>
                    <span className="text-xs font-mono text-[#C5A059] font-bold">
                      ENTRY {selectedMilestone + 1} OF {CLUB_MILESTONES.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-4xl font-extrabold font-mono text-[#C5A059]/15 select-none block leading-none">
                      {CLUB_MILESTONES[selectedMilestone].year}
                    </span>
                    <h4 className="text-lg font-black uppercase tracking-wide text-white leading-tight">
                      {CLUB_MILESTONES[selectedMilestone].title}
                    </h4>
                    <p className="text-xs font-mono uppercase tracking-wider text-gray-400">
                      {CLUB_MILESTONES[selectedMilestone].subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-gray-300 font-sans font-light leading-relaxed">
                    {CLUB_MILESTONES[selectedMilestone].description}
                  </p>
                </div>

                {/* Milestone Trust Signatory Badge */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
                    <span className="text-[10px] font-mono uppercase text-gray-500">
                      Verifiable Milestone Ledger
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500 font-bold">
                    [ VERIFIED ]
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
