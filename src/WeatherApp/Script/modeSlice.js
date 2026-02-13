// src/Script/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   mode: localStorage.getItem("mode") || "light", // "light" 또는 "dark"
};

const modeSlice = createSlice({
   name: "mode",
   initialState,
   reducers: {
      toggleTheme: (state) => {
         state.mode = state.mode === "light" ? "dark" : "light";
         // localStorage에 저장 (새로고침 후에도 유지)
         localStorage.setItem("mode", state.mode);
         // body에 클래스 추가/제거
         document.body.classList.toggle("dark_mode", state.mode === "dark");
      },
      setTheme: (state, action) => {
         state.mode = action.payload;
         localStorage.setItem("mode", action.payload);
         document.body.classList.toggle("dark_mode", action.payload === "dark");
      },
   },
});

export const { toggleTheme, setTheme } = modeSlice.actions;
export default modeSlice.reducer;