import React from "react";
import '../css/MainContent.css'
import { useState, useEffect } from "react";
import { getQuestions } from "../repo/repo"
import { Quiz } from "../domain/Quiz"

const MainContent = () => {
  const [answer, setAnswer] = useState()
  const [currentElapsedTime, setCurrentElapsedTime] = useState(0)
  const [totalElapsedTime, setTotalElapsedTime] = useState(0)
  const [currentQuestionAnswerState, setCurrentQuestionAnswerState] = useState(null)
  const [correctAnswerCounter, setCorrectAnswerCounter] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const [isTurnRunning, setIsTurnRunning] = useState(false)

  useEffect(() => {
    function newTurn() {
      if (quiz !== null && isTurnRunning === false) {
        quiz.newTurn()
      }
    }
    newTurn();

  }, [isTurnRunning]);
  useEffect(() => {
    function refreshCounter() {
      if (quiz !== null && currentQuestionAnswerState !== null) {
        correctAnswerCounter.push(currentQuestionAnswerState)
        console.log(correctAnswerCounter)
      }
    }
    refreshCounter();

  }, [currentQuestionAnswerState]);





  const getQuestion = async () => {
    const returnedQuestions = await getQuestions(3)
    return returnedQuestions.questions

  }
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
        <button onClick={async () => {
          const questions = await getQuestion()
          const quiz = new Quiz(questions,
            30,
            setCurrentElapsedTime,
            setTotalElapsedTime,
            setCurrentQuestionAnswerState,
            setCurrentQuestion,
            setIsTurnRunning)
          setQuiz(quiz)
          quiz.newTurn()
        }}>INICIAR</button>
      </div>
      <div className="mainAppBody">
        <div>
          <h4>{totalElapsedTime}</h4>
          <h2>{currentQuestion !== null ? currentQuestion.title : "Esperando"}</h2>
          <h2>{currentQuestion !== null ? currentQuestion.answer : "Espeando"}</h2>
          <h2>Corretas:{correctAnswerCounter}</h2>
          <input onChange={(e) => setAnswer(e.target.value)}></input>
          <button onClick={() => { quiz.turn.tryTheAnswer(answer) }}>ok</button>
        </div>
        <div>
          <h4>{currentElapsedTime}</h4>
        </div>
      </div>
    </div>
  );
}

export default MainContent;