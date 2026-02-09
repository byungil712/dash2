import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./slice";

const store = configureStore({
   reducer: { weather: weatherSlice },
});

export default store;
