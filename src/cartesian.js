export default class SpellCartesian {
    // get conners x,y position of a given square based on the center and the size
    getSquareCorners (centerX, centerY, size) {
        const halfSize = size / 2;
        return {
            topLeft: { x: centerX - halfSize, y: centerY - halfSize },
            bottomRight: { x: centerX + halfSize, y: centerY + halfSize }
        };
    }

    // check if a given x, y position in a 2d array is at the "center"
    isPointAtCenter (matrix, point) {
        const centerX = Math.floor(matrix[0].length / 2);
        const centerY = Math.floor(matrix.length / 2);

        const [x, y] = point;
        return x === centerX && y === centerY;
    }

    // check if a given x, y coornate is inside a square given the square size and center position
    isPointInsideSquare (x, y, centerX, centerY, size) {
        const { topLeft, bottomRight } = this.getSquareCorners(centerX, centerY, size);
        return x >= topLeft.x && x <= bottomRight.x && y >= topLeft.y && y <= bottomRight.y;
    }

    // well... do what the name says
    isPointOnLine (x, y, x1, y1, x2, y2) {
        const dx = x2 - x1; const dy = y2 - y1;
        const isOnLine = (x - x1) * dy === (y - y1) * dx;
        const isWithinBoundingBox = (x >= Math.min(x1, x2) && x <= Math.max(x1, x2)) &&
                                        (y >= Math.min(y1, y2) && y <= Math.max(y1, y2));
        return isOnLine && isWithinBoundingBox;
    }

    // this too
    getTriangleCorners (x1, y1, x2, y2, x3, y3) {
        return { vertex1: { x: x1, y: y1 }, vertex2: { x: x2, y: y2 }, vertex3: { x: x3, y: y3 } };
    }

    // ...
    isPointInsideTriangle (x, y, x1, y1, x2, y2, x3, y3) {
        const area = 0.5 * Math.abs(
            x2 * y3 - x3 * y2 -
                x1 * y3 + x3 * y1 +
                x1 * y2 - x2 * y1
        );

        const area1 = 0.5 * Math.abs(
            x * y3 - x3 * y -
                x * y2 + x2 * y +
                x3 * y2 - x2 * y3
        );

        const area2 = 0.5 * Math.abs(
            x1 * y - x * y1 -
                x1 * y3 + x3 * y1 +
                x * y3 - x3 * y
        );

        const area3 = 0.5 * Math.abs(
            x1 * y2 - x2 * y1 -
                x1 * y + x * y1 +
                x2 * y - x * y2
        );

        return Math.abs(area1 + area2 + area3 - area) < 1e-6;
    }

    isPointInsideCircle (x, y, centerX, centerY, radius) {
        const distanceSquared = (x - centerX) ** 2 + (y - centerY) ** 2;
        return distanceSquared <= radius ** 2;
    }
}
