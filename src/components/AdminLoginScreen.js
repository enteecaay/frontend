import React, { useState } from 'react';
import './AdminLoginScreen.css';

function AdminLoginScreen({ socket, onLoginSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tên tài khoản và mật khẩu');
      return;
    }

    setLoading(true);
    setError('');

    if (socket) {
      socket.emit('admin_login', {
        username,
        password
      });

      // Listen for response
      const handleSuccess = (data) => {
        setLoading(false);
        onLoginSuccess(data);
        socket.off('admin_login_success', handleSuccess);
        socket.off('admin_login_failed', handleFailed);
      };

      const handleFailed = (data) => {
        setLoading(false);
        setError(data.message || 'Thông tin đăng nhập không chính xác');
        socket.off('admin_login_success', handleSuccess);
        socket.off('admin_login_failed', handleFailed);
      };

      socket.once('admin_login_success', handleSuccess);
      socket.once('admin_login_failed', handleFailed);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">⚙️ ĐĂNG NHẬP ADMIN</h1>
          <p className="login-subtitle">Bảng Điều Khiển Quản Lý Cuộc Đua</p>
        </div>

        <div className="login-form">
          <div className="form-group">
            <label htmlFor="username">Tên Tài Khoản:</label>
            <input
              id="username"
              type="text"
              className="form-input"
              placeholder="Nhập tên tài khoản..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật Khẩu:</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          <button 
            className="btn-login"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? '⏳ Đang Xác Nhận...' : '🔓 ĐĂNG NHẬP'}
          </button>
        </div>

        <div className="login-info">
          <p className="info-title">📝 Tài Khoản Mặc Định:</p>
          <p className="info-text"><strong>Tên:</strong> admin</p>
          <p className="info-text"><strong>Mật khẩu:</strong> admin123</p>
          <p className="info-note">⚠️ Vui lòng thay đổi mật khẩu sau lần đăng nhập đầu tiên</p>
        </div>

        <div className="login-features">
          <h3>🎯 Tính Năng Admin:</h3>
          <ul>
            <li>✏️ Tạo các cuộc đua mới với cấu hình tùy chỉnh</li>
            <li>⏱️ Điều chỉnh thời gian và độ dài đường đua</li>
            <li>👥 Quản lý người chơi và phòng chơi</li>
            <li>📊 Xem bảng điểm realtime trong quá trình đua</li>
            <li>🏁 Kiểm soát bắt đầu cuộc đua</li>
          </ul>
        </div>
      </div>

      <div className="login-decoration">
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
      </div>
    </div>
  );
}

export default AdminLoginScreen;
