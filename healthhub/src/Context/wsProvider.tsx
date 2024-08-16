import React, { useEffect, useState, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';
import { WebSocketContext } from './context';

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const ws = io('http://localhost:5000'); // Replace with your WebSocket URL

    setSocket(ws);

    return () => {
      ws.disconnect();
    };
  }, []);

  const registerEvent = <T,>(event: string, handler: (data: T) => void) => {
    if (socket) {
      socket.on(event, handler);
    }
  };

  const emitEvent = (event: string, data: any) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, registerEvent, emitEvent }}>
      {children}
    </WebSocketContext.Provider>
  );
};
