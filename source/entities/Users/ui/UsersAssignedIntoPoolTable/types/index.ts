import { IUserItem } from 'entities/Users/types'
import { ECRUDModes } from 'shared/types'

export interface IUserRowIconClickEvent extends CustomEvent {
    detail: {
        mode: ECRUDModes
        userItem: IUserItem
    }
}
