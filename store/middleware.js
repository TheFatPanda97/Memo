import { setGameId, setPlayerName } from "@store/gameStateSlice";
let socket = null;

function serialize(data) {
	return JSON.stringify(data);
}

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
					socket.send(serialize({ type: "init", name: state.gameState.player1.name }));
				} else {
					socket.send(
						serialize({
							type: "join",
							gameId: action.gameId,
							name: state.gameState.player1.name,
						})
					);
				}
			};

			socket.onclose = function (event) {
				console.log("Disconnected from game");
			};

			socket.onmessage = function (event) {
				const data = JSON.parse(event.data);
				console.log(data);
				switch (data.type) {
					case "gameId":
						store.dispatch(setGameId({ gameId: data.gameId }));
						break;
					case "player2Name":
						store.dispatch(setPlayerName({ player: 2, name: data.name }));
				}
			};

			break;
		case "WS_DISCONNECT":
			if (socket !== null) {
				socket.send(
					serialize({
						type: "removePlayer",
					})
				);
			}
			break;
		case "WS_SEND":
			console.log(action.data);
			try {
				if (socket !== null) {
					socket.send(serialize(action.data));
				}
			} catch (error) {
				console.log(error);
			}
			break;
		default:
			return next(action);
	}
};
