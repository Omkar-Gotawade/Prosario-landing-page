import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import logoUrl from '@/assets/logo.png';

const NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: "Who It's For", href: '#who-its-for' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'FAQ', href: '#faq' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const attempt = () => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Element not in DOM yet (first load) — retry after paint
        requestAnimationFrame(() => {
          const retried = document.querySelector(href);
          if (retried) retried.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    };
    attempt();
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-neutral-950/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <img src={logoUrl} alt="Prosario" className="w-8 h-8 object-contain" />
              <span className="text-white font-semibold text-lg tracking-tight">Prosario</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="px-3 py-1.5 text-sm text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => scrollTo('#waitlist')}
                className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-400 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Join Waitlist
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-16 bg-neutral-950/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col p-6 gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-left px-4 py-3 text-lg text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-white/5 mt-2">
                <button
                  onClick={() => scrollTo('#waitlist')}
                  className="w-full px-4 py-3 text-center font-medium bg-blue-500 hover:bg-blue-400 text-white rounded-xl transition-colors"
                >
                  Join Waitlist
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
