import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Sparkles, Shield } from 'lucide-react';

export const ValuePropSection: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="value-prop" className="py-24 sm:py-32 relative overflow-hidden bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
              Our Value Proposition
            </span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            One Platform.<br />
            <span className="gradient-text-blue">Two Critical Outbound Problems Solved.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Card 1: AI Lead Discovery */}
          <motion.div
            variants={itemVariants}
            className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-violet-500/5 border border-white/[0.06] hover:border-blue-500/20 transition-all duration-300 group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sparkles size={22} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">AI Lead Discovery</h3>
                  <p className="text-neutral-500 text-xs">Targeting best-fit prospects</p>
                </div>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Help users discover companies that are likely to need their solution by interpreting offering semantics instead of static database attributes.
              </p>
              <ul className="space-y-3">
                {[
                  'AI understands your business',
                  'Discovers relevant companies',
                  'Intelligent search expansion',
                  'Researches every lead',
                  'Generates personalized emails',
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm text-neutral-300">
                    <CheckCircle2 size={15} className="text-blue-400 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 2: Deliverability Optimization */}
          <motion.div
            variants={itemVariants}
            className="p-8 rounded-3xl bg-gradient-to-br from-violet-500/10 to-pink-500/5 border border-white/[0.06] hover:border-violet-500/20 transition-all duration-300 group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield size={22} className="text-violet-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Deliverability Optimization</h3>
                  <p className="text-neutral-500 text-xs">Maximizing outreach inbox placement</p>
                </div>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Help users maximize inbox placement and check structural setup before launching outreach campaigns.
              </p>
              <ul className="space-y-3">
                {[
                  'Email health checks',
                  'Deliverability diagnostics',
                  'Spam risk analysis',
                  'Authentication guidance',
                  'Campaign readiness insights',
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm text-neutral-300">
                    <CheckCircle2 size={15} className="text-violet-400 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
