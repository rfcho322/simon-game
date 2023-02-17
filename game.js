
let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let gameStarted = false;
let level = 0;
let score = 0;
let highScore = [];

//DETECT KEY PRESS
$(".btn-start").on("click", function(event) {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});

//USER CLICK
$(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    //RESET userClickedPattern ARRAY
    userClickedPattern = [];
    //INCREMENT LEVEL EVERYTIME THE nextSequence IS CALLED AND THE SEQUENCE IS CORRECT...
    level++;
    $("#level-title").text("Level " + level);

    //RANDOMIZED A NUMBER...
    let randomNumber = Math.floor(Math.random() * 4);
    //...SELECT A COLOR FROM buttonColours Array BASED ON THE RANDOMIZED NUMBER...
    let randomChosenColour = buttonColours[randomNumber];
    //...ADD COLOR TO gamePattern ARRAY
    gamePattern.push(randomChosenColour);

    //FLASH ANIMATION EFFECT FOR EACH RANDOM CHOSEN COLOUR
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //PLAY SOUNDS AT THE SAME TIME THE ANIMATION TAKE EFFECT
    playSound(randomChosenColour);
    
    //FOR TESTING ONLY
    // console.log("Current Game Pattern: " + gamePattern);
    // console.log("Current User Pattern: " + userClickedPattern);
    // console.log("Current Level " + level + " Color: " + randomChosenColour);
    // console.log("Current HighScores " + highScore);
    // console.log("score " + score);
}

function checkAnswer (currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("check answer: success"); //DISPLAY LOG
        if (userClickedPattern.length === gamePattern.length) {
            //INCREMENT SCORE AFTER COMPLETING THE LEVEL
            score = score + 1;
            //DISPLAY SCORE
            $("#display-score").text(score);
            //ADD CURRENT SCORE TO highScore ARRAY
            highScore.push(score);
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

    } else {

        console.log("check answer: wrong"); //DISPLAY LOG
        //CHANGE THE DISPLAYED h1 TEXT
        $("#level-title").text('Game Over, Press "SIMON" button to Restart');
        //ADD STYLING
        $("body").addClass("game-over");
        //REMOVE STYLING RIGHT AFTER 200 MILLISECONDS
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        //ADD SOUND EFFECTS
        let wrongSounds = new Audio("sounds/wrong.mp3");
        wrongSounds.play();
        //RESTART IF SEQUENCE IS WRONG 
        startOver();

    }
}

function startOver () {

    gamePattern = [];
    gameStarted = false;
    level = 0;
    score = 0;

    //RESET TO ZERO TEXT DISPLAY
    $("#display-score").text(score);

    //CHECKS IF THERE ARE HIGH SCORES
    if (highScore.length > 0) {
        //IF TRUE, THEN GET THE HIGHEST HIGH SCORE FROM CURRENT HIGH SCORES AND DISPLAY IT
        const highestScore = Math.max(...highScore);
        $("#high-score").text(highestScore);
    }

}

function playSound (name) {

    let colorSounds = new Audio("sounds/" +name+ ".mp3");
    colorSounds.play();

}

function animatePress (currentColour) {

    //ADD FLASH LIKE ANIMATION
    $("#" + currentColour).addClass(currentColour + "-flash");

    setTimeout(() => {

        $("#" + currentColour).removeClass(currentColour + "-flash");

    }, 300);

}