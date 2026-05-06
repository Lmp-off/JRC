export interface Server {
  id: string
  name: string
  status: 'online' | 'offline' | 'maintenance'
  cpu: number
  memory: number
  disk: number
  uptime: string
  ip: string
}

export interface ServerStats {
  total: number
  online: number
  offline: number
  maintenance: number
}