export class Question {
    constructor(title, option1, option2, option3, option4, option5, answer) {
        this.title = title
        this.option1 = option1
        this.option2 = option2
        this.option3 = option3
        this.option4 = option4
        this.option5 = option5
        this.answer = answer
        return this
    }

    tryToAnswer(answer) {
        if (this.answer == answer) {
            return true
        }
        else {
            return false
        }
    }
}
