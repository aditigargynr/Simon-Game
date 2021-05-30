
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];


var randomNumber,randomChosenColour,userChosenColour,level=0,started = false;

$(document).keypress(function()
{
   if(!started)
   {
      $("#level-title").text("Level "+ level);
      nextSequence() ;
      started = true;
   }   
});

$(".btn").click(function()
{  
   userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
   if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
   {
   
         if(userClickedPattern.length == gamePattern.length )
          {
            setTimeout(function(){ nextSequence();},1200);
          }
   }

   else
   {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){ $("body").removeClass("game-over"); },200);
      startover();
   }  
}
   
function nextSequence()
{  
   userClickedPattern = [];

   level++;
   $("#level-title").text("Level " + level);
 
   randomNumber = Math.floor( Math.random()*4);
   randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $("#"+randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(100, 1.0); });
   playSound(randomChosenColour);
}

function playSound(currentColour)
{
   var sound = new Audio("sounds/"+currentColour+".mp3");
   sound.play();
}

function animatePress(currentColour)
{
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){ $("."+currentColour).removeClass("pressed"); }, 100);
}
  
function startover()
{
   level = 0;
   $("#level-title").text("Game Over! Press any Key to Restart. ");
   gamePattern=[];
   started = false;
}  

  
   console.log(userClickedPattern);
   console.log(gamePattern); 