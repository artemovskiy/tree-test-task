const buildBranch = require("./build-branch");

describe("buildBranch", () => {

    test("should build branch", () => {
        const items = [
            {id: 1, name: "first", parent: undefined},
            {id: 2, name: "second", parent: 1},
            {id: 3, name: "third", parent: 4},
            {id: 4, name: "forth", parent: 1},
            {id: 5, name: "fifth", parent: 2},
        ];

        const branch = buildBranch(items, 4);
        expect(branch).toEqual({
            id: 4,
            name: "forth",
            children: [
                {
                    id: 3,
                    name: "third",
                    children: []
                }
            ]
        })
    });

    test("should more complex job", () => {
        const items = [
            {id: 1, name: "first", parent: undefined},
            {id: 2, name: "second", parent: 1},
            {id: 3, name: "third", parent: 4},
            {id: 4, name: "forth", parent: 1},
            {id: 5, name: "fifth", parent: 2},
            {id: 6, name: "sixth", parent: 2},
            {id: 7, name: "seventh", parent: 4},
            {id: 8, name: "eighth", parent: 3},
            {id: 9, name: "ninth", parent: 3},
            {id: 10, name: "tenth", parent: 7},
        ];

        const branch = buildBranch(items, 4);
        //console.log(items)
        expect(branch).toEqual({
            id: 4,
            name: "forth",
            children: [
                {
                    id: 3,
                    name: "third",
                    children: [
                        {
                            id: 8,
                            name: "eighth",
                            children: []
                        },
                        {
                            id: 9,
                            name: "ninth",
                            children: []
                        },
                    ]
                },
                {
                    id: 7,
                    name: "seventh",
                    children: [
                        {
                            id: 10,
                            name: "tenth",
                            children: []
                        },
                    ]
                },
            ]
        })

    })
});