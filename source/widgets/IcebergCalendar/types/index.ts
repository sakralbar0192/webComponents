export enum ECalendarLayers {
    month = 'month',
    year = 'year',
    decade = 'decade'
}

export interface IDayInfo {
    day: number
    date: Date
    isDayInCurrentMonth: boolean
}

export interface IMonthInfo {
    month: string
    date: Date
}

export interface IYearInfo {
    year: number
    date: Date
}

export interface IChooseDateEvent extends CustomEvent {
    detail: IChooseDateEventDetail
}

export interface IChooseDateEventDetail {
    date: Date
}
