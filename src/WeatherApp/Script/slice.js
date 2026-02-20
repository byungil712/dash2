import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState = {
   weather: null,
   forecast: null,
   loading: false,
   error: null,
};

export const getWeatherEmoji = (iconCode) => {
   const emojiMap = {
      "01d": "☀️",      // 맑음 (낮)
      "01n": "🌙",      // 맑음 (밤)
      "02d": "⛅",      // 약간 구름 (낮)
      "02n": "☁️",      // 약간 구름 (밤)
      "03d": "☁️",      // 구름 많음
      "03n": "☁️",
      "04d": "☁️",      // 흐림
      "04n": "☁️",
      "09d": "🌧️",     // 소나기
      "09n": "🌧️",
      "10d": "🌦️",     // 비
      "10n": "🌧️",
      "11d": "⛈️",     // 천둥번개
      "11n": "⛈️",
      "13d": "❄️",      // 눈
      "13n": "❄️",
      "50d": "🌫️",     // 안개
      "50n": "🌫️",
   };
   return emojiMap[iconCode] || "🌤️";
};

export const weatherList = createAsyncThunk(
   "weather/fetchAll",
   async ({ lat, lon }) => {
      try {
         const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3e49bc4bf796f7c6fe699cfdc673306a&units=metric&lang=kr`,
         );
         return response.data;
      } catch (error) {
         console.error("api에러");
      }
   },
);

export const forecastList = createAsyncThunk(
   "weather/fetchForecast",
   async ({ lat, lon }) => {
      try {
         const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3e49bc4bf796f7c6fe699cfdc673306a&units=metric&lang=kr`,
         );
         return response.data;
      } catch (error) {
         console.error("시간대별 날씨 에러");
      }
   },
);

export const getWeatherByCity = createAsyncThunk(
   "weather/fetchByCity",
   async (city) => {
      const weatherResponse = await axios.get(
         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e49bc4bf796f7c6fe699cfdc673306a&units=metric&lang=kr`,
      );
      const forecastResponse = await axios.get(
         `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3e49bc4bf796f7c6fe699cfdc673306a&units=metric&lang=kr`,
      );
      return {
         weather: weatherResponse.data,
         forecast: forecastResponse.data,
      };
   },
);

const weatherSlice = createSlice({
   name: "weather",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(weatherList.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(weatherList.fulfilled, (state, action) => {
            state.loading = false;
            state.weather = action.payload;
         })
         .addCase(weatherList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })

         ///////

         .addCase(forecastList.pending, (state) => {
            state.loading = true;
         })
         .addCase(forecastList.fulfilled, (state, action) => {
            state.loading = false;
            state.forecast = action.payload;
         })
         .addCase(forecastList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })

         /////

         .addCase(getWeatherByCity.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getWeatherByCity.fulfilled, (state, action) => {
            state.loading = false;
            state.weather = action.payload.weather;
            state.forecast = action.payload.forecast;
         })
         .addCase(getWeatherByCity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         });
   },
});

export default weatherSlice.reducer;
