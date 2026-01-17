import React, { useState, useEffect } from 'react';
import './AdminScreen.css';

function AdminScreen({ socket, onLogout }) {
  const [roomName, setRoomName] = useState('Cuộc Đua Lái Thuyền Cách Mạng');
  const [targetScore, setTargetScore] = useState(100);
  const [speedIncrement, setSpeedIncrement] = useState(0.3);
  const [speedDecrement, setSpeedDecrement] = useState(0.2);
  const [timeLimit, setTimeLimit] = useState(600);
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [questionTimeLimit, setQuestionTimeLimit] = useState(30);
  const [rooms, setRooms] = useState([]);
  const [racingRooms, setRacingRooms] = useState({});

  useEffect(() => {
    if (!socket) return;

    socket.on('admin_login_success', (data) => {
      console.log('Admin logged in:', data);
    });

    socket.on('race_leaderboard_update', (data) => {
      // Update leaderboard for racing rooms
      setRacingRooms(prev => ({
        ...prev,
        [data.roomId]: {
          leaderboard: data.leaderboard,
          timeRemaining: data.timeRemaining,
          totalTime: data.totalTime
        }
      }));
    });

    socket.on('room_created_success', (data) => {
      console.log('Room created:', data.roomId);
      loadRooms();
    });

    socket.on('admin_dashboard_data', (data) => {
      setRooms(data.rooms);
    });

    socket.on('admin_race_started', (data) => {
      console.log('Race started:', data);
      loadRooms();
    });

    socket.on('room_deleted', (data) => {
      // Refresh rooms when a room is deleted
      loadRooms();
    });

    return () => {
      socket.off('admin_login_success');
      socket.off('room_created_success');
      socket.off('admin_dashboard_data');
      socket.off('admin_race_started');
      socket.off('race_leaderboard_update');
      socket.off('room_deleted');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const loadRooms = () => {
    if (socket) {
      socket.emit('get_admin_dashboard', {});
    }
  };

  const handleCreateRoom = () => {
    if (socket && roomName.trim()) {
      socket.emit('create_race_room', {
        roomName,
        targetScore: parseInt(targetScore),
        speedIncrement: parseFloat(speedIncrement),
        speedDecrement: parseFloat(speedDecrement),
        timeLimit: parseInt(timeLimit),
        maxPlayers: parseInt(maxPlayers),
        questionTimeLimit: parseInt(questionTimeLimit)
      });
      
      setRoomName('Cuộc Đua Lái Thuyền Cách Mạng');
      setTargetScore(100);
      setSpeedIncrement(0.3);
      setSpeedDecrement(0.2);
      setTimeLimit(600);
      setMaxPlayers(10);
      setQuestionTimeLimit(30);
    }
  };

  const handleStartRace = (roomId) => {
    if (socket && roomId) {
      socket.emit('start_race', { roomId });
    }
  };

  const handleDeleteRoom = (roomId) => {
    if (socket && roomId) {
      socket.emit('delete_race_room', { roomId });
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>⚙️ BẢNG ĐIỀU KHIỂN ADMIN</h1>
        <button className="btn btn-logout" onClick={onLogout}>
          🚪 ĐĂNG XUẤT
        </button>
      </div>

      <div className="admin-content">
        {/* Create Room Section */}
        <div className="admin-section create-room-section">
          <h2>📝 Tạo Cuộc Đua Mới</h2>
          
          <div className="form-group">
            <label>Tên Cuộc Đua:</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Nhập tên cuộc đua..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Điểm Cần Đạt Để Thắng:</label>
              <input
                type="number"
                value={targetScore}
                onChange={(e) => setTargetScore(e.target.value)}
                min="10"
                max="1000"
              />
            </div>

            <div className="form-group">
              <label>Tốc Độ Tăng (Trả Lời Đúng):</label>
              <input
                type="number"
                step="0.1"
                value={speedIncrement}
                onChange={(e) => setSpeedIncrement(e.target.value)}
                min="0.1"
                max="2.0"
              />
            </div>

            <div className="form-group">
              <label>Tốc Độ Giảm (Trả Lời Sai):</label>
              <input
                type="number"
                step="0.1"
                value={speedDecrement}
                onChange={(e) => setSpeedDecrement(e.target.value)}
                min="0.1"
                max="2.0"
              />
            </div>

            <div className="form-group">
              <label>Thời Gian Tối Đa (giây):</label>
              <input
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                min="60"
                max="3600"
              />
            </div>

            <div className="form-group">
              <label>Số Người Chơi Tối Đa:</label>
              <input
                type="number"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(e.target.value)}
                min="2"
                max="20"
              />
            </div>

            <div className="form-group">
              <label>Thời Gian Trả Lời Câu Hỏi (giây):</label>
              <input
                type="number"
                value={questionTimeLimit}
                onChange={(e) => setQuestionTimeLimit(e.target.value)}
                min="5"
                max="120"
              />
            </div>
          </div>

          <button className="btn btn-create" onClick={handleCreateRoom}>
            ➕ TẠO CUỘC ĐUA
          </button>
        </div>

        {/* Rooms Management Section */}
        <div className="admin-section rooms-section">
          <div className="section-header">
            <h2>🏁 Quản Lý Cuộc Đua</h2>
            <button className="btn btn-refresh" onClick={loadRooms}>
              🔄 LÀM MỚI
            </button>
          </div>

          <div className="rooms-grid">
            {rooms.length === 0 ? (
              <div className="no-rooms">
                <p>Không có cuộc đua nào. Hãy tạo cuộc đua mới!</p>
              </div>
            ) : (
              rooms.map(room => (
                <div key={room.id} className="room-card">
                  <div className="room-header">
                    <h3>{room.name}</h3>
                    <span className={`room-status ${room.state}`}>
                      {room.state === 'waiting' && '⏳ Chờ'}
                      {room.state === 'racing' && '🏃 Đang Đua'}
                      {room.state === 'finished' && '✅ Kết Thúc'}
                    </span>
                  </div>

                  <div className="room-info">
                    <p><strong>ID:</strong> {room.id}</p>
                    <p><strong>Người chơi:</strong> {room.players.length}/{room.maxPlayers}</p>
                    <p><strong>Điểm cần đạt:</strong> {room.targetScore}</p>
                    <p><strong>Tốc độ +/-:</strong> {room.speedIncrement}/{room.speedDecrement}</p>
                    <p><strong>Thời gian:</strong> {room.timeLimit}s</p>
                    
                    {/* Real-time countdown for racing rooms */}
                    {room.state === 'racing' && racingRooms[room.id] && (
                      <p className="time-remaining">
                        <strong>⏰ Thời gian còn lại:</strong>{' '}
                        <span className={racingRooms[room.id].timeRemaining < 30 ? 'danger' : 'success'}>
                          {Math.floor(racingRooms[room.id].timeRemaining / 60)}:
                          {(racingRooms[room.id].timeRemaining % 60).toString().padStart(2, '0')}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="room-players">
                    <h4>
                      {room.state === 'racing' ? '🏆 Bảng Xếp Hạng Thực Thời:' : 'Người Chơi:'}
                    </h4>
                    {room.players.length === 0 ? (
                      <p className="no-players">Chưa có người chơi</p>
                    ) : (
                      <div className="players-list">
                        {/* Use real-time leaderboard if racing, else use room.players */}
                        {(room.state === 'racing' && racingRooms[room.id]?.leaderboard 
                          ? racingRooms[room.id].leaderboard 
                          : room.players.sort((a, b) => b.score - a.score)
                        ).map((player, idx) => (
                            <div key={player.id} className="player-row">
                              <span className="rank">#{idx + 1}</span>
                              <span className="name">{player.name}</span>
                              <span className="stat">⚡ {player.speed.toFixed(2)}x</span>
                              <span className="stat">⭐ {Math.round(player.score || 0)}</span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  <div className="room-actions">
                    {room.state === 'waiting' && (
                      <button 
                        className="btn btn-start"
                        onClick={() => handleStartRace(room.id)}
                      >
                        🚀 BẮT ĐẦU ĐUA
                      </button>
                    )}
                    {room.state !== 'racing' && (
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleDeleteRoom(room.id)}
                      >
                        🗑️ XOÁ CUỘC ĐUA
                      </button>
                    )}
                    {room.state !== 'waiting' && (
                      <button className="btn btn-disabled" disabled>
                        {room.state === 'racing' ? '⏳ Đang Diễn Ra' : '✅ Đã Kết Thúc'}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminScreen;
