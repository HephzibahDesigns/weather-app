import React, { useState, useEffect, useRef, Fragment } from "react";
import "./App.css";
import axios from "axios";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineAir } from "react-icons/md";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { BsCloudRainFill } from "react-icons/bs";

function App() {
  const [cityName, setCityName] = useState("");
  const [location, setLocation] = useState({});

  const [list, setList] = useState([]);

  const updateSearch = (e) => {
    setCityName(e.target.value);
  };

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const updateCity = (e) => {
    e.preventDefault();

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=78f6d9504b3fffab62bec9ad3a81f6ed`
      )
      .then((response) => {
        setLocation(response.data.city);
        setList(response.data.list);
        console.log(response.data.list);
      });

    setCityName("");
  };

  return (
    <div className="App">
      <div className="search-bar">
        <form onSubmit={updateCity}>
          <input
            type="text"
            value={cityName}
            onChange={updateSearch}
            placeholder="Enter city"
            ref={inputRef}
          />
        </form>
      </div>
      <div className="container">
        {location !== "undefined" ? (
          <Fragment>
            {list !== "undefined" ? (
              <Fragment>
                <div className="left">
                  <div className="cloud">
                    <img
                      className="icon"
                      src={` http://openweathermap.org/img/wn/${list[0].weather[0].icon}.png`}
                      alt=""
                    />
                    <h1>{list[0].weather[0].main}</h1>
                  </div>

                  <div className="city-name">
                    <p>
                      {location.name} {location.country}
                    </p>
                  </div>

                  <div className="temperature">
                    <h2>{list[0].main.temp}˚C</h2>
                  </div>
                </div>

                <div className="right">
                  <div className="humidity">
                    <div className="humid-icons">
                      <WiHumidity />
                    </div>

                    <div className="humid">
                      <p>Humidity</p>
                      <h4>{list[0].main.humidity}%</h4>
                    </div>
                  </div>

                  <div className="pressure">
                    <div className="press-icons">
                      <MdOutlineAir />
                    </div>

                    <div className="press">
                      <p>Air Pressure</p>
                      <h4>{list[0].main.pressure}hPa</h4>
                    </div>
                  </div>

                  <div className="rain">
                    <div className="rainy-icons">
                      <BsCloudRainFill />
                    </div>

                    <div className="rainy">
                      <p>Chance of Rain</p>
                      <h4>{list[0].pop} mm</h4>
                    </div>
                  </div>

                  <div className="wind">
                    <div className="windy-icons">
                      <TiWeatherWindyCloudy />
                    </div>

                    <div className="windy">
                      <p>Wind Speed</p>
                      <h4>{list[0].wind.speed} m/s</h4>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              "null"
            )}
          </Fragment>
        ) : (
          "null"
        )}
      </div>
    </div>
  );
}

export default App;
