import { CollectionState, EmptyState } from './CollectionStates'
import { useCollection } from '../hooks/useCollection'
import { API_BASE_URL } from '../api'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : `${API_BASE_URL}/users/`

function Users() {
  const { items, status, error } = useCollection('users', usersEndpoint)

  return (
    <section className="resource-page">
      <div className="page-heading"><div><p className="eyebrow">People directory</p><h1>Users</h1><p className="lede">The humans behind every logged session and shared goal.</p></div><span className="count-chip">{items.length} members</span></div>
      <CollectionState status={status} error={error} label="users" />
      {status === 'ready' && !items.length ? <EmptyState label="users" /> : null}
      {items.length > 0 ? <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Name</th><th>Username</th><th>Email</th><th>Team</th></tr></thead><tbody>{items.map((user) => <tr key={user._id || user.email}><td><div className="person-cell"><span className="person-avatar">{(user.name || user.username || 'A').slice(0, 1).toUpperCase()}</span><strong>{user.name || 'Unnamed user'}</strong></div></td><td>{user.username || '-'}</td><td>{user.email || '-'}</td><td>{user.teamId || 'Unassigned'}</td></tr>)}</tbody></table></div> : null}
    </section>
  )
}

export default Users
