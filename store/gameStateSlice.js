import { createSlice } from "@reduxjs/toolkit";
import { BOARD_WIDTH, BOARD_HEIGHT } from "@utils";

export const gameStateSlice = createSlice({
	name: "gameState",
	initialState: {
		player1: {
			name: "wild panda",
			score: 0,
		},
		player2: {
			name: "",
			score: null,
		},
		board: [...Array(BOARD_HEIGHT)].map(() => [...Array(BOARD_WIDTH)].map(() => false)),
		currTurn: false,
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
			state.player2.name = "";
			state.player2.score = null;
			state.gameId = null;
			state.currTurn = false;
			state.board = [...Array(BOARD_HEIGHT)].map(() =>
				[...Array(BOARD_WIDTH)].map(() => false)
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
		setBoard: (state, action) => {
			state.board = action.payload.board;
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
} = gameStateSlice.actions;
export const selectPlayer1 = (state) => state.gameState.player1;
export const selectPlayer2 = (state) => state.gameState.player2;
export const selectCurrTurn = (state) => state.gameState.currTurn;
export const selectGameOver = (state) => state.gameState.gameOver;
export const selectGameWon = (state) => state.gameState.gameWon;

export default gameStateSlice.reducer;
