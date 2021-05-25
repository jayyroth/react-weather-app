import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
    let [city, setCity] = useState(null);
    let [weather, setWeather] = useState(null);
  
    function getWeather(response) {
      setWeather({
        city: response.data.name,
        temp: Math.round(response.data.main.temp),
        desc: response.data.weather[0].description,
        wind: Math.round(response.data.wind.speed),
        pressure: response.data.main.pressure,
        humidity: response.data.main.humidity,
        icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      });
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      setCity(event.target.value);
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d77489ebd0ba8b6fa1d62c2519e08052&units=imperial`;
      axios.get(apiUrl).then(getWeather);
    }
  
    function updateCity(event) {
      setCity(event.target.value);
    }
    let form = (
      <form className="Weather" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Type a city..."
          onChange={updateCity}
          autoComplete="off"
          autoFocus="on"
        ></input>
        <input type="submit" value="Search"></input>
      </form>
    );
    if (!weather) {
      return <div>{form}</div>;
    } else {
      return (
        <div>
          <div>{form}</div>
          <ul>
            <li>Temperature: {weather.temp}°F</li>
            <li>Description: {weather.desc}</li>
            <li>Humidity: {weather.humidity}%</li>
            <li>Wind: {weather.wind}mph</li>
            <li>
              <img src={weather.icon} alt="icon" />
            </li>
          </ul>
        </div>
      );
    }
  }
  