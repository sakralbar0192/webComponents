export interface IIcebergSearchFieldSearchEvent extends CustomEvent {
    detail: IIcebergSearchFieldSearchEventDetail
}

export interface IIcebergSearchFieldSearchEventDetail {
    searchText: string
}
