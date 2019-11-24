const fs = require("fs").promises
const fse = require("fs-extra")
const path = require("path")

const PATH = path.join(".", "storage", "cache")

class BranchCache {

    constructor(tree, rootId){
        this.tree = tree
        this.path = path.join(PATH, tree, rootId + ".json");
        this.rootId = rootId
    }

    async getData(){
        return await fse.readJson(this.path);
    }

    async update(data){
        await fse.writeJson(this.path, data, {spaces: 2});
    }

    async drop(){
        await fs.unlink(this.path);
    }

}

module.exports = BranchCache