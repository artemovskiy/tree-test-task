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

}

module.exports = BranchCache