/*/ Define Variables /*/
/*/Player lives, time, score etc/*/
var allEnemies=[];
var playerScore = 0;
var highScore = 0;
//var playerLives = 5; //Set start lives of the player //TODO: Add playerLives system and game over
var ENEMYPOS = [61,144,227];
/*/
var playerTime = 0; // TODO: Find out how time could be counted
var playerLevel = 0; // TODO: Find out how to implement and count playerLevel
/*/
// Display the Scores on the Site
function displayScores() {
    var spans = document.getElementsByTagName("span");
    spans[0].innerHTML = playerScore;
    spans[1].innerHTML = highScore;
}

//Player function
var Player = function() { //same as Enemy
    this.x = 202; //start position of player
    this.y = 393;
    this.sprite = 'images/char-boy.png'; //TODO: Add Selection of player sprite
    this.width = 101;
    this.height = 171;
};

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -70; //Spawn bugs out of canvas
    this.y = ENEMYPOS[getRandomInt(0,2)]; // random tile on the canvas along the Y axis
    this.width = 101;
    this.height = 171;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (dt*getRandomInt(150,300));
    for(var i = 0,arrlen = allEnemies.length; i < arrlen; i++){
        if(isCollide(player,allEnemies[i])){
            player.death();
        }
    }
    displayScores();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

// If collision occured: reset player position and reset scoreboard and write highscore
Player.prototype.death = function(){
    this.x = 202; //when the player dies reset the position
    this.y = 400;
    if(playerScore > highScore){
        highScore = playerScore;
    }
    playerScore = 0; //when Player dies reset current points
    console.log(highScore); //debug
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,this.width, this.height);
};

/*/Handle Player movement/*/
//Source1: http://www.dummies.com/programming/programming-games/how-to-check-boundaries-in-your-html5-game/
//Source2: https://groups.google.com/d/msg/fabricjs/Jvo9Z1xNIV8/o3qCz6KgpSQJ
Player.prototype.handleInput = function(key) {
    if(key === 'up') {
        //checks if player is off the map
        if (this.y < 83) { //player is in the water
            this.y = 393;
            playerScore += 5;
            console.log(playerScore); //debug
        }
        else {
            this.y -= 83;
        }
    }else if(key === 'down') {
        if (this.y > 392) {
            this.y = 393;
        }
        else {
            this.y += 83;
        }
    }else if(key === 'left') {
        if (this.x  < 1) {
            this.x = 0;
        }
        else {
            this.x -= 101;
        }
    }else if(key === 'right') {
        if (this.x > 403) {
            this.x = 404;
        }
        else {
            this.x += 101;
        }
    }
};

/*/First it runs the deleteOffScreen function to remove all enemies that have moved off screen. I tried resetting the position and spawning extras but that lead to to problems with clutter and latency.
Then it creates a new enemy and afterwards waits between 250 and 1250 ms to call the function again. I found this logic to periodically call functions on stackoverflow (Source near functions)./*/
function createEnemies(){
    deleteOffScreen();
    allEnemies.push(new Enemy());
    // Source: https://stackoverflow.com/questions/1224463/is-there-any-way-to-call-a-function-periodically-in-javascript
    setTimeout(createEnemies,getRandomInt(250,1250));
}

// Source: https://stackoverflow.com/questions/2440377/javascript-collision-detection
/*/The collision was tricky but I found a few helping points while searching for answers.
This functions returns true as long as the player is above, below, to the left *or* right of the enemy.
 As soon as  all checks will return false a collision ´has occured/*/
isCollide = function(p,e) {
    return !(
        (p.y + (p.height - 170)) < (e.y) ||
        p.y > (e.y+(e.height - 95)) ||
        (p.x+45) < e.x ||
        (p.x + 45) > (e.x + e.width)
    );
};
//As soon as the beetle moved off screen it is being removed from the game. This is to allow new ones to be spawned
//Source: https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript Tbh I knew how to remove elements from array but just forgot!
function deleteOffScreen(){
    for(var i = 0, allLen = allEnemies.length; i< allLen; i++){
        if(allEnemies[i].y > 505){
            allEnemies.splice(i,1);
        }
    }
}

//Source: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//player = new gameObject(202,393,'images/char-boy.png',101,171);
var player = new Player();

createEnemies();

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