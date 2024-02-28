import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Completed() {
    const [y, setY] = useState(() => {
        const storedCompleted = localStorage.getItem("completed")
        return storedCompleted? [].concat(...JSON.parse(storedCompleted)) : []
    }) 

    const navigate = useNavigate()

    const clear = () => {
        localStorage.removeItem("completed")
        navigate("/")
        window.location.reload()
    }

    function bringBack(idx) {
        const broughtBack = y[idx];
        const leftItems = y.filter((item, index)=> index!==idx);
        
        setY(leftItems);

        const allTasks = [].concat(JSON.parse(localStorage.getItem("tasks")))
        allTasks.push(broughtBack)
        localStorage.setItem("tasks", JSON.stringify(allTasks))
        window.location.reload()
    }

    function remove(idx) {
        let leftTasks = y.filter((item, index) => index !== idx)

        setY(leftTasks)
      }

    useEffect(()=>{
        localStorage.setItem("completed", JSON.stringify(y))
    }, [y])


    return(
        <div>
            <span className="line"></span>
            <table className="table-body table table-dark table-striped table-hover">
            <thead>
              <tr>
                <th scope="col" className="checkbox"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
              y.map((item, idx) => (
                <tr key={idx}>
                <th scope="row"><input type="checkbox" onClick={()=> bringBack(idx)} checked/></th>
                <td>{item.valu}<i className="fas fa-times float-end" onClick={()=> remove(idx)}></i></td>
                </tr>
              ))
              }
            </tbody>
          </table>
          <button className="clear-btn mb-3" onClick={clear}>Clear Completed Tasks</button>
        </div>
    )
}

export default Completed