import { useState, useEffect } from 'react'
import { type Server, type ServerStats } from '../types/server.types'

// Mock данные для демонстрации
const mockServers: Server[] = [
  { id: '1', name: 'Web Server 01', status: 'online', cpu: 23, memory: 45, disk: 32, uptime: '15d 4h', ip: '192.168.1.101' },
  { id: '2', name: 'Database Server', status: 'online', cpu: 67, memory: 78, disk: 56, uptime: '30d 12h', ip: '192.168.1.102' },
  { id: '3', name: 'Cache Server', status: 'maintenance', cpu: 12, memory: 34, disk: 23, uptime: '5d 2h', ip: '192.168.1.103' },
  { id: '4', name: 'Backup Server', status: 'offline', cpu: 0, memory: 0, disk: 89, uptime: '0d', ip: '192.168.1.104' },
  { id: '5', name: 'API Server', status: 'online', cpu: 45, memory: 56, disk: 45, uptime: '22d 8h', ip: '192.168.1.105' },
]

export function useServers() {
  const [servers, setServers] = useState<Server[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setServers(mockServers)
      setLoading(false)
    }, 1000)
  }, [])

  const stats: ServerStats = {
    total: servers.length,
    online: servers.filter(s => s.status === 'online').length,
    offline: servers.filter(s => s.status === 'offline').length,
    maintenance: servers.filter(s => s.status === 'maintenance').length,
  }

  const refresh = () => {
    setLoading(true)
    setTimeout(() => {
      setServers(mockServers.map(server => ({
        ...server,
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
      })))
      setLoading(false)
    }, 1000)
  }

  return { servers, loading, stats, refresh }
}