import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playGame } from "../Script/gameSlice";
import Box from "./Box";
import Maze from "./Maze";
import TicTacToe from "./TicTacToe";
import Number from "./Number";

const DashMiniGame = () => {
   const dispatch = useDispatch();

   const { user, com, result } = useSelector((state) => state.game);

   const play = (choice) => {
      dispatch(playGame(choice));
   };

   const scrollRef = useRef(null);
   const [totalDragging, setTotalDragging] = useState(false);
   const [startY, setStartY] = useState(0);
   const [scrollTop, setScrollTop] = useState(0);

   /* 세로 스크롤 */
   const handleMouseDown = (e) => {
      setTotalDragging(true);
      setStartY(e.pageY - scrollRef.current.offsetTop);
      setScrollTop(scrollRef.current.scrollTop);
   };

   const handleMouseMove = (e) => {
      if (!totalDragging) return;
      e.preventDefault();
      const y = e.pageY - scrollRef.current.offsetTop;
      const walk = (y - startY) * 1; // 스크롤 속도
      scrollRef.current.scrollTop = scrollTop - walk;
   };

   const handleMouseUp = () => {
      setTotalDragging(false);
   };

   /* 모바일 세로 스크롤 */
   const handleTouchStart = (e) => {
      setTotalDragging(true);
      setStartY(e.touches[0].clientY - scrollRef.current.offsetLeft);
      setScrollTop(scrollRef.current.scrollTop);
   };

   const handleTouchMove = (e) => {
      if (!totalDragging) return;
      const y = e.touches[0].clientY - scrollRef.current.offsetLeft;
      const walk = (y - startY) * 1;
      scrollRef.current.scrollTop = scrollTop - walk;
   };

   const handleTouchEnd = () => {
      setTotalDragging(false);
   };

   return (
      <div
         className="dash_i"
         ref={scrollRef}
         onMouseDown={handleMouseDown}
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseUp}
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}
         style={{ cursor: totalDragging ? "grabbing" : "grab" }}
      >
         <div className="dash_lf">
            <div className="rock_game card">
               <div className="title">
                  <h3>가위바위보 ✌️</h3>
               </div>
               <div className="main_game">
                  <div className="user">
                     <Box name="user" item={user} result={result} />
                  </div>
                  <div className="vs">
                     <h4>VS</h4>
                  </div>
                  <div className="com">
                     <Box name="com" item={com} result={result} />
                  </div>
               </div>
               <div className="rock_btn">
                  <button type="button" onClick={() => play("scissors")}>
                     가위
                  </button>
                  <button type="button" onClick={() => play("rock")}>
                     바위
                  </button>
                  <button type="button" onClick={() => play("paper")}>
                     보
                  </button>
               </div>
            </div>
            <Maze />
         </div>
         <div className="dash_rt">
            <TicTacToe />
            <Number />
         </div>
      </div>
   );
};

export default DashMiniGame;
