import { CollectionState, EmptyState } from './CollectionStates'
import { useCollection } from '../hooks/useCollection'
import { API_BASE_URL } from '../api'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : `${API_BASE_URL}/leaderboard/`

function Leaderboard() {
  const { items, status, error } = useCollection('leaderboard', leaderboardEndpoint)

  return (
    <section className="resource-page">
      <div className="page-heading"><div><p className="eyebrow">Competitive pulse</p><h1>Leaderboard</h1><p className="lede">Celebrate the people turning effort into momentum.</p></div><span className="count-chip">{items.length} ranked</span></div>
      <CollectionState status={status} error={error} label="leaderboard" />
      {status === 'ready' && !items.length ? <EmptyState label="rankings" /> : null}
      {items.length > 0 ? <div className="rank-list">{items.map((entry, index) => <article className={`rank-row rank-${index + 1}`} key={entry._id || entry.userId || index}><span className="rank-number">{entry.rank || index + 1}</span><div className="rank-avatar">{(entry.username || entry.name || 'A').slice(0, 1).toUpperCase()}</div><div className="rank-name"><strong>{entry.username || entry.name || 'Athlete'}</strong><small>{entry.teamName || 'OctoFit member'}</small></div><strong className="rank-points">{entry.points ?? entry.score ?? 0}<small> pts</small></strong></article>)}</div> : null}
    </section>
  )
}

export default Leaderboard
