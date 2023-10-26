import { IPoolItem } from 'entities/Pools/types'
import { property } from 'lit/decorators.js'
import { ECellClasses, IcebergTable } from 'shared/ui/IcebergTable'
import { EIcebergTableSortingModes, IHeaderCell, TConvertEntityFunction } from 'shared/ui/IcebergTable/types'
import { convertPoolItemToRowItem } from '../helpers/convertPoolItemToRowItem'

export class PoolsTable extends IcebergTable {
    @property({type: Object, reflect: false, attribute: false}) displayedEntities?: IPoolItem[] | Promise<IPoolItem[] | undefined>

    CHOOSE_POOL_EVENT_NAME? = 'choosePool'
    MODIFY_POOL_EVENT_NAME? = 'modifyPool'

    convertEntityFunction: TConvertEntityFunction<PoolsTable, IPoolItem>  = convertPoolItemToRowItem

    headerCells: IHeaderCell[] = [
        {
            content: 'Pool name',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Headcount',
            sortMode: EIcebergTableSortingModes.AS_NUMBERS
        },
        {
            content: 'Manager',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: '',
            classes: [ECellClasses.SM]
        },
        {
            content: '',
            classes: [ECellClasses.SM]
        }
    ]
}

declare global {
    interface HTMLElementTagNameMap {
        'pools-table': PoolsTable;
    }
}
