import { type Server } from '../../types/server.types'
import Card from '../common/Card'
import './ServerCard.css'

interface ServerCardProps {
  server: Server
}

export default function ServerCard({ server }: ServerCardProps) {
  const getStatusColor = () => {
    switch (server.status) {
      case 'online': return '#10b981'
      case 'offline': return '#ef4444'
      case 'maintenance': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  const getStatusText = () => {
    switch (server.status) {
      case 'online': return '🟢 Онлайн'
      case 'offline': return '🔴 Оффлайн'
      case 'maintenance': return '🟡 Обслуживание'
      default: return '⚪ Неизвестно'
    }
  }

  return (
    <Card className="server-card">
      <div className="server-header">
        <div>
          <h3 className="server-name">{server.name}</h3>
          <div className="server-ip">{server.ip}</div>
        </div>
        <div className="server-status" style={{ color: getStatusColor() }}>
          {getStatusText()}
        </div>
      </div>

      <div className="server-stats">
        <div className="stat">
          <div className="stat-label">CPU</div>
          <div className="stat-value">{server.cpu.toFixed(1)}%</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${server.cpu}%`, background: server.cpu > 80 ? '#ef4444' : '#10b981' }}></div>
          </div>
        </div>

        <div className="stat">
          <div className="stat-label">Memory</div>
          <div className="stat-value">{server.memory.toFixed(1)}%</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${server.memory}%`, background: server.memory > 80 ? '#ef4444' : '#10b981' }}></div>
          </div>
        </div>

        <div className="stat">
          <div className="stat-label">Disk</div>
          <div className="stat-value">{server.disk.toFixed(1)}%</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${server.disk}%`, background: server.disk > 80 ? '#ef4444' : '#10b981' }}></div>
          </div>
        </div>
      </div>

      <div className="server-footer">
        <span className="uptime">⏱️ Uptime: {server.uptime}</span>
      </div>
    </Card>
  )
}