import React from "react";
import '../css/MainContent.css'
import '../css/Quiz.css'
import QuestionDisplay from "./QuestionDisplay.jsx"
import { Question } from "../domain/Question.js"
import { useState, useEffect,useRef } from "react";
import { getQuestions } from "../repo/repo.js"

const QuizComponent = ({ numOfQuestions, playerName, timeToAnswerInSeconds }) => {
  const [quizElapsedTime, setQuizElapsedTime] = useState(0)
  const [counter, setCounter] = useState([])
  const [counterNumber, setCounterNumber] = useState(0)
  const [questions, setQuestions] = useState([new Question("escolha", "1", "2", "3", "4", "5", "1")])
  const [currentQuestion, setCurrentQuestion]=useState(null)
  
  const initialRender = useRef(true);
  const initial = useRef(true);


  
  

  useEffect(() => {
    async function fetch() {
      const internalQuestions = await getQuestions(numOfQuestions)
      setQuestions(internalQuestions.questions)
    }
    fetch()
  }, [])

  useEffect(() => {
      if(initialRender.current){
        initialRender.current=false
      }else{
        
        setCurrentQuestion(questions[numOfQuestions-1-(counter.length)])
    
      }
      
  }, [counter]);

  useEffect(() => {
    if(initial.current){
      initial.current=false
    }else{
      setCurrentQuestion(questions[numOfQuestions-1-(counter.length)])
  
    }
    
}, [questions]);



  useEffect(() => {
    var elapsedTime = 0
    const interval = setInterval(function () {
      elapsedTime = elapsedTime + 1
      setQuizElapsedTime(elapsedTime)
    }, 1000)
  }, [])

  useEffect(() => {
    let number = 0
    counter.map(
      (result) => {
        if (result) {
          number += 1
        }
      }
    )
    setCounterNumber(number)
  }, [counter])




  function setScore(result) {
    setCounter(oldArray => [...oldArray, result]);

  }

  return (
    <>
      <div className="mainAppBody">
        <div className="bravo">
          <h4>{playerName}</h4>
          <h4>{numOfQuestions}</h4>
        </div>
        <div className="charlie">
          <h3>{counterNumber}</h3><h4> questões corretas em</h4><h3>{quizElapsedTime}</h3> <h4> segundos.</h4>
        </div>
        {
        currentQuestion!==null? <QuestionDisplay updateScore={setScore} timeToAnswerInSeconds={timeToAnswerInSeconds} question={currentQuestion} />:<></>
        }
      </div>

    </>
  );
}

export default QuizComponent;