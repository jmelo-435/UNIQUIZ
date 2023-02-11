import { React, useState } from "react";
import mainContentStages from "./MainContentStages"
import '../css/MainContent.css'

const InitialForm = ({setCentralContent, setPlayerName,setNumOfQuestions}) => {

    return (
        <div className="mainContent">
            <div className="mainAppBody">
                <div>
                    <h4>Nome do Jogador</h4>
                    <input onChange={(e)=>{setPlayerName(e.target.value)}}></input>
                </div>
                <div>
                    <h4>Número de Questões</h4>
                    <select onChange={(e)=>{setNumOfQuestions(e.target.value)}}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <button onClick={()=>{setCentralContent(mainContentStages.quiz)}}>INICIAR</button>
            </div>
            </div>
    );
}

export default InitialForm;