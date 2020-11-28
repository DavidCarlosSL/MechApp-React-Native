import React, { createContext, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const socket = new W3CWebSocket("ws://18.229.138.143:4000");

export const SocketContext = createContext({});

function SocketProvider ({children}) {
    const [newSocket, setNewSocket] = useState(null);

    socket.onopen = () => {
        setNewSocket(socket);
        console.log("New Web Socket connected");
    }

    return(
        <SocketContext.Provider value={{newSocket}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;