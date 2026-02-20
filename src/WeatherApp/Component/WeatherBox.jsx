import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherEmoji, weatherList } from "../Script/slice";

const WeatherBox = ({ cities, getCurrentLocation, handleCityChange}) => {
   const dispatch = useDispatch();
   const { weather, forecast, loading, error } = useSelector(
      (state) => state.weather,
   );

   const scrollRef = useRef(null);
   const [isDragging, setIsDragging] = useState(false);
   const [startX, setStartX] = useState(0);
   const [scrollLeft, setScrollLeft] = useState(0);

   useEffect(() => getCurrentLocation(), []);

   useEffect(() => {
      dispatch(weatherList());
   }, [dispatch]);

   /* 가로 스크롤 */
   const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
   };

   const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 1; // 스크롤 속도
      scrollRef.current.scrollLeft = scrollLeft - walk;
   };

   const handleMouseUp = () => {
      setIsDragging(false);
   };

   return (
      <>
         {/* 도시 선택 */}
         <div className="city_selector card">
            <button type="button" onClick={() => handleCityChange("current")}>
               <span>현재위치</span>
            </button>
            {cities.map((city, idx) => (
               <button
                  type="button"
                  key={idx}
                  onClick={() => handleCityChange(city)}
               >
                  <span>{city}</span>
               </button>
            ))}
         </div>

         {/* 시간대별 날씨 */}
         <div className="time_weather card">
            <h2>시간대별 날씨 정보</h2>
            <div
               className="times"
               ref={scrollRef}
               onMouseDown={handleMouseDown}
               onMouseMove={handleMouseMove}
               onMouseUp={handleMouseUp}
               onMouseLeave={handleMouseUp}
               style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
               {forecast?.list?.slice(0, 8).map((item, idx) => (
                  <div key={idx} className="time">
                     <p>
                        {new Date(item.dt * 1000).toLocaleString("ko-KR", {
                           month: "numeric",
                           day: "numeric",
                           hour: "2-digit",
                           minute: "2-digit",
                           hour12: false,
                        })}
                     </p>
                     <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt="/"
                     />
                     <p>{item.main.temp}°C</p>
                  </div>
               ))}
            </div>
         </div>

         {/* 날씨 정보 */}
         <div className="weather_info card">
            <div className="info_lf">
               <div className="title">
                  <h3>{weather?.name}</h3>
               </div>
               <div className="info">
                  <p>{weather?.main.temp}°C</p>
                  <p>체감온도: {weather?.main.feels_like}°C</p>
                  <p>최고: {weather?.main.temp_max}°C</p>
                  <p>최저: {weather?.main.temp_min}°C</p>
               </div>
            </div>
            <div className="info_rt">
                  <span style={{ fontSize: "100px" }}>
   {getWeatherEmoji(weather?.weather[0]?.icon)}
</span>
            </div>
         </div>
      </>
   );
};

export default WeatherBox;
