import { CollectionState, EmptyState } from './CollectionStates'
import { useCollection } from '../hooks/useCollection'
import { API_BASE_URL } from '../api'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : `${API_BASE_URL}/workouts/`

function Workouts() {
  const { items, status, error } = useCollection('workouts', workoutsEndpoint)

  return (
    <section className="resource-page">
      <div className="page-heading"><div><p className="eyebrow">Suggested sessions</p><h1>Workouts</h1><p className="lede">A considered starting point for the next strong session.</p></div><span className="count-chip">{items.length} plans</span></div>
      <CollectionState status={status} error={error} label="workouts" />
      {status === 'ready' && !items.length ? <EmptyState label="workouts" /> : null}
      <div className="card-grid">{items.map((workout) => <article className="entity-card workout-card" key={workout._id || workout.name}><div className="workout-top"><span className="type-pill">{workout.type || 'Training'}</span><span>{workout.duration ? `${workout.duration} min` : 'Flexible'}</span></div><h2>{workout.name || 'Untitled workout'}</h2><p>{workout.description || 'A focused session built for steady progress.'}</p><div className="card-footer"><span>{workout.difficulty || 'All levels'}</span><span className="arrow-mark" aria-hidden="true">-&gt;</span></div></article>)}</div>
    </section>
  )
}

export default Workouts
