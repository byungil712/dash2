import React, { useState } from "react";
import { numberCheck, resetGame } from "../Script/numberSlice";
import { useDispatch, useSelector } from "react-redux";

const Number = () => {
   const dispatch = useDispatch();
   const { answer, guess, guessMessage, message, count } = useSelector(
      (state) => state.number,
   );

   const [input, setInput] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!input || input.trim() === "") {
         return;
      }

      dispatch(numberCheck(input));
      setInput("");
   };

   const handleReset = () => {
      dispatch(resetGame());
      setInput("");
   };

   const handleInputChange = (e) => {
      const value = e.target.value;
      // 숫자만 입력 가능하도록
      if (value === "" || /^[0-9]+$/.test(value)) {
         setInput(value);
      }
   };

   return (
      <div className="number_game card">
         <div className="title">
            <h3>숫자 맞추기 게임</h3>
            <span>0 - 10까지의 숫자 중 랜덤으로 지정됩니다!</span>
         </div>
         <div className="clear_game">
            <h3>정답: {guessMessage}</h3>
            <h4>{message || "숫자를 입력해보세요"}</h4>
            <p>시도횟수: {count}</p>
            <button onClick={handleReset} className="reset_btn">
               다시하기
            </button>
         </div>
         <form onSubmit={handleSubmit} className="input_form">
            <input
               type="text"
               value={input}
               onChange={handleInputChange}
               placeholder="숫자 입력 (0-10)"
               min="1"
               max="10"
               className="number-input"
               autoFocus
            />
         </form>
      </div>
   );
};

export default Number;
