$(document).ready(function() {

	var attackerSet = false;
	var defenderSet = false;
	// Store the index of player
	var attacker;
	var defender;
	var numAttack = 0;
	var numOpponents = 3;

	// Create the game character objects and store in array
	var player = [4];

	player[0] = {
		name: "Bowser",
		index: 0,
		hp: 25,
		ap: 6,
		cap: 9,
		type: "opponent",
		action: " throws fire at ",
		pic: "assets/images/bowser.png"
	};

	player[1] = {
		name: "Goomba",
		index: 1,
		hp: 34,
		ap: 5,
		cap: 5,
		type: "opponent",
		action: " runs into ",
		pic: "assets/images/goomba.png"
	};

	player[2] = {
		name: "Mario",
		index: 2,
		hp: 28,
		ap: 4,
		cap: 10,
		type: "opponent",
		action: " shoots a fireball at ",
		pic: "assets/images/mario.png"
	};

	player[3] = {
		name: "Luigi",
		index: 3,
		hp: 30,
		ap: 3,
		cap: 12,
		type: "opponent",
		action: " throws a shell at ",
		pic: "assets/images/luigi.png"
	};

	// Create variables to store calls to HTML elements
	var opponentPanel = $("#opponent-panel");
	var infoField = $("#battle-stats");

	// Place opponents on opponent panel
	printOpponents();

	// Select Players
	$(".player-image").on("click", function(){
		var tempPlayer = this;
		var index = $(this).attr("index");
		$(tempPlayer).css("margin", "0px auto 20px auto");

		// Do nothing if attacker and defender already chosen
		if (attackerSet && defenderSet) {
			return;
		}
		else if (attackerSet && !defenderSet){
			// Set defender variables
			defenderSet = true;
			defender = index;
			player[index].type = "defender";

			// Add Attack button
			var btn = $("<button>");
			btn.addClass("btn btn-lg btn-danger");
			btn.attr("type", "button");
			btn.attr("value", "Attack");
			btn.text("Attack");
			$("#attack-btn").html(btn);

			// Update HTML
			$("#battle-stats").html("Battle your opponent.");
			$("#defend-name").html(player[index].name);
			$("#defend-img").html(tempPlayer);
			$("#defender-stats").removeClass("hidden");
			printDefenderStats();

			// Turn off onclick functionality
			$(this).off();
		}
		else { 
			// Set attacker variables
			attackerSet = true;
			attacker = index;
			player[index].type = "attacker";
			numAttack = player[index].ap;
			
			// update html elements
			$("#attack-name").html(player[index].name);
			$("#attack-img").html(tempPlayer);
			printAttackerStats();
			$("#battle-stats").html("Choose an opponent.");
			$("#opponent-title").html("Opponents");	
			$("#game-board").removeClass("hidden");

			
			// Turn off onlcick functionality
			$(this).off();
		}
	});

	// Attack defender
	$("#attack-btn").on("click", function(){
		// Attack opponent
		player[defender].hp -= player[attacker].ap;
		printDefenderStats();
		if(player[defender].hp <= 0) {
			// You defeated the opponent
			numOpponents --;
			player[attacker].ap += numAttack;
			printAttackerStats();
			if(numOpponents > 0){
				// Choose another opponent
				defenderSet = false;
				$("#attack-btn").empty();
				// update html to choose another player
				$("#battle-stats").html("Choose your next opponent");
			}
			else {
				// You defeated all opponents. You win!
				$("#battlefield").html("<h3>You win!</h3>");
			}
		}
		else {
			// Counter-Attack
			player[attacker].hp -= player[defender].cap;
			player[attacker].ap += numAttack;
			printAttackerStats();
			if (player[attacker].hp <= 0) {
				// You died. Game over
				$("#battlefield").html("<h3>Game over!</h3>");
			}
		}
	});


	 // FUNCTIONS \\

	// prints the attacker stats to html
	function printAttackerStats(){
		$("#attack-hp").html(player[attacker].hp);
		$("#attack-ap").html(player[attacker].ap);
	}
	// prints the defender stats to html
	function printDefenderStats(){
		$("#defend-hp").html(player[defender].hp);
		$("#defend-ap").html(player[defender].cap);
	}
	// prints the opponent field
	function printOpponents(){
		opponentPanel.empty();
		for(var i = 0; i < player.length; i++) {
			if (player[i].type == "opponent"){
				var image = $("<img>");
				image.addClass("thumbnail player-image img-responsive");
				image.attr("src",player[i].pic);
				image.attr("index", player[i].index);
				opponentPanel.append(image);
			}
		}
	}


	// Creates a Panel header and body and assigns the title of the panel header and the id tag
	function createPanel(title, titleIdName, bodyIdName){
		var panel = 
			"<div class=\"panel panel-default\">" +
			  "<div class=\"panel-heading\">" +
			    "<h3 class=\"panel-title id=" + titleIdName +">" + title + "</h3>" +
			  "</div>" +
			  "<div class=\"panel-body id=" + bodyIdName + "></div>" +
			"</div>"
		;
		return panel;
	}
});
