import React from 'react';
import './GameOverScreen.css';

function GameOverScreen({ score, playerData, onReturnToLobby }) {
  const finalMorale = playerData.morale || 0;
  const eliminationReason = playerData.eliminationReason || null;
  // const rank = score >= 2000 ? '🏆 Tướng Lĩnh' : 
  //              score >= 1500 ? '🎖️ Anh Hùng' :
  //              score >= 1000 ? '⭐ Chiến Sĩ' :
  //              score >= 500 ? '💪 Quân Nhân' : '🌱 Tân Binh';

  const finalStandings = playerData.finalStandings || [];

  return (
    <div className="gameover-container">
      <div className="gameover-content">
        <div className="gameover-header">
          <h1 className="gameover-title">
            {eliminationReason ? '⚠️ BẠN ĐÃ BỊ LOẠI' : (finalMorale > 50 ? '✅ CUỘC ĐUA KẾT THÚC' : '⏁ CUỘC ĐUA KẾT THÚC')}
          </h1>
          <p className="gameover-subtitle">
            {eliminationReason ? eliminationReason : 'Kết Quả Chung Cuộc'}
          </p>
        </div>

        {finalStandings.length > 0 && (
          <div className="standings-section">
            <h3>🏁 Bảng Xếp Hạng Chung Cuộc</h3>
            
            {/* Top 3 in center */}
            <div className="top-3-podium">
              {finalStandings.slice(0, 3).map((player, idx) => (
                <div key={idx} className={`podium-position position-${idx + 1}`}>
                  <div className="medal">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                  </div>
                  <div className={`podium-card ${player.id === playerData.id ? 'current-player' : ''}`}>
                    <div className="position-rank">#{idx + 1}</div>
                    <div className="position-name">{player.name}</div>
                    <div className="position-stat">⭐ {Math.round(player.score || 0)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Other standings below */}
            {finalStandings.length > 3 && (
              <div className="other-standings">
                <h4>Xếp Hạng Còn Lại</h4>
                <div className="standings-list">
                  {finalStandings.slice(3, 10).map((player, idx) => (
                    <div key={idx} className={`standing-item ${player.id === playerData.id ? 'highlight' : ''}`}>
                      <span className="standing-rank">#{idx + 4}</span>
                      <span className="standing-name">{player.name}</span>
                      <span className="standing-stat">⭐ {Math.round(player.score || 0)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="message-section">
          {finalMorale > 80 && (
            <div className="message-excellent">
              🎉 Xuất sắc! Con thuyền Cách mạng của bạn đã vững mạnh!<br/>
              Đảng cộng sản luôn tin tưởng và ủng hộ bạn!
            </div>
          )}
          {finalMorale > 50 && finalMorale <= 80 && (
            <div className="message-good">
              👏 Tốt lắm! Bạn đã giữ vững con thuyền Cách mạng!<br/>
              Hãy tiếp tục học hỏi và phát triển kiến thức!
            </div>
          )}
          {finalMorale > 20 && finalMorale <= 50 && (
            <div className="message-ok">
              💭 Bạn cần phải cố gắng hơn!<br/>
              Hãy nắm vững các nguyên tắc cơ bản của Đảng để lần sau thành công!
            </div>
          )}
          {finalMorale <= 20 && (
            <div className="message-bad">
              ⚠️ Con thuyền đã gặp khó khăn!<br/>
            </div>
          )}
        </div>

        <div className="facts-section">
          <h3>📚 Bài học từ cuộc đua:</h3>
          <ul>
            <li>✅ Tốc độ được kiểm soát bởi sự hiểu biết về lý thuyết Đảng</li>
            <li>✅ Mỗi câu trả lời đúng giúp thuyền tiến nhanh hơn</li>
            <li>✅ Người về đích đầu tiên là người nắm vững kiến thức nhất</li>
            <li>✅ Cách mạng thành công khi Đảng vững mạnh về đường lối</li>
            <li>✅ Liêm, Kiệm, Cần, Chính, Đoàn kết là nền tảng của thắng lợi</li>
          </ul>
        </div>

        <button className="btn btn-restart" onClick={onReturnToLobby}>
          🔄 QUAY LẠI
        </button>
      </div>

      <div className="gameover-decoration">
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
      </div>
    </div>
  );
}

export default GameOverScreen;
