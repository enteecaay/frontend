// Game constants
export const GAME_CONFIG = {
  INITIAL_MORALE: 100,
  INITIAL_SPEED: 1,
  MAX_MORALE: 100,
  MIN_MORALE: 0,
  MAX_SPEED: 2,
  MIN_SPEED: 0.5,
  QUESTION_TIME_LIMIT: 30,
  CORRECT_ANSWER_MORALE_GAIN: 20,
  WRONG_ANSWER_MORALE_LOSS: 15,
  CORRECT_ANSWER_SPEED_GAIN: 0.2,
  WRONG_ANSWER_SPEED_LOSS: 0.3,
  CORRECT_ANSWER_POINTS: 50,
  GAME_DISTANCE_TARGET: 100
};

export const RANKS = [
  { min: 2000, name: '🏆 Tướng Lĩnh', color: '#fbbf24' },
  { min: 1500, name: '🎖️ Anh Hùng', color: '#f59e0b' },
  { min: 1000, name: '⭐ Chiến Sĩ', color: '#3b82f6' },
  { min: 500, name: '💪 Quân Nhân', color: '#10b981' },
  { min: 0, name: '🌱 Tân Binh', color: '#6b7280' }
];

export const getRankByScore = (score) => {
  return RANKS.find(rank => score >= rank.min);
};

export const getWinStatus = (morale) => {
  return morale > 50;
};
