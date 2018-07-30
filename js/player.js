// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends CanvasEntity {
    constructor() {
        const sprite = 'images/char-boy.png';
        const x = 202;
        const y = 404;
        const width = 101;
        const height = 171;

        const collision = {
            offset: {
                x: 51,
                y: 70
            },
            width: 33.5,
            height: 38
        }


        super (x, y, sprite, height, width, collision);
    }

    // Take the keypress as per app.js and instruct how to move the player
    handleInput(direction) {
        if (!timerInterval) { startTimer(); };

        const {x, y} = this.getCurrentPosition();
        switch (direction) {
            case 'left': this.moveLeft(x, y); break;
            case 'right': this.moveRight(x, y); break;
            case 'up': this.moveUp(x, y); break;
            case 'down': this.moveDown(x, y); break;
        }
    }

    moveLeft(x, y) {
        if(x - 101 >= 0) {
            this.update(x - 101, y);
        }
    }

    moveRight(x, y) {
        if(x + 101 <= 404) {
            this.update(x + 101, y);
        }
    }

    moveUp(x, y) {
        if(y - 83 >= -21) {
            this.update(x, y - 83);
        }
    }

    moveDown(x, y) {
        if(y + 83 <= 404) {
            this.update(x, y + 83);
        }
    }

    update(x, y) {
        const currentPosition = this.getCurrentPosition();
        x = x !== undefined ? x : currentPosition.x;
        y = y !== undefined ? y : currentPosition.y;

        this.setCurrentPosition(x, y);
    }

    reset(x, y) {
        this.update(202, 404);
    }
}