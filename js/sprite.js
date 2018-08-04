// constructor class for any object
class CanvasEntity {
    constructor(x, y, sprite, width, height, collision) {
        this.sprite = sprite;
        this.position = {
            current: {x, y},
            starting: {x, y}
        }
        this.dimensions = { width, height};
        this.collision = collision;
    }

    getCollisionDimensions() {
        return {
            height: this.collision.height,
            width: this.collision.width
        }
    }

    getCollisionOffset() {
        return this.collision.offset;
    }

    getCurrentPosition() {
        return this.position.current;
    }

    getHeight() {
        return this.dimensions.height;
    }

    getWidth() {
        return this.dimensions.width;
    }

    getStartingPosition() {
        return this.position.starting;
    }

    hasCollidedWith(otherSprite) {
        //Set the variables needed for the collision calculation
        const myPosition = this.getCurrentPosition();
        const myOffset = this.getCollisionOffset();
        const myDimensions = this.getCollisionDimensions();

        const otherPosition = otherSprite.getCurrentPosition();
        const otherOffset = otherSprite.getCollisionOffset();
        const otherDimensions = otherSprite.getCollisionDimensions();

        const myX = myPosition.x + myOffset.x;
        const myY = myPosition.y + myOffset.y;

        const otherX = otherPosition.x + otherOffset.x;
        const otherY = otherPosition.y + otherOffset.y;

        // Referenced from: https://gamedev.stackexchange.com/a/587
        return ((Math.abs(myX - otherX) * 2) < (myDimensions.width + otherDimensions.width)) &&
               ((Math.abs(myY - otherY) * 2) < (myDimensions.height + otherDimensions.height))
        }

    setCurrentPosition(x, y) {
        this.position.current.x = x;
        this.position.current.y = y;
    }

    // Draw the entity on the screen, required method for game
    render () {
        const {x, y} = this.getCurrentPosition();
        ctx.drawImage(Resources.get(this.sprite), x, y);
    }
}

