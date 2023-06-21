// variables to reference DOM elements
var questionTitleEl = document.getElementById("question-title");
var questionsEl = document.getElementById("questions");
var startScreenEl = document.getElementById("start-screen");
var endScreenEl = document.getElementById("end-screen");
var answerButtonsEl = document.getElementById("options");
var feedbackEl = document.getElementById("feedback");
var counter = document.getElementById("timer");

// variables to keep track of quiz state
let shuffledQuestions, currentQuestionIndex;
var seconds = 60

// starts quiz
function startQuiz() {
    // hides start screen and unhides questions screen
    startScreenEl.classList.add('hide');
    questionsEl.classList.remove('hide');

    // randomizes questions and creates a randomized array
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0

    setTimer();
    getQuestion();
}