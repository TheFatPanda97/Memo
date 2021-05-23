import { createSlice } from "@reduxjs/toolkit";

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
		setTurn: (state, action) => {
			state.currTurn = action.currTurn;
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
	},
});

export const {
	setPlayerName,
	setPlayerScore,
	setTurn,
	setGameOver,
	setGameWon,
	setGameId,
} = gameStateSlice.actions;
export const selectPlayer1 = (state) => state.gameState.player1;
export const selectPlayer2 = (state) => state.gameState.player2;
export const selectCurrTurn = (state) => state.gameState.currTurn;
export const selectGameOver = (state) => state.gameState.gameOver;
export const selectGameWon = (state) => state.gameState.gameWon;

export default gameStateSlice.reducer;
