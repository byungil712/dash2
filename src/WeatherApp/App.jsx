import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCloudSun,
   faGamepad,
   faMoon,
} from "@fortawesome/free-solid-svg-icons";
import DashWeather from "./Component/DashWeather";
import DashMiniGame from "./Component/DashMiniGame";
import "./app.css";
import "./app2.css";

const App = () => {
   return (
      <div className="container">
         <div className="dash">
            <nav className="menu">
               <ul>
                  <li>
                     <Link to="/">
                        <FontAwesomeIcon icon={faCloudSun} className="icon" />
                        <span>Weather</span>
                     </Link>
                  </li>
                  <li>
                     <Link to="./DashMiniGame" className="link">
                        <FontAwesomeIcon icon={faGamepad} className="icon" />
                        <span>MiniGame</span>
                     </Link>
                  </li>
                  <li>
                     <a>
                        <FontAwesomeIcon icon={faMoon} className="icon" />
                        <span>Mode</span>
                     </a>
                  </li>
               </ul>
            </nav>
            <Routes>
               <Route path="/" element={<DashWeather />} />
               <Route path="/DashMiniGame" element={<DashMiniGame />} />
            </Routes>
         </div>
      </div>
   );
};

export default App;
