const fs = require("fs").promises;
const fse = require("fs-extra");
const path = require("path");

const TreeCache = require("./tree-cache");

const PATH = path.join(".", "storage", "cache");

class Cache {

    get versionsPath() {
        return path.join(PATH, "versions.json")
    }

    async getTreesList() {
        try {
            return await fse.readJson(this.versionsPath)
        } catch (e) {
            if(e.code === "ENOENT"){
                await fse.writeJson(this.versionsPath, []);
                return []
            }
            throw e
        }
    }

    async getTreeCache(tree) {
        const list = await this.getTreesList();
        const item = list.find(item => item.tree === tree);
        if (!item) {
            return null
        }
        return new TreeCache(item.tree, item.version)
    }

    async createTreeCache(tree, version) {
        const list = await this.getTreesList();
        list.push({tree, version: version.toString()});
        await fse.writeJson(this.versionsPath, list, {spaces: 2});
        let cachePath = path.join(PATH, tree);
        await fs.mkdir(cachePath);
        return new TreeCache(tree, version.toString())
    }

    async updateTreeVersion(tree, version) {
        const list = await this.getTreesList();
        const data = list.find(item => item.tree === tree);
        data.version = version.toString();
        await fse.writeJson(this.versionsPath, list, {spaces: 2});
        return new TreeCache(tree, data.version);
    }

}

module.exports = Cache;