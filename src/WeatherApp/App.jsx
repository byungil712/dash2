import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun, faMoon, faDice } from "@fortawesome/free-solid-svg-icons";
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
         <div className="top_menu">
            <div className="mode_btn" onClick={() => dispatch(toggleTheme())}>
               <FontAwesomeIcon icon={faMoon} className="icon" />
               <div className="circle_btn">
                  <span className="circle"></span>
               </div>
            </div>
            <div className="menu_t">
               <ul>
                  <li>
                     <Link to="/">
                        <FontAwesomeIcon icon={faCloudSun} className="icon"/>
                     </Link>
                  </li>
                  <li>
                     <Link to="./DashMiniGame" className="link">
                        <FontAwesomeIcon icon={faDice} className="icon" />
                     </Link>
                  </li>
               </ul>
            </div>
         </div>
         <div className="dash">
            <nav className="menu">
               <ul>
                  <li>
                     <Link to="/">
                        <FontAwesomeIcon icon={faCloudSun} className="icon" />
                     </Link>
                  </li>
                  <li>
                     <Link to="./DashMiniGame" className="link">
                        <FontAwesomeIcon icon={faDice} className="icon" />
                     </Link>
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
