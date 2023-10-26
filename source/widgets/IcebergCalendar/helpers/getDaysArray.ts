import { IDayInfo } from '../types'

const LAST_DAY_IN_WEEK_INDEX = 6
const FIRST_DAY_IN_WEEK_INDEX = 0
const WEK_DAY_LAG = 1
const CALENDAR_DAY_STEP = 1

function getWeekDayWithLag(date: Date): number {
    return date.getDay() === FIRST_DAY_IN_WEEK_INDEX
        ? LAST_DAY_IN_WEEK_INDEX
        : date.getDay() - WEK_DAY_LAG
}

export function getDaysArray(date: Date): IDayInfo[][] {

    let isNextDayInCurrentWeek = true, isNextDayInCorrectPeriod = true
    const weekArray = Array(LAST_DAY_IN_WEEK_INDEX)
    const monthArray = []

    const month = date.getMonth()
    const year = date.getFullYear()

    const startMonthDate = new Date(year, month)
    const startMonth = startMonthDate.getMonth()
    const startMonthDay = startMonthDate.getDate()

    const startMonthWeekDay = getWeekDayWithLag(startMonthDate)

    const startCalendarWeekDay = new Date(year, month, startMonthDay - startMonthWeekDay)

    const currentDate = new Date(startCalendarWeekDay)

    do {
        const currentWeekDayIndex = getWeekDayWithLag(currentDate)
        const currentMonthDay = currentDate.getDate()
        const currentMonth = currentDate.getMonth()
        const currentDayInfo: IDayInfo = {
            day: currentMonthDay,
            date: new Date(currentDate),
            isDayInCurrentMonth: currentMonth === month
        }
        weekArray[currentWeekDayIndex] = currentDayInfo

        if (currentWeekDayIndex === LAST_DAY_IN_WEEK_INDEX) {
            monthArray.push([...weekArray])
        }

        currentDate.setDate(currentMonthDay + CALENDAR_DAY_STEP)

        const nextWeekDayIndex = getWeekDayWithLag(currentDate)
        const nextMonthIndex = currentDate.getMonth()
        isNextDayInCurrentWeek = currentWeekDayIndex < nextWeekDayIndex
        isNextDayInCorrectPeriod = nextMonthIndex === startMonth || nextMonthIndex === month
    } while (isNextDayInCurrentWeek || isNextDayInCorrectPeriod)

    return monthArray
}
