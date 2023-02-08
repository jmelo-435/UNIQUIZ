import {React,useState} from "react";
import '../css/MainContent.css'
import InitialForm from "./InitialForm";
import mainContentStages from "./MainContentStages"
import QuizComponent from "./QuizComponent";


const MainContent = () => {
  const [centralContent,setCentralContent] = useState(mainContentStages.initialForm);
  const [numOfQuestions,setNumOfQuestions]= useState(1)
  const [playerName,setPlayerName]= useState()
  return (
    <div className="mainContent">
      {(()=>{
          if(centralContent===mainContentStages.initialForm){
            return(<InitialForm  setCentralContent = {setCentralContent} setPlayerName = {setPlayerName} setNumOfQuestions = {setNumOfQuestions} />)
          }
          if(centralContent===mainContentStages.quiz){
            return(<QuizComponent setCentralContent = {setCentralContent} playerName={playerName} numOfQuestions={numOfQuestions} timeToAnswerInSeconds={30}/>)
          }
          if(centralContent===mainContentStages.fields){
            return(<Fields setCentralContent = {setCentralContent} receivedUserData={userData}/>)
          }
          if(centralContent===mainContentStages.conclusion){
            return(<Conclusion setCentralContent = {setCentralContent}/>)
          }
          if(centralContent===mainContentStages.checkFail){
            return(<CheckFail setCentralContent = {setCentralContent}/>)
          }
          if(centralContent===mainContentStages.sucess){
            return(<Sucess setCentralContent = {setCentralContent}/>)
          }
        })()

        }
    </div>
  );
}

export default MainContent;