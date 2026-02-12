import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./slice";
import gameSlice from "./gameSlice";
import mazeSlice from "./mazeSlice";
import ticTacToeSlice from "./ticTacToeSlice"
import numberSlice from "./numberSlice"


const store = configureStore({
   reducer: { 
      weather: weatherSlice,
      game : gameSlice,
      maze : mazeSlice,
      ticTacToe : ticTacToeSlice,
      number : numberSlice
   }, 
});

export default store;
