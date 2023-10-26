export interface ISelectOption {
    value: string,
    id: number | string
    options?: ISelectOption[]
}

export interface IIcebergSelectChangeEvent extends CustomEvent {
    detail: IIcebergSelectChangeEventDetail
}

export interface IIcebergSelectChangeEventDetail {
    selectedOption: ISelectOption
}
