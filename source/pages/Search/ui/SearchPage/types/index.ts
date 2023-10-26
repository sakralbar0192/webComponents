import { ESearchModes } from 'shared/api/searchEntities'
import { IIcebergCheckboxChangeEvent, IIcebergCheckboxChangeEventDetail } from 'shared/ui/IcebergCheckbox'

export enum ESearchUrlParamsNames {
    SEARCH_TEXT = 'text',
    SEARCH_TARGET = 'quick-search_target_id'
}

export interface ISearchFiltersChangeEvent extends IIcebergCheckboxChangeEvent {
    detail: ISearchFiltersChangeEventDetail
}

export interface ISearchFiltersChangeEventDetail extends IIcebergCheckboxChangeEventDetail {
    key: ESearchModes
}
