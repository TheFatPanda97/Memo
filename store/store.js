import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import gameStateReducer from "./gameStateSlice";
import { wsMiddleware } from "./middleware";

export default configureStore({
	reducer: {
		gameState: gameStateReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wsMiddleware),
});
