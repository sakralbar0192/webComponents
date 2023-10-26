import { IAccountItem } from 'entities/Accounts/types'
import { property } from 'lit/decorators.js'
import { EIcebergTableSortingModes, IHeaderCell, IcebergTable } from 'shared/ui/IcebergTable'
import { convertAccountItemToRowItem } from '../helpers/convertAccountItemToRowItem'

export class AccountsTable extends IcebergTable {
    @property({type: Object, reflect: false, attribute: false}) displayedEntities: IAccountItem[] | Promise<IAccountItem[]>

    convertEntityFunction = convertAccountItemToRowItem

    headerCells: IHeaderCell[] = [
        {
            content: 'Account Name',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Description',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Status',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Start Date',
            sortMode: EIcebergTableSortingModes.AS_DATES
        },
        {
            content: 'End Date',
            sortMode: EIcebergTableSortingModes.AS_DATES
        },
        {
            content: 'Projects',
            sortMode: EIcebergTableSortingModes.AS_NUMBERS
        },
        {
            content: 'Key Account Manager',
            sortMode: EIcebergTableSortingModes.AS_STRING
        }
    ]
}

declare global {
    interface HTMLElementTagNameMap {
        'accounts-table': AccountsTable;
    }
}
