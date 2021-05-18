export const wsConnect = (host, init) => ({ type: "WS_CONNECT", host, init });
export const wsDisconnect = () => ({ type: "WS_DISCONNECT" });
export const wsSend = (data) => ({ type: "WS_SEND", data });
