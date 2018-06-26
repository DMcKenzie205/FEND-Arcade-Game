// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    constructor(x, y, speed) {
        
        this.speed = Math.round(Math.random() * 3) + 1;
        
        setTimeout(() => {
            this.x = -50;
            this.y = [66, 149, 232][Math.round(Math.random() * 2)];
         }, this.speed * 100);
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (dt) {
        this.x = (this.x + dt * this.speed * 150) % (500);
        // Detect when the enemy disappears from the RH side of the screen
        if (this.x >= 500) {
            this.x = -100;
        }
        

    };

    // Draw the enemy on the screen, required method for game
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    reset () {
        this.speed = Math.round(Math.random() * 2) + 1;
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.sprite = 'images/char-boy.png'
        this.x = 202;
        this.y = 404;
    }

    update(x, y) {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPressed) {
        if(keyPressed === 'left') {
            this.x -= 101;
        } else if(keyPressed === 'down') {
            this.y += 85;
        } else if(keyPressed === 'right') {
            this.x += 101;
        } else if(keyPressed === 'up') {
            this.y -= 85;
        }

    }

    reset() {
        this.x = 202;
        this.y = 404;
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];

for(let i = 0; i < 4; i++){
    allEnemies[i] = new Enemy();
    setInterval(() => {
        if(allEnemies[0].x > 450){
            allEnemies[allEnemies.length] = new Enemy();
            allEnemies.splice(0, 1);
        }
    }, 200)
}

/*const enemy1 = new Enemy(60, 60, 75);
allEnemies.push(enemy1);
const enemy2 = new Enemy(100, 225, 25);
allEnemies.push(enemy2);*/
// Place the player object in a variable called player

const player = new Player();


// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', e => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});

