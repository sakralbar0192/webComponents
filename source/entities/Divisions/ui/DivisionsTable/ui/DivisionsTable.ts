import { html, nothing } from 'lit'
import { property, state } from 'lit/decorators.js'
import { IcebergTable, defineIcebergTable, ECellClasses, EIcebergTableSortingModes, ICell, IHeaderCell } from 'shared/ui/IcebergTable'
import { IDivisionItem } from 'entities/Divisions/types'
import { convertDivisionItemToRowItem } from '../helpers/convertDivisionItemToRowItem'
import { TConvertEntityFunction } from 'shared/ui/IcebergTable/types'

defineIcebergTable()

export class DivisionsTable extends IcebergTable {
    @property({type: Object, reflect: false, attribute: false}) displayedEntities?: IDivisionItem[] | Promise<IDivisionItem[] | undefined>
    @state() totalCount?: number

    convertEntityFunction: TConvertEntityFunction<DivisionsTable, IDivisionItem> = convertDivisionItemToRowItem

    CHOOSE_DIVISION_EVENT_NAME? = 'chooseDivision'
    MODIFY_DIVISION_EVENT_NAME? = 'modifyDivision'

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

    footerTemplate() {
        if (this.displayedEntities) {
            if (this.countTotal) this.countTotal()

            const footerRow: ICell[] = [
                {
                    content: 'Total'
                },
                {
                    content: this.totalCount ? this.totalCount : 0,
                    colspan: 4
                }
            ]

            return html`
                <tfoot>
                    <tr>
                        ${
                            footerRow.map((cell)=> {
                                return this.cellTemplate(cell)
                            })
                        }
                    </tr>
                </tfoot>
            `
        } else return nothing
    }

    async countTotal?() {
        return await Promise.resolve(this.displayedEntities)
            .then(displayedEntities => {
                if (displayedEntities) {
                    const total = displayedEntities.reduce((sum: number, item) => {
                        return item.UserCount
                            ?   sum + item.UserCount
                            : sum
                    }, 0)

                    this.totalCount = total
                }
            })
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'divisions-table': DivisionsTable;
    }
}
