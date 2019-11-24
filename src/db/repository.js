const fs = require("fs").promises;
const path = require("path");

const Tree = require("./tree");

class Repository {

    constructor() {
        this.basePath = path.join(".", "storage", "trees")
    }

    async getTree(name){
        const filePath = path.join(this.basePath, name + ".csv");
        const stat = await fs.stat(filePath);
        return new Tree(name, stat.mtimeMs)
    }

}

module.exports = Repository;