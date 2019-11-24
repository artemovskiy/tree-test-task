const child_process = require("child_process");

class Manager {

    constructor() {
        this.activeWorkers = []
    }

    createTreeCache(query) {
        console.log(`required to create cache for`, query)
        const worker = child_process.fork(__dirname + "/worker-create.js", [query.tree, query.id]);
    }

    createBranchCache(query) {
        console.log(`required to create branch cache for`, query)
        const worker = child_process.fork(__dirname + "/worker-create-branch.js", [query.tree, query.id]);
    }

    regenerateTreeCache(tree) {
        console.log(`required to regenerate cache for`, tree)
        const worker = child_process.fork(__dirname + "/worker-regenerate.js", [tree]);
    }

}

module.exports = Manager