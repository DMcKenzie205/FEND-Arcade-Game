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

        super (x, y, sprite, sprHeight, sprWidth, collHeight, 
                collWidth, leftWhitespace, bottomWhitespace);

        // Track the player's original starting position for resetting
        this.startingPosition = { x, y }
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
            hasWonGame();
        }
    }

    moveDown() {
        if(this.y + 85 <= 404) {
            this.y += 85;
        }
    }

    update (dt) {
        this.calcCollisionBox();
    }

    reset() {
        this.x = this.startingPosition.x
        this.y = this.startingPosition.y
    }
}