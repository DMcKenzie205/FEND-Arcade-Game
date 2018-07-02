const timers = document.querySelectorAll('.timer');
let seconds = 0;
let timerInterval;
let startTime;

const modal = document.querySelector('.modal');
const button = document.querySelector('#newGameBtn');

button.addEventListener('click', ev => {
    ev.preventDefault();
    toggleModal();
    seconds = 0;
    timers.forEach(timer => updateTimerDisplay(timer))
    player.reset();
});

// Enemies our player must avoid
class CanvasEntity {
    constructor(x, y, sprite, sprHeight, sprWidth, collHeight, 
                collWidth, leftWhitespace, bottomWhitespace) {
        this.spriteBox = {
            x: x,
            y: y,
            height: sprHeight,
            width: sprWidth
        }
        
        this.collisionBox = {
            x: null,
            y: null,
            height: collHeight,
            width: collWidth,
            center: {}
        }

        const collisionBox = this.calcCollisionBox();
        /*this.collisionBox.x = collisionBox.x;
        this.collisionBox.y = collisionBox.y;
        this.collisionBox.center = collisionBox.center;*/
        this.collisionBox = Object.assign(this.collisionBox, collisionBox);
        this.sprite = sprite;
// sprHeight/Width relates to overall image including whitespace
// collHeight/Width relates to the char image within the above

        this.leftWhitespace = leftWhitespace;
        this.bottomWhitespace = bottomWhitespace;

        this.collisionBoxCenter = this.getCenter();
    }

    getPosition() {}

    getCollisionBox() {
    }

    calcCollisionBox() {
        // Working out Collision Box Origin point
        const cbx = this.spriteBox.x + this.leftWhitespace;
        const cby = this.spriteBox.y + this.bottomWhitespace;

        // Working out Collision Box Center Point
        const cbcx = cbx + (this.collisionBox.width / 2);
        const cbcy = cby + (this.collisionBox.height / 2);

        return {
            x: cbx,
            y: cby,
            center: {
                x: cbcx,
                y: cbcy
            }
        };
    }

    getCenter() {
        const x = null;
    }

}

class Enemy extends CanvasEntity {  
    constructor(x, y, speed) {
        x = x || -500;
        y = y || 64;

        const sprite = 'images/enemy-bug.png';
        const sprHeight = 101;
        const sprWidth = 171;
        const collHeight = 65;
        const collWidth = 96;
        const leftWhitespace = 3;
        const bottomWhitespace = 28;

        super (x, y, sprite, sprHeight, sprWidth, collHeight, 
                collWidth, leftWhitespace, bottomWhitespace);

        this.speed = Math.round(Math.random() * 3) + 1;
        this.collisionBox = this.getCollisionBox();
        
        setTimeout(() => {
            this.x = -50;
            this.y = [66, 149, 232][Math.round(Math.random() * 2)];
         }, this.speed * 100);
        
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (dt) {
        this.x = (this.x + dt * this.speed * 150) % (500);
        this.collisionBox = this.getCollisionBox();

        // Detect when the enemy disappears from the RH side of the screen
        if (this.x >= 500) {
            this.x = -100;
        } 
    }
     
    getCollisionBox() {
        return {
            x1 : this.x + (171 -(75 + 31)),
            x2 : this.x + (171 - 31),
            y1 : this.y + (101 - (75 + 17)),
            y2 : this.y + (101 - 17)
        }
    }   


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
class Player extends CanvasEntity {
    constructor(x, y) {
        x = x || 202;
        y = y || 404;

        const sprite = 'images/char-boy.png'
        const sprHeight = 171;
        const sprWidth = 101;
        const collHeight = 75;
        const collWidth = 66;
        const leftWhitespace = 17.5;
        const bottomWhitespace = 31;

        console.log(x, y, sprite, sprHeight, sprWidth, collHeight, 
                collWidth, leftWhitespace, bottomWhitespace);
        super (x, y, sprite, sprHeight, sprWidth, collHeight, 
                collWidth, leftWhitespace, bottomWhitespace);

        }

    update() {
        // this.collisionBox = this.getCollisionBox();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPressed) {
        if (!timerInterval) {
        startTimer();
        }

        switch (keyPressed) {
            case 'left' :
                this.moveLeft();
                break;
            case 'right' :
                this.moveRight();
                break;
            case 'up' :
                this.moveUp();
                break;
            case 'down' :
                this.moveDown();
                break;
        }
    }

    moveLeft() {
        if(this.x - 101 >= 0) {
            this.x -= 101;
        }
    }

    moveRight() {
        if(this.x + 101 <= 404) {
            this.x += 101;
        }
    }

    moveUp() {
        if(this.y - 85 >= -21) {
            this.y -= 85;
            this.winGame();
        }
    }

    moveDown() {
        if(this.y + 85 <= 404) {
            this.y += 85;
        }
    }

    reset() {
        this.x = 202;
        this.y = 404;
    }

    winGame() {
        if(this.y === -21){
            stopTimer();
            toggleModal();

        }
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


function toggleModal() {
    modal.classList.toggle('show-modal');  
}

/* Timer function */
function startTimer() {
    seconds = 0
    timerInterval = setInterval(function() {
        seconds++;
        timers.forEach(timer => updateTimerDisplay(timer))
    }, 1000)
}

function updateTimerDisplay(timer) {
    timer.innerHTML = `${seconds}secs`; 
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = undefined;
}