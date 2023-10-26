export interface IChangeCurrentDateEvent extends CustomEvent {
    detail: IChangeCurrentDateEventDetail
}

export interface IChangeCurrentDateEventDetail {
    date: Date
    dateString: string
}
