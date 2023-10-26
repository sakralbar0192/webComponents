export function formatStringToDate(string?: string): Date | null {
    if (!string) return null
    string = string.replace(/(^\s+)|(\s+$)/g, '')

    const pattern = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/
    const match = string.match(pattern)
    if (match === null) {
        return null
    }

    const day = Number(match[1])
    const month = Number(match[2])
    const year = Number(match[3])

    if (month < 1 || month > 12) {
        return null
    }

    if (day < 1 || day > 31) {
        return null
    }

    if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
        return null
    }

    if (month === 2) {
        const isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))
        if (day > 29 || (day === 29 && !isleap)) {
            return null
        }
    }

    return new Date(Date.UTC(year, month - 1, day))
}
