import { IMonthInfo } from '../types'

const MONTHS_IN_ROW = 4
const MONTHS_IN_COLUMN = 3
const INDEX_OF_FIRST_MONTH = 0
const MONTH_STEP = 1
const LAST_ARRAY_INDEX = 3

export function getMonthsArray(date: Date): IMonthInfo[][] {
    const monthsGroup: IMonthInfo[] = Array(MONTHS_IN_ROW)
    const monthsArray: IMonthInfo[][] = []

    let month = INDEX_OF_FIRST_MONTH
    const year = date.getFullYear()

    for (let i=0; i<MONTHS_IN_COLUMN; i++) {
        for (let j=0; j<MONTHS_IN_ROW; j++) {
            const currentDate = new Date(year, month)

            monthsGroup[j] = {
                month: currentDate.toLocaleDateString('en', {month: 'short'}),
                date: currentDate,
            }
            month = month + MONTH_STEP
            if (j === LAST_ARRAY_INDEX) monthsArray[i] = [...monthsGroup]
        }
    }

    return monthsArray
}
