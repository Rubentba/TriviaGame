$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
  })
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    gifs: ["assets/images/paranoiaAgent.gif", "assets/images/gits.gif", "assets/images/gurrenLagann.gif", "assets/images/codeGeass.gif"],
    questions: {
      questionOne: 'What was the only tv show Satochi Kon directed?',
      questionTwo: 'Who composed the music for the hit show Ghost in the Shell: Stand Alone Complex?',
      questionThree: 'What studio was behind the show Tengen Toppa Gurren Lagann?',
      questionFour: 'What original series came out on 2007 by stuido Sunrise?'
    },
    options: {
      questionOne: ['Eureka Seven', 'Death Note', 'Princess Tutu', 'Paranoia Agent'],
      questionTwo: ['Satoru Kosaki', 'Yoko Kanno', 'Kenji Iwasaki', 'Takanori Arisawa'],
      questionThree: ['Trigger', 'Gainax', 'Bones', 'Production IG'],
      questionFour: ['Mobile Suit Gundam SEED', 'Code Geass: Lelouch of the Rebellion', 'The Big O II', 'Inuyasha']
    },
    answers: {
      questionOne: 'Paranoia Agent',
      questionTwo: 'Yoko Kanno',
      questionThree: 'Gainax',
      questionFour: 'Code Geass: Lelouch of the Rebellion'
    },
    //Starts Game
    startGame: function(){
      //Resets games. All value turned to zero.
      trivia.currentSet = 0
      trivia.correct = 0
      trivia.incorrect = 0
      trivia.unanswered = 0
      clearInterval(trivia.timerId)
      // show game section
      $('#game').show()
      $('#results').html('')
      $('#timer').text(trivia.timer)
      // remove start button
      $('#start').hide()
      $('#remaining-time').show()
      // ask first question
      trivia.nextQuestion()
    },
    //function that will display next question when previous question has been answered 
    nextQuestion: function(){
      // set timer to 10 seconds each question. 15 or 20 seconds proved to be too long.
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      // stops timer from speeding up
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }

      // gets all the questions then indexes the current questions
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      // an array of all the user options for the current question
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      // creates all the trivia guess options in the html. index will make it so that instead of numbers, the actual options
      // will display.
      $.each(questionOptions, function(index, options){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+options+'</button>'));
      })
    },
    //Decreases counter and gives unaswered++ if no answer is chosen
    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 3){
            $('#timer').addClass('last-seconds');
          }
      }
      // When time is up, unanswered++ and display proper answer.
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      // if all the questions have been shown end the game, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // Displays results
        $('#results').html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        // hide game sction
        $('#game').hide();
        // show start button to begin a new game
        $('#start').show();
      }
    },
    // click functions
    guessChecker : function() {
      // timer ID for gameResult setTimeout
      var resultId,
      // the answer to the current question being asked
          currentAnswer = Object.values(trivia.answers)[trivia.currentSet]
      //correct++ if right answer is chosen
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        trivia.correct++;
        clearInterval(trivia.timerId);
        $.each(trivia.questions,function(key){
          if(key === 'questionOne') {
          function displayImage() {
            $("#gifs").html("<img src=" + (trivia.gifs)[trivia.currentSet] + " width='400px'>");
          }
          setTimeout(displayImage, 1000)
          }       
         })
        resultId = setTimeout(trivia.guessResult, 1000); 
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      // else incorrect++
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! The right answer was '+ currentAnswer +'</h3>');
        $.each(trivia.questions,function(key){
        if(key === 'questionOne') {
        function displayImage() {
          $("#results").html("<img src=" + (trivia.gifs)[trivia.currentSet] + " width='400px'>");
        }
        setTimeout(displayImage, 1000)
        }       
       })
      }
    },
    // function replaces old questions with new ones
    guessResult : function(){
      trivia.currentSet++;
      $('.option').remove();
      $('#results h3').remove();
      trivia.nextQuestion();
    }
  }
//   made with the help of developer.mozilla, geeksforgeeks, bad stack overflow responses, and mulitple tutorials on reddit/youtube.
// Didn't have time to get gifs working on time.