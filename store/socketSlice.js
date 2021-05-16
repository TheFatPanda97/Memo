export const wsConnect = (host) => ({ type: "WS_CONNECT", host });
export const wsDisconnect = () => ({ type: "WS_DISCONNECT" });
export const wsSend = (data) => ({ type: "WS_SEND", data });
