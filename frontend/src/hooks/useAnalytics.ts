import { useEffect, useRef, useCallback } from 'react';
import { trackEvent } from '@/lib/api';

// Generate or retrieve session ID
const getSessionId = (): string => {
  let sid = sessionStorage.getItem('prosario_sid');
  if (!sid) {
    sid = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('prosario_sid', sid);
  }
  return sid;
};

// Parse UTM params
const getUTMParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
  };
};

export const useAnalytics = () => {
  const sessionId = getSessionId();
  const utmParams = getUTMParams();
  const referrer = document.referrer || undefined;

  const track = useCallback(
    (event_type: string, metadata?: Record<string, unknown>) => {
      trackEvent({
        event_type,
        session_id: sessionId,
        referrer,
        metadata,
        ...utmParams,
      });
    },
    [sessionId, referrer, utmParams]
  );

  return { track };
};

export const useScrollDepthTracker = () => {
  const { track } = useAnalytics();
  const milestones = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.round((scrollTop / docHeight) * 100);

      [25, 50, 75, 90, 100].forEach((milestone) => {
        if (pct >= milestone && !milestones.current.has(milestone)) {
          milestones.current.add(milestone);
          track('scroll_depth', { depth: milestone });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [track]);
};

export const usePageViewTracker = () => {
  const { track } = useAnalytics();
  useEffect(() => {
    track('page_view', { path: window.location.pathname });
  }, [track]);
};
