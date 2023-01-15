class AnswerAttempt {
    constructor(question,
        timeToAnswerInSeconds,
        setCurrentElapsedTimeToQuestion,
        setCurrentQuestionAnswerState,
        setCurrentQuestion,
        setIsTurnRunning
        ) {
        setCurrentQuestionAnswerState(null)
        this.setCurrentQuestionAnswerState=setCurrentQuestionAnswerState
        setIsTurnRunning(true)
        this.setIsTurnRunning=setIsTurnRunning
        setCurrentQuestion(question)
        this.question = question
        console.log(question)
        let elapsedTime = 0
        this.timeToAnswerInSeconds = timeToAnswerInSeconds
        this.questionCorrect = null
        this.countdown = setInterval(function () {
            if (elapsedTime >= timeToAnswerInSeconds) {
                elapsedTime = 0
                setCurrentQuestionAnswerState(false)
                clearInterval(this.countdown)
                setIsTurnRunning(false)
            } else {
                elapsedTime += 1
                setCurrentElapsedTimeToQuestion(elapsedTime)
            }
        }, 1000)
    }
    async tryTheAnswer(answer) {
        const result = this.question.tryToAnswer(answer)
        this.setCurrentQuestionAnswerState(result)
        clearInterval(this.countdown)
        this.setIsTurnRunning(false)
        this.questionCorrect = result   
        return result
    }
}
export class Quiz {
    constructor(Questions,
        timeToAnswerInSeconds,
        setCurrentElapsedTimeToQuestion,
        setTotalElapsedTime,
        setCurrentQuestionAnswerState,
        setCurrentQuestion,
        setIsTurnRunning
        ) {
        this.setIsTurnRunning=setIsTurnRunning
        this.timeToAnswerInSeconds=timeToAnswerInSeconds
        this.setCurrentElapsedTimeToQuestion=setCurrentElapsedTimeToQuestion
        this.setCurrentQuestionAnswerState=setCurrentQuestionAnswerState
        this.setCurrentQuestion=setCurrentQuestion
        this.questions = Questions
        this.turn = null
        this.initialTime = (() => {
            const currentdate = new Date()
            return currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
        })()
        this.correctAnswers = 0
        let totalTime = 0
        this.totalCountDown = setInterval(function () {
            totalTime = totalTime+ 1
            setTotalElapsedTime(totalTime)
        },1000
        ) 
    }
    currentTurn = -1
    newTurn(){
        this.currentTurn=this.currentTurn+1
        this.turn = new AnswerAttempt(this.questions[this.currentTurn],this.timeToAnswerInSeconds,this.setCurrentElapsedTimeToQuestion,this.setCurrentQuestionAnswerState,this.setCurrentQuestion,this.setIsTurnRunning)
    }
    answerTurn(answer){
        return this.turn.tryTheAnswer(answer)
    }
}
