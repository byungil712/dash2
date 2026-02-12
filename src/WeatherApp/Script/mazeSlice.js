// src/Script/mazeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { icon } from "leaflet";

// 미로 맵 (0: 길, 1: 벽, 2: 시작, 3: 도착)
const levels = {
   1: [
      [2, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 1, 1],
      [1, 0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 0],
      [1, 0, 1, 1, 0, 1],
      [1, 0, 0, 1, 0, 3],
   ],
   2: [
      [2, 0, 0, 0, 0, 1, 1, 0, 3],
      [0, 1, 1, 1, 0, 1, 0, 0, 1],
      [0, 0, 0, 1, 1, 1, 0, 1, 1],
      [0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 1, 1, 1, 0, 1, 1, 0, 1],
      [0, 0, 0, 1, 0, 0, 0, 0, 1],
   ],
   3: [
      [2, 0, 0, 0, 0, 0, 1, 3, 0, 1, 0],
      [0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
      [0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
   ],
};

// 시작 위치 찾기
const findStart = (maze) => {
   for (let row = 0; row < maze.length; row++) {
      for (let col = 0; col < maze[row].length; col++) {
         if (maze[row][col] === 2) {
            return { row, col };
         }
      }
   }
   return { row: 0, col: 0 };
};

const initialState = {
   currentLevel: 1,
   maze: levels[1],
   player: findStart(levels[1]),
   img: "./img/qqq.webp",
   steps: 0,
   isCompleted: false,
   time: 0,
   isPlaying: false,
   bestScores: {}, // { level: { steps, time } }
};

const mazeSlice = createSlice({
   name: "maze",
   initialState,
   reducers: {
      // 플레이어 이동
      movePlayer: (state, action) => {
         if (state.isCompleted) return;

         const { direction } = action.payload;
         let { row, col } = state.player;

         // 방향에 따른 새 위치 계산
         switch (direction) {
            case "UP":
               row -= 1;
               break;
            case "DOWN":
               row += 1;
               break;
            case "LEFT":
               col -= 1;
               break;
            case "RIGHT":
               col += 1;
               break;
            default:
               return;
         }

         // 맵 범위 체크
         if (
            row < 0 ||
            row >= state.maze.length ||
            col < 0 ||
            col >= state.maze[0].length
         ) {
            return;
         }

         // 벽 체크
         if (state.maze[row][col] === 1) {
            return;
         }

         // 이동
         state.player = { row, col };
         state.steps += 1;
         state.isPlaying = true;

         // 도착 지점 체크
         if (state.maze[row][col] === 3) {
            state.isCompleted = true;

            // 최고 기록 업데이트
            const currentBest = state.bestScores[state.currentLevel];
            if (
               !currentBest ||
               state.steps < currentBest.steps ||
               (state.steps === currentBest.steps &&
                  state.time < currentBest.time)
            ) {
               state.bestScores[state.currentLevel] = {
                  steps: state.steps,
                  time: state.time,
               };
            }
         }
      },

      // 레벨 변경
      changeLevel: (state, action) => {
         const level = action.payload;
         if (levels[level]) {
            state.currentLevel = level;
            state.maze = levels[level];
            state.player = findStart(levels[level]);
            state.isCompleted = false;
            state.isPlaying = false;
         }
      },

      // 게임 리셋
      resetGame: (state) => {
         state.player = findStart(state.maze);
         state.isCompleted = false;
         state.isPlaying = false;
      },
   },
});

export const { movePlayer, firstLevel, changeLevel, resetGame } =
   mazeSlice.actions;
export default mazeSlice.reducer;
