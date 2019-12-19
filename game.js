var gamePattern = [];
var userClickedPattern = [];
var hasGameStarted = false;
var level = 0;

var buttonColors = ["red", "blue", "green", "yellow"];

$(document).on("keypress", function() {
  if (!hasGameStarted) {
    nextSequence();
    hasGameStarted = true;
  }
})

$(".btn").on("click", function() {
  if (hasGameStarted) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  } else {
    playSound("wrong");
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    resetGame();
  }
}

function nextSequence() {
  userClickedPattern = [];
  ++level;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function resetGame() {
  playSound("wrong");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  hasGameStarted = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
