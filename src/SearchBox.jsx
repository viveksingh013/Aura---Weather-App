import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./SearchBox.css";
import { useState, useEffect } from "react";

const darkTheme = createTheme({
    palette: {
        mode: "light",
    },
});

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

    useEffect(() => {
        const getUserLocation = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                        updateTheInfo();
                    },
                    (error) => {
                        console.error("Error getting user location:", error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };
        getUserLocation();
    }, [latitude, longitude]);

    let updateTheInfo = async () => {
        // Check if latitude and longitude have valid values
        if (latitude === null || longitude === null || latitude === undefined || longitude === undefined) {
            console.error("Latitude or longitude is not defined.");
            // Optionally, handle this case by showing an error message to the user
            return;
        }
        let response = await fetch(`${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        let result = {
            city: jsonResponse.name,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description,
        };
        updateInfo(result);
    };

    let handleChange = (event) => {
        setCity(event.target.value);
    };

    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        } catch (error) {
            setError(true);
        }
    };

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            let result = {
                city: jsonResponse.name,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };
            return result;
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className="SearchBox">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <form action="" onSubmit={handleSubmit}>
                    <TextField id="city" label="City Name" variant="outlined" value={city} onChange={handleChange} required />
                    <br />
                    <br />
                    <Button variant="outlined" startIcon={<SearchIcon />} type="submit" className="btn">
                        Search
                    </Button>
                    {error && (
                        <div className="alertContainer">
                            <Collapse in={open}>
                                <Alert
                                    variant="outlined"
                                    severity="error"
                                    size="small"
                                    onClose={() => {
                                        setError(false);
                                    }}
                                    className="alert"
                                >
                                    No Such Place In Our API
                                </Alert>
                            </Collapse>
                        </div>
                    )}
                </form>
            </ThemeProvider>
        </div>
    );
}