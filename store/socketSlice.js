import { API_URL } from '@env';

export const wsConnect = ({ init, gameId }) => ({
  type: 'WS_CONNECT',
  host: API_URL,
  init,
  gameId,
});
export const wsDisconnect = () => ({ type: 'WS_DISCONNECT' });
export const wsSend = (data) => ({ type: 'WS_SEND', data });
