import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forecastList, weatherList } from "../Script/slice";
import Map from "./Map";

const WeatherBox2 = ({ handleMapLocationChange, currentLat, currentLon }) => {
   const dispatch = useDispatch();

   const { weather, forecast, loading, error } = useSelector(
      (state) => state.weather,
   );

   const scrollRef = useRef(null);
   const [isDragging, setIsDragging] = useState(false);
   const [startY, setStartY] = useState(0);
   const [scrollTop, setScrollTop] = useState(0);

   const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            dispatch(weatherList({ lat, lon }));
            dispatch(forecastList({ lat, lon }));
         },
         (error) => {
            console.error("위치 정보 오류:", error);
         },
      );
   };

   useEffect(() => {
      getCurrentLocation();
   }, []);

   const getDailyForecast = () => {
      if (!forecast?.list) return [];

      const dailyData = {};

      forecast.list.forEach((item) => {
         const dateObj = new Date(item.dt * 1000);
         const weekday = dateObj.toLocaleDateString("ko-KR", {
            weekday: "short",
         });

         const date = `${dateObj.getMonth() + 1}/${dateObj.getDate()} (${weekday})`;

         if (!dailyData[date]) {
            dailyData[date] = {
               date: date,
               temps: [],
               weather: item.weather[0],
               humidity: item.main.humidity,
            };
         }
         dailyData[date].temps.push(item.main.temp);
      });

      return Object.values(dailyData)
         .map((day) => ({
            ...day,
            tempMax: Math.max(...day.temps),
            tempMin: Math.min(...day.temps),
         }))
         .slice(1, 6);
   };

   const dailyForecast = getDailyForecast();

   /* 세로 스크롤 */
   const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartY(e.pageY - scrollRef.current.offsetTop);
      setScrollTop(scrollRef.current.scrollTop);
   };

   const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const y = e.pageY - scrollRef.current.offsetTop;
      const walk = (y - startY) * 1; // 스크롤 속도
      scrollRef.current.scrollTop = scrollTop - walk;
   };

   const handleMouseUp = () => {
      setIsDragging(false);
   };

   return (
      <>
         {/* 주간 날씨 */}
         <div className="weekly_weather card">
            <div className="title">
               <h3>5일간의 날씨 정보</h3>
            </div>
            <div
               className="weekly_info"
               ref={scrollRef}
               onMouseDown={handleMouseDown}
               onMouseMove={handleMouseMove}
               onMouseUp={handleMouseUp}
               onMouseLeave={handleMouseUp}
               style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
               {dailyForecast.map((day, index) => (
                  <div key={index} className="info">
                     <div className="day">
                        <h4>{day.date}</h4>
                     </div>
                     <div className="img">
                        <img
                           src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                           alt="/"
                        />
                     </div>
                     <p>{day.weather.main}</p>
                     <span>
                        {day.tempMax} / {day.tempMin}
                     </span>
                  </div>
               ))}
            </div>
         </div>
         <Map
            handleMapLocationChange={handleMapLocationChange}
            currentLat={currentLat}
            currentLon={currentLon}
         />
      </>
   );
};

export default WeatherBox2;
