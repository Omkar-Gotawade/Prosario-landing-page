import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PenLine, Cpu, Eye, Rocket } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: PenLine,
    title: 'Describe your business',
    description: 'Write a short description of what you sell and who you sell it to. Prosario\'s AI understands your offering in natural language.',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    borderColor: 'hover:border-blue-500/30',
    glowColor: 'hover:shadow-blue-500/10',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'AI finds companies',
    description: 'Our discovery engine identifies companies that match your ideal customer profile — beyond simple keyword matching.',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    borderColor: 'hover:border-violet-500/30',
    glowColor: 'hover:shadow-violet-500/10',
  },
  {
    step: '03',
    icon: Eye,
    title: 'Review researched leads',
    description: 'Every lead comes pre-researched with company summary, pain points, decision makers, and a personalized outreach angle.',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    borderColor: 'hover:border-emerald-500/30',
    glowColor: 'hover:shadow-emerald-500/10',
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Launch campaigns',
    description: 'Approve the AI-written personalized emails and launch your campaign. Track opens, replies, and results in one dashboard.',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    borderColor: 'hover:border-amber-500/30',
    glowColor: 'hover:shadow-amber-500/10',
  },
];

export const HowItWorksSection: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            From description to
            <br />
            <span className="gradient-text-blue">booked meetings.</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Four steps. No spreadsheets. No manual research. Just results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`relative flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] ${step.borderColor} hover:shadow-xl ${step.glowColor} transition-all duration-300 group`}
            >
              {/* Step number */}
              <div className="absolute -top-3 left-6">
                <span className="px-2 py-0.5 text-xs font-mono font-bold text-neutral-500 bg-neutral-900 border border-white/10 rounded-md">
                  {step.step}
                </span>
              </div>

              <div className={`w-12 h-12 rounded-2xl ${step.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon size={22} className={step.iconColor} />
              </div>

              <h3 className="text-white font-semibold mb-3">{step.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed flex-1">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
