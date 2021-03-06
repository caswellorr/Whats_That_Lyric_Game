// =================== VARIABLES =====================

let timeLeft = 30;
let startButton = document.querySelector("#start-button");
let intervalId;
let displayTimer = document.querySelector("#countdown");
let displayScore = document.querySelector("#high-score");
let currentScore = document.querySelector("#current-score");
let score = 0;

// ==================== START GAME =================

startButton.addEventListener("click", function () {

  clearInterval(intervalId);

  startTimer();

  startGame();

});

//  ================= TIMER ===================

function startTimer() {

  intervalId = setInterval(function () {
    timeLeft--;
    displayTimer.textContent = timeLeft;
    if (timeLeft === 0) {
      console.log("Time's Up!")
      clearInterval(intervalId);
      endGame();

    }

  }, 1000)

};

// =============== QUESTIONS AND ANSWERS ===============

let currentLyric = 0;
let lyricArray = [
  {
    givenLyric: "All my exes live in ________ ...",
    answers: ["Texas", "Kansas", "Sturgis", "Frisco"],
    correctAnswer: "Texas",
  },
  {
    givenLyric: "the Rocky Mountain ________ is better than the way we had...",
    answers: ["Clay", "Hey", "Way", "Stay"],
    correctAnswer: "Way",
  },
  {
    givenLyric: "Got me on my knees, _________ ...",
    answers: ["Rigby", "Perla", "Layla", "Kayla"],
    correctAnswer: "Layla",
  },
  {
    givenLyric: "__________ all my troubles seemed so far away...",
    answers: ["In the car today", "The other day", "Wednesday", "Yesterday"],
    correctAnswer: "Yesterday",
  },
  {
    givenLyric: "_____, ______ on the Mountain ...",
    answers: ["Aspens", "Fire", "Snow", "Goats"],
    correctAnswer: "Fire",
  },
];


//============= START GAME FUNCTIONS ================

function startGame() {

  document.querySelector('#start-button').setAttribute('class', 'hide');

  renderQuestions()
}

function renderQuestions() {

  document.querySelector('.lyrics').textContent = "";
  document.querySelector('#options').textContent = "";

  document.querySelector('.lyrics').textContent = lyricArray[currentLyric].givenLyric
  console.log(lyricArray[currentLyric].givenLyric);

  for (let i = 0; i < lyricArray[currentLyric].answers.length; i++) {

    let optionBtn = document.createElement('button');
    optionBtn.setAttribute('id', lyricArray[currentLyric].answers[i]);
    optionBtn.textContent = lyricArray[currentLyric].answers[i];

    document.querySelector('#options').append(optionBtn);

    optionBtn.addEventListener('click', function (event) {
      console.log(event.target.id)
      if (event.target.id === lyricArray[currentLyric].correctAnswer) {
        score += 20;
        console.log('correct');
      } else {
        timeLeft -= 5;
        console.log('incorrect')
      }

      currentScore.textContent = score;

      currentLyric++

      if (currentLyric == 5) {
        endGame()
      }

      renderQuestions()

    });

  };

};

function endGame() {

  document.querySelector('.question-answer-container').setAttribute('class', 'hide');

  if (lyricArray[currentLyric] === undefined) {

    clearInterval(intervalId);

  }

  let gameOver = document.createElement('h1');
  gameOver.textContent = 'Game Over!';
  gameOver.setAttribute('id', 'game-over-banner');
  document.querySelector('#game-over').append(gameOver);

  let userForm = document.createElement('form');
  userForm.setAttribute('id', 'user-form');
  document.querySelector('#game-over').append(userForm);

  let userInitials = document.createElement('input');
  userInitials.setAttribute('id', 'user-input');
  userInitials.setAttribute('placeholder', 'Your Initials...');
  document.querySelector('#user-form').appendChild(userInitials);

  let formBtn = document.createElement('button');
  formBtn.setAttribute('id', 'form-btn');
  formBtn.textContent = 'Submit';
  document.querySelector('#user-form').appendChild(formBtn);

  let scoreCount = document.createElement('p');
  scoreCount.setAttribute('id', 'scoreCount-btn');
  scoreCount.textContent = score;
  document.querySelector('#user-form').appendChild(scoreCount);


  formBtn.addEventListener("click", function (event) {
    event.preventDefault()
    let storage = JSON.parse(localStorage.getItem('highscores'))
    if (storage === null) {
      storage = []
    }
    var currentUser = {
      name: userInitials.value,
      currentScore: score,
    }

    storage.push(currentUser)
    localStorage.setItem('highscores', JSON.stringify(storage))

    window.location.href = 'highscore.html'

  })


}

let storage = JSON.parse(localStorage.getItem('highscores'))
if (storage === null) {
  
  document.getElementById('high-score').textContent = 'No High Score';
}

else {

  let scores = []

  console.log(storage);

  for (let i = 0; i < storage.length; i++ ) {

    scores.push(parseInt(storage[i].currentScore));

  } 
  
  console.log(scores)

  document.getElementById('high-score').textContent = Math.max(...scores);

}