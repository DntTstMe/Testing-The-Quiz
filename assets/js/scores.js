function printHighscores() {
    // Retrieve saved scores from local storage
    var scores = JSON.parse(localStorage.getItem("savedScores"));

    // Sort scores in descending order
    scores.sort(function(a, b) {
        return b.score - a.score;
    });
        // Loop through scores, create list items to display them
        for (var i = 0; i < scores.length; i++) {
            var li = document.createElement("li");
            li.classList.add('list-style');
            li.textContent = scores[i].init + " - " + scores[i].score;
            document.getElementById("highscores").appendChild(li);
        }
}