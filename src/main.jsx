import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./WeatherApp/App";
import store from "./WeatherApp/Script/store";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <Provider store={store}>
         <HashRouter>
            <App />
         </HashRouter>
      </Provider>
   </StrictMode>,
);
