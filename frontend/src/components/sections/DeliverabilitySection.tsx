import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, AlertTriangle, Key, CheckCircle, ShieldAlert, AlertOctagon, MailX, XCircle, ArrowRight } from 'lucide-react';

const DELIVERABILITY_CARDS = [
  {
    icon: Activity,
    title: 'Deliverability Diagnostics',
    desc: 'Understand the health of your outbound setup before sending.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: AlertTriangle,
    title: 'Spam Risk Analysis',
    desc: 'Identify factors that may affect inbox placement.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: Key,
    title: 'Email Authentication Guidance',
    desc: 'Surface missing or incorrect email authentication settings such as SPF, DKIM, and DMARC.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: CheckCircle,
    title: 'Campaign Readiness',
    desc: 'Know when your campaign is ready to launch.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
];

const WHY_DELIVERABILITY = [
  {
    problem: 'Poor sender reputation',
    consequence: 'Spam folder',
    icon: ShieldAlert,
    color: 'from-red-500/10 to-transparent',
    borderColor: 'border-red-500/20',
  },
  {
    problem: 'Missing authentication',
    consequence: 'Reduced trust',
    icon: AlertOctagon,
    color: 'from-amber-500/10 to-transparent',
    borderColor: 'border-amber-500/20',
  },
  {
    problem: 'Generic emails',
    consequence: 'Low engagement',
    icon: MailX,
    color: 'from-violet-500/10 to-transparent',
    borderColor: 'border-violet-500/20',
  },
  {
    problem: 'No deliverability checks',
    consequence: 'Lower campaign performance',
    icon: XCircle,
    color: 'from-neutral-500/10 to-transparent',
    borderColor: 'border-neutral-500/20',
  },
];

export const DeliverabilitySection: React.FC = () => {
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
    <section id="deliverability-details" className="py-24 sm:py-32 relative overflow-hidden bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Diagnostics Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
              Deliverability Intelligence
            </span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Great Outreach Starts<br />
            <span className="gradient-text-blue">Before You Hit Send.</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-neutral-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Most outbound tools stop after generating an email. Prosario helps you evaluate the health of your outbound setup before launching campaigns, giving you insights that can improve deliverability and reduce the likelihood of emails being filtered as spam.
          </motion.p>
        </motion.div>

        {/* Diagnostics Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
        >
          {DELIVERABILITY_CARDS.map((card) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/20 transition-all duration-300 group relative"
            >
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-4 group-hover:scale-115 transition-transform`}>
                <card.icon size={18} className={card.color} />
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">{card.title}</h3>
              <p className="text-neutral-500 text-xs leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Deliverability Matters */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-6">
            Why Deliverability Matters
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Even the Best Email Fails<br />
            <span className="gradient-text">If It Never Reaches the Inbox.</span>
          </h2>
        </div>

        {/* Deliverability Chain Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_DELIVERABILITY.map((item, idx) => (
            <motion.div
              key={item.problem}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`p-6 rounded-2xl bg-gradient-to-b ${item.color} border ${item.borderColor} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">Problem</span>
                  <item.icon size={16} className="text-neutral-400" />
                </div>
                <h4 className="text-white font-bold text-sm mb-6">{item.problem}</h4>
              </div>
              <div className="pt-4 border-t border-white/[0.04] space-y-1.5">
                <span className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider block">Consequence</span>
                <div className="flex items-center gap-2 text-red-400 text-xs font-bold">
                  <ArrowRight size={12} />
                  {item.consequence}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
