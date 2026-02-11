import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./slice";
import gameSlice from "./gameSlice";
import mazeReducer from "./mazeSlice";

const store = configureStore({
   reducer: { 
      weather: weatherSlice,
      game : gameSlice,
      maze: mazeReducer,
   },
});

export default store;
