/*/ Define Variables /*/
/*/Player lives, time, score etc/*/
var allEnemies=[];
var player;
var playerScore = 0;
var highScore = 0;
var playerLives = 5; //Set start lives of the player
var enemyYPos = [61,144,227];

/*/Player start position - Middle of width, bottom of height (?) or maybe in the middle tile/*/
//var playerX = 202; // 2*101 - is that the "real" middle?
//var playerY = 400; // top to bottom or bottom to top? if other way around - 415 or something like that //
/*/End player start position/*/

/*/
Player moves between tiles
col * 101, row * 83 1
numRows = 6, numCols = 5,
-> Rows go from 0 - 498, cols from 0 - 505
/*/

/*
var playerXPos = [0, 101, 202, 303, 404];
var playerYPos = [61,144,227,310,393];
*/
/*
var playerTime = 0; // TODO: Find out how time could be counted
var playerLevel = 0; // TODO: Find out how to implement and count playerLevel
*/

function death(){
    player.x = 202; //when the player dies reset the position
    player.y = 400;
    if(playerScore > highScore){
        highScore = playerScore;
    }
    playerScore = 0; //when Player dies reset current points
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -50; //Spawn bugs out of canvas
    this.y = enemyYPos[getRandomInt(0,2)]; // random tile on the canvas along the Y axis
    this.width = 101;
    this.height = 171;
};

var displayScores = function() {
    var playerScoreDisplay = document.getElementById("score");
    playerScoreDisplay.innerHTML = playerScore;

    var hiScoreDisplay = document.getElementById('highscore');
    hiScoreDisplay.innerHTML = highScore;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (dt*getRandomInt(150,300));
    for(var i = 0; i < allEnemies.length; i++){
        if(isCollide(player,allEnemies[i])){
            //console.log("Death reached");
            death();
        }
        //console.log("not death reached");
    }
};
Enemy.prototype.reset = function(){
    this.x = -100;
    this.y = enemyYPos[getRandomInt(0,2)]; // random tile on the canvas along the Y axis
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};


var Player = function() { //same as Enemy
    this.x = 202; //start position of player
    this.y = 400;
    this.sprite = 'images/char-boy.png'; //TODO: Add Selection of player sprite
    this.width = 101;
    this.height = 171;

};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,this.width, this.height);
};

/*/Handle Player movement/*/
//Source1: http://www.dummies.com/programming/programming-games/how-to-check-boundaries-in-your-html5-game/
//Source2: https://groups.google.com/forum/#!topic/fabricjs/Jvo9Z1xNIV8
Player.prototype.handleInput = function(key) {
    if(key === 'up') {
        //checks if player is off the map
        if (player.y - 83 < 0) { //player is in the water
            player.y = 393;
            playerScore += 5;
        }
        else {
            player.y -= 83;
        }
    }else if(key === 'down') {
        if (player.y + 83 > 393) {
            player.y = 393;
        }
        else {
            player.y += 83;
        }
    }else if(key === 'left') {
        if (player.x - 101 < 0) {
            player.x = 0;
        }
        else {
            player.x -= 101;
        }
    }else if(key === 'right') {
        if (player.x + 101 > 404) {
            player.x = 404;
        }
        else {
            player.x += 101;
        }
    }
};

/*/First it runs the deleteOffScreen function to remove all enemies that have moved off screen. I tried resetting the position and spawning extras but that lead to too much clutter and the filling of the screen.
Then it creates a new enemy and afterwards waits between 250 and 1250 ms to call the function again. I found this logic to periodically call functions on stackoverflow (Source near functions)./*/
function createEnemies(){
    deleteOffScreen();
    allEnemies.push(new Enemy());
    // Source: https://stackoverflow.com/questions/1224463/is-there-any-way-to-call-a-function-periodically-in-javascript
    setTimeout(createEnemies,getRandomInt(250,1250));
};

// Source: https://stackoverflow.com/questions/2440377/javascript-collision-detection
/*/The collision was tricky but I found a few helping points while searching for answers.
This functions returns true as long as the player is above, below, to the left or right of the enemy.
 As soon as this isn't the case anymore all checks will return false and a collision will occur/*/
isCollide = function(p,e) {
    return !(
        (p.y + (p.height - 170)) < (e.y) || // check if player is above enemy
        p.y > (e.y+(e.height - 95)) || // check if player is under enemy
        p.x < e.x || //check if player is to the left of enemy
        (p.x + 45) > (e.x + e.width) //check if player is to the right of enemy
    );
}

function deleteOffScreen(){
    for(var i = 0; i< allEnemies.length; i++){
        if(allEnemies[i].y > 505){
            allEnemies.splice(i,1);
        }
    }
}

//Source: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

player = new Player();
//gem = new Gem();
createEnemies();
//displayScores();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]); //Need to Implement this
});