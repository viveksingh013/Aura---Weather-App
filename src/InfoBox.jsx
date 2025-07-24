import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UmbrellaOutlinedIcon from "@mui/icons-material/UmbrellaOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import "./InfoBox.css";
import "./index.css";
import { useEffect } from "react";

export default function InfoBox({ info }) {
    const getBodyClass = () => {
    if (!info || info.humidity == null || info.temp == null) return "sun-humidity";
    return info.humidity > 80 ? "rain-humidity" : info.temp > 15 ? "sun-humidity" : "snow-humidity";
    };

    useEffect(() => {
        if (!info) return;
        
        const bodyClass = getBodyClass();
        document.body.className = bodyClass; // ✅ reset to only this class
        
        return () => {
            document.body.className = ""; // or set default like "sun-humidity"
        };
    }, [info.humidity, info.temp]);

    return (
        <div className="InfoBox">
            <div className="cardContainer">
                <Card sx={{ maxWidth: 345, background: "rgba( 255, 255, 255, 0.1 )", backdropFilter: "blur( 1px )", borderRadius: "10px" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ display: "flex", justifyContent: "center", gap: "6px", alignItems: "center" }}>
                            {info.city}&nbsp;
                            {info.humidity > 80 ? <UmbrellaOutlinedIcon /> : info.temp > 15 ? <WbSunnyOutlinedIcon /> : <AcUnitOutlinedIcon />}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component={"span"}>
                            <div className="InfoText">
                                The weather is {info.weather} and feels like {info.feelsLike}&deg;C
                            </div>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component={"span"}>
                            <TableContainer component={Paper} sx={{ background: "rgba( 255, 255, 255, 0.1 )", backdropFilter: "blur( 2px )", borderRadius: "10px" }}>
                                <Table sx={{ minWidth: 310 }} aria-label="simple table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left">Temperature</TableCell>
                                            <TableCell align="center">{info.temp}&deg;C</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Humidity</TableCell>
                                            <TableCell align="center">{info.humidity}%</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Min Temp</TableCell>
                                            <TableCell align="center">{info.tempMin}&deg;C</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Max Temp</TableCell>
                                            <TableCell align="center">{info.tempMax}&deg;C</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
