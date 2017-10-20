/*/ Define Variables /*/

var allEnemies=[];
var gem;
var player;
var playerScore = 0;
var highScore = 0;

/*/Player start position - Middle of width, bottom of height (?) or maybe in the middle tile/*/
//var playerX = 202; // 2*101 - is that the "real" middle?
//var playerY = 400; // top to bottom or bottom to top? if other way around - 415 or something like that //
/*/End player start position/*/

/*/Player moves between tiles
 col * 101, row * 83 1
 numRows = 6, numCols = 5,
 -> Rows go from 0 - 498, cols from 0 - 505

 /*/
var playerXPos = [0, 101, 202, 303, 404];
var playerYPos = [61,144,227,310,393];
var enemyYPos = [61,144,227];
/*/

/*/

/*/Player lives, time, score etc/*/
var playerLives = 5; //Set start lives of the player

var playerTime = 0; // Find out how time could be counted
var playerLevel = 0; // Find out how to implement and count playerLevel

function death(){
    playerX = 202; //when the player dies reset the position
    playerY = 400;
    playerLives--; //substract a live
    document.getElementById("lives").innerHTML = playerLives; // Show playerLives under Gameboard
    if(playerLives === 0){
        //Display Message that player is dead and add a play again button
        document.write("<h1>GAME OVER</h1><br /><h3>Click here to play again / Replay Button</h3>")
    }
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
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // death of player

    // The enemies should move along a line on the X axis
    this.x += (dt*50);

    // We need to find out if x of player is the same as enemy

    //If enemy moves to end of frame/out of frame, reset position (?) or create new
    if(this.x > 404){
        this.reset();
    }
};
Enemy.prototype.reset = function(){
    this.x = -50;
    this.y = enemyYPos[getRandomInt(0,2)]; // random tile on the canvas along the Y axis
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() { //same as Enemy
    this.x = 202; //start position of player
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Gem = function() {
    this.sprite = 'images/GemBlue.png';
    this.x = 202;
    this.y = enemyYPos[getRandomInt(0,2)];
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            //checks if player is off the map
            if (player.y === 55) {
                player.reset();
            }
            else {
                player.y -= 85;
            }
            break;
        case 'down':
            if (player.y === 395) {
                player.reset();
            }
            else {
                player.y += 85;
            }
            break;
        case 'left':
            if (player.x === 0) {
                player.reset();
            }
            else {
                player.x -= 100;
            }
            break;
        case 'right':
            if (player.x === 400) {
                player.reset();
            }
            else {
                player.x += 100;
            }

            break;
    }
};

function createEnemies(){
    var endRandom = getRandomInt(5,7);
    for(var i = 0; i < endRandom; i++){
        allEnemies.push(new Enemy());
    }
}

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




player = new Player();
gem = new Gem();
createEnemies();





function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
} //Source: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range