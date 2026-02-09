import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCloudSun,
   faGamepad,
   faMoon,
} from "@fortawesome/free-solid-svg-icons";
import WeatherBox from "./Component/WeatherBox";
import "./app.css";

const App = () => {
   const [inputWeather, setInputWeather] = useState("");

   const cities = ["Seoul", "Tokyo", "Gumi", "Toronto"];

   return (
      <div className="container">
         <div className="dash">
            <nav className="menu">
               <ul>
                  <li>
                     <FontAwesomeIcon icon={faCloudSun} className="icon" />
                     <span>Weather</span>
                  </li>
                  <li>
                     <FontAwesomeIcon icon={faGamepad} className="icon" />
                     <span>MiniGame</span>
                  </li>
                  <li>
                     <FontAwesomeIcon icon={faMoon} className="icon" />
                     <span>Mode</span>
                  </li>
               </ul>
            </nav>
            <div className="dash_i">
               <div className="dash_lf">
                  <form>
                     <input
                        type="text"
                        value={inputWeather}
                        onChange={(e) => setInputWeather(e.target.value)}
                        placeholder="원하는 지역을 검색해보세요"
                     />
                  </form>
                  <WeatherBox cities={cities} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default App;
