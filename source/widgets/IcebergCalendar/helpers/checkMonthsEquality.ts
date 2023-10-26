export function checkMonthsEquality(dateOne: Date, dateTwo: Date): boolean {
    return Boolean(
        dateOne.getFullYear() === dateTwo.getFullYear() &&
        dateOne.getMonth() === dateTwo.getMonth()
    )
}
