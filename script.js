// Assign variables
const questionNumber = document.querySelector(".question-number");
const question = document.querySelector(".question");
const possibleAnswers = Array.from(document.querySelectorAll(".answer"));
const correctAnswerPoints = 1;
const maxQuestions = 5;
const timeLeftDisplay = document.querySelector("#time")
const counterText = document.querySelector("#counter");
const scoreText = document.querySelector("#score");

var currentQuestion = {};
var answerReady = false;
var timeLeft = 60;
var score = 0;
var counter = 0;
var availableQuestions = [];

// Create 5 question objects in an array
let questions = [
    {
        question: "How would you access the item in this array with the value '20': var numbers=['10', '20', '30', '40', '50'];",
        answer1: "numbers[2]",
        answer2: "numbers='20'",
        answer3: "numbers[1]",
        answer4: "numbers{20}",
        correctAnswer: 3
    },
    {
        question: "What does the 'this' keyword refer to in Javascript?",
        answer1: "'this' refers to a global variable",
        answer2: "'this' refers to a current object ",
        answer3: "'this' refers to an array containing the word 'this'",
        answer4: "'this' refers to a key/value pair",
        correctAnswer: 2
    },
    {
        question: "When using the document.createElement() method in Javascript, where will the new element that has been created show up?",
        answer1: "The new element will appear at the top of the HTML page",
        answer2: "The new element will appear at the top of the <body> tag",
        answer3: "The new element will appear in the <head> of the document",
        answer4: "The new element will be created, but will not appear anywhere until it has been added",
        correctAnswer: 4
    },
    {
        question: "What does the following signify in Javascript:  !=",
        answer1: "Not equal",
        answer2: "A variable has been deleted",
        answer3: "Strictly equal",
        answer4: "Missing code",
        correctAnswer: 1
    },
    {
        question: "Which event occurs when something is clicked on by a user?",
        answer1: "onmouseover",
        answer2: "onbutton",
        answer3: "onclick",
        answer4: "mouseclick",
        correctAnswer: 3
    },

]

// Create the timer to countdown from 60 seconds upon start
function startTimer() {
    setInterval(function () {
        timeLeftDisplay.innerText = timeLeft;
        timeLeft -= 1
    }, 1000)
};

//Create start game function
startGame = () => {
    startTimer();
    counter = 0;
    score = 0;
    availableQuestions = [...questions];
    scoreText.innerText = score;
    getNewQuestion();
};

// Cycle through questions
getNewQuestion = () => {

    if (availableQuestions.length === 0 || counter >= maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("end.html");
    }

    counter++;
    counterText.innerText = counter + "/" + maxQuestions;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    possibleAnswers.forEach(answer => {
        const number = answer.dataset['number'];
        answer.innerText = currentQuestion['answer' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    answerReady = true;

};

// Create a class for correct and incorrect to apply different styles
possibleAnswers.forEach(answer => {
    answer.addEventListener('click', e => {
        if (!answerReady) return;

        answerReady = false;
        const selected = e.target;
        const selectedAnswer = selected.dataset["number"];
        const answerClass =
            selectedAnswer == currentQuestion.correctAnswer ? 'correct' : 'incorrect';

        if (answerClass === 'correct') {
            incrementScore(correctAnswerPoints);
            scoreText.innerText = (score + "/" + maxQuestions);
        }

        selected.parentElement.classList.add(answerClass);

        setTimeout(() => {
            selected.parentElement.classList.remove(answerClass);
            getNewQuestion();
        }, 1000);
    });
});

// Create function to increment score
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

// Call start game function
startGame();



