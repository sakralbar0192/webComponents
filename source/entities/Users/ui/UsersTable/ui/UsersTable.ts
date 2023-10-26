import { property } from 'lit/decorators.js'
import { IUserItem } from 'entities/Users/types'
import { convertUserItemToRowItem } from '../helpers/convertUserItemToRowItem'
import { ECellClasses, EIcebergTableSortingModes, IHeaderCell, IcebergTable } from 'shared/ui/IcebergTable'

export class UsersTable extends IcebergTable {
    @property({type: Object, reflect: false, attribute: false}) displayedEntities: IUserItem[] | Promise<IUserItem[]>

    convertEntityFunction = convertUserItemToRowItem

    headerCells: IHeaderCell[] = [
        {
            content: '',
            classes: [ECellClasses.SM]
        },
        {
            content: '',
            classes: [ECellClasses.SM]
        },
        {
            content: 'User name',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Login',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Status',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Start date',
            sortMode: EIcebergTableSortingModes.AS_DATES
        },
        {
            content: 'Branch',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: '1C id',
            sortMode: EIcebergTableSortingModes.AS_1C_ID
        },
        {
            content: 'Division',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: '',
            classes: [ECellClasses.SM]
        }
    ]
}

declare global {
    interface HTMLElementTagNameMap {
        'users-table': UsersTable;
    }
}
