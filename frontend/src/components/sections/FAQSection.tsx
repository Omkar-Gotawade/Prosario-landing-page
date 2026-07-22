import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'How is AI Discovery different from keyword search?',
    answer: `Traditional keyword search requires you to know exactly what to search for. You have to guess the right industry terms, job titles, and company types.\n\nProsario's AI Discovery works differently. You describe your business in plain language — what you sell, who benefits from it, and why — and the AI understands your offering semantically. It then finds companies based on context and business fit, not keyword matches. This surfaces opportunities that keyword searches completely miss.`,
  },
  {
    question: 'Who is Prosario for?',
    answer: `Prosario is built for anyone who does B2B outbound: founders growing their pipeline, sales teams looking for qualified prospects, SDR teams spending too much time researching, B2B agencies managing multiple client campaigns, recruiters finding hiring companies, and consultants looking for relevant engagements. If you send cold emails as part of your business development, Prosario can help.`,
  },
  {
    question: 'When will beta launch?',
    answer: `We're targeting a private beta in Q4 2025. Early design partners on the waitlist get first access — typically 2–3 months before anyone else. We'll email you with updates as we hit milestones. You can also book a 15-minute call with the founder to get a personal preview as we get closer.`,
  },
  {
    question: 'How much will it cost?',
    answer: `We haven't finalized pricing yet — that will largely be shaped by conversations with early users like you. What we can commit to: early design partners will receive lifetime early-adopter pricing that will never increase, even after public launch. Being early genuinely pays off.`,
  },
  {
    question: 'Can I become an early tester?',
    answer: `Yes — that's exactly what the waitlist is for. Early design partners get access before public launch, a direct line to the founder, the ability to influence the roadmap, and lifetime early adopter pricing. We're also actively looking for people who are willing to give honest feedback during beta. Check the beta feedback checkbox when you sign up.`,
  },
  {
    question: 'What data does the Research Agent collect?',
    answer: `The Research Agent collects publicly available information about each company: a company summary, their products and services, potential pain points relevant to your offering, key decision makers, and a suggested personalized outreach angle. All research is used solely to generate better personalized emails and is not shared with third parties.`,
  },
  {
    question: 'Does Prosario guarantee inbox placement?',
    answer: `No. Prosario provides deliverability insights, diagnostics, and recommendations designed to help improve inbox placement. Final delivery depends on many factors including domain reputation, authentication, recipient behavior, and email providers.`,
  },
  {
    question: 'Why is deliverability important?',
    answer: `Even well-written cold emails cannot generate replies if they never reach the recipient's inbox. Improving deliverability increases the likelihood that emails are seen.`,
  },
];

const FAQItem: React.FC<{ item: typeof FAQ_ITEMS[0]; index: number }> = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="border border-white/[0.06] rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors group"
        aria-expanded={open}
        id={`faq-btn-${index}`}
      >
        <span className="text-white font-medium pr-4 group-hover:text-blue-300 transition-colors">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} className="text-neutral-500 group-hover:text-neutral-300 transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            role="region"
            aria-labelledby={`faq-btn-${index}`}
          >
            <div className="px-6 pb-6 border-t border-white/[0.04]">
              {item.answer.split('\n\n').map((para, i) => (
                <p key={i} className="text-neutral-400 text-sm leading-relaxed mt-4">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQSection: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-500/10 border border-neutral-500/20 text-neutral-400 text-xs font-medium mb-6">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Frequently asked
            <br />
            <span className="gradient-text-blue">questions.</span>
          </h2>
        </motion.div>

        {inView && (
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={item.question} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
