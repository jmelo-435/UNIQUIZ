import React from "react";
import AppHeader from "./view/AppHeader.jsx";
import MainContent from "./view/MainContent";
import "./css/App.css"

const App = () => {
  return (
    <div className="app">
      <AppHeader/>
      <MainContent />
    </div>
  );
}

export default App;