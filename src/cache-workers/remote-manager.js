class RemoteManager {

    createTreeCache(query) {
        this.send({
            type: "createTreeCache",
            query
        });
    }

    createBranchCache(query) {
        this.send({
            type: "createBranchCache",
            query
        });
    }

    regenerateTreeCache(tree) {
        this.send({
            type: "regenerateTreeCache",
            tree
        });
    }

    send(message) {
        process.send(message);
    }

}

module.exports = RemoteManager;