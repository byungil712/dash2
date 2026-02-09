import React from "react";
import "./App.css";

const App = () => {
   return (
      <div className="container">
         <div className="dash">
            <nav className="menu">
              <FontAwesomeIcon icon={faCloudSun} />
            </nav>
            <div className="dash_i"></div>
         </div>
      </div>
   );
};

export default App;
