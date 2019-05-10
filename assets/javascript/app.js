var question = [
  {
    question:"Who popularized quartz movements in wrist watches in the 60s?",
    answerChoices:["Omega","Seiko","Rolex","Citizien"],
    answer:"Seiko"
  },
  {
    question:"What is the name of the movement that 'charges' when the user moves?",
    answerChoices:["Automatic","Manual","Quartz","SpringDrive"],
    answer:"Automatic"
  },
  {
    question:"What year did Rolex's release its famous Submariner?",
    answerChoices:["1921","1953","1947","1983"],
    answer:"1953"
  },
  {
    question:"What is the name of complication where the entire escapement is housed in a rotating cage, and the whole assembly is constantly moving?",
    answerChoices:["Chronograph","Date","Moon Phase","Tourbillon"],
    answer:"Automatic"
  },
  {
    question:"Where is the annual watch trade show, Baselworld, locted?",
    answerChoices:["Switzerland","Germany","Japan","France"],
    answer:"Automatic"
  }
];


var timer,
    correct = 0,
    incorrect = 0,
    counter = 60;


$(document).on("click", "#doneBtn", function() {
 doneBtn();
})


$(document).on("click", "#startBtn", function() {
  startBtn();
})


function countdown(){
  counter--;

  
  $('#countdownNumber').html(counter);


  if (counter === 0) {
    clearInterval(timer);
    endGame();
  }


}


function endGame(){
  $('#questionArea').remove();
  $('.container').html("<h2>All Done!</h2>")
                 .append("<h3>Correct Answers: " + correct + "</h3>" + "<h3>Incorrect Answers: " + incorrect + "</h3>");
}


function doneBtn(){

  var inputs = $("input:checked");

  console.log(inputs);

  for (let i = 0; i < inputs.length; i++){

      if ($(inputs[i]).val() === question[i].answer) {

        correct++;
      } else {
        incorrect++;
      }
  }
  endGame();
}


function startBtn(){
    
  $('#gameTitle').remove();
  $('#startBtn').remove();

  
  timer = setInterval(countdown,1000);


  $("#questionArea").prepend("<h3>Time Remaining: <span id='countdownNumber'>60</span> Seconds</h3>");


  for ( let i = 0; i < question.length; i++){


    $('#questionArea').append('<h2>' + question[i].question + '</h2>');
    

    for (let j = 0; j < question[i].answerChoices.length; j++){
      $('#questionArea').append('<input type="radio" name="option' + i + '" value="' + question[i].answerChoices[j] + '">' +  question[i].answerChoices[j]  + '<br>');
    }
  
  }


  $("#questionArea").append("<button id='doneBtn'>Done</button>")


  countdown();
}