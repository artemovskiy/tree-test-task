const parse = require("./parse")

describe("parse", () => {

    test("should parse csv", () => {
        const input = `1,first
2,second,1
3,third,4
4,forth,1
5,fifth,2`;
        const actual = parse(input)
        expect(actual).toEqual([
            {id: 1, name: "first", parent: undefined},
            {id: 2, name: "second", parent: 1},
            {id: 3, name: "third", parent: 4},
            {id: 4, name: "forth", parent: 1},
            {id: 5, name: "fifth", parent: 2},
        ])
    })
})