const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'You are in the 13th floor of a building and you are outside on the balcony. As you look down, you witness a murder. The murderer then looks up and stares up at you for a while. What is the murderer doing?',
        choice1: 'Playing',
        choice2: 'Listening',
        choice3: 'Counting',
        answer: 3,
    },
    {
        question:"",
        choice1: "Answer:",
        choice2: "You are in the 13th floor of a building and you are outside on the balcony. As you look down, you witness a murder. The murderer then looks up and stares up at you for a while. What is the murderer doing?",
        choice3: "Click here to continue",
        answer: 0,
    },
    {
        question: "One day at a family funeral, a girl sees a handsome who was just her type. After the funeral was over, she asked everybody who the mysterious man was, however, nobody could help her. A few days later, the girl secretly kills her sister. Why did she kill her?",
        choice1: "To get his attention",
        choice2: "Her sister was lying",
        choice3: "To take her mind off the man",
        answer: 1,
    },
    {
        question: "",
        choice1: "Answer:",
        choice2: "One day at a family funeral, a girl sees a handsome who was just her type. After the funeral was over, she asked everybody who the mysterious man was, however, nobody could help her. A few days later, the girl secretly kills her sister. Why did she kill her?",
        choice3: "Click here to continue",
        answer: 0,
    },
    {
        question: "A couple are crying while watching fireworks with their baby. Why is the couple crying?",
        choice1: "The baby is scared",
        choice2: "The baby is not theirs",
        choice3: "The baby is sleeping",
        answer: 3,
    },
    {
        question: "",
        choice1: "Answer:",
        choice2: "One day at a family funeral, a girl sees a handsome who was just her type. After the funeral was over, she asked everybody who the mysterious man was, however, nobody could help her. A few days later, the girl secretly kills her sister. Why did she kill her?",
        choice3: "Click here to continue",
        answer: 1,
    },
    {
        question: "Santa Claus comes down the chimney and magically gives a child a bicycle, however, the child is very sad. Why is the child sad?",
        choice1: "The child fears the unknown",
        choice2: "Santa is not real",
        choice3: "The child has no way to ride it",
        answer: 3,
    },
    {
        question: "",
        choice1: "Answer:",
        choice2: "ne day at a family funeral, a girl sees a handsome who was just her type. After the funeral was over, she asked everybody who the mysterious man was, however, nobody could help her. A few days later, the girl secretly kills her sister. Why did she kill her?",
        choice3: "Click here to finish",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 8

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    //progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(null)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()