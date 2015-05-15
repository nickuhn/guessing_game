
(function(){
  //Variable Declarations

  var message, userGuess, correctBreak, user, game;
  var timesGuessed   = 0;
  var quit           = 0;
  var quitting       = 0;
  var today          = new Date();
  var todayMs        = today.getTime();

  //Object Declarations:

 function Player() {
    this.initialize = function(){
      this.name         = prompt("What is your name?");
      this.birthInput   = prompt("what is your birthday? If unsure about time just put in 12:00:", "mm/dd/year hh:mm").split(/\W/);
      this.birthdate    = new Date(this.birthInput[2], this.birthInput[0]-1, this.birthInput[1], this.birthInput[3], this.birthInput[4]);
      this.birthMs      = this.birthdate.getTime();
      this.aliveMs      = todayMs - this.birthMs;
      this.aliveSeconds = Math.floor(this.aliveMs/1000);
      this.aliveMinutes = Math.floor(this.aliveSeconds/60);
      this.aliveHours   = Math.floor(this.aliveMinutes/60);
      this.aliveDays    = Math.floor(this.aliveHours/24);
    }
  }

  function Game() {
    this.timeIncrements = ["days","hours","minutes","seconds"];
    this.durationsAlive = [user.aliveDays, user.aliveHours, user.aliveMinutes, user.aliveSeconds];
    this.counterMax     = this.durationsAlive.length;
    this.counter        = 0;
    /*call the guessing function to ask user to guess, seconds, minutes, hours,
    and days alive.*/
    this.play = function() {
      while (quitting != 1 && this.counter < this.counterMax) {
        quizLoop(this.timeIncrements[this.counter] , this.durationsAlive[this.counter]);
        this.counter ++;
      }
    }
  }

  /*****Main function to guess the duration. timeString fills in duration units;
   hours days etc. Runs through loop prompting and incrementing the timesGuessed
   until the correct answer is given or the user inputs "quit".*****/
  quizLoop = function(timeString, duration) {
    userGuess = prompt(user.name + " you were born on " + user.birthdate + ". How many " + timeString + " do you think you have been alive? Guess within 10% to be correct! Type quit to quit the game.");
    if (duration * 0.9 < userGuess && userGuess < duration * 1.1) {
    message = "Congrats that is correct";
    } else {
      correctBreak = 0;
      while (userGuess != "quit" && correctBreak != 1) {
        if( duration * 0.9 < userGuess && userGuess < duration * 1.1 ) {
          correctBreak = 1;
        } else {
          if (userGuess < duration) {
            message = "Try again, but think bigger";
          } else {
            message = "Try again, but not so high";
          }
          alert(message);
          timesGuessed += 1
          userGuess = prompt(user.name + " you were born on " + user.birthdate + ". How many " + timeString + " do you think you have been alive? Guess within 10% to be correct! Type quit to quit the game.");
        }
      }
      if (userGuess == "quit") {
        message = "Quitting already?";
        timesGuessed -= 1;
        quitting = 1;
      } else {
        message = "Congrats that is correct!";
        quitting = 0;
      }
    }
    //increment the times guessed and print message to screen.
    timesGuessed ++;
    alert(message);
  }

  //Initialize Player
  user = new Player();
  user.initialize();

  //create new game and play
  game = new Game();
  game.play();

  //let the user know how many tries it took them to find the answer.
  alert("It took you " + timesGuessed + " guesses to find the answers.");
})();
