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
      <h1>{msg}</h1>
      <button onClick={() => { dbTestCreateApi() }}>CREATE MESSAGE</button>
      <button onClick={() => { loadMessage() }}>LOAD MESSAGE</button>
    </div>
  );
}

export default MainContent;