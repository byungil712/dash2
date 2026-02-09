import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState = {
   weather: null,
   forecast: null,
   loading: false,
   error: null,
};

export const weatherList = createAsyncThunk(
   "weather/fetchAll",
   async ({ lat, lon }) => {
      try {
         const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3e49bc4bf796f7c6fe699cfdc673306a&units=metric`,
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
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3e49bc4bf796f7c6fe699cfdc673306a&units=metric`,
         );
         return response.data;
      } catch (error) {
         console.error("시간대별 날씨 에러");
      }
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
         });
   },
});

export default weatherSlice.reducer;
