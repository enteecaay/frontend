import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import './App.css';
import AdminLoginScreen from './components/AdminLoginScreen';
import AdminScreen from './components/AdminScreen';
import LobbyScreen from './components/LobbyScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';

function AppContent() {
  const [socket, setSocket] = useState(null);
  const [screenState, setScreenState] = useState('lobby'); // Default to lobby
  const [adminData, setAdminData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentObstacle, setCurrentObstacle] = useState(null);
  const [targetScore, setTargetScore] = useState(100);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [allPlayers, setAllPlayers] = useState({});

  useEffect(() => {
    // Connect to backend using env variable
    const socketUrl = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
    const newSocket = io(socketUrl, {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('Connected to backend');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    newSocket.on('player_joined', (data) => {
      setPlayers(data.players);
      console.log(data.message);
    });

    newSocket.on('race_started', (data) => {
      setScreenState('playing');
      setCurrentObstacle(data.currentObstacle);
      setTargetScore(data.targetScore || 100);
    });

    newSocket.on('admin_race_started', (data) => {
      console.log('Race started in room:', data.roomId);
      // Admin stays in AdminScreen, just refresh dashboard
      loadAvailableRooms();
    });

    newSocket.on('next_obstacle', (data) => {
      // Ensure obstacle is wrapped with display metadata
      const question = data.obstacle;
      setCurrentObstacle({ name: 'Câu hỏi', icon: '📚', question });
    });

    newSocket.on('answer_result', (data) => {
      if (data.playerId === newSocket.id) {
        setPlayerData(prev => ({
          ...prev,
          morale: data.morale,
          speed: data.speed,
          score: data.score || 0
        }));
      }
    });

    newSocket.on('player_position_update', (data) => {
      setAllPlayers(prev => ({
        ...prev,
        [data.playerId]: {
          position: data.position,
          speed: data.speed,
          morale: data.morale
        }
      }));
    });

    newSocket.on('player_left', (data) => {
      setPlayers(data.players);
    });

    newSocket.on('race_finished', (data) => {
      setPlayerData(prev => ({
        ...prev,
        finalStandings: data.finalStandings
      }));
      setScreenState('gameOver');
    });

    newSocket.on('room_created', (data) => {
      console.log('Room created:', data);
      loadAvailableRooms();
    });

    newSocket.on('room_deleted', (data) => {
      console.log('Room deleted:', data);
      loadAvailableRooms();
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const loadAvailableRooms = () => {
    // Load rooms from API
    fetch('http://localhost:5000/api/rooms')
      .then(res => res.json())
      .then(rooms => {
        const waitingRooms = rooms.filter(r => r.state === 'waiting');
        setAvailableRooms(waitingRooms);
      })
      .catch(err => console.error('Error loading rooms:', err));
  };

  const handleJoinGame = (playerName, room) => {
    if (socket) {
      socket.emit('join_game', { playerName, roomId: room });
      setRoomId(room);
      setPlayerData({
        name: playerName,
        morale: 100,
        speed: 1,
        position: 0,
        health: 100,
        score: 0
      });
    }
  };

  const handleAnswerQuestion = (questionId, answer) => {
    if (socket) {
      socket.emit('answer_question', { roomId, questionId, answer });
    }
  };

  const handleGameOver = () => {
    setScreenState('gameOver');
  };

  const handleReturnToLobby = () => {
    setScreenState('lobby');
    setPlayerData(null);
    setRoomId(null);
    setPlayers([]);
    setCurrentObstacle(null);
    setAllPlayers({});
  };

  // Render based on route
  return (
    <div className="App">
      <Routes>
        {/* Admin Route */}
        <Route path="/admin" element={
          <>
            {!adminData ? (
              <AdminLoginScreen 
                socket={socket}
                onLoginSuccess={setAdminData}
              />
            ) : (
              <AdminScreen 
                socket={socket}
                onLogout={() => setAdminData(null)}
              />
            )}
          </>
        } />

        {/* Player Routes */}
        <Route path="/" element={
          <>
            {screenState === 'lobby' && (
              <LobbyScreen 
                onJoinGame={handleJoinGame}
                onStartGame={handleGameOver}
                players={players}
                playerData={playerData}
                socket={socket}
                availableRooms={availableRooms}
              />
            )}
            {screenState === 'playing' && playerData && (
              <GameScreen 
                playerData={playerData}
                currentObstacle={currentObstacle}
                onAnswerQuestion={handleAnswerQuestion}
                onGameOver={handleGameOver}
                socket={socket}
                roomId={roomId}
                allPlayers={allPlayers}
                targetScore={targetScore}
              />
            )}
            {screenState === 'gameOver' && playerData && (
              <GameOverScreen 
                score={playerData.score || 0}
                playerData={playerData}
                onReturnToLobby={handleReturnToLobby}
              />
            )}
          </>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
