// Enemies our player must avoid
class CanvasEntity {
    constructor(x, y, sprite, width, height, collision) {
        this.sprite = sprite;
        this.position = {
            current: {x, y},
            starting: {x, y}
        }
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
        }
    }

    // Draw the enemy on the screen, required method for game
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}