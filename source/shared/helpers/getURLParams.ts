export function getURLParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search).entries())
}
