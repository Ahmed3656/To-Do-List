import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Completed({y, remove, bringBack}) {
    const navigate = useNavigate()

    const clear = () => {
        localStorage.removeItem("completed")
        navigate("/")
    }

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