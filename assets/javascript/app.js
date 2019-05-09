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
  }
];

var timer,
    correct,
    incorrect,
    counter = 60;

$('button').on("click", function(){

  $('button').remove();

  timer = setInterval(countdown,1000);

  $("#questionArea").prepend("<h3>Time Remaining: <span id='countdownNumber'>60</span> Seconds</h3>");

  for ( let i = 0; i < question.length; i++){

    $('#questionArea').append('<h2>' + question[i].question + '</h2>');
    
    for (let j = 0; j < question[i].answerChoices.length; j++){
      $('#questionArea').append('<input type="radio" name=' + question[i].answerChoices[j] + '>' + question[i].answerChoices[j] + '<br>');
    }
  }
})

function countdown(){
  counter--;
  $("#countdownNumber").html(counter);
};

// for (let k = 0; k < question[i].answer.length; k++){
      
// }