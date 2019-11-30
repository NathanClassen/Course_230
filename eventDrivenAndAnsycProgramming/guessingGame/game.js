document.addEventListener('DOMContentLoaded', function() {
  var answer;
  var totalGuesses;

  var display = document.getElementById('display');
  var input = document.getElementById('guess');
  var form = document.querySelector('form');
  var button = document.getElementById('button');
  var link = document.querySelector('a');

  function newGame() {
    answer = Math.floor(Math.random() * 100) + 1;
    totalGuesses = 0;
    button.disabled = false;
    link.disabled = true;
    link.style.color = '#aaa';
    button.style.background = 'linear-gradient(to bottom, #CC183E 0%, #780E24 100%)';
    display.textContent = 'Guess a number from 1 to 100';
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var yourGuess = Number(input.value);
    var message;

    totalGuesses += 1;
    
    if (yourGuess === answer) {
      button.disabled = true;
      link.disabled = false;
      link.style.color = '#cc183e';
      button.style.background = '#555';
      message = `You guessed it! It took you ${totalGuesses} guesses.`;
    } else if (yourGuess > answer) {
      message = `My number is lower than ${yourGuess}`;
    } else {
      message = `My number is higher than ${yourGuess}`;
    }

    display.textContent = message;
  });

  link.addEventListener('click', function(event) {
    event.preventDefault();
    newGame();
  });

  newGame();
});
