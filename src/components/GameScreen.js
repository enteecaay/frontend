import React, { useState, useEffect } from 'react';
import './GameScreen.css';

function GameScreen({ playerData, currentObstacle, onAnswerQuestion, score, onGameOver, socket, roomId, allPlayers, targetScore = 100 }) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [answered, setAnswered] = useState(false);
  const [raceStats, setRaceStats] = useState({});
  const [gameFinished, setGameFinished] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on('race_leaderboard_update', (data) => {
        setTimeRemaining(data.timeRemaining);
        // Update local player's score each tick to reflect server scoring (points/sec = speed)
        const me = data.leaderboard?.find(entry => entry.id === socket.id);
        if (me) {
          // Smoothly update score in playerData
          // Note: parent holds playerData; we update via shallow state in this component where possible
          playerData.score = me.score; // safe local mutation for rendering
        }
      });

      socket.on('race_finished', (data) => {
        setGameFinished(true);
        onGameOver();
      });

      return () => {
        socket.off('race_leaderboard_update');
        socket.off('race_finished');
      };
    }
  }, [socket, onGameOver]);

  useEffect(() => {
    if (!answered) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setAnswered(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [answered]);

  // Smoothly animate displayed percent towards actual percent (fake loading effect)
  useEffect(() => {
    const actualPercent = Math.min(100, (playerData.score / targetScore) * 100);
    const anim = setInterval(() => {
      setDisplayPercent(prev => {
        const diff = actualPercent - prev;
        if (Math.abs(diff) < 0.5) return actualPercent; // snap when close
        return prev + diff * 0.2; // ease towards target
      });
    }, 100);
    return () => clearInterval(anim);
  }, [playerData.score, targetScore]);

  // Removed position auto-updates; scoring handled server-side

  const handleAnswer = (optionIndex) => {
    if (!answered && currentObstacle) {
      onAnswerQuestion(currentObstacle.question.id, optionIndex);
      setAnswered(true);
      setTimeLeft(0);
      
      // Reset for next question
      setTimeout(() => {
        setAnswered(false);
        setTimeLeft(30);
      }, 2000);
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
          <span className="stat-value">{Math.round(playerData.score)} / {targetScore}</span>
        </div>
      </div>

      {/* Race Info Header */}
      <div className="race-info-header">
        <div className="time-remaining">
          <span className="label">⏰ Thời gian còn lại:</span>
          <span className={`value ${timeRemaining < 30 ? 'danger' : ''}`}>
            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Game Canvas - River and Boat */}
      <div className="game-canvas">
        <div className="river-background">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          {(() => {
            const percent = Math.min(100, Math.round(displayPercent));
            return (
              <>
                <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
                <span className="progress-text">{percent}%</span>
              </>
            );
          })()}
        </div>

        {/* Finish line reveals from right to left when 90%+ */}
        <div className={`finish-line ${displayPercent >= 90 ? 'reveal' : ''}`}></div>

        {/* Boat Position reflects score percentage */}
        <div 
          className="boat-container"
          style={{ left: `${Math.min(100, displayPercent)}%` }}
        >
          <div className="boat">⛵</div>
          <div className="morale-bar">
            <div 
              className="morale-fill"
              style={{ width: `${playerData.morale}%` }}
            ></div>
          </div>
        </div>

        {/* Obstacles on River */}
        {currentObstacle && (
          <div className="obstacle-container">
            <div className="obstacle" title={currentObstacle.name}>
              {currentObstacle.icon}
            </div>
            <p className="obstacle-name">{currentObstacle.name}</p>
          </div>
        )}
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
    </div>
  );
}

export default GameScreen;
