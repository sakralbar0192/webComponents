import { EDivisionsPageLayers } from 'entities/Divisions/types'
import { EAssignUsersPopupMods } from 'entities/Users/ui/AssignUsersPopup/types'

export enum EDivisionsPagePopups {
    modifyDivision = 'modifyDivision',
    modifyPool = 'modifyPool',
    assignUsers = 'assignUsers,',
    editPoolUser = 'editPoolUser',
    updateManagers = 'updateManagers'
}

export interface IDivisionsPageHistoryState {
    layer: EDivisionsPageLayers,
    divisionId?: number,
    poolId?: number
}

export interface IDivisionsPageURLParams {
    mode?: EDivisionsPageLayers,
    division_id?: number,
    pool_id?: number,
}

export interface IDivisionPagePopstateChangeEvent extends PopStateEvent {
    state: IDivisionsPageHistoryState
}

export interface IAssignUsersButtonClickEvent extends CustomEvent {
    detail: {
        mode: EAssignUsersPopupMods
    }
}
