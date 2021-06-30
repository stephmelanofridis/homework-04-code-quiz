// Assign variables
const username = document.querySelector(".username");
const saveScore = document.querySelector(".save-score");
const finalScore = document.querySelector(".final-score");

const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const maxHighScores = 5;

// Show user their score when they have completed the quiz
finalScore.innerText = "You scored: " + mostRecentScore;

// Disable the save score button until user has entered something in input
username.addEventListener("keyup", () => {
    saveScore.disabled = !username.value;
});

// Create function to save the high score to local storage
saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    // Sort the high score from highest to lowest and cut off at 5
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score)
    highScores.splice(5);

    localStorage.setItem("highscores", JSON.stringify(highScores));
    window.location.assign("/");
};

