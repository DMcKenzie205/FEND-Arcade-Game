class Enemy extends CanvasEntity {  
    constructor(x, y, speed) {
        x = x || -50;
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

        // Randomise enemy speed
        this.speed = Math.round(Math.random() * 3) + 1;
        this.collisionBox = Object.assign(this.collisionBox, 
                            this.calcCollisionBox())     

        // Randomise enemy track position
        setTimeout(() => {
            this.x = -50;
            this.y = [66, 149, 232][Math.round(Math.random() * 2)];
         }, this.speed * 100);     
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (dt) {
        this.x = (this.x + dt * this.speed * 150) % (500);

        // Detect when the enemy disappears from the RH side of the screen
        if (this.x >= 500) {
            this.x = -100;
        }

        this.calcCollisionBox(); 
    }
     
    // Draw the enemy on the screen, required method for game
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    reset () {
        this.speed = Math.round(Math.random() * 2) + 1;
    }
}