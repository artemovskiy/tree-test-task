const findChildren = (items, id) => {
    const children = [];
    for (let index in items) {
        const item = items[index];
        if (item.parent === id) {
            children.push(item)
            //delete items[index]
        }
    }
    return children;
};

let findChildrenRecursive;
findChildrenRecursive = (items, id) => {
    return findChildren(items, id)
        .map(({id, name}) => ({
            id,
            name,
            children: findChildrenRecursive(items, id)
        }))
};

module.exports = (items, id) => {
    const item = items.find(item => item.id === id);
    if (!item) {
        return null
    }
    let children = findChildrenRecursive(items, id);
    return {
        ...item,
        parent: undefined,
        children: children
    }
};