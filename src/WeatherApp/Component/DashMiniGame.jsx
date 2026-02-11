import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { playGame, resetGame } from "../Script/gameSlice";
import Box from "./Box";
import Maze from "./Maze";

const DashMiniGame = () => {
   const dispatch = useDispatch();

   const { user, com, result } = useSelector((state) => state.game);

   const play = (choice) => {
      dispatch(playGame(choice));
   };

   const handleReset = () => {
      dispatch(resetGame());
   };

   return (
      <div className="dash_i">
         <div className="dash_lf">
            <div className="rock_game">
               <div className="title">
                  <h3>가위바위보</h3>
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
                  <button type="button" onClick={() => play("scissors")}>가위</button>
                  <button type="button" onClick={() => play("rock")}>바위</button>
                  <button type="button" onClick={() => play("paper")}>보</button>
               </div>
            </div>
            <Maze />
         </div>
         <div className="dash_rt"></div>
      </div>
   );
};

export default DashMiniGame;
