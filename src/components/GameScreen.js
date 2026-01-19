import React, { useState, useEffect } from 'react';
import './GameScreen.css';

function GameScreen({ playerData, currentObstacle, onAnswerQuestion, score, onGameOver, socket, roomId, allPlayers, targetScore = 100, questionTimeLimit = 30 }) {
  const [timeLeft, setTimeLeft] = useState(questionTimeLimit);
  const [answered, setAnswered] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [shopOpen, setShopOpen] = useState(false);
  const [shopTimeLeft, setShopTimeLeft] = useState(0);
  const [shopItems, setShopItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [shopLocked, setShopLocked] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [treasureModal, setTreasureModal] = useState(null);
  const [targetSelectionModal, setTargetSelectionModal] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.on('race_started', (data) => {
        // Cập nhật questionTimeLimit khi race bắt đầu
        setTimeLeft(data.questionTimeLimit || 30);
      });

      socket.on('race_leaderboard_update', (data) => {
        setLeaderboard(data.leaderboard || []);
        // Update local player's score each tick to reflect server scoring (points/sec = speed)
        const me = data.leaderboard?.find(entry => entry.id === socket.id);
        if (me) {
          // Smoothly update score in playerData
          // Note: parent holds playerData; we update via shallow state in this component where possible
          playerData.score = me.score; // safe local mutation for rendering
        }
      });

      socket.on('race_finished', (data) => {
        onGameOver();
      });

      socket.on('shop_opened', (data) => {
        if (!shopLocked) {
          setShopOpen(true);
          setShopTimeLeft(data.timeLimit);
          setShopItems(data.shopItems || []);
        }
      });

      socket.on('close_shop', () => {
        setShopOpen(false);
      });

      socket.on('global_notification', (data) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { ...data, id }]);
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== id));
        }, 4000);
      });

      socket.on('treasure_opened', (data) => {
        setTreasureModal(data.treasure);
        setTimeout(() => {
          setTreasureModal(null);
        }, 3000);
      });

      socket.on('need_target', (data) => {
        const visiblePlayers = leaderboard.filter(p => {
          const myScore = leaderboard.find(pl => pl.id === socket?.id)?.score || 0;
          return p.id !== socket?.id && Math.abs(p.score - myScore) <= 50;
        });
        
        setTargetSelectionModal({
          itemId: data.itemId,
          itemName: data.itemName,
          targets: visiblePlayers
        });
      });

      socket.on('item_purchased', (data) => {
        setInventory(data.inventory);
        playerData.score = data.newScore;
      });

      socket.on('player_bought_item', (data) => {
        console.log(`${data.playerName} vừa mua ${data.itemIcon} ${data.itemName}`);
      });

      socket.on('shop_unlocked', () => {
        setShopLocked(false);
      });

      return () => {
        socket.off('race_started');
        socket.off('race_leaderboard_update');
        socket.off('race_finished');
        socket.off('shop_opened');
        socket.off('close_shop');
        socket.off('global_notification');
        socket.off('treasure_opened');
        socket.off('need_target');
        socket.off('item_purchased');
        socket.off('player_bought_item');
        socket.off('shop_unlocked');
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, onGameOver]);

  useEffect(() => {
    if (!answered) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setAnswered(true);
            // Gửi timeout signal đến server
            if (currentObstacle) {
              onAnswerQuestion(currentObstacle.question.id, -1, true); // -1 = không có đáp án, true = timeout
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [answered, currentObstacle, onAnswerQuestion]);

  // Khi nhận câu hỏi mới từ parent (App.js qua next_obstacle event), reset state
  useEffect(() => {
    if (currentObstacle && answered) {
      setAnswered(false);
      setTimeLeft(questionTimeLimit);
    }
  }, [currentObstacle, questionTimeLimit, answered]);

  // Shop countdown timer
  useEffect(() => {
    if (shopOpen && shopTimeLeft > 0) {
      const timer = setInterval(() => {
        setShopTimeLeft(prev => {
          if (prev <= 1) {
            setShopOpen(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [shopOpen, shopTimeLeft]);

  const handleAnswer = (optionIndex) => {
    if (!answered && currentObstacle) {
      onAnswerQuestion(currentObstacle.question.id, optionIndex, false); // false = không timeout
      setAnswered(true);
      setTimeLeft(0);
    }
  };

  return (
    <div className="game-container">
      {/* Header Stats */}
      <div className="game-header">
        <div className="stat-box">
          <span className="stat-label">🎖️ Người cầm lái:</span>
          <span className="stat-value">{playerData.name}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">💪 Đạo đức Cách mạng:</span>
          <span className="stat-value">{playerData.morale}%</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">🚀 Tốc độ:</span>
          <span className="stat-value">{playerData.speed.toFixed(2)}x</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">🏁 Điểm:</span>
          <span className="stat-value">{Math.round(playerData.score)}</span>
        </div>
      </div>

      {/* Race Info Header */}
      {/* <div className="race-info-header">
        <div className="time-remaining">
          <span className="label">⏰ Thời gian còn lại:</span>
          <span className={`value ${timeRemaining < 30 ? 'danger' : ''}`}>
            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div> */}

      {/* Game Canvas - River and Boat */}
      <div className="game-canvas">
        <div className="river-background">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </div>

        {/* All Players' Boats */}
        {leaderboard.map((player, index) => {
          const isCurrentPlayer = player.id === socket?.id;
          const myScore = leaderboard.find(p => p.id === socket?.id)?.score || 0;
          
          // Chỉ hiển thị nếu là bản thân hoặc chênh lệch dưới 50 điểm
          if (!isCurrentPlayer && Math.abs(player.score - myScore) > 50) {
            return null;
          }
          
          let position;
          const threshold = 25; // Điểm để đạt giữa màn hình
          
          if (myScore < threshold) {
            // Giai đoạn đầu: tất cả thuyền di chuyển từ trái dựa trên điểm tuyệt đối
            position = (player.score / threshold) * 50;
          } else {
            // Sau khi thuyền tôi đạt giữa màn hình
            if (isCurrentPlayer) {
              position = 50; // Khóa ở giữa
            } else {
              // Thuyền khác: vị trí tương đối
              const scoreDiff = player.score - myScore;
              position = 50 + (scoreDiff / 50) * 50;
            }
          }
          
          return (
            <div 
              key={player.id}
              className={`boat-container ${isCurrentPlayer ? 'current-player' : ''}`}
              style={{ 
                left: `${position}%`,
                top: `${30 + (index * 15)}%`
              }}
            >
              <div className="player-name">{player.name}</div>
              <div className="boat">⛵</div>
              <div className="morale-bar">
                <div 
                  className="morale-fill"
                  style={{ width: `${player.morale || 100}%` }}
                ></div>
              </div>
            </div>
          );
        })}

        {/* Obstacles on River
        {currentObstacle && (
          <div className="obstacle-container">
            <div className="obstacle" title={currentObstacle.name}>
              {currentObstacle.icon}
            </div>
            <p className="obstacle-name">{currentObstacle.name}</p>
          </div>
        )} */}
      </div>

      {/* Question Section */}
      {currentObstacle && (
        <div className="question-section">
          <div className="question-header">
            <h3 className="question-text">{currentObstacle.question.question}</h3>
            <div className="time-display">
              <span className="time-label">⏱️ Thời gian:</span>
              <span className={`time-value ${timeLeft < 10 ? 'danger' : ''}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          <div className="options-grid">
            {currentObstacle.question.options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleAnswer(index)}
                disabled={answered}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>

          {answered && (
            <div className="feedback-message">
              ⏳ Đang chờ câu hỏi tiếp theo...
            </div>
          )}
        </div>
      )}

      {/* Category Info */}
      {currentObstacle && (
        <div className="category-tag">
          📚 {currentObstacle.question.category}
        </div>
      )}

      {/* Shop Modal */}
      {shopOpen && (
        <div className="shop-modal-overlay">
          <div className="shop-modal">
            <div className="shop-header">
              <h2>🏪 Cửa hàng vật phẩm</h2>
              <span className="shop-timer">
                ⏱️ {shopTimeLeft}s
              </span>
            </div>

            <div className="shop-grid">
              {shopItems.map(item => (
                <button
                  key={item.id}
                  className="shop-item-card"
                  onClick={() => {
                    if (playerData.score >= item.cost) {
                      socket?.emit('buy_item', {
                        roomId,
                        itemId: item.id
                      });
                    }
                  }}
                  disabled={playerData.score < item.cost || shopLocked}
                >
                  <div className="item-icon">{item.icon}</div>
                  <div className="item-name">{item.name}</div>
                  <div className="item-cost">
                    💰 {item.cost} điểm
                  </div>
                  <div className="item-description">
                    {item.description}
                  </div>
                  {playerData.score < item.cost && (
                    <div className="insufficient-score">
                      Không đủ điểm
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Inventory */}
            {inventory.length > 0 && (
              <div className="inventory-section">
                <h3>📦 Hành trang</h3>
                <div className="inventory-grid">
                  {inventory.map((item, idx) => (
                    <button
                      key={idx}
                      className="inventory-item"
                      onClick={() => {
                        socket?.emit('use_item', {
                          roomId,
                          inventoryIndex: idx
                        });
                      }}
                    >
                      <div className="item-icon">{item.icon}</div>
                      <div className="item-name">{item.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {shopLocked && (
              <div className="shop-locked-warning">
                🔐 Shop đã bị khóa
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notifications */}
      <div className="notifications-container">
        {notifications.map(notif => (
          <div key={notif.id} className={`notification notification-${notif.type}`}>
            {notif.message}
          </div>
        ))}
      </div>

      {/* Treasure Modal */}
      {treasureModal && (
        <div className="shop-modal-overlay">
          <div className="treasure-modal">
            <h2>🎁 Rương báu!</h2>
            <div className="treasure-content">
              {treasureModal.type === 'positive' ? (
                <>
                  <div className="treasure-icon">✨</div>
                  <p className="treasure-message">Bạn nhận được: {treasureModal.content.name}</p>
                  <p className="treasure-description">{treasureModal.content.description}</p>
                </>
              ) : (
                <>
                  <div className="treasure-icon">💀</div>
                  <p className="treasure-message danger">{treasureModal.content.name}</p>
                  <p className="treasure-description">{treasureModal.content.description}</p>
                  
                  {/* Chi tiết hiệu ứng */}
                  <div className="treasure-effects">
                    {treasureModal.content.effect.resetSpeed && (
                      <div className="effect-item">
                        ⚡ Tốc độ reset về 0.1
                      </div>
                    )}
                    {treasureModal.content.effect.scorePenalty && (
                      <div className="effect-item">
                        💔 Mất {treasureModal.content.effect.scorePenalty} điểm
                      </div>
                    )}
                    {treasureModal.content.effect.lockShop && (
                      <div className="effect-item">
                        🔐 Shop bị khóa {treasureModal.content.duration / 1000}s
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Target Selection Modal */}
      {targetSelectionModal && (
        <div className="shop-modal-overlay">
          <div className="target-selection-modal">
            <h2>🎯 Chọn mục tiêu cho {targetSelectionModal.itemName}</h2>
            <div className="target-grid">
              {targetSelectionModal.targets.map(target => (
                <button
                  key={target.id}
                  className="target-card"
                  onClick={() => {
                    socket?.emit('buy_item', {
                      roomId,
                      itemId: targetSelectionModal.itemId,
                      targetPlayerId: target.id
                    });
                    setTargetSelectionModal(null);
                  }}
                >
                  <div className="target-name">⛵ {target.name}</div>
                  <div className="target-score">💰 {Math.round(target.score)} điểm</div>
                </button>
              ))}
            </div>
            <button 
              className="cancel-target-btn"
              onClick={() => setTargetSelectionModal(null)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameScreen;
