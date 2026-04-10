import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

/**
 * PROJECT: Real-Time Collaboration Tool
 * TASK 3: Shared Document Editor using WebSockets
 * DELIVERABLE: Live Synchronized Text Editor for Multiple Users
 */

const socket = io('https://socket-io-chat.now.sh'); // Using public socket server for sync demo

const CollabEditor = () => {
    const [text, setText] = useState("");
    const [status, setStatus] = useState("Connected");

    useEffect(() => {
        // Listening for document updates from other users
        socket.on('new message', (data) => {
            if (data.username !== 'Me') {
                setText(data.message);
            }
        });

        return () => socket.off();
    }, []);

    const handleTextChange = (e) => {
        const newText = e.target.value;
        setText(newText);
        
        // Syncing with other users via WebSockets
        socket.emit('new message', newText);
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={{margin: 0}}>📄 Shared Doc Editor</h2>
                    <span style={styles.badge}>{status}</span>
                </div>
                
                <p style={styles.subText}>Collaborate in real-time. Changes sync across all users.</p>

                <textarea
                    style={styles.editor}
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Start typing to collaborate..."
                />

                <div style={styles.footer}>
                    <span>Multiuser Mode: Enabled</span>
                    <span>Protocol: WebSocket</span>
                </div>
            </div>
        </div>
    );
};

// --- Collaborative UI Styles ---
const styles = {
    wrapper: { height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5' },
    card: { width: '80%', maxWidth: '800px', background: '#fff', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '20px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '15px' },
    badge: { background: '#e8f5e9', color: '#2e7d32', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' },
    subText: { color: '#666', fontSize: '0.9rem', margin: '15px 0' },
    editor: { width: '100%', height: '300px', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1.1rem', outline: 'none', fontFamily: 'monospace', resize: 'none', boxSizing: 'border-box' },
    footer: { marginTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#aaa' }
};

export default CollabEditor;
