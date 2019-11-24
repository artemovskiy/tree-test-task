const fs = require("fs").promises;
const path = require("path");

const Tree = require("./tree");

class Repository {

    constructor() {
        this.basePath = path.join(".", "storage", "trees")
    }

    async getTreeList() {
        const files = await fs.readdir(this.basePath)
        return files.map(item => path.basename(item, ".csv"))
    }

    async getTree(name){
        const filePath = path.join(this.basePath, name + ".csv");
        const stat = await fs.stat(filePath, {bigint: false});
        return new Tree(name, stat.mtimeMs)
    }

}

module.exports = Repository