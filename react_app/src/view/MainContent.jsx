import React from "react";
import '../css/MainContent.css'
import { dbTestApi, dbTestCreateApi } from "../repo/repo"
import { useState, useEffect } from "react";

const MainContent = () => {
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    async function fetch() {
      const response = await dbTestApi()
      setMsg(response.message)
    }
    fetch();
  }, []);

  async function loadMessage() {
    const response = await dbTestApi()
    setMsg(response.message)
  }

  return (
    
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
  );
}

export default MainContent;