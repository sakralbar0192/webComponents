import { IYearInfo } from '../types'

const YEARS_IN_ROW = 3
const YEARS_IN_COLUMN = 3
const YEARS_AMPLITUDE_ON_DECADE_LAYER = 4
const YEAR_STEP = 1
const LAST_ARRAY_INDEX = 2

export function getYearsArray(date: Date): IYearInfo[][] {
    const yearsGroup: IYearInfo[] = Array(YEARS_IN_ROW)
    const yearsArray: IYearInfo[][] = []
    const currentYear = date.getFullYear()
    const month = date.getMonth()
    let year = currentYear - YEARS_AMPLITUDE_ON_DECADE_LAYER

    for (let i=0; i<YEARS_IN_COLUMN; i++) {
        for (let j=0; j<YEARS_IN_ROW; j++) {
            yearsGroup[j] = {
                year: year,
                date: new Date(year, month)
            }
            year = year + YEAR_STEP
            if (j === LAST_ARRAY_INDEX) yearsArray[i] = [...yearsGroup]
        }
    }

    return yearsArray
}
