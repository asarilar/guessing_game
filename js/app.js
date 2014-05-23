$(document).ready(function(){
	 
	var answer, chances, guessArray;
	

	function guess(){
		return $("input").val();
	};

	function highLow(){		
		if (guess() > answer){
			return "Lower.";		
		} else {
			return "Higher.";
		};
	};

	function heat(){
		if (Math.abs(answer - guess()) > 10){
			return "Cold. ";
		} else {
			return "Hot. ";		
		};
	};

	function heatDifference(){
		if (guessArray.length == 1){
			return "";
		} else if(Math.abs(answer - parseInt(guessArray[guessArray.length - 1])) >
							Math.abs(answer - parseInt(guessArray[guessArray.length - 2]))){
			return "Colder. ";
		} else {
			return "Hotter. ";
		};
	};

	function duplicationTest(){
		for(var i = 0; i <= guessArray.length; i++){
			if (guess() == guessArray[i]){
				return true;
			};
		};
	};

	function result(){		
		if (isNaN(guess()) || guess() < 1 || guess() > 100) {
			$("#result").text("invalid entry");
		} else {			
			if (guess() == answer){			
				restart();
				$("#result").text("Correct!");		
				$("#guess").val("");
			} else if (duplicationTest()){
					$("#repeatGuess").text("you already guessed this.");
					$("#result").text(heat() + "Chances = " + 
									chances + " " + 
									highLow() + " " + 
									heatDifference());
					$("#guessTracker").text(guessArray.toString());
					$("#guess").val("");
			}	else {	
				chances--;
				guessArray.push(guess());
				$("#repeatGuess").text("");
				$("#result").text(heat() + "Chances = " + 
								chances + " " + 
								highLow() + " " + 
								heatDifference());
				$("#guessTracker").text(guessArray.toString());
				$("#guess").val("");
			};
		}; 
	};

	function restart(){
		answer = Math.floor(Math.random() * 100 + 1);
		chances = 5;	
		guessArray = [];
		$("#guessTracker").text("");
		$("#repeatGuess").text("");
		$("#guess").val("");
	};


	// initialize variables
	restart();

	// Submit button click funtionality
	$("#submit").click(function(){
		
		result();
		
		if (chances == 0){			
			$("#result").text("Game over. Correct answer = " + answer);
  		restart();	
  	};
  });


	// Restart button functionality
  $("#restart").click(function(){  	
  	restart();
  	$("#result").text("Restarted.");

  });

});
