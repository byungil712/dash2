import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   movePlayer,
   changeLevel,
   resetGame,
} from "../Script/mazeSlice";

const Maze = () => {
   const dispatch = useDispatch();
   const { maze, player, image, isCompleted, currentLevel } = useSelector(
      (state) => state.maze,
   );

   // 키보드 이벤트 처리
   const handleKeyPress = useCallback(
      (e) => {
         if (isCompleted) return;

         switch (e.key) {
            case "ArrowUp":
               e.preventDefault();
               dispatch(movePlayer({ direction: "UP" }));
               break;
            case "ArrowDown":
               e.preventDefault();
               dispatch(movePlayer({ direction: "DOWN" }));
               break;
            case "ArrowLeft":
               e.preventDefault();
               dispatch(movePlayer({ direction: "LEFT" }));
               break;
            case "ArrowRight":
               e.preventDefault();
               dispatch(movePlayer({ direction: "RIGHT" }));
               break;
            default:
               break;
         }
      },
      [dispatch, isCompleted],
   );

   // 키보드 이벤트 리스너 등록
   useEffect(() => {
      window.addEventListener("keydown", handleKeyPress);
      return () => {
         window.removeEventListener("keydown", handleKeyPress);
      };
   }, [handleKeyPress]);

   // 모바일 버튼 핸들러
   const handleMobileMove = (direction) => {
      dispatch(movePlayer({ direction }));
   };

   return (
      <div className="maze_game card">
         {/* 헤더 */}
         <div className="title">
            <h3>미로 게임 🏁</h3>
            <span>방향키로 움직여보세요!</span>
         </div>

         {/* 미로 */}
         <div className="maze_board">
            {maze.map((row, rowIndex) => (
               <div key={rowIndex} className="maze_row">
                  {row.map((cell, colIndex) => {
                     const isPlayer =
                        player.row === rowIndex && player.col === colIndex;

                     let cellClass = "maze_cell";
                     if (cell === 1) cellClass += " wall";
                     if (cell === 2) cellClass += " start";
                     if (cell === 3) cellClass += " goal";
                     if (isPlayer) cellClass += " player";

                     return (
                        <div key={colIndex} className={cellClass}>
                           <img src={isPlayer && image} />
                           {cell === 3 && !isPlayer && "🏁"}
                        </div>
                     );
                  })}
               </div>
            ))}
         </div>

         {/* 완료 메시지 */}
         {isCompleted && (
            <div className="complete_modal">
               <div className="clear_popup">
                  <h2>🎉 축하합니다!</h2>
                  <p>미로 레벨 {currentLevel} 클리어!</p>
                  <div className="popup_buttons">
                     <button onClick={() => dispatch(resetGame())}>
                        다시하기
                     </button>
                     {currentLevel < 3 && (
                        <button
                           onClick={() =>
                              dispatch(changeLevel(currentLevel + 1))
                           }
                        >
                           다음 레벨
                        </button>
                     )}
                     <button onClick={() => dispatch(changeLevel(1))}>
                        처음으로
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* 모바일 컨트롤 */}
         <div className="mobile_controls">
            <div className="control_row">
               <button onClick={() => handleMobileMove("UP")}>⬆️</button>
               <button onClick={() => handleMobileMove("LEFT")}>⬅️</button>
               <button onClick={() => handleMobileMove("DOWN")}>⬇️</button>
               <button onClick={() => handleMobileMove("RIGHT")}>➡️</button>
            </div>
         </div>
      </div>
   );
};

export default Maze;
