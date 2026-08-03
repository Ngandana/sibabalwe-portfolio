import { useGitHubStats } from '../hooks/useGitHubStats';

export default function GitHubStatsCard() {
  const { data, isStale, hidden, formatDate } = useGitHubStats();

  if (hidden) return null;

  return (
    <div className="bento-card col-2 gh-stats-card" role="listitem" id="gh-stats-card">
      <p className="bento-label">GitHub</p>
      <h3 className="bento-title">Live activity — github.com/Ngandana</h3>
      <div className="gh-stats-grid" id="gh-stats-body">
        <div className="gh-stat"><span className="gh-stat-num">{data ? data.publicRepos : '—'}</span><span className="gh-stat-lbl">Public repos</span></div>
        <div className="gh-stat"><span className="gh-stat-num">{data ? data.totalStars : '—'}</span><span className="gh-stat-lbl">Total stars</span></div>
        <div className="gh-stat"><span className="gh-stat-num" title={data?.recentName || ''}>{data?.recentName || '—'}</span><span className="gh-stat-lbl">Last updated</span></div>
        <div className="gh-stat"><span className="gh-stat-num">{data ? formatDate(data.recentDate) : '—'}</span><span className="gh-stat-lbl">{isStale ? 'Cached' : 'Live'}</span></div>
        {data && data.topLangs.length > 0 && (
          <div className="gh-lang-tags">
            {data.topLangs.map((l) => <span className="bento-tag" key={l}>{l}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}
