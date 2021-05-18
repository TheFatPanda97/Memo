import { setGameId } from "@store/gameStateSlice";
let socket = null;

export const wsMiddleware = (store) => (next) => (action) => {
	const state = store.getState();
	switch (action.type) {
		case "WS_CONNECT":
			if (socket !== null) {
				socket.close();
			}

			socket = new WebSocket(`${action.host}`);

			socket.onopen = function (event) {
				console.log("connected");
				if (action.init) {
					socket.send(JSON.stringify({ type: "init", name: state.gameState.user1.name }));
				}
			};

			socket.onclose = function (event) {
				console.log("Disconnected from game");
			};

			socket.onmessage = function (event) {
				const data = JSON.parse(event.data);
				switch (data.type) {
					case "gameId":
						store.dispatch(setGameId({ gameId: data.gameId }));
						break;
				}
			};

			break;
		case "WS_DISCONNECT":
			if (socket !== null) {
				socket.close();
			}
			socket = null;
			break;
		case "WS_SEND":
			try {
				if (socket !== null) {
					socket.send(JSON.stringify(action.data));
				}
			} catch (error) {
				console.log(error);
			}
			break;
		default:
			return next(action);
	}
};
