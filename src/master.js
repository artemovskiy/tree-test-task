const cluster = require("cluster");

const httpWorkersCount = 3;

for (let i = 0; i < httpWorkersCount; i++){
    cluster.fork();
}
