export default class SpellRenderStack {
    static stackLayers = [[]];
    static currentLayer = 0;

    static get () {
        const stackLayers = SpellRenderStack.stackLayers;
        // destroy after get
        SpellRenderStack.clear();
        return stackLayers;
    }

    static clear () {
        SpellRenderStack.stackLayers = SpellRenderStack.stackLayers.map(() => []);
    }

    static __push (method, params) {
        if (!SpellRenderStack.stackLayers[SpellRenderStack.currentLayer]) {
            SpellRenderStack.stackLayers[SpellRenderStack.currentLayer] = [];
        }
        SpellRenderStack.stackLayers[SpellRenderStack.currentLayer].push({ method, params });
    }

    static push = (method) => (params) => SpellRenderStack.__push(method, params);

    static pushArr (method) {
        return (elements) => elements.forEach((element) => SpellRenderStack.__push(method, element));
    };

    static setLayer (layer) {
        SpellRenderStack.currentLayer = layer;
    };

    static getAndExecute (callback) {
        const layers = SpellRenderStack.get();

        layers.forEach((layer) => {
            layer.forEach(callback);
        });
    }
}
