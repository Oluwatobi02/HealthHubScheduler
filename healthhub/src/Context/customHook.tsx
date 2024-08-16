import { useContext } from 'react';
import { UserContext, AppContextType, WebSocketContext } from './context';
const useAppContext = (): AppContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
}
const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export {useAppContext, useWebSocket}