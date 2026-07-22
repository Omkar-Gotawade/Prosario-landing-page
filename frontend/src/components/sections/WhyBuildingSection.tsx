import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Search, PenLine, BarChart3, ArrowRight, Zap } from 'lucide-react';

const STACK_ITEMS = [
  { icon: Database, label: 'Lead Database', desc: 'Apollo, ZoomInfo, Hunter' },
  { icon: Search, label: 'Research Tools', desc: 'Manual browsing, LinkedIn' },
  { icon: PenLine, label: 'AI Writing', desc: 'ChatGPT, Jasper, copy.ai' },
  { icon: BarChart3, label: 'Campaign Tools', desc: 'Instantly, Lemlist, Outreach' },
];

export const WhyBuildingSection: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Narrative */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
              Why We're Building Prosario
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              Today's outbound stack is{' '}
              <span className="text-red-400">fragmented.</span>
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              The average sales team uses 4–6 different tools just to run outbound. Each tool requires its own login, its own workflow, and its own learning curve.
            </p>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              Leads slip through. Context gets lost. Teams spend more time switching tools than actually selling.
            </p>
            <p className="text-white text-lg leading-relaxed font-medium">
              Prosario combines discovery, research, and personalized outreach into{' '}
              <span className="text-blue-400">one seamless workflow.</span>
            </p>
          </motion.div>

          {/* Right: Stack comparison */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Old way */}
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
              <p className="text-red-400 text-sm font-semibold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Traditional Outbound
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {STACK_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <item.icon size={16} className="text-neutral-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-neutral-300 text-xs font-medium">{item.label}</p>
                      <p className="text-neutral-600 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                ❌ Hope emails reach inbox
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-3 text-neutral-500 text-sm">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-500/50" />
                <ArrowRight size={16} className="text-blue-400" />
                <span className="text-blue-400 font-medium">Prosario</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-500/50" />
              </div>
            </div>

            {/* New way */}
            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 glow-blue-sm">
              <p className="text-blue-400 text-sm font-semibold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Prosario
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  'AI Discovery',
                  'Research',
                  'Personalized Email',
                  'Deliverability Optimization',
                  'Launch Campaign'
                ].map((step, idx) => (
                  <div key={step} className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-white text-xs font-semibold">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
