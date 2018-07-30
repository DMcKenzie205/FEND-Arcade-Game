class Enemy extends CanvasEntity {  
    constructor() {
        const sprite = 'images/enemy-bug.png';
        const x = 50;

        // Randomise the enemy start row to one of three
        const y = (() => [66, 149, 232][Math.round(Math.random() * 2)])();
        const width = 171;
        const height = 101;
        const collision = {
            offset: {
                x: 50,
                y: 61
            },
            width: 98,
            height: 33
        }

        super (x, y, sprite, height, width, collision);

        // Randomise enemy speed
        this.speed = Math.round(Math.random() * 3) + 1;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        const {x, y} = this.getCurrentPosition();
        let newX;
        if (x >= 500) {
            newX = -100;
        } else {
            newX = (x + dt * this.speed * 150) % (500)
        }

        this.setCurrentPosition(newX, y);
    }
}