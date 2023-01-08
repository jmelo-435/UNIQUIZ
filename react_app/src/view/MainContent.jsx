import React from "react";
import '../css/MainContent.css'
import { useState, useEffect } from "react";

const MainContent = () => {
  return (
    <div className="mainContent">
      <div className="mainAppBody">
        <div>
          <h4>Nome do Jogador</h4>
          <input></input>
        </div>
        <div>
          <h4>Número de Questões</h4>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <button onClick={() => { console.log("iniciar") }}>INICIAR</button>
      </div>
    </div>
  );
}

export default MainContent;