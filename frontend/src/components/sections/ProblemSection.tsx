import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Building2, Search, Clock, Mail, Layers,
  Sparkles, Database, PenLine, Rocket,
  AlertTriangle, ShieldAlert, EyeOff, Shield
} from 'lucide-react';

const PROBLEMS = [
  { icon: Search, title: 'Finding good companies is manual', desc: 'Hours spent on boolean queries and keywords that miss context.' },
  { icon: Clock, title: 'Slow manual research', desc: 'Every lead needs manually gathered context — pain points and decision makers.' },
  { icon: Mail, title: 'Generic email personalization', desc: 'Template outreach fails to resonate. Prospects spot template emails immediately.' },
  { icon: AlertTriangle, title: 'Emails landing in spam', desc: 'Domain and email setup configurations frequently route outbound to spam.' },
  { icon: ShieldAlert, title: 'Poor sender reputation', desc: 'Poor sending hygiene and lack of warmups ruin domain reputations.' },
  { icon: EyeOff, title: 'No visibility into email health', desc: 'Outbound campaigns are launched blindly without deliverability diagnostics.' },
];

const WORKFLOW = [
  { icon: PenLine, label: 'Business Description', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Sparkles, label: 'AI Discovery', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { icon: Search, label: 'Research Agent', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Mail, label: 'AI Email Writer', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: Shield, label: 'Deliverability Check', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { icon: Rocket, label: 'Launch Campaign', color: 'text-rose-400', bg: 'bg-rose-500/10' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const ProblemSection: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="problem" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problem */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-6">
              The Problem
            </span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Outbound hasn't changed<br />
            <span className="gradient-text">in years.</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-neutral-400 text-lg max-w-2xl mx-auto">
            While AI has transformed almost every other business function, outbound sales still relies on the same broken, manual workflow.
          </motion.p>
        </motion.div>

        {/* Problem Cards */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-32"
        >
          {PROBLEMS.map((problem) => (
            <motion.div
              key={problem.title}
              variants={itemVariants}
              className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-red-500/20 hover:bg-red-500/[0.03] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                <problem.icon size={18} className="text-red-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{problem.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{problem.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Solution */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            The Solution
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            One AI-powered<br />
            <span className="gradient-text-blue">outbound workflow.</span>
          </h2>
        </div>

        {/* Workflow */}
        <div className="flex flex-col items-center gap-0 max-w-md mx-auto">
          {WORKFLOW.map((step, i) => (
            <React.Fragment key={step.label}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-200 group"
              >
                <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <step.icon size={18} className={step.color} />
                </div>
                <span className="text-neutral-200 text-sm font-medium">{step.label}</span>
              </motion.div>
              {i < WORKFLOW.length - 1 && (
                <div className="w-px h-5 bg-gradient-to-b from-white/10 to-transparent" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
