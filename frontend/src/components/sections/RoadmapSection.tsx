import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Circle, Clock, GitBranch, Flag } from 'lucide-react';

const ROADMAP_SECTIONS = [
  {
    status: 'completed' as const,
    label: 'Completed',
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    items: [
      'Lead Management',
      'CSV Import',
      'Keyword Search',
      'Research Agent',
      'AI Email Writer',
      'Campaign Management',
      'Deliverability Diagnostics',
    ],
  },
  {
    status: 'in-progress' as const,
    label: 'In Progress',
    icon: Clock,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    items: [
      'AI Discovery',
      'Business Understanding Engine',
      'Search Strategy Generator',
    ],
  },
  {
    status: 'planned' as const,
    label: 'Planned',
    icon: Circle,
    color: 'text-neutral-400',
    bg: 'bg-neutral-500/10',
    border: 'border-neutral-500/20',
    items: [
      'Qualification Engine',
      'Need Score',
      'Reply Intelligence',
      'CRM Integrations',
      'LinkedIn Outreach',
    ],
  },
];

const TIMELINE = [
  { date: 'May 2025', label: 'Started building Prosario', done: true },
  { date: 'Jul 2025', label: 'Current MVP (you are here)', done: true, current: true },
  { date: 'Aug 2025', label: 'Looking for early users', done: false },
  { date: 'Q4 2025', label: 'Private Beta', done: false },
  { date: '2026', label: 'Public Launch', done: false },
];

export const RoadmapSection: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="roadmap" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-6">
            <GitBranch size={12} />
            Product Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            We're building this
            <br />
            <span className="gradient-text-blue">in public.</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            No vaporware. Here's exactly where we are and where we're headed.
          </p>
        </motion.div>

        {/* Roadmap columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {ROADMAP_SECTIONS.map((section, i) => (
            <motion.div
              key={section.status}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`p-6 rounded-2xl bg-white/[0.02] border ${section.border} transition-all duration-300`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-xl ${section.bg} flex items-center justify-center`}>
                  <section.icon size={16} className={section.color} />
                </div>
                <span className={`text-sm font-semibold ${section.color}`}>{section.label}</span>
              </div>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <section.icon size={14} className={section.color + ' flex-shrink-0'} />
                    <span className={section.status === 'completed' ? 'text-neutral-300' : 'text-neutral-500'}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <Flag size={16} className="text-blue-400" />
            <h3 className="text-white font-semibold">Build in Public Timeline</h3>
          </div>
          <div className="relative pl-6 border-l border-white/10 space-y-8">
            {TIMELINE.map((event, i) => (
              <motion.div
                key={event.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                className="relative"
              >
                <div className={`absolute -left-[25px] w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  event.current
                    ? 'border-blue-400 bg-blue-400/20 ring-2 ring-blue-400/20'
                    : event.done
                    ? 'border-emerald-400 bg-emerald-400/20'
                    : 'border-neutral-700 bg-neutral-900'
                }`}>
                  {event.current && (
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  )}
                  {event.done && !event.current && (
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  )}
                </div>
                <div className="pl-4">
                  <span className="text-xs font-mono text-neutral-500">{event.date}</span>
                  <p className={`text-sm font-medium mt-0.5 ${
                    event.current ? 'text-blue-300' : event.done ? 'text-neutral-200' : 'text-neutral-500'
                  }`}>
                    {event.label}
                    {event.current && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded border border-blue-500/30">
                        Current
                      </span>
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
