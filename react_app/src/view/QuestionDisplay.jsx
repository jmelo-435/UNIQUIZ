import React from "react";
import '../css/MainContent.css'
import { useState, useEffect } from "react";

const QuestionDisplay = ({question, updateScore,timeToAnswerInSeconds}) => {
    const [elapsedTime, setElapsedTime] = useState(timeToAnswerInSeconds)
    useEffect(()=>{
        
        var elapsedTime=timeToAnswerInSeconds
          const interval =setInterval(function () {
            
            if (elapsedTime<=1){
                updateScore(false)
                clearInterval(interval)
            }
            elapsedTime=elapsedTime-1
            setElapsedTime(elapsedTime)
          }, 1000)
        
          return(() => {
            clearInterval(interval)
        })
    }, [question])
    return (

            <div className="alpha">
                <div>
                    <div>
                        <h2>{elapsedTime}</h2>
                    </div>
                    <span>
                        <h3>{question !== null ? question.title : "Esperando"}</h3>
                    </span>
                    <button onClick={() => { updateScore(question.tryToAnswer(1)) }}>{question.option1}</button>
                    <button onClick={() => { updateScore(question.tryToAnswer(2)) }}>{question.option2}</button>
                    <button onClick={() => { updateScore(question.tryToAnswer(3)) }}>{question.option3}</button>
                    <button onClick={() => { updateScore(question.tryToAnswer(4)) }}>{question.option4}</button>
                    <button onClick={() => { updateScore(question.tryToAnswer(5)) }}>{question.option5}</button>
                </div>
            </div>
    )

}

export default QuestionDisplay