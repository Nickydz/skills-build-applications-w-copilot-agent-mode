export function CollectionState({ status, error, label }) {
  if (status === 'loading') return <div className="collection-state">Loading {label}...</div>
  if (status === 'error') return <div className="collection-state collection-error">{error}</div>
  return null
}

export function EmptyState({ label }) {
  return <div className="empty-state">No {label} have been logged yet.</div>
}
