const fs = require("fs").promises;
const path = require("path");

const parse = require("../tree/parse");

class Tree {

    constructor(name, version) {
        this.name = name;
        this.version = version;
    }

    async getData() {
        const filepath = path.join(".", "storage", "trees", this.name + ".csv");
        const content = await fs.readFile(filepath, {encoding: "utf8"});
        return parse(content);

    }
}

module.exports = Tree;