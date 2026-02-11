import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./slice";
import gameSlice from "./gameSlice";
import mazeSlice from "./mazeSlice";

const store = configureStore({
   reducer: { 
      weather: weatherSlice,
      game : gameSlice,
      maze : mazeSlice,
   }, 
});

export default store;
