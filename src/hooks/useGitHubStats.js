import { useEffect, useState } from 'react';

const CACHE_KEY = 'gh-stats-cache-v1';
const USER = 'Ngandana';

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' });
}

/**
 * Live GitHub stats: fetches public repo count/total stars/top languages/most-recent repo.
 * Falls back to the last cached result on failure, or signals `hidden: true` if there's no cache at all.
 */
export function useGitHubStats() {
  const [state, setState] = useState({ data: null, isStale: false, hidden: false });

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`),
          fetch(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=100`)
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error('gh-api-error');
        const user = await userRes.json();
        const repos = await reposRes.json();
        if (!Array.isArray(repos)) throw new Error('gh-api-shape');

        const publicRepos = user.public_repos;
        const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
        const langCounts = {};
        repos.forEach((r) => { if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1; });
        const topLangs = Object.entries(langCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([l]) => l);
        const mostRecent = repos[0];
        const data = { publicRepos, totalStars, topLangs, recentName: mostRecent?.name, recentDate: mostRecent?.updated_at };

        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
        if (!cancelled) setState({ data, isStale: false, hidden: false });
      } catch {
        try {
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached && !cancelled) {
            setState({ data: JSON.parse(cached).data, isStale: true, hidden: false });
          } else if (!cancelled) {
            setState({ data: null, isStale: false, hidden: true });
          }
        } catch {
          if (!cancelled) setState({ data: null, isStale: false, hidden: true });
        }
      }
    }

    loadStats();
    return () => { cancelled = true; };
  }, []);

  return { ...state, formatDate };
}
