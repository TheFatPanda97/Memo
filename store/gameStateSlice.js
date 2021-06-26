import { createSlice } from '@reduxjs/toolkit';
import { BOARD_WIDTH, BOARD_HEIGHT } from '@utils';

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: {
    player1: {
      name: 'wild panda',
      score: 0,
    },
    player2: {
      name: '',
      score: null,
    },
    board: [...Array(BOARD_HEIGHT)].map(() =>
      [...Array(BOARD_WIDTH)].map(() => ({ flipped: false, url: '' })),
    ),
    allMoves: [],
    activeCards: 0,
    currTurn: null,
    gameOver: false,
    gameWon: false,
    gameId: null,
  },
  reducers: {
    setPlayerName: (state, action) => {
      switch (action.payload.player) {
        case 1:
          state.player1.name = action.payload.name;
          break;
        case 2:
          state.player2.name = action.payload.name;
          break;
      }
    },
    setPlayerScore: (state, action) => {
      switch (action.payload.player) {
        case 1:
          state.player1.score = action.payload.score;
          break;
        case 2:
          state.player2.score = action.payload.score;
          break;
      }
    },
    resetGame: (state) => {
      state.player2.name = '';
      state.player2.score = null;
      state.gameId = null;
      state.currTurn = null;
      state.board = [...Array(BOARD_HEIGHT)].map(() =>
        [...Array(BOARD_WIDTH)].map(() => ({ flipped: false, url: '' })),
      );
    },
    setTurn: (state, action) => {
      state.currTurn = action.payload.currTurn;
    },
    setGameOver: (state, action) => {
      state.gameOver = action.payload.gameOver;
    },
    setGameWon: (state, action) => {
      state.gameWon = action.payload.gameWon;
    },
    setGameId: (state, action) => {
      state.gameId = action.payload.gameId;
    },
    setUrls: (state, { payload: { allUrls } }) => {
      const newBoard = JSON.parse(JSON.stringify(state.board));
      allUrls.forEach((row, i) =>
        row.forEach((url, j) => {
          newBoard[i][j].url = url;
        }),
      );
      state.board = newBoard;
    },
    setBoard: (state, action) => {
      state.board = action.payload.board;
    },
    addToAllMoves: (state, { payload: { moves } }) => {
      state.allMoves = [...state.allMoves, moves];
    },
    setBoardCard: (state) => {
      if (state.activeCards === 0 && state.allMoves.length !== 0) {
        const newBoard = JSON.parse(JSON.stringify(state.board));
        const [moves, ...restMoves] = state.allMoves;
        moves.forEach(({ row, col }) => (newBoard[row][col].flipped = !newBoard[row][col].flipped));
        state.board = newBoard;
        state.allMoves = restMoves;
      }
    },
    increaseActiveCard: (state) => {
      state.activeCards += 1;
      // console.log('active cards', state.activeCards);
    },
    decreaseActiveCard: (state) => {
      state.activeCards -= 1;
      // console.log('active cards', state.activeCards);
    },
    flipCard: (state, { payload }) => {
      const { row, col } = payload;
      const newBoard = JSON.parse(JSON.stringify(state.board));
      newBoard[row][col].flipped = !newBoard[row][col].flipped;
      state.board = newBoard;
    },
  },
});

export const {
  setPlayerName,
  setPlayerScore,
  setTurn,
  setGameOver,
  setGameWon,
  setGameId,
  setBoard,
  resetGame,
  flipCard,
  addToAllMoves,
  setBoardCard,
  setUrls,
  increaseActiveCard,
  decreaseActiveCard,
} = gameStateSlice.actions;
export const selectPlayer1 = (state) => state.gameState.player1;
export const selectPlayer2 = (state) => state.gameState.player2;
export const selectCurrTurn = (state) => state.gameState.currTurn;
export const selectGameOver = (state) => state.gameState.gameOver;
export const selectGameWon = (state) => state.gameState.gameWon;

export default gameStateSlice.reducer;
