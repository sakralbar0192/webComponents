import { IcebergTable, ECellClasses } from 'shared/ui/IcebergTable'
import { property } from 'lit/decorators.js'
import { IUserItem } from 'entities/Users/types'
import { convertUserItemToRowItem } from '../helpers/convertUserItemToRowItem'
import { EIcebergTableSortingModes, IHeaderCell, TConvertEntityFunction } from 'shared/ui/IcebergTable/types'

export class UsersAssignedIntoPoolTable extends IcebergTable {
    @property({type: Object, reflect: false, attribute: false}) displayedEntities?: IUserItem[] | Promise<IUserItem[] | undefined>

    convertEntityFunction: TConvertEntityFunction<UsersAssignedIntoPoolTable, IUserItem> = convertUserItemToRowItem

    NOT_DEFINED_TABLE_MESSAGE = 'The user list is empty.'

    headerCells: IHeaderCell[] = [
        {
            content: 'User name',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Branch',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Start date',
            sortMode: EIcebergTableSortingModes.AS_DATES
        },
        {
            content: '',
            classes: [ECellClasses.SM]
        }
    ]
}

declare global {
    interface HTMLElementTagNameMap {
        'users-assigned-into-pool-table': UsersAssignedIntoPoolTable;
    }
}
