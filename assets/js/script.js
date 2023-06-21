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
    grabQuestion();
}

function grabQuestion() {
    resetState()
    displayQuestion(shuffledQuestions[currentQuestionIndex])
}
function displayQuestion(questions) {
    if (currentQuestionIndex > 3) {
        endScreenEl.classList.add('stop-time')
        questionsEl.classList.add('hide');
        endScreenEl.classList.remove('hide');
        document.getElementById('final-score').innerHTML = counter.innerHTML
    }
    questionTitleEl.innerText = questions.title;
    questions.options.forEach(options => {
        const button = document.createElement('button')
        button.innerText = options.text
        button.classList.add('button-style', 'answer-button')
        if (options.correct === true) {
            button.classList.add('correct')
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}
function resetState() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

// takes away time if incorrect answer
function selectAnswer(e) {
    const selectedButton = e.target
    if (selectedButton.classList.contains('correct')) {
        feedbackEl.classList.remove('hide')
        feedbackEl.innerHTML = 'Correct'
        setTimeout(function () {
            feedbackEl.innerHTML = '';
        }, 1000);
    } else {
        seconds -= 10
        feedbackEl.classList.remove('hide')
        feedbackEl.innerHTML = 'Wrong'
        setTimeout(function () {
            feedbackEl.innerHTML = '';
        }, 1000);
    }
    currentQuestionIndex++
    grabQuestion()
}
// sets the timer
function setTimer() {
    seconds--;
    counter.innerHTML =
        (seconds < 10 ? "0" : "") + String(seconds);
    if (endScreenEl.classList.contains('stop-time')) {
        counter.innerHTML = document.getElementById('final-score').innerHTML
    } else if (seconds > 0) {
        setTimeout(setTimer, 1000);

    } else {
        counter.innerHTML = '00'
        questionsEl.classList.add('hide');
        endScreenEl.classList.remove('hide');
        document.getElementById('final-score').innerHTML = counter.innerHTML
    }
} 
//saves the highscore
function saveScore() {
    var initials = document.getElementById('initials').value;
    var finalScore = counter.innerHTML
    if (initials == '') {
        alert('Please input at least 1 character')
        return null
    }
    var currentScore = { init: initials, score: finalScore };
    var savedScores = JSON.parse(localStorage.getItem("savedScores"));
    if (savedScores !== null) {
        savedScores.push(currentScore);
        localStorage.setItem("savedScores", JSON.stringify(savedScores));
    } else {
        savedScores = [currentScore];
        localStorage.setItem("savedScores", JSON.stringify(savedScores));
    }

    window.location.href = "./score.html";
}
// event listeners
document.getElementById('submit-button').addEventListener('click', saveScore)
document.getElementById('start-button').addEventListener('click', startQuiz)