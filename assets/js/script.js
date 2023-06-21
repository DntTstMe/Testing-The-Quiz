// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var startScreenEl = document.getElementById("start-screen");
var endScreenEl = document.getElementById("end-screen");
var questionTitleEl = document.getElementById("question-title");
var answerButtonsEl = document.getElementById("options");
var feedbackEl = document.getElementById("feedback");
var counter = document.getElementById("timer");

// variables to keep track of quiz state
let shuffledQuestions, currentQuestionIndex;
var seconds = 60