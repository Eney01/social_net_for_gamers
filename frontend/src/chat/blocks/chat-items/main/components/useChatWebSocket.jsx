import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';

function useChatWebSocket(chatId, onNewMessage) {
    const connectionRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!chatId) return;

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${process.env.REACT_APP_API_URL}/chatHub?chatId=${chatId}`, { withCredentials: true })
            .withAutomaticReconnect()
            .build();

        connectionRef.current = connection;

        connection.on('ReceiveMessage', (msg) => {
            onNewMessage(msg);
        });

        async function start() {
            try {
                await connection.start();
                console.log('SignalR connected');
                setIsConnected(true);

                await connection.invoke('JoinChatGroup', String(chatId));
            } catch (err) {
                console.error('SignalR error:', err);
                setIsConnected(false);
            }
        }

        start();

        return () => {
            if (connection) {
                connection.off('ReceiveMessage');
                connection.stop()
                    .then(() => {
                        console.log('SignalR disconnected');
                        setIsConnected(false);
                    })
                    .catch(() => setIsConnected(false));
            }
        };
    }, [chatId, onNewMessage]);

    return { connectionRef, isConnected };
}

export default useChatWebSocket;
