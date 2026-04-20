export interface JRCData {
  timestamp: string
  value: number
  status: 'normal' | 'warning' | 'critical'
}

export interface JRCStats {
  currentValue: number
  average: number
  max: number
  min: number
  status: 'normal' | 'warning' | 'critical'
}