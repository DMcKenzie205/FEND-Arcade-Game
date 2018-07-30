const timers = document.querySelectorAll('.timer');
let seconds = 0;
let timerInterval;

const modal = document.querySelector('.modal');
const button = document.querySelector('#newGameBtn');

button.addEventListener('click', ev => {
    ev.preventDefault();
    toggleModal();
    seconds = 0;
    timers.forEach(timer => updateTimerDisplay(timer))
    player.reset();
});







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

// Place the player object in a variable called player
const player = new Player(202, 404);

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

function hasWonGame() {
    const winCondition = player.y === -21;

    if (winCondition) {
        stopTimer();
        toggleModal();
    }
  // Returning to help debugging
  return winCondition
}