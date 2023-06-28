function displayTopScores() {
    // Retrieve saved scores from local storage
    var scores = JSON.parse(localStorage.getItem("savedScores"));

    // Sort scores in descending order
    scores.sort(function(a, b) {
        return b.score - a.score;
    });
        // Loop through scores, create list items to display them
        for (var i = 0; i < scores.length; i++) {
            var li = document.createElement("li");
            li.classList.add('score-item');
            li.textContent = scores[i].init + " - " + scores[i].score;
            document.getElementById("score-list").appendChild(li);
        }
}
function clearScores() {
    // remove saved scores from local storage
    localStorage.removeItem("savedScores");
    
    // reload page to reflect the changes
    window.location.reload();
}

// event listener for the clear highscores button
document.querySelector("#clear-scores").addEventListener("click", clearScores);

// Call the displayTopScores function to display saved highscores
displayTopScores();