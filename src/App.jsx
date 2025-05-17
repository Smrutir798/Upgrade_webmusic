import React, { useEffect } from 'react';
import Seach from './assets/search.png';
import './App.css';
import myMusic from './music/ANTIDOTE-yt.savetube.me.mp3';
import SongList from "./Components/SongList.jsx";


{/* API Climatic */}

function App() {
    useEffect(() => {
        const apiKey = 'dcfc9df0d3d8e3ed40b9c1b710c56a6a';
        const locationDiv = document.getElementById('location');
        const temperatureDiv = document.getElementById('temperature');
        const audioPlayer = document.getElementById('audioPlayer');

        function fetchWeatherData(lat, lon) {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const temperature = data.main.temp;
                    const city = data.name;
                    const weatherCondition = data.weather[0].main.toLowerCase();

                    locationDiv.innerHTML = `Location: ${city}`;
                    temperatureDiv.innerHTML = `Current temperature: ${temperature}°C`;
                    playMusicBasedOnWeather(weatherCondition);
                })
                .catch(error => {
                    console.error('Error fetching the weather data:', error);
                    temperatureDiv.innerHTML = 'Could not load temperature data';
                });
        }

        function playMusicBasedOnWeather(condition) {
            if (audioPlayer) {
                audioPlayer.src = myMusic;
                audioPlayer.play().catch(err => {
                    console.error('Audio play error:', err);
                });
            }
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeatherData(lat, lon);
                },
                error => {
                    console.error('Error getting location:', error);
                    locationDiv.innerHTML = 'Could not detect location';
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            locationDiv.innerHTML = 'Geolocation is not supported by this browser.';
        }
    }, []);

    return (
        <div>
            <div className="Search_bar">
                <div className="search-box">
                    <img src={Seach} alt="search" className="search-icon" />
                    <input type="text" placeholder="" />
                    <button className="search-btn">Go!</button>
                </div>
            </div>

            <div className="weather_container">
                <div className="weather-box">
                    <h1>Climatic Melodies</h1>
                    <h4 id="location">Location: </h4>
                    <h4 id="temperature">Current temperature: </h4>
                    <audio id="audioPlayer" controls></audio>
                </div>
            </div>

            {/* playlist */}
            <div>
                <h1 className="playlist">Smruti's Playlist</h1>
            </div>
            <div>
                <SongList />
            </div>


        </div>
    );
}

export default App;
