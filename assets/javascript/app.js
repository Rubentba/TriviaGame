// "Initial Screen"
$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $("#options").on('click' , '.option', trivia.guessChecker);
  })
  var clicked = false;
  // The Game
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
      questionOne: 'What was the only TV show directed by Satochi Kon?',
      questionTwo: 'Who composed the music for the hit show Ghost in the Shell: Stand Alone Complex?',
      questionThree: 'What studio was behind the show Tengen Toppa Gurren Lagann?',
      questionFour: 'What original series came out on 2007 by Stuido Sunrise?'
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
      // Shows game section.
      $('#game').show()
      $('#results').html('')
      $('#timer').text(trivia.timer)
      // Removes start button.
      $('#start').hide()
      $('#remaining-time').show()
      // Asks first question.
      trivia.nextQuestion()
    },
    //Function that will display next question when previous question has been answered. 
    nextQuestion: function(){
      // Set timer to 10 seconds. 15 or 20 seconds proved to be too long.
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      // Stops timer from speeding up.
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
    //Decreases counter and gives unaswered++ if no answer is chosen.
    timerRunning : function(){
      
      // Timer goes down and adds class last second to timer at three seconds left.
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
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] + '.' +'</h3>');
      }
      // If all the questions have been shown end the game, show results.
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // Displays results
        $('#results').html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        // Hide game sction.
        $('#game').hide();
        // Show start button to begin a new game.
        $('#start').show();
      }
    },
    // click functions
    guessChecker : function() {
      if (clicked === false) {
        clicked = true
      // timer ID for gameResult setTimeout.
      var resultId,
      // The answer to the current question being asked.
          currentAnswer = Object.values(trivia.answers)[trivia.currentSet]
      // Correct++ if right answer is chosen.
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        trivia.correct++;
        clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 3000); 
      $('#results').html('<h3>Correct!</h3>').append("<img src=" + (trivia.gifs)[trivia.currentSet] + " width='400px'>");
      }
      // Else incorrect++.
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 3000);
        $('#results').html('<h3>Womp! The right answer was '+ currentAnswer + '.' + '</h3>').append("<img src=" + (trivia.gifs)[trivia.currentSet] + " width='400px'>");
      }
      }

    },
    // Function replaces old questions with new ones and clears results.
    guessResult : function(){
      trivia.currentSet++;
      $('.option').remove();
      $('#results h3').remove();
      $('#results img').remove();
      clicked = false;
      trivia.nextQuestion();
    }
  }
// Made with the help of developer.mozilla, geeksforgeeks, Overflow responses, and mulitple tutorials on Reddit/Youtube.