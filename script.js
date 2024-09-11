"use strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const currentPlayer0El = document.querySelector(".player--0");
const currentPlayer1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0];
let activePlayer = 0;
let playing = true;
let currentScore = 0;

const name1 = prompt('Enter Player 1 Name')
const name2 = prompt('Enter Player 2 Name')
document.getElementById('name--0').textContent = name1
document.getElementById('name--1').textContent = name2

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  currentPlayer0El.classList.toggle("player--active");
  currentPlayer1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. generate a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if player's score is >= 100   ----> finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
        diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});


btnNew.addEventListener('click', function(){
    document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
    document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    activePlayer = 0
    scores[0] = 0
    scores[1] = 0
    playing = true
    currentScore = 0
    score0El.textContent = 0;
    score1El.textContent = 0;

    currentPlayer0El.classList.add("player--active");
    diceEl.classList.add("hidden");
})