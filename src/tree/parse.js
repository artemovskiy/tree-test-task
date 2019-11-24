const {EOL} = require("os");

module.exports = str => {
    const lines = str.split(EOL);
    return lines.map(line => {
        const parts = line.split(",");
        return {
            id: Number(parts[0]),
            name: parts[1],
            parent: parts.length === 3 ? Number(parts[2]) : undefined
        }
    })
};