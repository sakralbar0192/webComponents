import { IPoolItem } from 'entities/Pools/types'
import { ECRUDModes } from 'shared/types'

export interface IChoosePoolEvent extends CustomEvent {
    detail: {
        poolItem: IPoolItem
    }
}

export interface IModifyPoolEvent extends CustomEvent {
    detail: {
        mode: ECRUDModes
        poolItem: IPoolItem
    }
}
