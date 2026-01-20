import React, { useState, useEffect } from "react";
import "./LobbyScreen.css";

function LobbyScreen({
  onJoinGame,
  onStartGame,
  players,
  playerData,
  socket,
  availableRooms,
}) {
  const [playerName, setPlayerName] = useState("");
  const [joined, setJoined] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState(availableRooms || []);

  useEffect(() => {
    // Cập nhật rooms khi availableRooms prop thay đổi
    setRooms(availableRooms || []);
  }, [availableRooms]);

  useEffect(() => {
    // Tự động load rooms từ API mỗi 2 giây
    if (socket) {
      const interval = setInterval(() => {
        fetch(`${process.env.REACT_APP_SOCKET_URL}/api/rooms`)
          .then((res) => res.json())
          .then((data) => {
            const waitingRooms = data.filter((r) => r.state === "waiting");
            setRooms(waitingRooms);
          })
          .catch((err) => console.error("Error loading rooms:", err));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [socket]);

  const handleJoin = () => {
    if (playerName.trim() && selectedRoom) {
      onJoinGame(playerName, selectedRoom);
      setJoined(true);
    }
  };

  return (
    <div className="lobby-container">
      <div className="lobby-content">
        <div className="title-section">
          <h1 className="game-title">⛵ VỮNG TAY CHÈO</h1>
          <h2 className="game-subtitle">Lái Con Thuyền Cách Mạng</h2>
          <p className="tagline">"Đảng vững - Thuyền chạy"</p>
        </div>

        {!joined ? (
          <>
            <div className="game-info">
              <p className="info-text">
                Bạn sẽ đóng vai "Người cầm lái" (Đảng), điều khiển con thuyền
                (Cách mạng Việt Nam) trên dòng sông lịch sử. Vượt qua các chướng
                ngại vật bằng kiến thức về Chương IV.
              </p>
            </div>

            <div className="player-guide">
              <h3>🧭 HƯỚNG DẪN NHANH:</h3>
              <ol>
                <li>Nhập tên, chọn cuộc đua và bấm "Tham gia".</li>
                <li>Chờ admin bấm bắt đầu để vào đường đua.</li>
                <li>Trả lời nhanh: đúng sẽ tăng tốc; sai sẽ giảm tốc và bị khóa câu hỏi 3s.</li>
                <li>Về đích sớm nhất để trở thành người cầm lái xuất sắc.</li>
              </ol>
            </div>

            <div className="join-section">
              <div className="form-group">
                <label>Tên Người Chơi:</label>
                <input
                  type="text"
                  className="player-input"
                  placeholder="Nhập tên của bạn..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && selectedRoom && handleJoin()
                  }
                />
              </div>

              <div className="form-group">
                <label>Chọn Cuộc Đua:</label>
                {rooms.length === 0 ? (
                  <p className="no-rooms-message">
                    Đang chờ Admin tạo cuộc đua...
                  </p>
                ) : (
                  <select
                    className="room-select"
                    value={selectedRoom || ""}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                  >
                    <option value="">-- Chọn một cuộc đua --</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name} ({room.players}/{room.maxPlayers} người)
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {rooms.length === 0 && (
                <div className="no-rooms-message">
                  <p>
                    ⚠️ Hiện tại không có cuộc đua nào. Vui lòng chờ admin tạo
                    cuộc đua mới.
                  </p>
                </div>
              )}

              <button
                className="btn btn-primary"
                onClick={handleJoin}
                disabled={!playerName.trim() || !selectedRoom}
              >
                THAM GIA CUỘC ĐUA
              </button>
            </div>
          </>
        ) : (
          <div className="wait-section">
            <p className="welcome-text">👋 Chào {playerData?.name}!</p>
            <p className="instruction-text">
              Bạn đã tham gia cuộc đua:{" "}
              {rooms.find((r) => r.id === selectedRoom)?.name}
            </p>

            <div className="players-list">
              <h3>Danh sách người chơi:</h3>
              {players.map((player, idx) => (
                <div key={idx} className="player-item">
                  🎖️ {player.name}
                </div>
              ))}
            </div>

            <p className="waiting-message">
              ⏳ Đang chờ admin bắt đầu cuộc đua...
            </p>
          </div>
        )}
      </div>

      <div className="lobby-decoration">
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
      </div>
    </div>
  );
}

export default LobbyScreen;
