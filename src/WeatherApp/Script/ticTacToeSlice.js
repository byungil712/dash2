import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   board: Array(9).fill(null), // [null, null, null, null, null, null, null, null, null]
   currentPlayer: "X", // X 또는 O
   winner: null,
   isDraw: false,
   isGameOver: false,
   gameMode: "computer", 
   difficulty: "hard",
};

// 승리 조합 (가로, 세로, 대각선)
const winningCombinations = [
   [0, 1, 2], // 첫 번째 가로
   [3, 4, 5], // 두 번째 가로
   [6, 7, 8], // 세 번째 가로
   [0, 3, 6], // 첫 번째 세로
   [1, 4, 7], // 두 번째 세로
   [2, 5, 8], // 세 번째 세로
   [0, 4, 8], // 대각선 \
   [2, 4, 6], // 대각선 /
];

// 승자 확인
const checkWinner = (board) => {
   for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
         return {
            winner: board[a],
            winningLine: combination,
         };
      }
   }
   return null;
};

// 무승부 확인
const checkDraw = (board) => {
   return board.every((cell) => cell !== null);
};

// 컴퓨터 AI (어려움 - Minimax 알고리즘 간단 버전)
const getComputerMoveHard = (board, player) => {
   // 1. 이길 수 있는 수가 있으면 그걸 둔다
   for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
         const testBoard = [...board];
         testBoard[i] = player;
         if (checkWinner(testBoard)?.winner === player) {
            return i;
         }
      }
   }

   // 2. 상대방이 이길 수 있는 수를 막는다
   const opponent = player === "X" ? "O" : "X";
   for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
         const testBoard = [...board];
         testBoard[i] = opponent;
         if (checkWinner(testBoard)?.winner === opponent) {
            return i;
         }
      }
   }

   // 3. 중앙이 비어있으면 중앙을 선택
   if (board[4] === null) {
      return 4;
   }

   // 4. 코너 중 하나를 선택
   const corners = [0, 2, 6, 8];
   const emptyCorners = corners.filter((i) => board[i] === null);
   if (emptyCorners.length > 0) {
      return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
   }

   // 5. 남은 칸 중 랜덤 선택
   return getComputerMoveHard(board);
};

const ticTacToeSlice = createSlice({
   name: "ticTacToe",
   initialState,
   reducers: {
      // 칸 클릭
      makeMove: (state, action) => {
         const index = action.payload;

         // 게임이 끝났거나 이미 채워진 칸이면 무시
         if (state.isGameOver || state.board[index] !== null) {
            return;
         }

         // 현재 플레이어의 마크 배치
         state.board[index] = state.currentPlayer;

         // 승자 확인
         const result = checkWinner(state.board);
         if (result) {
            state.winner = result.winner;
            state.isGameOver = true;
            return;
         }

         // 무승부 확인
         if (checkDraw(state.board)) {
            state.isDraw = true;
            state.isGameOver = true;
            return;
         }

         // 다음 플레이어로 전환
         state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
      },

      // 컴퓨터 턴
      computerMove: (state) => {
         if (state.isGameOver || state.gameMode !== "computer") {
            return;
         }

         let moveIndex;
         moveIndex = getComputerMoveHard(state.board, state.currentPlayer);
         

         if (moveIndex === null) return;

         // 컴퓨터의 마크 배치
         state.board[moveIndex] = state.currentPlayer;

         // 승자 확인
         const result = checkWinner(state.board);
         if (result) {
            state.winner = result.winner;
            state.isGameOver = true;
            return;
         }

         // 무승부 확인
         if (checkDraw(state.board)) {
            state.isDraw = true;
            state.isGameOver = true;
            state.scores.draw += 1;
            return;
         }

         // 다음 플레이어로 전환
         state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
      },

      // 게임 리셋
      resetGame: (state) => {
         state.board = Array(9).fill(null);
         state.currentPlayer = "X";
         state.winner = null;
         state.isDraw = false;
         state.isGameOver = false;
      },
   },
});

export const {
   makeMove,
   computerMove,
   resetGame,
} = ticTacToeSlice.actions;

export default ticTacToeSlice.reducer;