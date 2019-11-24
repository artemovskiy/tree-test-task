const fs = require("fs").promises
const fse = require("fs-extra")
const path = require("path")

const BranchCache = require("./branch-cache");

const PATH = path.join(".", "storage", "cache")

class TreeCache {

    constructor(name, version) {
        this.name = name;
        this.path = path.join(PATH, name)
        this.version = version
    }

    async getBranchesList() {
        const files = await fs.readdir(this.path)
        return files.map(item => Number(path.basename(item, ".json")));
    }

    async getBranch(id) {
        const filepath = this.getBranchPath(id);
        try {
            await fs.stat(filepath);
            return new BranchCache(this.name, id);

        } catch (e) {
            if(e.code === 'ENOENT') {
                return null;
            }
            throw e;
        }
    }

    getBranchPath(branch) {
        return path.join(this.path, branch + ".json")
    }

    async createBranch(branch) {
        await fse.writeJson(this.getBranchPath(branch.id), branch, {spaces: 2})
        return new BranchCache(this.name, branch.id);
    }

}

module.exports = TreeCache;