export const wsConnect = ({ host, init, gameId }) => ({
	type: "WS_CONNECT",
	host,
	init,
	gameId,
});
export const wsDisconnect = () => ({ type: "WS_DISCONNECT" });
export const wsSend = (data) => ({ type: "WS_SEND", data });
