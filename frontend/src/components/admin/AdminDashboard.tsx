import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, TrendingUp, Calendar, UserCheck,
  Download, Search, RefreshCw, LogOut, BarChart2,
  Mail, Building2, Briefcase, AlertCircle
} from 'lucide-react';
import {
  adminLogin, getWaitlistUsers, getWaitlistStats,
  exportWaitlistCsv, getAnalyticsSummary, setAuthToken
} from '@/lib/api';
import type { WaitlistUser, WaitlistStats } from '@/types';

// ---- Auth ----
const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await adminLogin(username, password);
      const token = res.data.access_token;
      setAuthToken(token);
      localStorage.setItem('prosario_admin_token', token);
      onLogin();
    } catch {
      setError('Invalid credentials. Try admin / prosario2024');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08]"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center mx-auto mb-4">
            <BarChart2 size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-neutral-500 text-sm mt-1">Prosario Internal</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" value={username} onChange={e => setUsername(e.target.value)}
            placeholder="Username" id="admin-username"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-neutral-500 text-sm outline-none focus:border-blue-500/50 transition-colors"
          />
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password" id="admin-password"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-neutral-500 text-sm outline-none focus:border-blue-500/50 transition-colors"
          />
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle size={14} />
              {error}
            </div>
          )}
          <button
            type="submit" disabled={loading} id="admin-login-btn"
            className="w-full py-3 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-400 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// ---- Stat Card ----
const StatCard: React.FC<{
  icon: React.ElementType; label: string; value: string | number; sub?: string; color: string;
}> = ({ icon: Icon, label, value, sub, color }) => (
  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
    <div className="flex items-center justify-between mb-4">
      <span className="text-neutral-500 text-sm">{label}</span>
      <div className={`w-8 h-8 rounded-xl ${color} flex items-center justify-center`}>
        <Icon size={16} className="text-white" />
      </div>
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    {sub && <div className="text-neutral-500 text-xs">{sub}</div>}
  </div>
);

// ---- Main Dashboard ----
const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [users, setUsers] = useState<WaitlistUser[]>([]);
  const [stats, setStats] = useState<WaitlistStats | null>(null);
  const [analytics, setAnalytics] = useState<Record<string, unknown> | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'analytics'>('users');

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersRes, statsRes, analyticsRes] = await Promise.all([
        getWaitlistUsers({ limit: 100, search: search || undefined }),
        getWaitlistStats(),
        getAnalyticsSummary(),
      ]);
      setUsers(usersRes.data);
      setStats(statsRes.data);
      setAnalytics(analyticsRes.data);
    } catch {
      // token may be expired
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [search]);

  const handleExport = async () => {
    try {
      const res = await exportWaitlistCsv();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'prosario_waitlist.csv';
      a.click();
    } catch {}
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('prosario_admin_token');
    onLogout();
  };

  const conversionRate = stats && analytics
    ? (() => {
        const pageViews = (analytics.events_by_type as Array<{ event_type: string; count: number }>)
          ?.find(e => e.event_type === 'page_view')?.count ?? 0;
        return pageViews > 0 ? ((stats.total / pageViews) * 100).toFixed(1) : '—';
      })()
    : '—';

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <BarChart2 size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-semibold">Prosario Admin</h1>
              <p className="text-neutral-500 text-xs">Internal Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={handleExport}
              id="admin-export-btn"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-300 rounded-xl transition-colors"
            >
              <Download size={14} />
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-neutral-500 hover:text-neutral-300 hover:bg-white/5 rounded-lg transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users} label="Total Signups" value={stats?.total ?? '—'} color="bg-blue-500" />
          <StatCard icon={Calendar} label="Today" value={stats?.today ?? '—'} color="bg-violet-500" />
          <StatCard icon={TrendingUp} label="This Week" value={stats?.this_week ?? '—'} color="bg-emerald-500" />
          <StatCard icon={UserCheck} label="Beta Willing" value={stats?.beta_willing ?? '—'} sub={`${conversionRate}% conversion`} color="bg-amber-500" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['users', 'analytics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm rounded-xl transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'users' && (
          <>
            {/* Search */}
            <div className="relative mb-4">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, email, or company..."
                id="admin-search"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder-neutral-500 text-sm outline-none focus:border-blue-500/30 transition-colors"
              />
            </div>

            {/* Users Table */}
            <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                      {['Name', 'Email', 'Company', 'Role', 'Monthly Outreach', 'Beta?', 'Joined'].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-medium text-neutral-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      [...Array(5)].map((_, i) => (
                        <tr key={i} className="border-b border-white/[0.04]">
                          {[...Array(7)].map((_, j) => (
                            <td key={j} className="px-5 py-4">
                              <div className="h-4 rounded shimmer" />
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-5 py-12 text-center text-neutral-600">
                          No signups yet.
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                                {user.name[0]?.toUpperCase()}
                              </div>
                              <span className="text-neutral-200 font-medium">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-neutral-400 flex items-center gap-1.5">
                              <Mail size={12} className="text-neutral-600" />{user.email}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-neutral-400 flex items-center gap-1.5">
                              <Building2 size={12} className="text-neutral-600" />{user.company || '—'}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-neutral-400 flex items-center gap-1.5">
                              <Briefcase size={12} className="text-neutral-600" />{user.role || '—'}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-neutral-400">{user.monthly_outreach || '—'}</td>
                          <td className="px-5 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              user.beta_feedback
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'text-neutral-600'
                            }`}>
                              {user.beta_feedback ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-neutral-500 text-xs">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'analytics' && analytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Events by type */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-blue-400" />
                Events by Type
              </h3>
              <div className="space-y-3">
                {((analytics.events_by_type as Array<{ event_type: string; count: number }>) || []).map((e) => (
                  <div key={e.event_type} className="flex items-center gap-3">
                    <span className="text-neutral-400 text-sm w-40 truncate">{e.event_type}</span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${Math.min(100, (e.count / (((analytics.events_by_type as Array<{ event_type: string; count: number }>)[0]?.count) ?? 1)) * 100)}%` }}
                      />
                    </div>
                    <span className="text-neutral-500 text-xs w-8 text-right">{e.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top sources */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <BarChart2 size={16} className="text-violet-400" />
                Top Traffic Sources
              </h3>
              {((analytics.top_utm_sources as Array<{ source: string; count: number }>) || []).length === 0 ? (
                <p className="text-neutral-600 text-sm">No UTM data yet.</p>
              ) : (
                <div className="space-y-3">
                  {((analytics.top_utm_sources as Array<{ source: string; count: number }>) || []).map((s) => (
                    <div key={s.source} className="flex items-center justify-between">
                      <span className="text-neutral-400 text-sm">{s.source}</span>
                      <span className="text-neutral-500 text-xs">{s.count} visits</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// ---- Page with auth ----
export const AdminPage: React.FC = () => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('prosario_admin_token');
    if (token) {
      setAuthToken(token);
      setAuthed(true);
    }
  }, []);

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;
  return <AdminDashboard onLogout={() => setAuthed(false)} />;
};
