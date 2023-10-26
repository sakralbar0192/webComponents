import { IUserItem } from 'entities/Users/types'
import { property } from 'lit/decorators.js'
import { EIcebergTableSortingModes, IcebergTable, IHeaderCell } from 'shared/ui/IcebergTable'
import { convertUserItemToRowItem } from '../helpers/convertUserItemToRowItem'

export class UsersAssignedIntoDivisionTable extends IcebergTable {
    @property({type: Object, reflect: false, attribute: false}) displayedEntities: IUserItem[] | Promise<IUserItem[]>

    convertEntityFunction = convertUserItemToRowItem

    NOT_DEFINED_TABLE_MESSAGE = 'The user list is empty.'

    headerCells: IHeaderCell[] = [
        {
            content: 'User name',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Pool',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Branch',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Start date',
            sortMode: EIcebergTableSortingModes.AS_DATES
        }
    ]
}

declare global {
    interface HTMLElementTagNameMap {
        'users-assigned-into-division-table': UsersAssignedIntoDivisionTable;
    }
}
