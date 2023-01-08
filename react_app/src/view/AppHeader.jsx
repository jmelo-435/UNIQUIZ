import React from "react";
import '../css/AppHeader.css'
import { useState, useEffect } from "react";

const AppHeader = () => {
  return (
    <div className="appHeader">
      <h1>UNIQUIZ</h1>
      <button>VER RANKING</button>
    </div>
  );
}

export default AppHeader;
