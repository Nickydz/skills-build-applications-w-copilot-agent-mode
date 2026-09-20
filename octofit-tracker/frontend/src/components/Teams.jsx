import { CollectionState, EmptyState } from './CollectionStates'
import { useCollection } from '../hooks/useCollection'
import { API_BASE_URL } from '../api'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : `${API_BASE_URL}/teams/`

function Teams() {
  const { items, status, error } = useCollection('teams', teamsEndpoint)

  return (
    <section className="resource-page">
      <div className="page-heading"><div><p className="eyebrow">Collective effort</p><h1>Teams</h1><p className="lede">Groups with a shared rhythm and a reason to show up.</p></div><span className="count-chip">{items.length} teams</span></div>
      <CollectionState status={status} error={error} label="teams" />
      {status === 'ready' && !items.length ? <EmptyState label="teams" /> : null}
      <div className="card-grid">{items.map((team) => <article className="entity-card" key={team._id || team.name}><span className="card-index">TEAM / {String(team._id || '01').slice(-2)}</span><h2>{team.name || 'Unnamed team'}</h2><p>{team.description || 'Ready for a new challenge.'}</p><div className="card-footer"><span>{team.memberIds?.length ?? team.members?.length ?? 0} members</span><span className="arrow-mark" aria-hidden="true">-&gt;</span></div></article>)}</div>
    </section>
  )
}

export default Teams
