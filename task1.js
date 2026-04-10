import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

/**
 * PROJECT: Real-Time Chat App
 * TASK 1: Socket.io + React Integration
 * DELIVERABLE: Live Messaging Dashboard
 */

// Connecting to a public socket server for demo
const socket = io('https://socket-io-chat.now.sh'); 

const RealTimeChat = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        // Listening for messages from server
        socket.on('new message', (data) => {
            setChat((prevChat) => [...prevChat, data]);
        });

        // Track user presence
        socket.on('user joined', (data) => setUserCount(data.numUsers));
        socket.on('user left', (data) => setUserCount(data.numUsers));

        return () => socket.off();
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            socket.emit('new message', message); // Sending to server
            setChat((prevChat) => [...prevChat, { username: 'You', message: message }]);
            setMessage('');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>💬 React Live Chat</h2>
                <p style={{color: '#4caf50'}}>Online Users: {userCount}</p>
            </div>

            <div style={styles.chatWindow}>
                {chat.map((msg, index) => (
                    <div key={index} style={msg.username === 'You' ? styles.myMsg : styles.otherMsg}>
                        <strong>{msg.username}: </strong> {msg.message}
                    </div>
                ))}
            </div>

            <form onSubmit={sendMessage} style={styles.inputArea}>
                <input 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={styles.input}
                />
                <button type="submit" style={styles.sendBtn}>Send</button>
            </form>
        </div>
    );
};

// --- Professional UI Styles ---
const styles = {
    container: { maxWidth: '500px', margin: '50px auto', background: '#fff', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', overflow: 'hidden', fontFamily: 'Arial' },
    header: { background: '#282c34', color: '#fff', padding: '15px', textAlign: 'center' },
    chatWindow: { height: '350px', overflowY: 'auto', padding: '20px', background: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: '10px' },
    myMsg: { alignSelf: 'flex-end', background: '#007bff', color: '#fff', padding: '10px 15px', borderRadius: '15px 15px 0 15px', maxWidth: '80%' },
    otherMsg: { alignSelf: 'flex-start', background: '#e9ecef', color: '#333', padding: '10px 15px', borderRadius: '15px 15px 15px 0', maxWidth: '80%' },
    inputArea: { display: 'flex', padding: '15px', borderTop: '1px solid #ddd' },
    input: { flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #ddd', outline: 'none' },
    sendBtn: { marginLeft: '10px', background: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }
};

export default RealTimeChat;
