import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import './App.css';
import Navbar from './components/Navbar';
import HomeScreen from './components/HomeScreen';
import AdminLoginScreen from './components/AdminLoginScreen';
import AdminScreen from './components/AdminScreen';
import LobbyScreen from './components/LobbyScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import AIUsageScreen from "./components/AIUsageScreen";

function AppContent() {
  const [socket, setSocket] = useState(null);
  const [screenState, setScreenState] = useState("lobby"); // Default to lobby
  const [adminData, setAdminData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentObstacle, setCurrentObstacle] = useState(null);
  const [targetScore, setTargetScore] = useState(100);
  const [questionTimeLimit, setQuestionTimeLimit] = useState(30);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [allPlayers, setAllPlayers] = useState({});

  useEffect(() => {
    // Connect to backend using env variable
    const socketUrl =
      process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
    const newSocket = io(socketUrl, {
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to backend");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    newSocket.on("player_joined", (data) => {
      setPlayers(data.players);
      console.log(data.message);
    });

    newSocket.on("race_started", (data) => {
      setScreenState("playing");
      setCurrentObstacle(data.currentObstacle);
      setTargetScore(data.targetScore || 100);
      setQuestionTimeLimit(data.questionTimeLimit || 30);
    });

    newSocket.on("admin_race_started", (data) => {
      console.log("Race started in room:", data.roomId);
      // Admin stays in AdminScreen, just refresh dashboard
      loadAvailableRooms();
    });

    newSocket.on("next_obstacle", (data) => {
      // Ensure obstacle is wrapped with display metadata
      const question = data.obstacle;
      setCurrentObstacle({ name: "Câu hỏi", icon: "📚", question });
    });

    newSocket.on("answer_result", (data) => {
      if (data.playerId === newSocket.id) {
        setPlayerData((prev) => ({
          ...prev,
          morale: data.morale,
          speed: data.speed,
          score: data.score || 0,
        }));
      }
    });

    newSocket.on("player_position_update", (data) => {
      setAllPlayers((prev) => ({
        ...prev,
        [data.playerId]: {
          position: data.position,
          speed: data.speed,
          morale: data.morale,
        },
      }));
    });

    newSocket.on("player_left", (data) => {
      setPlayers(data.players);
    });

    newSocket.on("player_eliminated", (data) => {
      // Hiển thị thông báo người chơi bị loại
      console.log(`${data.playerName} đã bị loại! Lý do: ${data.reason}`);
      console.log(`Còn lại ${data.remainingPlayers} người chơi trong cuộc đua`);

      // Cập nhật danh sách người chơi còn lại
      if (data.remainingPlayersList) {
        setPlayers(
          data.remainingPlayersList.map((p) => ({
            id: p.id,
            name: p.name,
          })),
        );
      }
    });

    newSocket.on("game_over", (data) => {
      // Kết thúc game cho người chơi này
      setPlayerData((prev) => ({
        ...prev,
        score: data.finalScore,
        morale: data.finalMorale,
        eliminationReason: data.reason,
      }));
      setScreenState("gameOver");
    });

    newSocket.on("race_finished", (data) => {
      setPlayerData((prev) => ({
        ...prev,
        finalStandings: data.finalStandings,
      }));
      setScreenState("gameOver");
    });

    newSocket.on("room_created", (data) => {
      console.log("Room created:", data);
      loadAvailableRooms();
    });

    newSocket.on("room_deleted", (data) => {
      console.log("Room deleted:", data);
      loadAvailableRooms();
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const loadAvailableRooms = () => {
    // Load rooms from API
    fetch(`${process.env.REACT_APP_SOCKET_URL}/api/rooms`)
      .then((res) => res.json())
      .then((rooms) => {
        const waitingRooms = rooms.filter((r) => r.state === "waiting");
        setAvailableRooms(waitingRooms);
      })
      .catch((err) => console.error("Error loading rooms:", err));
  };

  const handleJoinGame = (playerName, room) => {
    if (socket) {
      socket.emit("join_game", { playerName, roomId: room });
      setRoomId(room);
      setPlayerData({
        name: playerName,
        morale: 100,
        speed: 0.1,
        position: 0,
        health: 100,
        score: 0,
      });
    }
  };

  const handleAnswerQuestion = (questionId, answer, isTimeout = false) => {
    if (socket) {
      socket.emit("answer_question", { roomId, questionId, answer, isTimeout });
    }
  };

  const handleGameOver = (finalStandings) => {
    if (finalStandings && finalStandings.length) {
      setPlayerData((prev) => (prev ? { ...prev, finalStandings } : prev));
    }
    setScreenState("gameOver");
  };

  const handleReturnToLobby = () => {
    setScreenState("lobby");
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
        {/* Home Route */}
        <Route path="/" element={<HomeScreen />} />

        {/* AI Usage Route */}
        <Route path="/ai-usage" element={<AIUsageScreen />} />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
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
          }
        />


        {/* Game Route */}
        <Route path="/game" element={
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
                questionTimeLimit={questionTimeLimit}
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
      <Navbar />
      <AppContent />
    </Router>
  );
}

export default App;
