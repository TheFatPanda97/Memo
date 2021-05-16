let socket = null;

export const wsMiddleware = (store) => (next) => (action) => {
	switch (action.type) {
		case "WS_CONNECT":
			if (socket !== null) {
				socket.close();
			}

			// store.dispatch(startGame())
			socket = new WebSocket(`${action.host}`);

			socket.onopen = function (event) {
				console.log("connected");
			};

			socket.onclose = function (event) {
				// store.dispatch(endGame())
				console.log("Disconnected from game");
			};

			socket.onmessage = function (event) {
				console.log(event.data);
				// store.dispatch(setStageInfo(JSON.parse(event.data)))
			};

			break;
		case "WS_DISCONNECT":
			if (socket !== null) {
				socket.close();
			}
			// store.dispatch(setStageInfo({}))
			// store.dispatch(endGame())
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
