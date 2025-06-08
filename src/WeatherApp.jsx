import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";
import "./WeatherApp.css";

export default function WeatherApp() {
    const [weatherInfo, SetWeatherInfo] = useState({
        city: "Delhi",
        feelsLike: 31.23,
        temp: 30.34,
        tempMin: 30.34,
        tempMax: 30.34,
        humidity: 48,
        weather: "clear Sky",
    });

    let updateInfo = (result) => {
        SetWeatherInfo(result);
    };
    return (
        <div style={{ textAlign: "center" }} className="weatherApp">
            <h2>Weather App</h2>
            <SearchBox updateInfo={updateInfo} />
            <InfoBox info={weatherInfo} />
        </div>
    );
}