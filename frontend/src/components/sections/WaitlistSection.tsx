import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, User, Mail, Building2, Briefcase, Globe, MessageSquare, TrendingUp, PhoneCall, AlertCircle, X } from 'lucide-react';
import { joinWaitlist } from '@/lib/api';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { WaitlistFormData } from '@/types';

const ROLES = ['Founder', 'CEO/Co-founder', 'VP Sales', 'Sales Manager', 'SDR / BDR', 'Account Executive', 'B2B Agency Owner', 'Recruiter', 'Consultant', 'Other'];
const MONTHLY_OUTREACH = ['0–100', '100–500', '500–2000', '2000+'];

const BENEFITS = [
  'Early access before public launch',
  'Direct access to the founder',
  'Influence the product roadmap',
  'Lifetime early adopter pricing',
  'Priority onboarding',
];

const defaultForm: WaitlistFormData = {
  name: '',
  email: '',
  company: '',
  role: '',
  website: '',
  product_description: '',
  biggest_outbound_challenge: '',
  monthly_outreach: '',
  beta_feedback: false,
};

type FieldErrors = Partial<Record<keyof WaitlistFormData, string>>;

export const WaitlistSection: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { track } = useAnalytics();

  const [form, setForm] = useState<WaitlistFormData>(defaultForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');
  const [formStarted, setFormStarted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (!formStarted) {
      setFormStarted(true);
      track('form_started', { section: 'waitlist' });
    }

    setForm((prev: WaitlistFormData) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name as keyof WaitlistFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FieldErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email address';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError('');

    try {
      const params = new URLSearchParams(window.location.search);
      await joinWaitlist({
        ...form,
        email: form.email.toLowerCase(),
        source: params.get('utm_source') || document.referrer || 'direct',
      });
      setSubmitted(true);
      track('form_completed', { section: 'waitlist' });
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number; data?: { detail?: string } } })?.response?.status;
      if (status === 409) {
        setApiError('This email is already on the waitlist. We\'ll be in touch!');
      } else {
        setApiError('Something went wrong. Please try again or email us directly.');
      }
      track('form_error', { error: status });
    } finally {
      setLoading(false);
    }
  };

  const InputClass = (field: keyof WaitlistFormData) =>
    `w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
      errors[field] ? 'border-red-500/50 focus:border-red-400' : 'border-white/[0.08] focus:border-blue-500/50'
    } text-white placeholder-neutral-500 text-sm outline-none transition-colors`;

  return (
    <section id="waitlist" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: CTA content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
              Early Access
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Become an Early
              <br />
              <span className="gradient-text-blue">Design Partner.</span>
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              Join early access and help shape an AI-powered outbound platform that combines intelligent lead discovery with deliverability optimization to help teams find the right companies and improve the chances their emails reach the inbox.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-10">
              {BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-blue-400 flex-shrink-0" />
                  <span className="text-neutral-300 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Book a call CTA */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <PhoneCall size={18} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Talk to the founder directly</p>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3">
                    5–10 conversations will teach us more than 100 anonymous signups. Book a 15-minute call and help shape what we build.
                  </p>
                  <a
                    href="https://calendar.app.google/prosario-15min"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('cta_click', { type: 'book_call' })}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-500/20 rounded-xl transition-colors"
                  >
                    <PhoneCall size={12} />
                    Book a 15-Minute Call
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-5"
              noValidate
            >
                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-2">
                        <User size={12} className="inline mr-1" />
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="name" type="text" value={form.name} onChange={handleChange}
                        placeholder="Your name" className={InputClass('name')}
                        id="waitlist-name"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-2">
                        <Mail size={12} className="inline mr-1" />
                        Business Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="email" type="email" value={form.email} onChange={handleChange}
                        placeholder="you@company.com" className={InputClass('email')}
                        id="waitlist-email"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Row 2: Company + Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-2">
                        <Building2 size={12} className="inline mr-1" />
                        Company
                      </label>
                      <input
                        name="company" type="text" value={form.company} onChange={handleChange}
                        placeholder="Your company" className={InputClass('company')}
                        id="waitlist-company"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-2">
                        <Briefcase size={12} className="inline mr-1" />
                        Role
                      </label>
                      <select
                        name="role" value={form.role} onChange={handleChange}
                        className={InputClass('role') + ' cursor-pointer'}
                        id="waitlist-role"
                      >
                        <option value="" className="bg-neutral-900 text-neutral-300">Select your role</option>
                        {ROLES.map((r) => <option key={r} value={r} className="bg-neutral-900 text-neutral-300">{r}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-2">
                      <Globe size={12} className="inline mr-1" />
                      Website <span className="text-neutral-600">(optional)</span>
                    </label>
                    <input
                      name="website" type="url" value={form.website} onChange={handleChange}
                      placeholder="https://yourcompany.com" className={InputClass('website')}
                      id="waitlist-website"
                    />
                  </div>

                  {/* What do you sell */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-2">
                      <MessageSquare size={12} className="inline mr-1" />
                      What do you sell?
                    </label>
                    <textarea
                      name="product_description" value={form.product_description} onChange={handleChange}
                      placeholder="Describe your product or service in a few sentences..."
                      rows={3} className={InputClass('product_description') + ' resize-none'}
                      id="waitlist-product"
                    />
                  </div>

                  {/* Biggest challenge */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-2">
                      <TrendingUp size={12} className="inline mr-1" />
                      Biggest outbound challenge
                    </label>
                    <textarea
                      name="biggest_outbound_challenge" value={form.biggest_outbound_challenge} onChange={handleChange}
                      placeholder="What's your biggest frustration with outbound today?"
                      rows={2} className={InputClass('biggest_outbound_challenge') + ' resize-none'}
                      id="waitlist-challenge"
                    />
                  </div>

                  {/* Monthly outreach */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-2">
                      How many cold emails do you send monthly?
                    </label>
                    <select
                      name="monthly_outreach" value={form.monthly_outreach} onChange={handleChange}
                      className={InputClass('monthly_outreach') + ' cursor-pointer'}
                      id="waitlist-monthly"
                    >
                      <option value="" className="bg-neutral-900 text-neutral-300">Select range</option>
                      {MONTHLY_OUTREACH.map((r) => <option key={r} value={r} className="bg-neutral-900 text-neutral-300">{r}</option>)}
                    </select>
                  </div>

                  {/* Beta checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer group" id="waitlist-beta-label">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox" name="beta_feedback" checked={form.beta_feedback} onChange={handleChange}
                        className="sr-only" id="waitlist-beta"
                      />
                      <div className={`w-4 h-4 rounded border transition-colors ${
                        form.beta_feedback
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-white/20 bg-white/5 group-hover:border-white/40'
                      } flex items-center justify-center`}>
                        {form.beta_feedback && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors leading-relaxed">
                      I'd be willing to give feedback during beta and help shape the product.
                    </span>
                  </label>

                  {/* API Error */}
                  {apiError && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                      <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-400 text-sm">{apiError}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit" disabled={loading}
                    id="waitlist-submit"
                    onClick={() => !loading && track('cta_click', { type: 'join_waitlist' })}
                    className="w-full py-4 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" /> Joining...</>
                    ) : (
                      'Join Early Access →'
                    )}
                  </button>

                  <p className="text-xs text-neutral-600 text-center">
                    No spam. No BS. Unsubscribe anytime.
                  </p>
            </motion.form>
          </motion.div>

          {/* Success Modal Overlay */}
          <AnimatePresence>
            {submitted && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-lg p-8 rounded-3xl bg-neutral-900 border border-white/[0.08] text-center shadow-2xl glow-blue"
                >
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm(defaultForm);
                    }}
                    className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <X size={20} />
                  </button>

                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} className="text-emerald-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">🎉 You're on the waitlist!</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                    We've saved your spot! We'll keep you updated as Prosario evolves. Check your inbox for a welcome email.
                  </p>

                  <div className="p-6 rounded-2xl bg-violet-500/5 border border-violet-500/20 text-left mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                        <PhoneCall size={18} className="text-violet-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm mb-1">Talk to the founder directly</p>
                        <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                          Help shape the future of AI outbound. Book a quick 15-minute call to discuss your biggest outreach challenges.
                        </p>
                        <a
                          href="https://calendar.app.google/prosario-15min"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-violet-500 text-white hover:bg-violet-400 rounded-xl transition-colors shadow-lg shadow-violet-500/20"
                        >
                          <PhoneCall size={12} />
                          Book a 15-Minute Call
                        </a>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm(defaultForm);
                    }}
                    className="w-full py-3 rounded-xl font-semibold text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-200 text-sm"
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
