import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { forecastList, getWeatherByCity, weatherList } from "../Script/slice";
import WeatherBox from "./WeatherBox";
import WeatherBox2 from "./WeatherBox2";

const DashWeather = () => {
   const dispatch = useDispatch();

   const [inputWeather, setInputWeather] = useState("");
   const [citys, setCitys] = useState("");
   const [currentLat, setCurrentLat] = useState(null);
   const [currentLon, setCurrentLon] = useState(null);

   const scrollRef = useRef(null);
   const [totalDragging, setTotalDragging] = useState(false);
   const [startY, setStartY] = useState(0);
   const [scrollTop, setScrollTop] = useState(0);

   const cities = ["Seoul", "Fukuoka", "Gumi"];

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
      if (citys === "") {
         getCurrentLocation();
      } else {
         dispatch(getWeatherByCity(citys));
      }
   }, [citys, dispatch]);

   const inputCity = (e) => {
      e.preventDefault();
      if (inputWeather.trim() !== "") {
         setCitys(inputWeather);
         setInputWeather("");
      }
   };

   const handleCityChange = (selectedCity) => {
      if (selectedCity === "current") {
         setCitys(""); // 현재 위치로 변경
      } else {
         setCitys(selectedCity); // 선택된 도시로 변경
      }
   };

   const handleMapLocationChange = (lat, lon) => {
      setCurrentLat(lat);
      setCurrentLon(lon);
      setCitys(""); // 도시 선택 초기화
      dispatch(weatherList({ lat, lon }));
      dispatch(forecastList({ lat, lon }));
   };

   /* 세로 스크롤 */
   const handleMouseDown = (e) => {
      setTotalDragging(true);
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
      setTotalDragging(false);
   };

   /* 모바일 세로 스크롤 */
   const handleTouchStart = (e) => {
      setTotalDragging(true);
      setStartY(e.touches[0].clientY - scrollRef.current.offsetLeft);
      setScrollTop(scrollRef.current.scrollTop);
   };

   const handleTouchMove = (e) => {
      if (!totalDragging) return;
      const y = e.touches[0].clientY - scrollRef.current.offsetLeft;
      const walk = (y - startY) * 1;
      scrollRef.current.scrollTop = scrollTop - walk;
   };

   const handleTouchEnd = () => {
      setTotalDragging(false);
   };

   return (
      <div
         className="dash_i"
         ref={scrollRef}
         onMouseDown={handleMouseDown}
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseUp}
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}
         style={{ cursor: totalDragging ? "grabbing" : "grab" }}
      >
         <div className="dash_lf">
            <form onSubmit={inputCity}>
               <input
                  type="text"
                  value={inputWeather}
                  onChange={(e) => setInputWeather(e.target.value)}
                  placeholder="원하는 지역을 검색해보세요"
               />
            </form>
            <WeatherBox
               cities={cities}
               getCurrentLocation={getCurrentLocation}
               handleCityChange={handleCityChange}
            />
         </div>
         <div className="dash_rt">
            <WeatherBox2
               handleMapLocationChange={handleMapLocationChange}
               currentLat={currentLat}
               currentLon={currentLon}
            />
         </div>
      </div>
   );
};

export default DashWeather;
