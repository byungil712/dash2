import { createSlice } from "@reduxjs/toolkit";

const game = {
   rock: {
      name: "바위",
      img: "./img/rock.png",
   },
   paper: {
      name: "보",
      img: "./img/paper.png",
   },
   scissors: {
      name: "가위",
      img: "./img/scissors.png",
   },
};

let initialState = {
   user: null,
   com: null,
   result: "",
};

const judgeWinner = (user, com) => {
   if (user.name === com.name) {
      return "무승부";
   } else if (user.name === "바위") {
      return com.name === "가위" ? "승" : "패";
   } else if (user.name === "가위") {
      return com.name === "보" ? "승" : "패";
   } else if (user.name === "보") {
      return com.name === "바위" ? "승" : "패";
   }
};

const getComputerChoice = () => {
   const gameArray = Object.keys(game);
   const randomItem = Math.floor(Math.random() * 3);
   const final = gameArray[randomItem];
   return game[final];
};

const gameSlice = createSlice({
   name: "game",
   initialState,
   reducers: {
      playGame: (state, action) => {
         const userChoice = game[action.payload];
         const comChoice = getComputerChoice();
         const result = judgeWinner(userChoice, comChoice);

         state.user = userChoice;
         state.com = comChoice;
         state.result = result;
      },

      resetGame: (state) => {
         state.user = null;
         state.com = null;
         state.result = "";
      },
   },
});

export const { playGame, resetGame } = gameSlice.actions;

export default gameSlice.reducer;
