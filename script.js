let buttonColor = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;


$(document).keypress(function(){
    if(level == 0){
    $("h1").text("Level "+level);
    nextSequence();
    }
    
})

function nextSequence (){
    level++;
    $("h1").text("Level "+ level);
    userClickedPattern = [];
    let randomNum = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColor[randomNum];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

$(".btn").click(function (){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor); 
       
    checkAnswer(userClickedPattern.length-1);                                  

})

function checkAnswer (currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
    
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
        $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over, Press Any Key to Restart");

        gamePattern = [];
        level = 0;
    }

}

function animatePress (currentColor){
    $("."+currentColor).addClass("pressed"); 

    setTimeout(function (){
    $("."+currentColor).removeClass("pressed");
    }, 100);

}

function playSound (whichColour){
    let buttonSound = new Audio("sounds/"+whichColour+".mp3");
    buttonSound.play();                   
}

