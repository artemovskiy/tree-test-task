const Repository = require("../db/repository");
const Cache = require("../cache/cache");
const createBranch = require("../tree/build-branch");

const query = {
    name: process.argv[2],
};
console.log("Regenerate cache worker started with query: ", query);

const repository = new Repository();
const cache = new Cache();

(async () => {
    const tree = await repository.getTree(query.name);
    const treeCache = await cache.getTreeCache(query.name);
    const cachedBranches = await treeCache.getBranchesList();
    const data = await tree.getData();
    for (let id of cachedBranches) {
        const branch = await treeCache.getBranch(id);
        const branchData = createBranch(data, id);
        if (!branchData) {
            console.log(`Failed to generate branch tree: ${query.name}, startId: ${id}`);
            await branch.drop();
        } else {
            await branch.update(branchData)
        }
    }
    await cache.updateTreeVersion(tree.name, tree.version)
})();
