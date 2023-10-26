import { IDivisionItem } from 'entities/Divisions/types'
import { ECRUDModes } from 'shared/types'

export interface IChooseDivisionEvent extends CustomEvent {
    detail: {
        divisionItem: IDivisionItem
    }
}

export interface IModifyDivisionEvent extends CustomEvent {
    detail: {
        mode: ECRUDModes
        divisionItem: IDivisionItem
    }
}
