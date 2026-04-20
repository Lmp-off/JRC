import './Sidebar.css'

interface Tab {
  id: string
  label: string
  icon: string
}

interface SidebarProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export default function Sidebar({ 
  tabs, 
  activeTab, 
  onTabChange, 
  collapsed, 
  onToggleCollapse 
}: SidebarProps) {
  return (
    <>
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          {!collapsed && <h2 className="sidebar-title">Dashboard</h2>}
          <button className="toggle-btn" onClick={onToggleCollapse}>
            {collapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
              title={collapsed ? tab.label : undefined}
            >
              <span className="nav-icon">
                <img src={tab.icon} alt={tab.label} width="20" height="20" />
              </span>
              {!collapsed && <span className="nav-label">{tab.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          {!collapsed && <div className="version">v1.0.0</div>}
        </div>
      </div>
      
      {/* Оверлей для мобильных устройств */}
      {!collapsed && (
        <div className="sidebar-overlay" onClick={onToggleCollapse} />
      )}
    </>
  )
}