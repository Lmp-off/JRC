// components/servers/ServersTab.tsx
import React, { useState, useEffect } from 'react';
import AddServerButton from '../common/AddServerButton';
import './ServersTab.css';

interface Server {
  id: string;
  name: string;
  ip: string;
  state: string;
  ssh: boolean;
  description: string;
}

type ViewMode = 'list' | 'blocks';

const ServersTab: React.FC = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const fetchServers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/servers/data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Server[] = await response.json();
      setServers(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Не удалось загрузить данные серверов. Проверьте соединение с бэком.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  const renderListView = () => (
    <div className="servers-list">
      <div className="list-header">
        <span className="col-name">Имя</span>
        <span className="col-ip">IP-адрес</span>
        <span className="col-state">Состояние</span>
        <span className="col-ssh">SSH</span>
        <span className="col-desc">Описание</span>
      </div>
      {servers.map(server => (
        <div className="list-row" key={server.id}>
          <span className="col-name">{server.name}</span>
          <span className="col-ip">{server.ip}</span>
          <span className="col-state">
            <span className={`status-badge ${server.state}`}>{server.state}</span>
          </span>
          <span className="col-ssh">
            <span className={`ssh-badge ${server.ssh ? 'enabled' : 'disabled'}`}>
              {server.ssh ? '● Вкл' : '○ Выкл'}
            </span>
          </span>
          <span className="col-desc">{server.description}</span>
        </div>
      ))}
    </div>
  );

  const renderBlocksView = () => (
    <div className="servers-grid">
      {servers.map(server => (
        <div className="server-card" key={server.id}>
          <div className="card-header">
            <h3 className="server-name">{server.name}</h3>
            <span className={`status-dot ${server.state}`}></span>
          </div>
          <div className="card-details">
            <div className="detail-item">
              <span className="detail-label">IP:</span>
              <span className="detail-value monospace">{server.ip}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Состояние:</span>
              <span className={`status-text ${server.state}`}>{server.state}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">SSH:</span>
              <span className={`ssh-text ${server.ssh ? 'active' : 'inactive'}`}>
                {server.ssh ? 'Доступен' : 'Отключён'}
              </span>
            </div>
            <div className="detail-item description">
              <span className="detail-label">Описание:</span>
              <span className="detail-value">{server.description}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="servers-tab loading-container">
        <div className="loader"></div>
        <p>Загрузка данных серверов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="servers-tab error-container">
        <div className="error-icon">⚠️</div>
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={fetchServers}>Повторить</button>
      </div>
    );
  }

  return (
    <>
      <div className="servers-tab">
        <div className="tab-header">
          <h2 className="tab-title">Управление серверами</h2>
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="Список"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="6" width="16" height="3" rx="1" fill="currentColor"/>
                <rect x="4" y="10" width="16" height="3" rx="1" fill="currentColor"/>
                <rect x="4" y="14" width="16" height="3" rx="1" fill="currentColor"/>
                <rect x="4" y="18" width="16" height="3" rx="1" fill="currentColor"/>
              </svg>
              <span>Список</span>
            </button>
            <button
              className={`toggle-btn ${viewMode === 'blocks' ? 'active' : ''}`}
              onClick={() => setViewMode('blocks')}
              aria-label="Блоки"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="7" height="7" rx="1.5" fill="currentColor"/>
                <rect x="13" y="4" width="7" height="7" rx="1.5" fill="currentColor"/>
                <rect x="4" y="13" width="7" height="7" rx="1.5" fill="currentColor"/>
                <rect x="13" y="13" width="7" height="7" rx="1.5" fill="currentColor"/>
              </svg>
              <span>Блоки</span>
            </button>
          </div>
        </div>

        <div className="servers-stats">
          <span className="stat-badge">Всего: {servers.length}</span>
          <span className="stat-badge">Активных: {servers.filter(s => s.state === 'online').length}</span>
        </div>

        <div className="servers-content">
          {servers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🖥️</div>
              <p>Нет доступных серверов</p>
            </div>
          ) : (
            viewMode === 'list' ? renderListView() : renderBlocksView()
          )}
        </div>
      </div>

      <AddServerButton onServerAdded={fetchServers} />
    </>
  );
};

export default ServersTab;