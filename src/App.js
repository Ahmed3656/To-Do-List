import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css';
import './all.css';

import List from "./List";
import Completed from "./Completed";

function App() {
  const [x, setX] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? [].concat(...JSON.parse(storedTasks)) : [];
  });

  const [y, setY] = useState(() => {
    const storedCompleted = localStorage.getItem("completed")
    return storedCompleted? [].concat(...JSON.parse(storedCompleted)) : []
  }) 

  function done(idx) {
    let removedTask = x[idx]
    let allTasks = x.filter((item, index) => index !== idx);

    setX(allTasks);
    
    const completed = JSON.parse(localStorage.getItem("completed")) || []
    completed.push(removedTask)
    setY(completed)
  }

  function removeTask(idx) {
    let leftTasks = x.filter((item, index) => index !== idx)

    setX(leftTasks)
  }

  function bringBack(idx) {
    const broughtBack = y[idx];
    const leftItems = y.filter((item, index)=> index!==idx);
    
    setY(leftItems);

    const allTasks = [].concat(JSON.parse(localStorage.getItem("tasks")))
    allTasks.push(broughtBack)
    setX(allTasks)
}

function removeCompleted(idx) {
    let leftTasks = y.filter((item, index) => index !== idx)

    setY(leftTasks)
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(x));
  }, [x]);

  useEffect(()=>{
    localStorage.setItem("completed", JSON.stringify(y))
  }, [y])

  return(
    <BrowserRouter>
    <div className="main-container">
      <List x={x} setX={setX} remove={removeTask} done={done} />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/Completed" element={<Completed y={y} remove={removeCompleted} bringBack={bringBack} />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;
