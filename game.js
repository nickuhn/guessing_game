(function(){
  //Variable Declarations
  var user, daysGuess, hoursGuess, minutesGuess, secondsGuess, message, correct;
  var today          = new Date();
  var todayMs        = today.getTime();
  var winMessage     = "Keep Going!"

  //Player object constructor:
 function Player() {
    this.initialize     = function(){
      this.birthInput   = document.getElementById('birth-input').value.split(/\W/);
      this.birthdate    = new Date(this.birthInput[2], this.birthInput[0]-1, this.birthInput[1], this.birthInput[3], this.birthInput[4]);
      this.birthMs      = this.birthdate.getTime();
      this.aliveMs      = todayMs - this.birthMs;
      this.aliveSeconds = Math.floor(this.aliveMs/1000);
      this.aliveMinutes = Math.floor(this.aliveSeconds/60);
      this.aliveHours   = Math.floor(this.aliveMinutes/60);
      this.aliveDays    = Math.floor(this.aliveHours/24);
    }
    //Place player name and birthday on page
    this.show = function(){
      document.getElementById('player-name').textContent = document.getElementById('name-input').value;
      document.getElementById('birthdate').textContent = this.birthdate.toDateString();
    }
    //Determines if player has gotten all four questions correct
    //and updates a win message.
    this.cake = function(){
      var correctCounter = 0;
      var checkMessage = '';
      var correctPrints = document.getElementsByName('results');
      for(var i = 0; i < correctPrints.length; i++) {
        checkMessage = correctPrints[i].textContent;
        if(checkMessage === "That is correct!") {
          correctCounter ++
        }
      }
      if(correctCounter >= 4) {
        winMessage = "You did it! Congratulations!";
      } else {
        winMessage = "Keep going!";
      }
      document.getElementById('game-result').textContent = winMessage;
    }
  }

  //Function to determine if the users guess is correct,
  //if not returns higher or lower guidance
  var guessEval = function(userGuess, duration) {
    if (duration * 0.9 < userGuess && userGuess < duration * 1.1) {
      message = "That is correct!"
    } else if (userGuess < duration) {
      message = "Think bigger!"
    } else {
      message = "Think smaller!"
    }
    user.correct ++;
    return message;
  }

  //Creates a player object on mouse click and populates player info section
  document.getElementById('start-button').onclick = function() {
  user = new Player();
  user.initialize();
  user.show();
  }

  //Buttons to submit player answer and then evaluate the guesses.
  document.getElementById('submit-days-button').onclick = function() {
  daysGuess = document.getElementById('guess-days').value;
  document.getElementById('days-result').textContent = guessEval(daysGuess, user.aliveDays);
  user.cake();
  }

  document.getElementById('submit-hours-button').onclick = function() {
  hoursGuess = document.getElementById('guess-hours').value;
  document.getElementById('hours-result').textContent = guessEval(hoursGuess, user.aliveHours);
  user.cake();
  }

  document.getElementById('submit-minutes-button').onclick = function() {
  minutesGuess = document.getElementById('guess-minutes').value;
  document.getElementById('minutes-result').textContent = guessEval(minutesGuess, user.aliveMinutes);
  user.cake();
  }

  document.getElementById('submit-seconds-button').onclick = function() {
  secondsGuess = document.getElementById('guess-seconds').value;
  document.getElementById('seconds-result').textContent = guessEval(secondsGuess, user.aliveSeconds);
  user.cake();
  }

  //Keeps date on site current
  document.getElementById('current-date').textContent = today.toDateString();
})();

