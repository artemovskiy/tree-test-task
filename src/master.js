const cluster = require("cluster");

const CacheWorkersManager = require("./cache-workers/manager");

const httpWorkersCount = 3;

const manager = new CacheWorkersManager();

const handleMessage = message => {
    if(typeof message !== "object"){
        return;
    }
    if(typeof message.type !== "string"){
        return;
    }
    switch (message.type) {
        case "createTreeCache": {
            manager.createTreeCache(message.query);
            return;
        }
        case "createBranchCache": {
            manager.createBranchCache(message.query);
            return;
        }
        case "regenerateTreeCache": {
            manager.regenerateTreeCache(message.tree);
            return;
        }
        default: {
            console.error(`unknown message type: ${message.type}`)
        }
    }
};

for (let i = 0; i < httpWorkersCount; i++){
    const childProcess = cluster.fork();
    childProcess.on("message", handleMessage);
}
