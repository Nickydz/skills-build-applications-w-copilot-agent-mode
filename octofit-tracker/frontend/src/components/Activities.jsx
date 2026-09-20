import { CollectionState, EmptyState } from './CollectionStates'
import { useCollection } from '../hooks/useCollection'

function Activities() {
  const { items, status, error } = useCollection('activities')

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div><p className="eyebrow">Movement log</p><h1>Activities</h1><p className="lede">Every session is a signal. Keep the signal visible.</p></div>
        <span className="count-chip">{items.length} sessions</span>
      </div>
      <CollectionState status={status} error={error} label="activities" />
      {status === 'ready' && !items.length ? <EmptyState label="activities" /> : null}
      {items.length > 0 ? <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Type</th><th>Athlete</th><th>Date</th><th>Duration</th><th>Points</th></tr></thead><tbody>{items.map((activity) => <tr key={activity._id || `${activity.type}-${activity.date}`}><td><span className="type-pill">{activity.type || 'Activity'}</span></td><td>{activity.userId || activity.username || 'Unassigned'}</td><td>{activity.date || 'Recent'}</td><td>{activity.duration ? `${activity.duration} min` : '-'}</td><td>{activity.points ?? activity.calories ?? '-'}</td></tr>)}</tbody></table></div> : null}
    </section>
  )
}

export default Activities
