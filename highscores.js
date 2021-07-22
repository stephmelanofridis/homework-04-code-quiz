const highScoresList = document.querySelector(".highscores-list");
const highScores = JSON.parse(localStorage.getItem(mostRecentScore));

highScoresList.innerHTML = highScores
