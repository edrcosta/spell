import Spell from '.';

export default class SpellMap {
    map;
    mapObjects = {};
    tileObjects = {};
    tileSize = 0;
    position = { x: 0, y: 0 };
    debugColor = 'red';

    create (rowNumber, colNumber, tileSize) {
        this.tileSize = tileSize;
        this.map = [];

        for (let y = 0; y < rowNumber; y++) {
            this.map[y] = [];
            for (let x = 0; x < colNumber; x++) { this.map[y][x] = 0; };
        }
    }

    setPosition ({ x, y }) {
        this.position = { x, y };
    }

    mapTile (id, position) {
        this.map[position.y][position.x] = id;
    }

    setMap (map) {
        this.map = map;
    }

    addTile (sprite, id, center, margin) {
        this.tileObjects[id] = {
            sprite: sprite.clone(),
            center: center || false,
            margin: typeof margin !== 'undefined' ? margin : false
        };
    }

    getTileX (x) {
        return (x * this.tileSize) + this.position.x;
    }

    getTileY (y) {
        return (y * this.tileSize) + this.position.y;
    }

    getTile ({ x, y }) {
        return this.map[y][x];
    }

    render (showEmpty) {
        this.map.forEach((row, y) => {
            row.forEach((tile, x) => {
                this.__renderTile(tile, y, x, showEmpty);
            });
        });
    }

    __renderBlankTile (x, y) {
        Spell.canvas.drawPixel(this.getTileX(x), this.getTileY(y), this.debugColor, this.tileSize, this.tileSize);
    }

    __renderSpriteTile (x, y, tile) {
        if (typeof this.tileObjects[tile] !== 'undefined') {
            const tileObj = this.tileObjects[tile];
            const clone = tileObj.sprite.clone();
            const marginX = tileObj.margin ? tileObj.margin[0] : 0;
            const marginY = tileObj.margin ? tileObj.margin[1] : 0;

            clone.setPosition({
                x: this.getTileX(x) + marginX,
                y: this.getTileY(y) + marginY
            }, !tileObj.center);
            Spell.canvas.drawImage(clone);
        }
    }

    __renderTile (tile, y, x, showEmpty) {
        if (tile !== 0) {
            this.__renderSpriteTile(x, y, tile);
        } else if (showEmpty) {
            this.__renderBlankTile(x, y);
        }
    }
}
