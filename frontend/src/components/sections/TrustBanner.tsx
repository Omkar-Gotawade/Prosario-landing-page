import React from 'react';
import { motion } from 'framer-motion';

const TRUST_ITEMS = [
  { label: 'Currently in MVP', emoji: '🛠️' },
  { label: 'Building in Public', emoji: '📢' },
  { label: 'Looking for Early Design Partners', emoji: '🤝' },
  { label: 'Early Access Open', emoji: '🚀' },
  { label: 'No VC funding — Founder-led', emoji: '💪' },
  { label: 'Reply to every email', emoji: '✉️' },
];

const DOUBLED = [...TRUST_ITEMS, ...TRUST_ITEMS];

export const TrustBanner: React.FC = () => {
  return (
    <div className="relative py-8 overflow-hidden border-y border-white/[0.04]">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
        className="flex gap-8 w-max"
      >
        {DOUBLED.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] flex-shrink-0"
          >
            <span className="text-base">{item.emoji}</span>
            <span className="text-neutral-400 text-sm font-medium whitespace-nowrap">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
