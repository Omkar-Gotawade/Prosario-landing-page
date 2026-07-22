import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PERSONAS = [
  {
    emoji: '🚀',
    title: 'Founders',
    description: 'Grow your pipeline without spending hours searching for prospects. Focus on closing, not hunting.',
  },
  {
    emoji: '📈',
    title: 'Sales Teams',
    description: 'Discover qualified companies, personalize outreach, and launch campaigns faster than ever.',
  },
  {
    emoji: '🎯',
    title: 'SDR Teams',
    description: 'Spend less time prospecting and more time booking meetings. Let AI handle the research.',
  },
  {
    emoji: '🏢',
    title: 'B2B Agencies',
    description: 'Find high-quality prospects for your clients and run personalized outreach at scale.',
  },
  {
    emoji: '🤝',
    title: 'Recruiters',
    description: 'Discover companies that are actively hiring and personalize outreach to decision-makers.',
  },
  {
    emoji: '💼',
    title: 'Consultants',
    description: 'Find businesses that match your expertise and start relevant conversations instantly.',
  },
];

export const WhoIsItForSection: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="who-its-for" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            Who It's For
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Built for anyone who
            <br />
            <span className="gradient-text-blue">does outbound.</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Whether you're a solo founder or a team of SDRs, Prosario fits into your workflow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PERSONAS.map((persona, i) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 cursor-default"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 w-fit">
                {persona.emoji}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{persona.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{persona.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
