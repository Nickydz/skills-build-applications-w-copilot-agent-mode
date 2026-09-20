import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">
          <span className="brand-mark">OF</span>
          <span>
            <strong>OctoFit</strong>
            <small>performance desk</small>
          </span>
        </NavLink>
        <span className="header-status"><span className="status-dot" /> Live workspace</span>
      </header>

      <div className="app-body">
        <aside className="sidebar" aria-label="Primary navigation">
          <p className="eyebrow">Workspace</p>
          <nav className="nav-stack">
            <NavLink end to="/">Overview</NavLink>
            <NavLink to="/activities">Activities</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
          </nav>
          <div className="sidebar-note">
            <span className="eyebrow">Today</span>
            <strong>Keep the streak moving.</strong>
            <span>Small sessions compound.</span>
          </div>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Monday, September 21</p>
          <h1>Make today count.</h1>
          <p className="lede">A clear view of the people, movement, and momentum behind your team.</p>
        </div>
        <NavLink className="primary-action" to="/activities">Log activity <span aria-hidden="true">-&gt;</span></NavLink>
      </div>

      <div className="metric-grid">
        <article className="metric-card metric-card-lime">
          <span className="metric-label">Active members</span>
          <strong>24</strong>
          <span className="metric-detail">+12% this week</span>
        </article>
        <article className="metric-card metric-card-coral">
          <span className="metric-label">Team points</span>
          <strong>8,420</strong>
          <span className="metric-detail">Top 10% of teams</span>
        </article>
        <article className="metric-card metric-card-paper">
          <span className="metric-label">Sessions this week</span>
          <strong>68</strong>
          <span className="metric-detail">14 still to goal</span>
        </article>
      </div>

      <div className="overview-grid">
        <article className="feature-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Momentum</p>
              <h2>This week at a glance</h2>
            </div>
            <span className="panel-badge">On track</span>
          </div>
          <div className="week-bars" aria-label="Weekly activity trend">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <div className="bar-column" key={`${day}-${index}`}>
                <div className="bar-track"><span style={{ height: `${[48, 72, 58, 86, 68, 92, 40][index]}%` }} /></div>
                <small>{day}</small>
              </div>
            ))}
          </div>
        </article>
        <aside className="quote-panel">
          <span className="quote-mark">“</span>
          <p>Consistency is a design decision.</p>
          <span className="quote-caption">OctoFit field note / 04</span>
        </aside>
      </div>
    </section>
  )
}

export default App
