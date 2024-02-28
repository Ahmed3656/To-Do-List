import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css';
import './all.css';

import List from "./List";
import Completed from "./Completed";

function App() {
  return(
    <BrowserRouter>
    <div className="main-container">
      <List />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/Completed" element={<Completed />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;
