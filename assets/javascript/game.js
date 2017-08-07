$(document).ready(function() {

	var attackerSet = false;
	var defenderSet = false;
	// Store the index of player
	var attacker;
	var defender;
	var numAttack = 0;

	// Create the game character objects and store in array
	var player = [4];

	player[0] = {
		name: "Bowser",
		index: 0,
		hp: 100,
		ap: 5,
		type: "opponent",
		pic: "assets/images/bowser.png"
	};

	player[1] = {
		name: "Goomba",
		index: 1,
		hp: 100,
		ap: 10,
		type: "opponent",
		pic: "assets/images/goomba.png"
	};

	player[2] = {
		name: "Mario",
		index: 2,
		hp: 100,
		ap: 15,
		type: "opponent",
		pic: "assets/images/mario.png"
	};

	player[3] = {
		name: "Luigi",
		index: 3,
		hp: 100,
		ap: 20,
		type: "opponent",
		pic: "assets/images/luigi.png"
	};

	// Create variables to store calls to HTML elements
	var attackImg = $();
	var defendField;
	var opponentPanel = $("#opponent-panel");
	var infoField;

	// Place opponents on opponent panel
	printOpponents();

	// Select Players
	$(".player-image").on("click", function(){
		var tempPlayer = this;
		var index = $(this).attr("index");

		// Do nothing if attacker and defender already chosen
		if (attackerSet && defenderSet) {
			return;
		}
		else if (attackerSet && !defenderSet){
			// Set defender variables
			defenderSet = true;
			defender = index;
			player[index].type = "defender";

			// Update HTML
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
			
			// update html elements
			$("#attack-name").html(player[index].name);
			$("#attack-img").html(tempPlayer);
			printAttackerStats();
			$("#battle-stats").html("Choose an opponent.");
			$("#opponent-title").html("Opponents");	
			$("#battlefield").removeClass("hidden");
			
			// Turn off onlcick functionality
			$(this).off();
		}
	});

	// Attack defender


	 // FUNCTIONS \\

	// prints the attacker stats to html
	function printAttackerStats(){
console.log("printAttackerStats(): HP %s Power %s", player[attacker].hp, player[attacker].ap);
		$("#attack-hp").html(player[attacker].hp);
		$("#attack-ap").html(player[attacker].ap);
	}
	// prints the defender stats to html
	function printDefenderStats(){
console.log("printAttackerStats(): HP %s Power %s", player[defender].hp, player[defender].ap);
		$("#defend-hp").html(player[defender].hp);
		$("#defend-ap").html(player[defender].ap);
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
