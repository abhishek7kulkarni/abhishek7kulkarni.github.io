console.log("Welcome to Console...");

var timeOut;
var speed = 50;

var GRID_SIZE = 1600;
var X = 40;
var Y = 40;

var x = new Array(X);
for (var i = 0; i < x.length; i++) {
	x[i] = new Array(X);
}

var box = '<div class="box" />';

for(var i = 0; i<GRID_SIZE;i++){
	$('#grid').append(box);
}

var rangeInput = document.getElementById("myRange");
rangeInput.addEventListener('mouseup', function() {
	speed = this.value;
});


function init() {
	for (var i = 0; i < X; i++)
	{
		for (var j = 0; j < Y; j++)
		{
			if (Math.random() > 0.2)
				x[i][j] = 0;
			else
				x[i][j] = 1;
		}
	}
	
	document.getElementById("stop").disabled = true;
	
	updateUI();
}

function updateUI() {
	for (var i = 0; i < X; i++)
	{
		for (var j = 0; j < Y; j++)
		{
			var myvar = (i*X)+j;
			if (x[i][j] == 1)
			{
				document.getElementsByClassName("box")[myvar].style.background = "grey";
			}	
			else
			{
				document.getElementsByClassName("box")[myvar].style.background = "white";
			}
		}
	}
}

function start() {
	
	document.getElementById("start").disabled = true;
	document.getElementById("stop").disabled = false;
	
	y = JSON.parse(JSON.stringify(x));
	
	for (var i = 0; i < X; i++)
	{
		for (var j = 0; j < Y; j++)
		{
			if (x[i-1] === undefined)
				x[i-1] = 0;
			if (x[i+1] === undefined)
				x[i+1] = 0;
			
			var nei_sum = 	x[i-1][j] +
							x[i][j-1] +
							x[i+1][j] +
							x[i][j+1] +
							
							x[i-1][j-1] +
							x[i-1][j+1] +
							x[i+1][j-1] +
							x[i+1][j+1];
							
			if (x[i][j] == 1)
			{
				if(nei_sum == 2 || nei_sum == 3)
				{
					y[i][j] = 1;
				}
				else
				{
					y[i][j] = 0;
				}
			}
			else if (x[i][j] == 0 && nei_sum == 3)
			{
				y[i][j] = 1;
			}
			else
				y[i][j] = x[i][j];
		}
	}

	//console.log(JSON.stringify(x) === JSON.stringify(y));
	
	x = JSON.parse(JSON.stringify(y));
	
	updateUI();
	
	timeOut = setTimeout(start, speed);
}

function stop() {
	document.getElementById("start").disabled = false;
	document.getElementById("stop").disabled = true;
	clearTimeout(timeOut);
}