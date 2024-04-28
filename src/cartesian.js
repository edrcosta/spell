export default class SpellCartesian {
    getSquareCorners (centerX, centerY, size) {
        const halfSize = size / 2;

        return {
            topLeft: { x: centerX - halfSize, y: centerY - halfSize },
            topRight: { x: centerX + halfSize, y: centerY - halfSize },
            bottomRight: { x: centerX + halfSize, y: centerY + halfSize },
            bottomLeft: { x: centerX - halfSize, y: centerY + halfSize }
        };
    }

    isOnSquare (x, y, size, squareX, squareY) {
        const squareRightX = squareX + size;
        const squareBottomY = squareY + size;
        return x >= squareX && x <= squareRightX && y >= squareY && y <= squareBottomY;
    }

    isOnCircle (x, y, circleX, circleY, radius) {
        const distanceSquared = Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2);

        return distanceSquared <= Math.pow(radius, 2);
    }
}
