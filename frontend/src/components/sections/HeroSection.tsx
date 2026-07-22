import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Play, Sparkles, Search, Building2, FileText, Mail, Rocket,
  CheckCircle2, ChevronRight, Users, BarChart2, Shield, Share2, Settings
} from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

// Animated workflow mockup
const WORKFLOW_STEPS = [
  {
    id: 'input',
    label: 'Business Description',
    icon: FileText,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    content: 'We help B2B SaaS companies reduce customer churn by identifying at-risk accounts...',
    type: 'input',
  },
  {
    id: 'ai',
    label: 'AI Discovery',
    icon: Sparkles,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    content: 'Understanding your ICP and building search strategy...',
    type: 'processing',
  },
  {
    id: 'companies',
    label: 'Companies Found',
    icon: Building2,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    content: '47 companies discovered',
    type: 'results',
    results: ['Acme Corp', 'TechFlow Inc', 'SaaSify', 'CloudMetrics'],
  },
];

// Tabs structure matching actual system sidebar (Image 1)
const MAIN_TABS = [
  { id: 'leads', label: 'Leads', icon: Users, badge: true },
  { id: 'discover', label: 'Discover', icon: Search },
  { id: 'campaigns', label: 'Campaigns', icon: Mail },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'deliverability', label: 'Deliverability', icon: Shield },
  { id: 'webhooks', label: 'Webhooks', icon: Share2 },
];

const ACCOUNT_TABS = [
  { id: 'settings', label: 'Settings', icon: Settings },
];

// Interactive mock views for the dashboard tabs
const LeadsView: React.FC = () => (
  <div className="p-5 space-y-4">
    <div className="flex items-center justify-between mb-1">
      <span className="text-white text-xs font-semibold">Discovered Leads</span>
      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">4 Active</span>
    </div>
    <div className="space-y-2">
      {[
        { name: 'Sarah Jenkins', role: 'CEO', company: 'Acme Corp', status: 'Replied', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
        { name: 'David Chen', role: 'VP Sales', company: 'TechFlow Inc', status: 'Interested', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
        { name: 'Elena Rostova', role: 'Founder', company: 'SaaSify', status: 'Contacted', color: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
        { name: 'James Smith', role: 'Director', company: 'CloudMetrics', status: 'Contacted', color: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
      ].map((lead, i) => (
        <motion.div
          key={lead.name}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors"
        >
          <div className="flex flex-col min-w-0">
            <span className="text-white text-xs font-medium truncate">{lead.name}</span>
            <span className="text-neutral-500 text-[10px] truncate">{lead.role} @ {lead.company}</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${lead.color}`}>
            {lead.status}
          </span>
        </motion.div>
      ))}
    </div>
  </div>
);

const CampaignsView: React.FC = () => (
  <div className="p-5 space-y-4">
    <div className="flex items-center justify-between mb-1">
      <span className="text-white text-xs font-semibold">Outreach Campaigns</span>
      <span className="text-[10px] text-neutral-500">2 Campaigns</span>
    </div>
    <div className="space-y-2.5">
      {[
        { name: 'SaaS Churn Prevention', sent: 47, open: '68%', reply: '22%', active: true },
        { name: 'Enterprise Expansion', sent: 120, open: '74%', reply: '18%', active: false },
      ].map((camp, i) => (
        <motion.div
          key={camp.name}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-xs font-medium truncate">{camp.name}</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${camp.active ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-600'}`} />
              <span className="text-[10px] text-neutral-500">{camp.active ? 'Running' : 'Paused'}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.04]">
            <div>
              <div className="text-neutral-500 text-[9px]">Sent</div>
              <div className="text-white text-xs font-semibold">{camp.sent}</div>
            </div>
            <div>
              <div className="text-neutral-500 text-[9px]">Open Rate</div>
              <div className="text-emerald-400 text-xs font-semibold">{camp.open}</div>
            </div>
            <div>
              <div className="text-neutral-500 text-[9px]">Reply Rate</div>
              <div className="text-blue-400 text-xs font-semibold">{camp.reply}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const AnalyticsView: React.FC = () => (
  <div className="p-5 space-y-4">
    <span className="text-white text-xs font-semibold block mb-1">Performance Overview</span>
    <div className="grid grid-cols-2 gap-3">
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
        <span className="text-neutral-500 text-[9px] block">Outbound Volume</span>
        <span className="text-white text-base font-semibold">167</span>
        <span className="text-emerald-500 text-[9px] font-medium">+12% vs last week</span>
      </div>
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
        <span className="text-neutral-500 text-[9px] block">Avg Reply Rate</span>
        <span className="text-white text-base font-semibold">20.4%</span>
        <span className="text-emerald-500 text-[9px] font-medium">+2.3% vs last week</span>
      </div>
    </div>
    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
      <span className="text-neutral-400 text-[10px] font-medium">Outbound Trend</span>
      <div className="h-16 flex items-end justify-between px-1 pt-2">
        <svg className="w-full h-full text-blue-500" viewBox="0 0 100 30" preserveAspectRatio="none">
          <path
            d="M 0 25 Q 20 18 40 22 T 80 5 T 100 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M 0 25 Q 20 18 40 22 T 80 5 T 100 10 L 100 30 L 0 30 Z"
            fill="url(#grad)"
            opacity="0.1"
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
);

const DeliverabilityView: React.FC = () => (
  <div className="p-5 space-y-4">
    <span className="text-white text-xs font-semibold block mb-1">Domain Health Check</span>
    <div className="space-y-3">
      {[
        { domain: 'sending.prosario.io', health: '99%', status: 'Excellent' },
        { domain: 'inbound.prosario.io', health: '98%', status: 'Good' },
      ].map((dom) => (
        <div key={dom.domain} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white text-xs font-medium">{dom.domain}</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">{dom.health}</span>
          </div>
          <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/[0.04] text-[9px] text-neutral-400">
            <div className="flex items-center gap-1">✅ SPF</div>
            <div className="flex items-center gap-1">✅ DKIM</div>
            <div className="flex items-center gap-1">✅ DMARC</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const WebhooksView: React.FC = () => (
  <div className="p-5 space-y-4">
    <span className="text-white text-xs font-semibold block mb-1">Webhooks & Integrations</span>
    <div className="space-y-3">
      {[
        { name: 'HubSpot Sync', status: 'Connected', type: 'CRM' },
        { name: 'Slack Alerts', status: 'Connected', type: 'Chat' },
      ].map((integration) => (
        <div key={integration.name} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div>
            <div className="text-white text-xs font-medium">{integration.name}</div>
            <div className="text-neutral-500 text-[10px]">{integration.type} Integration</div>
          </div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            {integration.status}
          </span>
        </div>
      ))}
      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
        <div className="text-neutral-400 text-[10px] font-medium mb-1">Webhook Endpoint</div>
        <div className="text-neutral-500 font-mono text-[8px] truncate">https://api.prosario.io/v1/webhooks/icp_leads_sync_9a7c</div>
      </div>
    </div>
  </div>
);

const SettingsView: React.FC = () => (
  <div className="p-5 space-y-4">
    <span className="text-white text-xs font-semibold block mb-1">Outbound Settings</span>
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-neutral-500 text-[9px] uppercase font-bold tracking-wider">Daily Send Limit</label>
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <span className="text-white text-xs">50 emails / day per domain</span>
          <span className="text-[10px] text-blue-400 cursor-pointer">Edit</span>
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-neutral-500 text-[9px] uppercase font-bold tracking-wider">Sending Schedule</label>
        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="text-white text-xs font-medium">Mon - Fri, 9:00 AM - 5:00 PM</div>
          <div className="text-neutral-500 text-[9px] mt-0.5">Aligned to prospect local time zone</div>
        </div>
      </div>
    </div>
  </div>
);

const KeywordSearchView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    setSearched(false);
    setTimeout(() => {
      setSearching(false);
      setSearched(true);
    }, 1200);
  };

  return (
    <div className="p-5 space-y-4 h-full flex flex-col justify-center select-none">
      <div className="flex items-center justify-between mb-1">
        <span className="text-white text-xs font-semibold">Keyword Lead Search</span>
        <span className="text-[9px] text-neutral-500">Manual query engine</span>
      </div>
      
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={12} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. Founder AND Chicago AND Series A"
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-white placeholder-neutral-500 text-[10px] outline-none focus:border-blue-500/30 transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={searching}
          className="px-3 py-1.5 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white rounded-lg text-[10px] font-semibold transition-colors shrink-0"
        >
          {searching ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="flex-1 min-h-[140px] flex flex-col items-center justify-center border border-dashed border-white/[0.04] rounded-xl bg-white/[0.01] p-4 text-center">
        {searching && (
          <div className="space-y-2">
            <div className="w-5 h-5 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto" />
            <p className="text-[10px] text-neutral-400">Scanning directory for manual keyword matches...</p>
          </div>
        )}

        {!searching && !searched && (
          <div className="space-y-1">
            <p className="text-[10px] text-neutral-400">Enter keywords to query databases manually</p>
            <p className="text-[8px] text-neutral-600">Tip: Combine titles, locations, and technologies using AND/OR operators</p>
          </div>
        )}

        {!searching && searched && (
          <div className="w-full space-y-2 text-left">
            <span className="text-neutral-500 text-[9px] font-semibold">Search Results (Found 3 matches)</span>
            <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
              {[
                { name: 'John Miller', role: 'Founder & CEO', company: 'NextLayer', loc: 'Chicago, IL' },
                { name: 'Sarah Patel', role: 'Co-Founder', company: 'ApexData', loc: 'Chicago, IL' },
                { name: 'Marcus Brody', role: 'Managing Partner', company: 'CapitalGroup', loc: 'Chicago, IL' },
              ].map((res, idx) => (
                <motion.div
                  key={res.name}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-white text-[10px] font-medium truncate">{res.name}</div>
                    <div className="text-neutral-500 text-[8px] truncate">{res.role} @ {res.company}</div>
                  </div>
                  <span className="text-[8px] text-neutral-400 shrink-0">{res.loc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'discover' | 'campaigns' | 'analytics' | 'deliverability' | 'webhooks' | 'settings'>('discover');
  const [discoverMode, setDiscoverMode] = useState<'ai' | 'keyword'>('ai');
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate tabs to show off features without requiring clicks
  useEffect(() => {
    if (isHovered) return;
    const tabs = ['discover', 'leads', 'campaigns', 'analytics', 'deliverability', 'webhooks', 'settings'];
    
    const interval = setInterval(() => {
      setActiveTab(prev => {
        const currentIndex = tabs.indexOf(prev);
        const nextIndex = (currentIndex + 1) % tabs.length;
        if (currentIndex === -1) return 'discover';
        return tabs[nextIndex] as any;
      });
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  // AI Discovery wizard steps animation
  useEffect(() => {
    if (activeTab !== 'discover') return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % WORKFLOW_STEPS.length;
        if (next === 0) setCompletedSteps([]);
        else setCompletedSteps((c) => [...c, prev]);
        return next;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [activeTab]);

  const current = WORKFLOW_STEPS[activeStep];

  return (
    <div 
      className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer glow */}
      <div className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-3xl" />
      
      {/* Main card */}
      <div className="relative rounded-3xl bg-neutral-900/80 border border-white/[0.08] overflow-hidden backdrop-blur-xl shadow-2xl">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.06]">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-amber-500/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          <span className="text-neutral-500 text-xs ml-3 font-mono">prosario.io/dashboard</span>
        </div>

        {/* Dashboard inner layout */}
        <div className="flex min-h-[380px]">
          {/* Main Sidebar (Branded to Prosario, matching Image 1) */}
          <div className="w-12 sm:w-36 md:w-40 bg-neutral-950/80 border-r border-white/[0.06] p-2 flex flex-col justify-between shrink-0 select-none">
            <div className="space-y-4">
              {/* Branding / Logo */}
              <div className="flex items-center gap-2 px-2 py-1">
                <img src="/logo.png" alt="Prosario" className="w-5 h-5 object-contain shrink-0" />
                <span className="text-white font-bold text-xs tracking-tight hidden sm:inline">Prosario</span>
              </div>

              {/* Main Nav group */}
              <div className="space-y-0.5">
                <div className="text-[8px] font-bold text-neutral-600 uppercase tracking-wider px-2 py-1 hidden sm:block">Main</div>
                {MAIN_TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      id={`mock-tab-${tab.id}`}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all relative ${
                        isActive
                          ? 'bg-white/[0.04] text-white'
                          : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-amber-500 rounded-r" />
                      )}
                      <Icon size={13} className={`${isActive ? 'text-amber-500' : 'text-neutral-500'} shrink-0`} />
                      <span className="text-[10px] font-medium hidden sm:inline">{tab.label}</span>
                      {tab.badge && (
                        <span className="absolute right-2 w-1.5 h-1.5 rounded-full bg-amber-500 hidden sm:block" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Account Group */}
            <div className="space-y-0.5">
              <div className="text-[8px] font-bold text-neutral-600 uppercase tracking-wider px-2 py-1 hidden sm:block">Account</div>
              {ACCOUNT_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    id={`mock-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all relative ${
                      isActive
                        ? 'bg-white/[0.04] text-white'
                        : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-amber-500 rounded-r" />
                    )}
                    <Icon size={13} className="shrink-0" />
                    <span className="text-[10px] font-medium hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 min-w-0 bg-neutral-900/40">
            {activeTab === 'discover' && (
              <div className="flex flex-col h-full min-h-[380px]">
                {/* Mode Selector Header */}
                <div className="flex items-center gap-2 p-2.5 border-b border-white/[0.06] bg-neutral-950/20 shrink-0 select-none">
                  <button
                    id="mock-discover-mode-ai"
                    onClick={() => setDiscoverMode('ai')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold border transition-all ${
                      discoverMode === 'ai'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : 'border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'
                    }`}
                  >
                    <Sparkles size={11} />
                    AI Discovery
                  </button>
                  <button
                    id="mock-discover-mode-keyword"
                    onClick={() => setDiscoverMode('keyword')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold border transition-all ${
                      discoverMode === 'keyword'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : 'border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'
                    }`}
                  >
                    <Search size={11} />
                    Keyword Search
                  </button>
                </div>

                {discoverMode === 'ai' ? (
                  <div className="flex flex-1 min-h-[330px]">
                    {/* Steps sidebar nested inside Discover tab content */}
                    <div className="w-28 sm:w-36 border-r border-white/[0.06] p-2 flex flex-col gap-1 shrink-0 bg-neutral-900/20">
                      {WORKFLOW_STEPS.map((step, i) => {
                        const isActive = i === activeStep;
                        const isDone = completedSteps.includes(i);
                        return (
                          <div
                            key={step.id}
                            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg transition-all duration-300 ${
                              isActive
                                ? `${step.bg} border ${step.border}`
                                : isDone
                                ? 'opacity-60'
                                : 'opacity-30'
                            }`}
                          >
                            {isDone ? (
                              <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                            ) : (
                              <step.icon size={12} className={isActive ? step.color : 'text-neutral-500'} />
                            )}
                            <span className={`text-[10px] font-medium truncate ${
                              isActive ? 'text-white' : isDone ? 'text-neutral-400' : 'text-neutral-600'
                            }`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Active step content */}
                    <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeStep}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.3 }}
                          className="min-w-0"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <div className={`w-7 h-7 rounded-lg ${current.bg} flex items-center justify-center`}>
                              <current.icon size={14} className={current.color} />
                            </div>
                            <span className="text-white text-sm font-semibold">{current.label}</span>
                          </div>

                          {current.type === 'processing' && (
                            <div className="space-y-2">
                              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                                  initial={{ width: '5%' }}
                                  animate={{ width: '85%' }}
                                  transition={{ duration: 1.5, ease: 'easeOut' }}
                                />
                              </div>
                              <p className="text-neutral-500 text-xs">{current.content}</p>
                              <div className="flex gap-1 mt-3">
                                {[...Array(3)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full bg-blue-500"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {current.type === 'input' && (
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                              <p className="text-neutral-300 text-xs leading-relaxed">
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 1 }}
                                >
                                  {current.content}
                                </motion.span>
                                <span className="ml-0.5 w-0.5 h-4 bg-blue-400 inline-block animate-pulse" />
                              </p>
                            </div>
                          )}

                          {current.type === 'results' && (
                            <div className="space-y-2">
                              <p className="text-cyan-400 text-xs font-semibold mb-3">{current.content}</p>
                              {current.results?.map((company, i) => (
                                <motion.div
                                  key={company}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]"
                                >
                                  <Building2 size={12} className="text-neutral-500" />
                                  <span className="text-neutral-300 text-xs">{company}</span>
                                  <ChevronRight size={10} className="text-neutral-600 ml-auto" />
                                </motion.div>
                              ))}
                            </div>
                          )}

                          {current.type === 'email' && (
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                              <div className="flex gap-2 text-xs text-neutral-600">
                                <span>To:</span>
                                <span className="text-neutral-400">sarah@acmecorp.com</span>
                              </div>
                              <div className="flex gap-2 text-xs text-neutral-600">
                                <span>Sub:</span>
                                <span className="text-neutral-400">Helping Acme reduce churn</span>
                              </div>
                              <div className="border-t border-white/[0.05] pt-2">
                                <p className="text-neutral-400 text-xs leading-relaxed">{current.content}</p>
                              </div>
                            </div>
                          )}

                          {current.type === 'launched' && (
                            <div className="text-center py-4">
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                                className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-3"
                              >
                                <Rocket size={22} className="text-rose-400" />
                              </motion.div>
                              <p className="text-white text-sm font-semibold mb-1">{current.content}</p>
                              <p className="text-neutral-500 text-xs">Campaign launched successfully</p>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                ) : (
                  <KeywordSearchView />
                )}
              </div>
            )}

            {activeTab === 'leads' && <LeadsView />}
            {activeTab === 'campaigns' && <CampaignsView />}
            {activeTab === 'analytics' && <AnalyticsView />}
            {activeTab === 'deliverability' && <DeliverabilityView />}
            {activeTab === 'webhooks' && <WebhooksView />}
            {activeTab === 'settings' && <SettingsView />}
          </div>
        </div>
      </div>
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const { track } = useAnalytics();

  const scrollTo = (id: string) => {
    setTimeout(() => {
      const el = document.querySelector(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-12 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 radial-gradient pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                MVP — Early Access Open
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
            >
              Find the Right Companies.{' '}
              <span className="gradient-text-blue">Reach Their Inbox.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
            >
              Prosario helps B2B teams discover companies that actually need their product, researches every lead, generates personalized cold emails, and optimizes deliverability so more emails reach the inbox—not spam.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button
                onClick={() => {
                  scrollTo('#waitlist');
                  track('cta_click', { type: 'hero_join_early_access' });
                }}
                id="hero-cta-primary"
                className="group flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-400 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30 pulse-glow"
              >
                Join Early Access
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  scrollTo('#how-it-works');
                  track('cta_click', { type: 'hero_see_how_it_works' });
                }}
                id="hero-cta-secondary"
                className="group flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200"
              >
                <Play size={15} className="text-blue-400" />
                See How It Works
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6"
            >
              {[
                { label: 'Building AI Discovery', emoji: '🚀' },
                { label: 'Deliverability Intelligence Available', emoji: '📬' },
                { label: 'Looking for Early Design Partners', emoji: '👥' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span>{item.emoji}</span>
                  <span className="text-neutral-500 text-sm">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="float"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
