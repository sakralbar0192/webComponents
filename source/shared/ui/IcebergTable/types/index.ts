import { TemplateResult } from 'lit'

export type TConvertEntityFunction<T, I> = (this: T, entityItem: I)=>IRowItem
export type TCompareEntityFunction = (a?: string | Date | number | TemplateResult, b?: string | Date | number | TemplateResult)=>number

export interface IIcebergTableSortingOptions {
    indexCellSortingBy: number
    sortByAsc: boolean
    sortingCell: IHeaderCell
}

export enum EIcebergTableSortingModes {
    AS_STRING = 'asString',
    AS_DATES = 'asDates',
    AS_NUMBERS = 'asNumbers',
    AS_1C_ID = 'as1CId'
}

export enum ECellClasses {
    PRIMARY_BUTTON= 'primaryButton',
    SECONDARY_BUTTON = 'secondaryButton',
    ADDITIONAL_BUTTON = 'additionalButton',
    SM = 'sm',
    LINK_LIKE_BUTTON = 'linkLikeButton',
    CENTERED = 'centered',
    TEXT_CENTERED = 'textCentered',
    INACTIVE_ENTITY_LINK = 'inactiveLink',
    INACTIVE_USER = 'inactiveUser'
}

export interface ICell {
    content?: string | number | TemplateResult
    colspan?: number
    classes?: ECellClasses[]
    compareContent?: string | Date
}

export interface IHeaderCell extends ICell {
    sortMode?: EIcebergTableSortingModes
    wpx?: number
}

export interface IRowItem {
    id: number,
    row: ICell[]
}
