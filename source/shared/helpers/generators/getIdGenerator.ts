function* iterator(i: number) {
    yield i
    while (true) {
        yield ++i
    }
}

const gen = iterator(Math.random())

export function getUniqId() {
    return gen.next().value
}
