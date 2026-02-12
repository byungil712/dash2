import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import "./game.css";
import "./mode.css";
import { setTheme, toggleTheme } from "./Script/modeSlice";

const App = () => {
   const dispatch = useDispatch();

   const { mode } = useSelector((state) => state.mode);

   useEffect(() => {
      document.body.classList.toggle("dark_mode", mode === "dark");
   }, [mode]);

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
                  <li onClick={() => dispatch(toggleTheme())}>
                     <FontAwesomeIcon icon={faMoon} className="icon" />
                     <span>{mode === "dark" ? "Dark" : "Light"}Mode</span>
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
