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
    gameOver: true,
    gameWon: true,
    gameId: null,
  },
  reducers: {
    setPlayerName: (state, { payload: { player, name } }) => {
      switch (player) {
        case 1:
          state.player1.name = name;
          break;
        case 2:
          state.player2.name = name;
          break;
      }
    },
    setPlayerScore: (state, { payload: { player, score } }) => {
      switch (player) {
        case 1:
          state.player1.score = score;
          break;
        case 2:
          state.player2.score = score;
          break;
      }
    },
    resetGame: (state, payload) => {
      state.player2.name = '';
      state.player2.score = null;
      state.gameId = payload?.restart ? null : state.gameId;
      state.currTurn = null;
      state.gameOver = false;
      state.gameWon = false;
      state.activeCards = 0;
      state.allMoves = [];
      state.board = [...Array(BOARD_HEIGHT)].map(() =>
        [...Array(BOARD_WIDTH)].map(() => ({ flipped: false, url: '' })),
      );
    },
    setTurn: (state, { payload: { currTurn } }) => {
      state.currTurn = currTurn;
    },
    setGameOver: (state, { payload: { gameOver } }) => {
      state.gameOver = gameOver;
    },
    setGameWon: (state, { payload: { gameWon } }) => {
      state.gameWon = gameWon;
    },
    setGameId: (state, { payload: { gameId } }) => {
      state.gameId = gameId;
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
    setBoard: (state, { payload: { board } }) => {
      state.board = board;
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
    flipCard: (state, { payload: { row, col } }) => {
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
