var started = false;
var userClickedButtons = [];
var colorSequence = [];
var colors = ["red", "green", "blue", "yellow"];
var level = 0;

$("body").keypress(function () {
	if (!started) {
		started = true;
		game();
	}
});
$("button").click(userClick);

function userClick() {
	clickButton($(this));
	userClickedButtons.push($(this).attr("id"));
	console.log(userClickedButtons);
	checkUserAnswer(userClickedButtons.length);
}

function clickButton(activeButton) {
	activeButton.addClass("click");
	setTimeout(function () {
		activeButton.removeClass("click");
	}, 200);
	playSound(activeButton.attr("id"));
}

function colorGenerator() {
	var randomInt = Math.floor(Math.random() * 4);
	return colors[randomInt];
}

function checkUserAnswer(currentLevel) {
	if (
		userClickedButtons[currentLevel - 1] === colorSequence[currentLevel - 1]
	) {
		if (currentLevel === level) {
			setTimeout(game, 1000);
		}
	} else {
		restart();
	}
}

function game() {
	userClickedButtons = [];
	level++;
	$("h1").text("Level " + level);
	var tempColor = colorGenerator();
	colorSequence.push(tempColor);
	clickButton($("#" + tempColor));
}

function restart() {
	$("body").addClass("wrong");
	playSound("wrong");
	setTimeout(function () {
		$("body").removeClass("wrong");
	}, 200);
	level = 0;
	userClickedButtons = [];
	colorSequence = [];
	started = false;
	$("h1").text("Game Over! Press Any Key to restart.");
}

function playSound(soundID) {
	var sound = new Audio("sounds\\" + soundID + ".mp3");
	sound.play();
}
