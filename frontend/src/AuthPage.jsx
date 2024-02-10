import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthPage = (props) => {
    // State to hold the country
    const [country, setCountry] = useState('');

    // Function to get the location
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.table(data.address);
                    // Set the country in state
                    setCountry(data.address.country);
                })
                .catch(() => {
                    console.error("Error fetching data from API");
                });
        });
    };

    // useEffect hook to get the location immediately on component mount
    useEffect(() => {
        getLocation();
    }, []); // The empty array ensures this only happens on mount and unmount

    const onSubmit = (e) => {
        e.preventDefault();
        const usernameValue = e.target.username.value;
        axios.post('http://localhost:3001/authenticate', { username: usernameValue })
            .then(r => {
                props.onAuth({ ...r.data, secret: usernameValue, country: country });
            })
            .catch(e => console.error('error', e));
    };

    return (
        <div className="background">
            <form onSubmit={onSubmit} className="form-card">
                <div className="form-title">Welcome 👋</div>

                <div className="form-subtitle">Set a username to get started</div>

                <div className="auth">
                    <div className="auth-label">Username</div>
                    <input className="auth-input" name="username" pattern="[A-Za-z0-9_]+" title="Username can only contain Latin letters, numbers, and underscores." />
                    <button className="auth-button" type="submit">
                        Enter
                    </button>
                </div>
                <p className="form-subtitle">Національність: Україна <br /> Рід: Козацький</p>
                <p className="form-subtitle"><i>Будь ласка, дозвольте використання геолокації в лівому верхньому куті, аби потрапити в чат співвітчизників з країни вашого нинішнього проживання.</i></p>
                {/* Displaying the country from state */}
                {country && <p className="form-title">Country: {country}</p>}
            </form>
        </div>
    );
};

export default AuthPage;
