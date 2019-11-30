var $message = $("#message");
var $letters = $("#spaces");
var $guesses = $("#guesses");
var $apples  = $("#apples");
var $replay  = $("#replay");
var game;

var randomWord = function() {
  var wordBank = ["guile", "misanthropic", "carcass", "ogre"];

  return function() {
    var randomIdx = Math.floor(Math.random() * wordBank.length);
    return wordBank.splice(randomIdx, 1)[0];
  };
}();

function shutDownGame() {
  $letters.remove();
  $guesses.remove();
  $replay.remove();
}

function Game() {
  this.word = randomWord();
  this.incorrectGuesses =  0;
  this.correctGuesses   =  0;
  this.guessedLetters   = [];
  if (!this.word) {
    this.displayMessage("Sorry, I have no more words to play with!");
  } else {
    this.word = this.word.split("");
  }
  this.init();
}

Game.prototype = {
  guesses: 6,

  createBlanks: function() {
    var spaces = (new Array(this.word.length + 1)).join("<span></span>");

    $letters.find("span").remove();
    $letters.append(spaces);
    this.$spaces = $("#spaces span");
  },

  handleLetter: function(letter) {
    if (this.guessedLetters.includes(letter)) {
      return;
    }
    this.addToGuessedLetters(letter);

    if (wordIncludes(letter)) {
      this.updateWordBlanks(letter)
    } else {
      this.incorrectGuesses += 1;
      this.fellAnApple();
    }
  },

  wordIncludes: function(letter) {
    return this.word.includes(letter);
  },

  updateWordBlanks: function(guessedLetter) {
    var $wordLetters = $(this.word);
    var self = this;

    $wordLetters.each(function(idx) {
      var actualLetter = $wordLetters[idx];
      if (guessedLetter === actualLetter) {
        self.correctGuesses += 1;
        $(self.$spaces[idx]).text(guessedLetter);
      }
    });  
  },

  addToGuessedLetters: function(guessedLetter) {
    this.guessedLetters.push(guessedLetter);
    var $letterBlock = $(`<span>${guessedLetter}</span>`);
    $guesses.append($letterBlock);
  },

  resetApples: function() {
    $apples[0].className = "";
  },

  fellAnApple: function() {
    var nthGuess = `${this.incorrectGuesses}`;
    var className = `guess_${nthGuess}`;
    this.resetApples();
    $apples.addClass(className);
  },

  handleLetter: function(letter) {
    if (this.guessedLetters.includes(letter)) {
      return;
    }
    this.addToGuessedLetters(letter);

    if (this.wordIncludes(letter)) {
      this.updateWordBlanks(letter)
    } else {
      this.incorrectGuesses += 1;
      this.fellAnApple();
    }
  },

  resetGuessBank: function() {
    $("#guesses span").remove();
  },

  resetGame: function() {
    this.resetApples();
    this.resetGuessBank();
    $("body").removeClass("lose win");
    game = new Game();
  },

  processGuess: function(e) {
    var key = e.keyCode;
    var letter = e.key;

    if (key >= 97 && key <= 122) {
      this.handleLetter(letter);
    }

    if (this.correctGuesses === this.word.length) {
      this.toggleReplayLink(true);
      this.displayMessage("Congratulations!!");
      $("body").addClass("win");
    }

    if (this.incorrectGuesses === this.guesses) {
      this.toggleReplayLink(true);
      this.displayMessage("Oh darn, that was your last guess.");
      $("body").addClass("lose");
    }
  },

  toggleReplayLink: function(which) {
    $replay.toggle(which)
  },

  displayMessage: function(text) {
    $message.text(text);
  },

  bind: function() {
    $(document).on("keypress.game", this.processGuess.bind(this));
    $replay.on("click.game", this.resetGame.bind(this));
  },

  unbind: function() {
    $(document).off(".game");
    $replay.off(".game");
  },

  init: function() {
    this.unbind();
    if (this.word === undefined) {
      shutDownGame();
      return;
    }
    this.bind();
    this.toggleReplayLink(false);
    this.createBlanks();
    this.displayMessage("");
  }
};

game = new Game();
