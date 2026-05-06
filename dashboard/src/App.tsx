import { useState } from 'react'
import ServersTab from './components/servers/ServersTab'
import JRCTab from './components/jrc/JRCTab'
import Sidebar from './components/common/Sidebar'
import './App.css'

type TabType = 'servers' | 'jrc'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('servers')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const tabs = [
    { id: 'servers' as const, label: 'Servers', icon: '/icons/server.svg', component: ServersTab },
    { id: 'jrc' as const, label: 'JRC', icon: '/icons/jrc.svg', component: JRCTab },
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ServersTab

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as TabType)
  }

  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="app-with-sidebar">
      <Sidebar 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />
      
      <main className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        <div className="content-area fade-in">
          <ActiveComponent />
        </div>
      </main>
    </div>
  )
}

export default App