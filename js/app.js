// https://stackoverflow.com/questions/17484227/javascript-improved-native-for-loop

const timers = document.querySelectorAll('.timer');
let seconds = 0;
let timerInterval;

const modal = document.querySelector('.modal');
const button = document.querySelector('#newGameBtn');

// Place all enemy objects in an array called allEnemies
const allEnemies = [];

// Add newly created enemy from enemy.js to allEnemies array
allEnemies.push(new Enemy());

// Place the player object in a variable called player
const player = new Player();

// Check if the player has reached the final row
function playerHasWon () {
    return player.getCurrentPosition().y === -11
}

// Check each enemy object for a collision with the player object
function checkCollisions() {
    for (let i = allEnemies.length - 1; i >= 0; i--) {
        if (allEnemies[i].hasCollidedWith(player)) {
            return true;
        }
    }
    return false;
}

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

    if (playerHasWon()) {
        stopTimer();
        toggleModal();
    }
});


function toggleModal() {
    modal.classList.toggle('show-modal');  
}

button.addEventListener('click', ev => {
    ev.preventDefault();
    toggleModal();
    seconds = 0;
    timers.forEach(timer => updateTimerDisplay(timer))
    player.reset();
});

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