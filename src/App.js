import Card from "./UI/Card";
import classes from "./App.module.css";
import ImageSection from "./Main Components/Image Section/ImageSection";
import TempSection from "./Main Components/Temp Section/TempSection";
import { useState } from "react";

const api = {
  key: "633e0516e8fcb83b65effe87867e9934",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  async function search(event) {
    setError(null);
    if (event.key === "Enter") {
      try {
        //have to check for empty string beforehand. API defaults to Xankandi, AZ otherwise
        if (query.trim().length === 0) {
          throw new Error("Enter a valid city name");
        }

        const response = await fetch(
          `${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Enter a valid city name");
          } else {
            throw new Error("Something went wrong");
          }
        }

        const result = await response.json();

        setWeather(result);
        setQuery("");
        console.log(result);
      } catch (error) {
        setError(error.message);
      }
    }
  }

  //dateBuilder() helps format date by taking in a Date object
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()]; //Date.getDay() returns number 0-6
    let date = d.getDate();
    let month = months[d.getMonth()]; //Date.getMonth() returns a number 0-11
    let year = d.getFullYear();

    return `${day}, ${month} ${date} ${year}`;
  };

  return (
    <>
      <div className={classes["app-wrapper"]}>
        <Card className={classes["search-bar"]}>
          <input
            type="text"
            placeholder="Type a location and press Enter"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </Card>

        {typeof weather.main !== "undefined" && !error ? (
          <Card className={classes["main-interface"]}>
            <div className={classes["top-row"]}>
              <h1 className={classes.location}>
                {weather.name}, {weather.sys.country}
              </h1>
              <h2 className={classes.date}>{dateBuilder(new Date())}</h2>
            </div>
            <div className={classes["mid-row"]}>
              <ImageSection description={weather.weather[0].description} />
              <TempSection temperature={weather.main.temp} />
            </div>
          </Card>
        ) : (
          <Card className={classes["error-message"]}>{error}</Card>
        )}
        <p>Made using the OpenWeatherMap API https://openweathermap.org/</p>
      </div>

      <div className={classes.background}></div>
    </>
  );
}

export default App;
