/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";
import { CORE_VALUES } from "../data";

export default function About() {
  // Helper to render icons dynamically from string names
  const renderIcon = (name: string, className: string) => {
    const IconComponent = (LucideIcons as any)[name];
    if (!IconComponent) return null;
    return <IconComponent className={className} />;
  };

  return (
    <section
      id="about"
      className="py-24 bg-brand-dark relative overflow-hidden text-[#fdfbf7]"
    >
      {/* Decorative ambient backgrounds */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-brand-slate/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Summary Column */}
          <div id="about-intro-column" className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.3em] block font-bold">
                Our Foundational Pillar
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                A Haven for Connection & Purpose
              </h2>
            </div>
            
            <p className="text-gray-400 font-sans font-light leading-relaxed">
              Founded over three decades ago, <strong className="text-[#C5A059] font-semibold">The Golden Family Social Club</strong> stands as an elite refuge for community cohesion. We believe that a life well-lived balances social grace, intellectual exploration, and deliberate philanthropic backing.
            </p>
            
            <p className="text-gray-500 font-sans font-light text-sm leading-relaxed">
              By nesting multigenerational mentors, vibrant young leaders, charity volunteers, and recreation leagues in one esteemed family circle, we ensure that local heritage and community future walks hand-in-hand.
            </p>

            <div className="pt-6 grid grid-cols-2 gap-4 border-t border-white/10">
              <div>
                <span className="block text-3xl text-[#C5A059] font-black">100%</span>
                <span className="block text-[9px] font-mono uppercase tracking-[0.2em] text-gray-500 mt-1">
                  Donor Direct Transparency
                </span>
              </div>
              <div>
                <span className="block text-3xl text-[#C5A059] font-black">38+ Years</span>
                <span className="block text-[9px] font-mono uppercase tracking-[0.2em] text-gray-500 mt-1">
                  Securing Legacies
                </span>
              </div>
            </div>
          </div>

          {/* Bento Grid Values Column */}
          <div id="about-values-grid" className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CORE_VALUES.map((value, idx) => (
              <motion.div
                key={value.title}
                id={`about-value-card-${idx}`}
                viewport={{ once: true, margin: "-100px" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 sm:p-8 rounded-none bg-[#141414] border border-white/5 hover:border-[#C5A059]/30 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-none bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#C5A059] transition-all">
                    {renderIcon(value.icon, "w-5 h-5 text-[#C5A059]")}
                  </div>
                  <h3 className="text-lg text-[#E5E5E5] font-bold uppercase tracking-wider mb-3">
                    {value.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-sans font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center space-x-1.5 text-[9px] font-mono tracking-[0.25em] text-[#C5A059] uppercase">
                  <span>Guaranteed Principle</span>
                  <LucideIcons.ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
