const fs = require("fs").promises
const fse = require("fs-extra")
const path = require("path")

const TreeCache = require("./tree-cache")

const PATH = path.join(".", "storage", "cache")

class Cache {

    get versionsPath() {
        return path.join(PATH, "versions.json")
    }

    async getTrees() {
        const trees = await fse.readJson(path.join(PATH, "versions.json"))
        return trees.map(item => {
            return new TreeCache(path.join(PATH, item.tree), item.version)
        })
    }

    async getTreesList() {
        return await fse.readJson(this.versionsPath)
    }

    async getTreeCache(tree) {
        const list = await this.getTreesList()
        const item = list.find(item => item.tree === tree)
        if (!item) {
            return null
        }
        return new TreeCache(item.tree, item.version)
    }

    async createTreeCache(tree, version) {
        const list = await this.getTreesList()
        list.push({tree, version: version.toString()})
        await fse.writeJson(this.versionsPath, list, {spaces: 2})
        let cachePath = path.join(PATH, tree)
        await fs.mkdir(cachePath)
        return new TreeCache(tree, version.toString())
    }

    async updateTreeVersion(tree, version) {
        const list = await this.getTreesList()
        const data = list.find(item => item.tree === tree);
        data.version = version.toString();
        await fse.writeJson(this.versionsPath, list, {spaces: 2});
        return new TreeCache(tree, data.version);
    }

}

module.exports = Cache