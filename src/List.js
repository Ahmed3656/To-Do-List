import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function List({x, setX, remove, done}){
      const task = useRef();
    
      function listTasks (){
        return x.map((item, idx) => (
          <tr key={idx}>
            <th scope="row"><input type="checkbox" onClick={() => done(idx)} checked={false} /></th>
            <td>{item.valu}<i className="fas fa-times float-end" onClick={()=> remove(idx)}></i></td>
          </tr>
        ))
      }

      const addTask = () => {
        const value = task.current.value.trim();
        if (value) {
          const newTask = {
            valu: value
          };
          setX([...x, newTask]);
          task.current.value = "";
        } else {
          alert("Please enter a task before adding");
        }
      };

      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          addTask();
        }
      };

      const clear = () => {
        localStorage.removeItem("tasks");
        window.location.reload();
      };

      const navigate = useNavigate()

      return (
        <div className="list-container bg-dark">
          <h1 className="title ps-3 pt-1 text-center">To Do List</h1>
          <input ref={task} type="text" className="tasks-input ms-3 my-2 bg-dark text-light" placeholder="Enter task here" onKeyPress={handleKeyPress}/>
          <br />
          <div className="btns d-flex flex-row justify-content-between">
            <button className="tasks-btn ms-3 mt-2" onClick={addTask}>Add Task</button>
            <div>
                <button className="completed-btn me-3 mt-2" onClick={()=> localStorage.getItem("completed")? navigate("/Completed") : navigate("/")}>Show Completed Tasks</button>
                <button className="completed-btn me-3 mt-2" onClick={()=>navigate("/")}>Hide Completed Tasks</button>
            </div>
          </div>
    
          <table className="table-body table table-dark table-striped table-hover">
            <thead>
              <tr>
                <th scope="col" className="checkbox"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {listTasks()}
            </tbody>
          </table>
          <button className={x.length ? "clear-btn mb-3 d-block" : "d-none"} onClick={clear}>Clear Tasks</button>
        </div>
      );
}

export default List;