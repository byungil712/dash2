import React from "react";
import { useSelector } from "react-redux";

const Box = ({ name, item, result }) => {
   // 컴퓨터 결과 표시
   let displayResult = result;
   if (name === "com") {
      if (result === "승") displayResult = "패";
      else if (result === "패") displayResult = "승";
   }

   return (
      <div
         className={`box ${displayResult}`}
         style={{ textTransform: "uppercase" }}
      >
         <h3>{name}</h3>
         <div className="img_box">
            <img
               className="item-img"
               src={item?.img || "./img/select.png"}
               alt={item?.name}
            />
         </div>
         <h2>{displayResult || "대기 중.."}</h2>
      </div>
   );
};

export default Box;
