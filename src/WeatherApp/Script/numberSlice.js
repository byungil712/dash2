import { createSlice } from "@reduxjs/toolkit";

let initialState = {
   answer: Math.floor(Math.random() * 10),
   guess: "",
   guessMessage: "",
   message: "",
   count: 0,
};

const numberSlice = createSlice({
   name: "number",
   initialState,
   reducers: {
      // 숫자 확인
      numberCheck: (state, action) => {
         const userGuess = parseInt(action.payload);  // ✅ action.payload 사용
         
         // 유효 숫자 확인
         if (!action.payload || action.payload.trim() === "") {
            state.message = "숫자를 입력해주세요";
            return;
         }

         // 범위 확인
         if (userGuess < 0 || userGuess > 10) {
            state.message = "0~10의 숫자를 입력해주세요";
            return;
         }

         state.guess = action.payload;
         state.count += 1;

         // 정답 확인
         if (userGuess === state.answer) {
            state.message = `정답입니다! ${state.count}번 만에 성공!`;  // ✅ state.count
            state.guessMessage = `${state.answer}`;
         } else if (userGuess > state.answer) {
            state.message = `더 작은 숫자입니다`;
         } else {
            state.message = `더 큰 숫자입니다`;
         }
      },

      resetGame: (state) => {
         state.answer = Math.floor(Math.random() * 10) + 1;
         state.guess = "";
         state.guessMessage = "";
         state.message = "";
         state.count = 0;
      },
   },
});

export const { numberCheck, resetGame } = numberSlice.actions;

export default numberSlice.reducer;