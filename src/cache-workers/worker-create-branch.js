const Repository = require("../db/repository");
const Cache = require("../cache/cache");
const createBranch = require("../tree/build-branch");

const query = {
    name: process.argv[2],
    id: Number(process.argv[3]),
};
console.log("Create branch cache worker started with query: ", query);

const repository = new Repository();
const cache = new Cache();

(async () => {
    const tree = await repository.getTree(query.name);
    const treeCache = await cache.getTreeCache(query.name);
    const data = await tree.getData();
    const branch = createBranch(data, query.id);
    if(!branch){
        process.exit(1)
    } else {
        await treeCache.createBranch(branch);
    }
})();
