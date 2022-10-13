import React from "react";
import ReactDOM from "react-dom/client";

import Joinpage from "./joinpage";
import "./index.css";
import Chat from "./chat";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Joinpage />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
