import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Search, Mail, BarChart3, CheckCircle2, Shield } from 'lucide-react';

const FEATURES = [
  {
    id: 'ai-discovery',
    icon: Sparkles,
    badge: 'In Progress',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    title: 'AI Discovery',
    headline: 'Stop searching with keywords.',
    description: 'Simply describe your business. Prosario finds companies that are likely to need your solution — using semantic AI that understands context, not just keywords.',
    bullets: [],
    gradient: 'from-blue-500/10 to-violet-500/5',
    borderColor: 'hover:border-blue-500/20',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
  {
    id: 'research-agent',
    icon: Search,
    badge: 'Available',
    badgeColor: 'text-green-400 bg-green-500/10 border-green-500/20',
    title: 'Research Agent',
    headline: 'Researches every lead automatically.',
    description: 'Before a single email is written, our Research Agent digs deep into every company.',
    bullets: [
      'Company summary & overview',
      'Pain points & challenges',
      'Products & services',
      'Decision makers',
      'Personalized outreach angle',
    ],
    gradient: 'from-emerald-500/10 to-cyan-500/5',
    borderColor: 'hover:border-emerald-500/20',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'ai-email',
    icon: Mail,
    badge: 'Available',
    badgeColor: 'text-green-400 bg-green-500/10 border-green-500/20',
    title: 'AI Email Writer',
    headline: 'No templates. No generic personalization.',
    description: 'Writes personalized emails using actual research. Every email is unique, relevant, and built on real insights about that specific company.',
    bullets: [],
    gradient: 'from-violet-500/10 to-pink-500/5',
    borderColor: 'hover:border-violet-500/20',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
  },
  {
    id: 'campaign-management',
    icon: BarChart3,
    badge: 'Available',
    badgeColor: 'text-green-400 bg-green-500/10 border-green-500/20',
    title: 'Campaign Management',
    headline: 'Launch personalized campaigns.',
    description: 'Manage your entire outreach pipeline — from researched leads to launched campaigns — all in one place.',
    bullets: [],
    gradient: 'from-cyan-500/10 to-blue-500/5',
    borderColor: 'hover:border-cyan-500/20',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
  },
  {
    id: 'deliverability-intelligence',
    icon: Shield,
    badge: 'Available',
    badgeColor: 'text-green-400 bg-green-500/10 border-green-500/20',
    title: 'Deliverability Intelligence',
    headline: 'Analyze your outbound setup before campaigns begin.',
    description: 'Help identify potential issues affecting inbox placement and improve campaign readiness.',
    bullets: [],
    gradient: 'from-emerald-500/10 to-cyan-500/5',
    borderColor: 'hover:border-emerald-500/20',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
];

export const FeaturesSection: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Everything you need for
            <br />
            <span className="gradient-text-blue">modern outbound.</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Prosario combines discovery, research, and personalized outreach into a single cohesive workflow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className={`relative p-8 rounded-3xl bg-gradient-to-br ${feature.gradient} border border-white/[0.06] ${feature.borderColor} transition-all duration-300 group overflow-hidden`}
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${feature.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={22} className={feature.iconColor} />
                  </div>
                  <span className={`px-3 py-1 rounded-full border text-xs font-medium ${feature.badgeColor}`}>
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/80 font-medium text-sm mb-3">{feature.headline}</p>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4">{feature.description}</p>

                {feature.bullets.length > 0 && (
                  <ul className="space-y-2">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2 text-sm text-neutral-300">
                        <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
