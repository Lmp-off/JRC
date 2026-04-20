import { useState, useEffect } from 'react'
import { type JRCData, type JRCStats } from '../types/jrc.types'

// Mock данные
const generateMockData = (): JRCData[] => {
  const data: JRCData[] = []
  const now = new Date()
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now)
    date.setHours(date.getHours() - i)
    data.push({
      timestamp: date.toISOString(),
      value: Math.random() * 100,
      status: Math.random() > 0.8 ? 'warning' : Math.random() > 0.9 ? 'critical' : 'normal'
    })
  }
  return data
}

export function useJRC() {
  const [data, setData] = useState<JRCData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setData(generateMockData())
      setLoading(false)
    }, 1000)
  }, [])

  const currentValue = data[data.length - 1]?.value || 0
  const values = data.map(d => d.value)
  const stats: JRCStats = {
    currentValue,
    average: values.reduce((a, b) => a + b, 0) / values.length || 0,
    max: Math.max(...values, 0),
    min: Math.min(...values, 100),
    status: currentValue > 80 ? 'critical' : currentValue > 60 ? 'warning' : 'normal'
  }

  const refresh = () => {
    setLoading(true)
    setTimeout(() => {
      setData(generateMockData())
      setLoading(false)
    }, 1000)
  }

  return { data, loading, stats, refresh }
}