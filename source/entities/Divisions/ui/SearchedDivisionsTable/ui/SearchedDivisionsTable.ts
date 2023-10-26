import { html, nothing } from 'lit'
import { DivisionsTable } from 'entities/Divisions/ui/DivisionsTable'
import { convertDivisionItemToRowItem } from '../helpers/convertDivisionItemToRowItem'
import { EIcebergTableSortingModes, IHeaderCell } from 'shared/ui/IcebergTable'

export class SearchedDivisionsTable extends DivisionsTable {
    convertEntityFunction = convertDivisionItemToRowItem

    headerCells: IHeaderCell[] = [
        {
            content: 'Division name',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Headcount',
            sortMode: EIcebergTableSortingModes.AS_NUMBERS
        },
        {
            content: 'Managers',
            sortMode: EIcebergTableSortingModes.AS_STRING
        }
    ]

    footerTemplate() {
        return html`${nothing}`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'searched-divisions-table': SearchedDivisionsTable;
    }
}
