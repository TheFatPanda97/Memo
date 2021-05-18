import { createSlice } from "@reduxjs/toolkit";

export const gameStateSlice = createSlice({
	name: "gameState",
	initialState: {
		user1: {
			name: "user1",
			score: 0,
		},
		user2: {
			name: "",
			score: null,
		},
		currTurn: false,
		gameOver: false,
		gameWon: false,
		gameId: null,
	},
	reducers: {
		setUserName: (state, action) => {
			switch (action.payload.user) {
				case 1:
					state.user1.name = action.payload.name;
					break;
				case 2:
					state.user2.name = action.payload.name;
					break;
			}
		},
		setUserScore: (state, action) => {
			switch (action.payload.user) {
				case 1:
					state.user1.score = action.payload.score;
					break;
				case 2:
					state.user2.score = action.payload.score;
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
			console.log("here");
			state.gameId = action.payload.gameId;
		},
	},
});

export const { setUserName, setUserScore, setTurn, setGameOver, setGameWon, setGameId } =
	gameStateSlice.actions;
export const selectUser1 = (state) => state.gameState.user1;
export const selectUser2 = (state) => state.gameState.user2;
export const selectCurrTurn = (state) => state.gameState.currTurn;
export const selectGameOver = (state) => state.gameState.gameOver;
export const selectGameWon = (state) => state.gameState.gameWon;

export default gameStateSlice.reducer;
