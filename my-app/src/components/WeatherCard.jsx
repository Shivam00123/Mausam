import React, { useEffect, useState } from "react";
import "../style/weatherCard.css";
import Sunny from "../assets/Images/sunny-pic.png";
import PartlyCloudy from "../assets/Images/partlyCloudy-pic.png";
import Overcast from "../assets/Images/overcast-pic.png";
import Mist from "../assets/Images/mist-pic.png";
import ErrorImage from "../assets/Images/error.png";
import LightSnow from "../assets/Images/light-snow.png";
import PatchyRain from "../assets/Images/patchyRain.png";
import PatchyRainPossible from "../assets/Images/patchy-rain-possible.png";
import ThunderOutburst from "../assets/Images/thunderOutburst.png";
import LightRain from "../assets/Images/light-rain.png";
import ModerateRain from "../assets/Images/moderate-rain.png";
import Humidity from "../assets/Images/humid.png";
import Pressure from "../assets/Images/Pressure.png";
import CloudCoverage from "../assets/Images/cloudCovergae.png";
import WindSpeed from "../assets/Images/windSpeed.jpg";
import Maxtemp from "../assets/Images/max-temp.png";
import windDirection from "../assets/Images/direc.png";
import FreezingFog from "../assets/Images/freezingFog.png";
import LightDrizzle from "../assets/Images/lightDrizzle.png";
import Blizzard from "../assets/Images/blizzard.png";
import HeavySnow from "../assets/Images/Heavysnow.png";
import Loading from "./Loading";
import axios from "axios";

function WeatherCard() {
  const [day, setDay] = useState("Monday");
  const [error, setError] = useState(false);
  const [data, setData] = useState("");
  const [weatherImage, setWeathertImage] = useState(ErrorImage);
  const [cityInput, setCityInput] = useState("London");
  const [city, setCity] = useState("");
  const [thought, setThought] = useState("");
  const [loading, setLoading] = useState(false);
  const apiKey = "xyz";

  const makeCall = () => {
    setLoading(true);
    setCity(cityInput);
  };

  useEffect(() => {
    const currentDay = new Date().getDay();
    switch (currentDay) {
      case 1:
        setDay("Monday");
        break;
      case 2:
        setDay("Tuesday");
        break;
      case 3:
        setDay("Wednuesday");
        break;
      case 4:
        setDay("Thursday");
        break;
      case 5:
        setDay("Friday");
        break;
      case 6:
        setDay("Saturday");
        break;
      case 7:
        setDay("Sunday");
        break;
      default:
        setDay("OOps");
    }
  }, []);
  useEffect(() => {
    if (city) {
      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        )
        .then((res) => {
          setLoading(false);
          setData(res.data);
        })
        .catch((err) => {
          setError(true);
        });
    }
  }, [city]);

  useEffect(() => {
    if (error) {
      throw new Error("Error Occured");
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      switch (data.current.condition["text"]) {
        case "Partly cloudy":
          setWeathertImage(PartlyCloudy);
          break;
        case "Overcast":
          setWeathertImage(Overcast);
          break;
        case "Mist":
          setWeathertImage(Mist);
          break;
        case "Sunny":
          setWeathertImage(Sunny);
          break;
        case "Fog":
          setWeathertImage(Mist);
          break;
        case "Light snow":
          setWeathertImage(LightSnow);
          break;
        case "Patchy light rain with thunder":
          setWeathertImage(PatchyRain);
          break;
        case "Patchy rain possible":
          setWeathertImage(PatchyRainPossible);
          break;
        case "Thundery outbreaks possible":
          setWeathertImage(ThunderOutburst);
          break;
        case "Clear":
          setWeathertImage(Sunny);
          break;
        case "Light rain":
          setWeathertImage(LightRain);
          break;
        case "Moderate rain":
          setWeathertImage(ModerateRain);
          break;
        case "Freezing fog":
          setWeathertImage(FreezingFog);
          break;
        case "Light drizzle":
          setWeathertImage(LightDrizzle);
          break;
        case "Patchy light snow":
          setWeathertImage(LightSnow);
          break;
        case "Blizzard":
          setWeathertImage(Blizzard);
          break;
        case "Patchy heavy snow":
          setWeathertImage(HeavySnow);
          break;
        case "Heavy snow":
          setWeathertImage(HeavySnow);
          break;
        default:
          return;
      }
    }
  }, [data]);

  const getTodayThought = () => {
    axios
      .get("https://api.quotable.io/random")
      .then((res) => {
        setThought(res.data);
        localStorage.removeItem("thoughtDate");
        localStorage.removeItem("thoughtYear");
        localStorage.removeItem("thoughtMonth");
        localStorage.removeItem("todayThought");
        const currentDate = new Date().getDate();
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        localStorage.setItem("todayThought", JSON.stringify(res.data));
        localStorage.setItem("thoughtDate", currentDate);
        localStorage.setItem("thoughtYear", currentYear);
        localStorage.setItem("thoughtMonth", currentMonth);
      })
      .catch((err) => {
        setError(true);
      });
  };

  useEffect(() => {
    const getCurrentDate = new Date().getDate();
    const localStorageDate = localStorage.getItem("thoughtDate");
    if (getCurrentDate != localStorageDate) {
      getTodayThought();
    } else {
      const getCurrentMonth = new Date().getMonth();
      const localStorageMonth = localStorage.getItem("thoughtMonth");
      if (getCurrentMonth != localStorageMonth) {
        getTodayThought();
      } else {
        const getCurrentYear = new Date().getFullYear();
        const localStorageYear = localStorage.getItem("thoughtYear");
        if (getCurrentYear != localStorageYear) {
          getTodayThought();
        } else {
          const getThought = localStorage.getItem("todayThought");
          if (getThought) {
            setThought(JSON.parse(getThought));
          } else {
            getTodayThought();
          }
        }
      }
    }
  }, []);

  const convertMS = (speed) => {
    return Math.round((speed * 5) / 18);
  };

  return (
    <div className="weatherCard">
      {!loading ? (
        <>
          <div className="weatherAbout">
            <div>
              <div className="searchBox">
                <input
                  onChange={(e) => setCityInput(e.target.value)}
                  type="text"
                  placeholder="enter city name"
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      makeCall();
                    }
                  }}
                />
                <button onClick={makeCall}>Search</button>
              </div>
              <div className="day">
                <h2>{day}</h2>
                {data ? (
                  <p>{data.current.condition["text"]}</p>
                ) : (
                  <p>Something went wrong</p>
                )}
              </div>
              <div className="weatherDivWrapper">
                <div className="weatherImageContainer">
                  <img src={weatherImage} alt="weather" />
                </div>
              </div>
            </div>
            <div className="temperature">
              {data ? (
                <span className="temp number">{data.current.temp_c}</span>
              ) : (
                <span className="temp number">0</span>
              )}
              <span className="degree temp">o</span>
            </div>
            <div className="imageContainer"></div>
          </div>
          <div className="moreInfo">
            <div className="header">
              <h2>Today's highlights</h2>
              {data && (
                <div className="location">
                  <span>{data ? `${data.location.name}` : ""}, </span>
                  {data &&
                    data.location.region &&
                    data.location.name !== data.location.region && (
                      <span>{data.location.region},</span>
                    )}
                  <span>{data ? `${data.location.country}` : ""}</span>
                </div>
              )}
            </div>
            <div className="moreWeatherInfo">
              <div className="weatherInfoDetails">
                <h3>Humidity</h3>
                <div className="infoImage">
                  <img src={Humidity} alt="weather-pic" />
                </div>
                <h3 className="percentage">
                  {data ? `${data.current.humidity}%` : "0%"}
                </h3>
              </div>
              <div className="weatherInfoDetails">
                <h3>Pressure</h3>
                <div className="infoImage">
                  <img src={Pressure} alt="weather-pic" />
                </div>
                <h3 className="percentage">
                  {data ? `${data.current.pressure_mb}.0 hPa` : "0hPa"}
                </h3>
              </div>
              <div className="weatherInfoDetails">
                <h3>Max-temp</h3>
                <div className="infoImage">
                  <img src={Maxtemp} alt="weather-pic" />
                </div>
                <h3 className="percentage">
                  {data ? `${data.current.feelslike_c}C` : "0hPa"}
                </h3>
              </div>
              <div className="weatherInfoDetails">
                <h3>Cloud Coverage</h3>
                <div className="infoImage">
                  <img src={CloudCoverage} alt="weather-pic" />
                </div>
                <h3 className="percentage">
                  {data ? `${data.current.cloud}%` : "0%"}
                </h3>
              </div>
              <div className="weatherInfoDetails">
                <h3>Wind speed</h3>
                <div className="infoImage">
                  <img src={WindSpeed} alt="weather-pic" />
                </div>
                <h3 className="percentage">
                  {data ? `${convertMS(data.current.wind_kph)}m/s` : "0m/s"}
                </h3>
              </div>
              <div className="weatherInfoDetails">
                <h3>Wind Direction</h3>
                <div className="infoImage">
                  <img src={windDirection} alt="weather-pic" />
                </div>
                <h3 className="percentage">
                  {data ? `${data.current.wind_dir}` : "WSW"}
                </h3>
              </div>
            </div>
            <div className="thoughtDiv">
              <h3 className="thoughtOfTheDay">Thought of the day</h3>
              {!thought ? (
                <>
                  <p>Don't have a good day, have a great day</p>
                  <span className="author">author : </span>
                  <span className="authorName">Shivam</span>
                </>
              ) : (
                <>
                  <p>{thought.content}</p>
                  <span className="author">author : </span>
                  <span className="authorName">{thought.author}</span>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default WeatherCard;
