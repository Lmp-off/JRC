import { type ServerStats as ServerStatsType } from '../../types/server.types'
import './ServerStats.css'

interface ServerStatsProps {
  stats: ServerStatsType
}

export default function ServerStats({ stats }: ServerStatsProps) {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-number">{stats.total}</div>
        <div className="stat-label">Всего серверов</div>
      </div>
      <div className="stat-card online">
        <div className="stat-number">{stats.online}</div>
        <div className="stat-label">🟢 Онлайн</div>
      </div>
      <div className="stat-card offline">
        <div className="stat-number">{stats.offline}</div>
        <div className="stat-label">🔴 Оффлайн</div>
      </div>
      <div className="stat-card maintenance">
        <div className="stat-number">{stats.maintenance}</div>
        <div className="stat-label">🟡 Обслуживание</div>
      </div>
    </div>
  )
}