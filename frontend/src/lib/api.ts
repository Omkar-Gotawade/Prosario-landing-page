import axios from 'axios';
import type { WaitlistFormData, AnalyticsEvent } from '@/types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Auth interceptor for admin
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Waitlist
export const joinWaitlist = (data: WaitlistFormData) =>
  api.post('/waitlist/', data);

// Analytics
export const trackEvent = (event: AnalyticsEvent) =>
  api.post('/analytics/event', event).catch(() => {/* silent fail */});

// Admin
export const adminLogin = (username: string, password: string) =>
  api.post('/admin/login', new URLSearchParams({ username, password }), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

export const getWaitlistUsers = (params?: {
  skip?: number;
  limit?: number;
  search?: string;
  role?: string;
}) => api.get('/waitlist/', { params });

export const getWaitlistStats = () => api.get('/waitlist/stats');
export const exportWaitlistCsv = () =>
  api.get('/waitlist/export', { responseType: 'blob' });
export const getAnalyticsSummary = () => api.get('/analytics/summary');
