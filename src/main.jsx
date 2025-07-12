import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducer/index.js";
import { configureStore } from "@reduxjs/toolkit";
import { ToastContainer } from 'react-toastify';

const store = configureStore({
  reducer:rootReducer
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <ToastContainer/>
      </Router>
    </Provider>
  </StrictMode>
);
