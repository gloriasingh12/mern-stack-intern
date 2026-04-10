import React, { useState } from 'react';
import axios from 'axios';

/**
 * PROJECT: Weather Dashboard
 * TASK 2: Fetch and Display Weather via OpenWeatherMap API
 * DELIVERABLE: Responsive React Web App
 */

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    // Replace with your actual API Key from OpenWeatherMap
    const API_KEY = "895284a22d0353443572d4d71520623e"; 

    const fetchWeather = async (e) => {
        e.preventDefault();
        if (!city) return;
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );
            setWeather(response.data);
            setLoading(false);
        } catch (error) {
            alert("City not found!");
            setLoading(false);
        }
    };

    return (
        <div style={styles.body}>
            <div style={styles.card}>
                <h2 style={{color: '#fff'}}>⛅ Weather Forecast</h2>
                <form onSubmit={fetchWeather} style={styles.form}>
                    <input 
                        type="text" 
                        placeholder="Enter City (e.g. Noida)" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.btn}>Search</button>
                </form>

                {loading && <p style={{color: '#fff'}}>Searching...</p>}

                {weather && (
                    <div style={styles.info}>
                        <h1 style={{margin: 0}}>{weather.name}</h1>
                        <p style={{fontSize: '3rem', margin: '10px 0'}}>{Math.round(weather.main.temp)}°C</p>
                        <p style={{textTransform: 'capitalize'}}>{weather.weather[0].description}</p>
                        <div style={styles.details}>
                            <span>💧 Humidity: {weather.main.humidity}%</span>
                            <span>🌬️ Wind: {weather.wind.speed} m/s</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Responsive Styles ---
const styles = {
    body: { height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Segoe UI' },
    card: { background: 'linear-gradient(135deg, #00b4db, #0083b0)', padding: '30px', borderRadius: '20px', width: '350px', textAlign: 'center', boxShadow: '0 15px 35px rgba(0,0,0,0.2)' },
    form: { display: 'flex', gap: '10px', marginBottom: '20px' },
    input: { flex: 1, padding: '10px', borderRadius: '10px', border: 'none', outline: 'none' },
    btn: { background: '#fff', border: 'none', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' },
    info: { color: '#fff', marginTop: '20px' },
    details: { display: 'flex', justifyContent: 'space-around', marginTop: '20px', fontSize: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '15px' }
};

export default WeatherApp;
