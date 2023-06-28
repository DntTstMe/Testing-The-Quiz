$(document).ready(function() {
    // variables 
    var counter = $('#timer');
    var questionTitleEl = $('#question-title');
    var feedbackEl = $('#feedback');
    var questionsEl = $('#questions');
    var answerButtonsEl = $('#options');
    var startScreenEl = $('#start-screen');
    var endScreenEl = $('#end-screen');

    // variables to keep track of quiz state
    let shuffledQuestions, currentQuestionIndex;
    var seconds = 60

    // starts quiz
    function startQuiz() {
        // hides start screen and unhides questions screen
        startScreenEl.addClass('hide');
        questionsEl.removeClass('hide');

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
        answerButtonsEl.empty();
        if (currentQuestionIndex > 3) {
            endScreenEl.addClass('stop-time')
            questionsEl.addClass('hide');
            endScreenEl.removeClass('hide');
            document.getElementById('final-score').innerHTML = counter.innerHTML
        }
        questionTitleEl.text(questions.title);
        questions.options.forEach(options => {
            const button = $('<button>');
            button.text(options.text)
            button.addClass('button-style').addClass('answer-button')
            if (options.correct === true) {
                button.addClass('correct')
            }
            button.on('click', selectAnswer)
            answerButtonsEl.append(button)
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
            feedbackEl.removeClass('hide')
            feedbackEl.text('Correct')
            setTimeout(function () {
                feedbackEl.text('')
            }, 1000);
        } else {
            seconds -= 5
            feedbackEl.removeClass('hide')
            feedbackEl.text('Wrong')
            setTimeout(function () {
                feedbackEl.text('')
            }, 1000);
        }
        currentQuestionIndex++
        grabQuestion()
    }
    // sets the timer
    function setTimer() {
        seconds--;
        counter.text((seconds < 10 ? "0" : "") + String(seconds));
        if (endScreenEl.hasClass('stop-time')) {
            counter.text(seconds);
            document.getElementById('final-score').innerHTML = seconds
        } else if (seconds > 0) {
            setTimeout(setTimer, 1000);

        } else {
            counter.innerHTML = '00';
            questionsEl.addClass('hide');
            endScreenEl.removeClass('hide');
            console.log(seconds);
            document.getElementById('final-score').innerHTML = seconds
        }
    } 
    //saves the highscore
    function saveScore() {
        var initials = document.getElementById('initials').value;
        var finalScore = seconds;
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
})