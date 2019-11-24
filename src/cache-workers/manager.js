const child_process = require("child_process");

class Manager {

    constructor() {
        this.activeWorkers = new Set();
        setInterval(() => {
            console.log("active workers", Array.from(this.activeWorkers))
        }, 3000)
    }

    createTreeCache(query) {
        console.log(`required to create cache for`, query);
        let hash = `createTreeCache:${query.tree}:${query.id}`;
        if(!this.activeWorkers.has(hash)){
            this.activeWorkers.add(hash);
            const worker = child_process.fork(__dirname + "/worker-create.js", [query.tree, query.id]);
            worker.on("exit", () => {
                console.log(hash, "exit");
                this.activeWorkers.delete(hash);
            })
        }
    }

    createBranchCache(query) {
        console.log(`required to create branch cache for`, query);
        let hash = `createBranchCache:${query.tree}:${query.id}`;
        if(!this.activeWorkers.has(hash)){
            this.activeWorkers.add(hash);
            const worker = child_process.fork(__dirname + "/worker-create-branch.js", [query.tree, query.id]);
            worker.on("exit", () => {
                console.log(hash, "exit");
                this.activeWorkers.delete(hash);
            })
        }
    }

    regenerateTreeCache(tree) {
        console.log(`required to regenerate cache for`, tree);
        let hash = `regenerateTreeCache:${tree}`;
        if(!this.activeWorkers.has(hash)){
            this.activeWorkers.add(hash);
            const worker = child_process.fork(__dirname + "/worker-regenerate.js", [tree]);
            worker.on("exit", () => {
                console.log(hash, "exit");
                this.activeWorkers.delete(hash);
            })
        }
    }

}

module.exports = Manager;