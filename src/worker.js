const cluster = require("cluster")
const http = require("http")

const Repository = require("./db/repository")
const Cache = require("./cache/cache")
const CacheWorkersManager = require("./cache-workers/manager")
const createBranch = require("./tree/build-branch")

const PORT = 3000

const repository = new Repository()
const cache = new Cache()
const cacheWorkers = new CacheWorkersManager()

const getQuery = req => ({
    tree: "tree1",
    id: 1
})

const server = http.createServer((async (req, res) => {
    console.log(`Worker ${cluster.worker.id} is processing request`)
    const query = getQuery(req)
    const tree = await repository.getTree(query.tree)
    if (!tree) {
        res.end("error: tree not found")
    }
    const treeCache = await cache.getTreeCache(query.tree)
    if (!treeCache) {
        cacheWorkers.createTreeCache(query)
        const treeData = await tree.getData()
        const branch = createBranch(treeData, query.id)
        res.end(JSON.stringify(branch))
        return
    }
    if (treeCache.version < tree.version) {
        cacheWorkers.regenerateTreeCache(query.tree)
        const treeData = await tree.getData()
        const branch = createBranch(treeData, query.id)
        res.end(JSON.stringify(branch))
        return
    }
    const branchCache = await treeCache.getBranch(query.id)
    if (!branchCache) {
        cacheWorkers.createBranchCache(query)
        const treeData = await tree.getData()
        const branch = createBranch(treeData, query.id)
        res.end(JSON.stringify(branch))
        return
    }
    const branch = await branchCache.getData();
    res.end(JSON.stringify(branch))
}))

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT} from worker ${cluster.worker.id}`)
})