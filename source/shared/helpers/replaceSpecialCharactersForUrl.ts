export function replaceSpecialCharactersForUrl(string: string) {
    string = replaceAmpersand(string)
    string = replaceGrid(string)
    return string
}

function replaceAmpersand(string: string) {
    let newString = ''
    if (string.includes('&')) {
        newString = string.replace('&', '%26')
        newString = replaceAmpersand(newString)
    } else {
        newString = string
    }
    return newString
}

function replaceGrid(string: string) {
    let newString = ''
    if (string.includes('#')) {
        newString = string.replace('&', '%23')
        newString = replaceAmpersand(newString)
    } else {
        newString = string
    }
    return newString
}
