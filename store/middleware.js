import {
	setGameId,
	setPlayerName,
	setBoard,
	setTurn,
	setPlayerScore,
	addToAllMoves,
	setBoardCard,
} from "@store/gameStateSlice";
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
				switch (data.type) {
					case "gameId":
						store.dispatch(setGameId({ gameId: data.gameId }));
						break;
					case "player2Name":
						store.dispatch(setPlayerName({ player: 2, name: data.name }));
						break;
					case "board":
						store.dispatch(setBoard({ board: data.board }));
						break;
					case "setTurn":
						store.dispatch(setTurn({ currTurn: data.currTurn }));
						break;
					case "setScore":
						store.dispatch(setPlayerScore({ player: 1, score: data.player1 }));
						store.dispatch(setPlayerScore({ player: 2, score: data.player2 }));
						break;
					case "updateBoard":
						store.dispatch(addToAllMoves({ moves: data.update }));
						store.dispatch(setBoardCard());
						break;
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
			try {
				if (socket !== null) {
					socket.send(serialize(action.data));
				}
			} catch (error) {
				console.log(error);
			}
			break;
		default:
			// console.log(action);
			return next(action);
	}
};
