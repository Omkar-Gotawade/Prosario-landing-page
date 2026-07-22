import React from 'react';
import { Zap, ExternalLink } from 'lucide-react';


export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <Zap size={16} className="text-white" fill="white" />
              </div>
              <span className="text-white font-semibold text-lg">Prosario</span>
            </a>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
              AI-powered outbound sales. Describe your business, discover the right companies, 
              and launch personalized campaigns — automatically.
            </p>
            <div className="flex items-center gap-3 mt-6">
            <a href="#" className="p-2 text-neutral-600 hover:text-neutral-300 hover:bg-white/5 rounded-lg transition-colors">
                <ExternalLink size={16} />
              </a>
              <a href="#" className="p-2 text-neutral-600 hover:text-neutral-300 hover:bg-white/5 rounded-lg transition-colors">
                <ExternalLink size={16} />
              </a>
              <a href="#" className="p-2 text-neutral-600 hover:text-neutral-300 hover:bg-white/5 rounded-lg transition-colors">
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {['Features', 'How It Works', 'Roadmap', 'Changelog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-neutral-500 text-sm hover:text-neutral-200 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {['About', 'Blog', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-neutral-500 text-sm hover:text-neutral-200 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} Prosario. Building in public.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-neutral-500 text-xs">Currently in MVP — Early access open</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
