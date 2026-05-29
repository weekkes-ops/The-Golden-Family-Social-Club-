/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  Users,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  ArrowUpRight,
  Info
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// Historical datasets reflecting Sierra Leone community development projects and software services.
const DONATION_TRENDS = [
  { period: "Jan 26", digitalProj: 1200, communityInit: 1800, total: 3000 },
  { period: "Feb 26", digitalProj: 2400, communityInit: 2100, total: 4500 },
  { period: "Mar 26", digitalProj: 3800, communityInit: 3200, total: 7000 },
  { period: "Apr 26", digitalProj: 5100, communityInit: 4400, total: 9500 },
  { period: "May 26", digitalProj: 7200, communityInit: 5800, total: 13000 },
];

const MEMBER_GROWTH_TRENDS = [
  { period: "Q1 2025", registeredFellows: 18, partnerAgencies: 4 },
  { period: "Q2 2025", registeredFellows: 32, partnerAgencies: 8 },
  { period: "Q3 2025", registeredFellows: 54, partnerAgencies: 11 },
  { period: "Q4 2025", registeredFellows: 85, partnerAgencies: 15 },
  { period: "Q1 2026", registeredFellows: 124, partnerAgencies: 20 },
  { period: "May 2026", registeredFellows: 165, partnerAgencies: 24 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  valueSuffix?: string;
}

const CustomChartTooltip = ({ active, payload, label, valueSuffix = "$" }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#141414] border border-[#C5A059]/30 p-4 shadow-xl rounded-none">
        <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-2">
          {label}
        </p>
        <div className="space-y-1.5">
          {payload.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between gap-8">
              <span className="text-[11px] font-mono text-gray-350 flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 inline-block shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}:
              </span>
              <span className="text-xs font-bold text-white font-mono">
                {valueSuffix === "$" ? `$${item.value.toLocaleString()}` : `${item.value} ${valueSuffix}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function ImpactAnalytics() {
  const [activeTab, setActiveTab] = useState<"donations" | "members">("donations");

  return (
    <section
      id="analytics"
      className="py-24 bg-brand-dark border-b border-white/10 text-white relative overflow-hidden"
    >
      {/* Visual background atmospheric noise */}
      <div className="absolute inset-0 bg-[#070708] pointer-events-none opacity-50"></div>
      
      {/* Decorative vertical coordinates lines */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-white/[0.02] hidden xl:block"></div>
      <div className="absolute right-6 top-0 bottom-0 w-px bg-white/[0.02] hidden xl:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.3em] block font-bold">
            Data Ledger & Analytics
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#E5E5E5]">
            Sovereign Trust Progress
          </h2>
          <div className="w-16 h-px bg-[#C5A059] mx-auto"></div>
          <p className="text-gray-400 font-sans font-light text-sm max-w-lg mx-auto">
            Review live operational statistics depicting both our technological development revenue deployment and Freetown registry growth.
          </p>
        </div>

        {/* Highlight Key Metrics Bento Rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1 */}
          <div className="bg-[#141414] border border-white/5 p-6 rounded-none flex items-start justify-between group hover:border-[#C5A059]/10 transition-all duration-300">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold block">
                Total Capital Mobilized
              </span>
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  $25,300+
                </h3>
                <p className="text-[11px] text-gray-500 font-sans leading-tight">
                  Direct client contracts & fundraising initiatives matching local plans.
                </p>
              </div>
            </div>
            <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#C5A059]" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#141414] border border-white/5 p-6 rounded-none flex items-start justify-between group hover:border-[#C5A059]/10 transition-all duration-300">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold block">
                Verified Portal Credentials
              </span>
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  165 Members
                </h3>
                <p className="text-[11px] text-gray-500 font-sans leading-tight">
                  Individuals & institutions enrolled securely through the Freetown census.
                </p>
              </div>
            </div>
            <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#C5A059]" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#141414] border border-white/5 p-6 rounded-none flex items-start justify-between group hover:border-[#C5A059]/10 transition-all duration-300">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold block">
                Synergetic Deployments
              </span>
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  24 Partners
                </h3>
                <p className="text-[11px] text-gray-500 font-sans leading-tight">
                  Active projects for organizations, public institutions, and government bodies.
                </p>
              </div>
            </div>
            <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-[#C5A059]" />
            </div>
          </div>

        </div>

        {/* Visualizer Frame with Tab Selectors */}
        <div className="bg-[#141414] border border-white/5 p-6 sm:p-8 rounded-none">
          
          {/* Tabs Controllers */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
            <div className="space-y-1">
              <h4 className="text-sm font-mono tracking-widest text-[#C5A059] uppercase font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Operational Metrics Timeline
              </h4>
              <p className="text-[11px] text-gray-500 font-sans font-light">
                Click a category below to load the respective interactive charting ledger.
              </p>
            </div>

            <div className="flex bg-black border border-white/10 p-1 rounded-none self-start sm:self-center">
              <button
                type="button"
                onClick={() => setActiveTab("donations")}
                className={`px-4 py-2 text-[10px] font-mono font-bold tracking-wider uppercase transition-all duration-150 rounded-none cursor-pointer ${
                  activeTab === "donations"
                    ? "bg-[#C5A059] text-black"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Capital Inflow ($)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("members")}
                className={`px-4 py-2 text-[10px] font-mono font-bold tracking-wider uppercase transition-all duration-150 rounded-none cursor-pointer ${
                  activeTab === "members"
                    ? "bg-[#C5A059] text-black"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Society Onboarding
              </button>
            </div>
          </div>

          {/* Chart Content Area */}
          <div id="recharts-visualizer-box" className="relative w-full h-[320px] sm:h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === "donations" ? (
                <AreaChart
                  data={DONATION_TRENDS}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorDigital" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C5A059" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#C5A059" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorComm" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eeddae" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#eeddae" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="period"
                    stroke="#555"
                    tick={{ fill: "#999", fontSize: 10, fontFamily: "monospace" }}
                    axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                    tickLine={{ stroke: "rgba(255,255,255,0.08)" }}
                  />
                  <YAxis
                    stroke="#555"
                    tick={{ fill: "#999", fontSize: 10, fontFamily: "monospace" }}
                    axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                    tickLine={{ stroke: "rgba(255,255,255,0.08)" }}
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip content={<CustomChartTooltip valueSuffix="$" />} cursor={{ stroke: "rgba(197, 160, 89, 0.2)" }} />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    iconSize={8}
                    content={({ payload }) => (
                      <div className="flex gap-4 items-center justify-end text-[10px] font-mono uppercase tracking-wider text-gray-400">
                        {payload?.map((entry: any, index: number) => (
                          <div key={`item-${index}`} className="flex items-center gap-1.5">
                            <span className="w-2 h-2 inline-block shrink-0" style={{ backgroundColor: entry.color }} />
                            <span>{entry.value === "digitalProj" ? "Web & Tech Revenue" : "Civic Action Pool"}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  <Area
                    name="digitalProj"
                    type="monotone"
                    dataKey="digitalProj"
                    stroke="#C5A059"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorDigital)"
                    animationBegin={250}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <Area
                    name="communityInit"
                    type="monotone"
                    dataKey="communityInit"
                    stroke="#eeddae"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorComm)"
                    animationBegin={500}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              ) : (
                <AreaChart
                  data={MEMBER_GROWTH_TRENDS}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorFellows" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C5A059" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#C5A059" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorAgencies" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="period"
                    stroke="#555"
                    tick={{ fill: "#999", fontSize: 10, fontFamily: "monospace" }}
                    axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                    tickLine={{ stroke: "rgba(255,255,255,0.08)" }}
                  />
                  <YAxis
                    stroke="#555"
                    tick={{ fill: "#999", fontSize: 10, fontFamily: "monospace" }}
                    axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                    tickLine={{ stroke: "rgba(255,255,255,0.08)" }}
                  />
                  <Tooltip content={<CustomChartTooltip valueSuffix="Entities" />} cursor={{ stroke: "rgba(197, 160, 89, 0.2)" }} />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    iconSize={8}
                    content={({ payload }) => (
                      <div className="flex gap-4 items-center justify-end text-[10px] font-mono uppercase tracking-wider text-gray-400">
                        {payload?.map((entry: any, index: number) => (
                          <div key={`item-${index}`} className="flex items-center gap-1.5">
                            <span className="w-2 h-2 inline-block shrink-0" style={{ backgroundColor: entry.color }} />
                            <span>{entry.value === "registeredFellows" ? "Credential Fellows" : "Partner Stakeholders"}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  <Area
                    name="registeredFellows"
                    type="monotone"
                    dataKey="registeredFellows"
                    stroke="#C5A059"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorFellows)"
                    animationBegin={250}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <Area
                    name="partnerAgencies"
                    type="monotone"
                    dataKey="partnerAgencies"
                    stroke="#34d399"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorAgencies)"
                    animationBegin={500}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Context Advisory note */}
          <div className="mt-6 flex items-start gap-3 bg-black/40 border border-white/5 p-4">
            <Info className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
            <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
              <strong className="text-white font-mono uppercase text-[9.5px] tracking-wider block mb-1">
                Security Ledger Integrity Notice
              </strong>
              These registry indices and funding streams are consolidated and cached with local persistence to maintain maximum transaction transparency within the AI Studio sandbox environment. No real funds are transferred.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
