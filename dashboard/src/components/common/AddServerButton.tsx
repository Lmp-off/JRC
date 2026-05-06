// components/common/AddServerButton.tsx
import React, { useState } from 'react';

interface AddServerButtonProps {
  onServerAdded: () => void;
}

const AddServerButton: React.FC<AddServerButtonProps> = ({ onServerAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newServer, setNewServer] = useState({
    name: '',
    ip: '',
    username: '',
    password: '',
    description: ''
  });

  // Полная очистка формы
  const resetForm = () => {
    setNewServer({ name: '', ip: '', username: '', password: '', description: '' });
    setError(null);
    setShowPassword(false);
  };

  // Отмена — очищаем и закрываем
  const handleCancel = () => {
    resetForm();
    setShowModal(false);
  };

  // Закрытие по оверлею или крестику — НЕ очищаем
  const handleClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewServer(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/servers/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newServer),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Ошибка при добавлении сервера');
      }
      
      resetForm();
      setShowModal(false);
      onServerAdded();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      
      if (errorMessage.includes('fetch') || errorMessage.includes('Failed to fetch')) {
        setError('❌ Нет соединения с сервером. Проверьте интернет и попробуйте снова.');
      } else {
        setError(`❌ ${errorMessage}`);
      }
      
      console.error('Add server error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="fab-add-server" onClick={() => setShowModal(true)} aria-label="Добавить сервер">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal add-server-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Добавить сервер</h3>
              {/*<button className="modal-close" onClick={handleClose}>✕</button>*/}
            </div>
            <div className="modal-body">
              {error && (
                <div className="modal-error">
                  {error}
                </div>
              )}
              
              <div className="form-group">
                <label>Имя сервера</label>
                <input 
                  placeholder="lcorps1" 
                  type="text" 
                  name="name" 
                  value={newServer.name} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>IP-адрес</label>
                <input 
                  type="text" 
                  name="ip" 
                  placeholder="192.168.1.100"
                  value={newServer.ip} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text" 
                  name="username" 
                  placeholder="root"
                  value={newServer.username} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="password-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="password" 
                    placeholder="••••••••"
                    value={newServer.password} 
                    onChange={handleInputChange} 
                  />
                  <button 
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 22L2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Описание</label>
                <textarea 
                  name="description" 
                  placeholder="Описание сервера..."
                  rows={3} 
                  value={newServer.description} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleCancel}>Отмена</button>
              <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Добавление...' : 'Добавить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddServerButton;