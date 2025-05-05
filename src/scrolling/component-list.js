export default class ComponentList {
    list = {};

    constructor (components) {
        this.list = components;
    }

    getList () {
        return this.list;
    }

    setList (components) {
        this.list = components;

        return this.list;
    }
}
