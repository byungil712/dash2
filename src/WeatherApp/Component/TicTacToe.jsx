import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeMove, computerMove, resetGame } from "../Script/ticTacToeSlice";

const TicTacToe = () => {
   const dispatch = useDispatch();
   const { board, currentPlayer, winner, isGameOver, gameMode } = useSelector(
      (state) => state.ticTacToe,
   );

   // 컴퓨터 턴 자동 실행
   useEffect(() => {
      if (gameMode === "computer" && currentPlayer === "O" && !isGameOver) {
         const timer = setTimeout(() => {
            dispatch(computerMove());
         }, 500); // 0.5초 대기 후 컴퓨터 턴
         return () => clearTimeout(timer);
      }
   }, [currentPlayer, isGameOver, gameMode, dispatch]);

   // 셀 클릭 핸들러
   const handleCellClick = (index) => {
      if (gameMode === "computer" && currentPlayer === "O") {
         return; // 컴퓨터 턴에는 클릭 무시
      }
      dispatch(makeMove(index));
   };

   return (
      <div className="tictactoe_game">
         <div className="title">
            <h1>틱택토 ❌⭕</h1>
         </div>
         <div className="tictactoe_flex">
            <div className="tictactoe_btn">
               {/* 턴 표시 */}
               {!isGameOver && (
                  <div className="turn">
                     <p>
                        현재 턴:{" "}
                        <span
                           className={`current_player ${currentPlayer.toLowerCase()}`}
                        >
                           {currentPlayer === "X" ? "❌" : "⭕"}
                        </span>
                     </p>
                  </div>
               )}

               {/* 게임 결과 */}
               {isGameOver && (
                  <div className="game_result">
                     {winner ? (
                        <h2
                           className={`winner_message ${winner.toLowerCase()}`}
                        >
                           {winner === "X" ? "❌" : "⭕"} 승리
                        </h2>
                     ) : (
                        <h2 className="draw_message">무승부</h2>
                     )}
                  </div>
               )}

               {/* 다시하기 버튼 */}
               <div className="controls">
                  <button
                     onClick={() => dispatch(resetGame())}
                     className="reset-btn"
                  >
                     다시하기
                  </button>
               </div>
            </div>

            {/* 게임보드 */}
            <div className="board">
               {board.map((cell, index) => (
                  <div
                     key={index}
                     className={`cell ${cell ? cell.toLowerCase() : ""} ${
                        isGameOver ? "game-over" : ""
                     }`}
                     onClick={() => handleCellClick(index)}
                  >
                     {cell === "X" ? "❌" : cell === "O" ? "⭕" : ""}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default TicTacToe;
