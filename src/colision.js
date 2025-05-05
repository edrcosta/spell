import Spell from '.';

export default class SpellColision {
    elements = {};

    addElement (id) {
        this.elements[id] = {
            position: { x: 0, y: 0 },
            size: { width: 0, height: 0 }
        };
    }

    throwIfNotFound (id) {
        if (typeof this.elements[id] === 'undefined') {
            throw new Error(`SPELL: colision element "${id}" not found`);
        }
    }

    isOnScreen = (id) => {
        this.throwIfNotFound(id);
        return this.elements[id].position.x !== false && this.elements[id].position.y !== false;
    };

    setPosition (id, position) {
        this.throwIfNotFound(id);
        let { x, y } = position;

        if (x > (Spell.window.horizontal(100) + 200) || x < -200) { x = false; }; // Out of screen
        if (y > (Spell.window.vertical(100) + 200) || y < -200) { y = false; }; // Out of screen

        this.elements[id].position = { x, y };
    }

    setSize (id, size) {
        this.throwIfNotFound(id);
        const { width, height } = size;
        this.elements[id].size = { width, height };
    }

    debug (id, displayName) {
        this.throwIfNotFound(id);
        if (this.isOnScreen(id)) {
            const element = this.elements[id];
            Spell.canvas.currentLayer = 10;

            Spell.canvas.drawPixel({ ...element.position, ...element.size, color: 'red' });

            if (displayName) {
                Spell.canvas.drawText({
                    text: id,
                    color: 'yellow',
                    size: 15,
                    position: {
                        x: element.position.x - (element.size.width / 2),
                        y: element.position.y - (element.size.height / 2)
                    }
                });
            }
        }
    }

    isColidingHorizontal = (a, b) => a.position.x < b.position.x + b.size.width && a.position.x + a.size.width > b.position.x;

    isColidingVertical = (a, b) => a.position.y < b.position.y + b.size.height && a.size.height + a.position.y > b.position.y;

    checkBoxColision (aId, bId) {
        this.throwIfNotFound(aId);
        this.throwIfNotFound(bId);

        if (this.isOnScreen(aId) && this.isOnScreen(bId)) {
            const a = this.elements[aId];
            const b = this.elements[bId];
            return this.isColidingHorizontal(a, b) && this.isColidingVertical(a, b);
        }
        return false;
    }

    checkBoxColisionHorizontal (aId, bId) {
        this.throwIfNotFound(aId);
        this.throwIfNotFound(bId);

        if (this.isOnScreen(aId) && this.isOnScreen(bId)) {
            return this.isColidingHorizontal(this.elements[aId], this.elements[bId]);
        }
        return false;
    }

    isLocationInsideSquare (x, y, squareW, squareH, squareX, squareY) {
        // Check if point (x,y) is inside the bounds of the square
        return x >= squareX &&
               x <= squareX + squareW &&
               y >= squareY &&
               y <= squareY + squareH;
    }

    isSquareInsideSquare (x1, y1, x2, y2, w1, h1, w2, h2) {
        // Check if any corner of square1 is inside square2
        const square1Corners = [
            [x1, y1], // Top-left
            [x1 + w1, y1], // Top-right
            [x1, y1 + h1], // Bottom-left
            [x1 + w1, y1 + h1] // Bottom-right
        ];

        // Check if any corner of square1 is inside square2
        for (const [cornerX, cornerY] of square1Corners) {
            if (this.isLocationInsideSquare(cornerX, cornerY, w2, h2, x2, y2)) {
                return true;
            }
        }

        // Check if any corner of square2 is inside square1
        const square2Corners = [
            [x2, y2], // Top-left
            [x2 + w2, y2], // Top-right
            [x2, y2 + h2], // Bottom-left
            [x2 + w2, y2 + h2] // Bottom-right
        ];

        for (const [cornerX, cornerY] of square2Corners) {
            if (this.isLocationInsideSquare(cornerX, cornerY, w1, h1, x1, y1)) {
                return true;
            }
        }

        return false;
    }
}
