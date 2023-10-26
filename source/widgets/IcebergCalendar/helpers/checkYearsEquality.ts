export function checkYearsEquality(dateOne: Date, dateTwo: Date): boolean {
    return Boolean(
        dateOne.getFullYear() === dateTwo.getFullYear()
    )
}
