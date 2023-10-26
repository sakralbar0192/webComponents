import { IPossibleManagerItem, IUserItem } from 'entities/Users/types'
import { property } from 'lit/decorators.js'
import { EIcebergTableSortingModes, IcebergTable, IHeaderCell } from 'shared/ui/IcebergTable'
import { convertManagerItemToRowItem } from '../helpers/convertManagerItemToRowItem'

export class ManagersTable extends IcebergTable {
    @property({type: Object, reflect: false, attribute: false}) displayedEntities?: IUserItem[] | Promise<IPossibleManagerItem[]>

    convertEntityFunction = convertManagerItemToRowItem

    headerCells: IHeaderCell[] = [
        {
            content: 'Manager name',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Branch',
            sortMode: EIcebergTableSortingModes.AS_STRING
        }
    ]

    NOT_DEFINED_TABLE_MESSAGE = 'The manager list is empty.'
}

declare global {
    interface HTMLElementTagNameMap {
        'managers-table': ManagersTable;
    }
}
