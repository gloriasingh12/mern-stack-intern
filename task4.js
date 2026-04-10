import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * PROJECT: MERN Productivity Tracker Extension
 * TASK 4: Website Monitoring, Blocking, and Syncing
 * DELIVERABLE: Chrome Extension Dashboard with MERN Integration
 */

const ProductivityExtension = () => {
    const [blockedSites, setBlockedSites] = useState(['facebook.com', 'instagram.com']);
    const [usageData, setUsageData] = useState([]);
    const [syncStatus, setSyncStatus] = useState('Idle');

    // 1. Fetch User Preferences from MongoDB (MERN Backend)
    useEffect(() => {
        fetchPreferences();
    }, []);

    const fetchPreferences = async () => {
        try {
            setSyncStatus('Syncing...');
            const res = await axios.get('http://localhost:5000/api/preferences');
            setBlockedSites(res.data.blockedSites);
            setUsageData(res.data.usageReport);
            setSyncStatus('Synced ✅');
        } catch (err) {
            setSyncStatus('Offline Mode ⚠️');
        }
    };

    // 2. Logic to Block Distractions
    const addBlockSite = (site) => {
        const updated = [...blockedSites, site];
        setBlockedSites(updated);
        // Sync to Backend
        axios.post('http://localhost:5000/api/preferences', { blockedSites: updated });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={{margin: 0}}>🚀 Productivity Pro</h3>
                <small>{syncStatus}</small>
            </div>

            <div style={styles.section}>
                <h4>🚫 Blocked Domains</h4>
                <div style={styles.list}>
                    {blockedSites.map(site => (
                        <div key={site} style={styles.siteItem}>{site}</div>
                    ))}
                </div>
            </div>

            <div style={styles.section}>
                <h4>📊 Usage Report (Today)</h4>
                {usageData.map(data => (
                    <div key={data.site} style={styles.reportRow}>
                        <span>{data.site}</span>
                        <strong>{data.time} mins</strong>
                    </div>
                ))}
            </div>

            <button style={styles.syncBtn} onClick={fetchPreferences}>Force Cloud Sync</button>
        </div>
    );
};

// --- Extension UI Styles ---
const styles = {
    container: { width: '300px', background: '#fff', fontFamily: 'Segoe UI', borderRadius: '10px', overflow: 'hidden', border: '1px solid #ddd' },
    header: { background: '#6200ee', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    section: { padding: '15px', borderBottom: '1px solid #eee' },
    list: { display: 'flex', flexWrap: 'wrap', gap: '5px' },
    siteItem: { background: '#fce4ec', color: '#d81b60', padding: '2px 8px', borderRadius: '5px', fontSize: '0.75rem' },
    reportRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', margin: '5px 0' },
    syncBtn: { width: '100%', padding: '10px', border: 'none', background: '#f3f4f6', cursor: 'pointer', fontSize: '0.8rem' }
};

export default ProductivityExtension;
