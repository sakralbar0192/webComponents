import styles from './styles.lit.scss'
import { html, nothing, css } from 'lit'
import { EIcebergTableSortingModes, IcebergTable, IHeaderCell } from 'shared/ui/IcebergTable'
import { property } from 'lit/decorators.js'
import { ITechResourceItem } from 'entities/TechResources/types'
import { convertTechResourceItemToRowItemWithoutPhisicalIdColumn } from '../helpers/convertTechResourceItemToRowItemWithoutPhisicalIdColumn'
import { convertTechResourceItemToRowItemWithPhisicalIdColumn } from '../helpers/convertTechResourceItemToRowItemWithPhisicalIdColumn'
import exportToExcel from 'shared/ui/IcebergTable/helpers/exportTableToExcell'
import { FIRST_ARRAY_INDEX } from 'shared/consts'
import { TConvertEntityFunction } from 'shared/ui/IcebergTable/types'

export class TechResourcesReportTable extends IcebergTable {
    @property({type: Object, reflect: false, attribute: false}) displayedEntities?: ITechResourceItem[] | Promise<ITechResourceItem[] | undefined>
    @property({attribute: false}) showPhysicalIdColumn?: boolean
    @property({attribute: false}) categoryName?: string

    PHISICAL_ID_COLUMN_INDEX? = 2
    HEADER_ROWS_COUNT? = 2
    EXPORTED_TABLE_NAME? = 'TechResourcesReport'
    convertEntityFunction: TConvertEntityFunction<TechResourcesReportTable, ITechResourceItem>

    headerCellsWhithoutPhysicalIdColumn?: IHeaderCell[] = [
        {
            content: 'Name',
            sortMode: EIcebergTableSortingModes.AS_STRING,
            wpx: 150
        },
        {
            content: 'Resource state',
            sortMode: EIcebergTableSortingModes.AS_STRING,
            wpx: 120
        },
        {
            content: 'Project short name',
            sortMode: EIcebergTableSortingModes.AS_STRING,
            wpx: 120
        },
        {
            content: 'Start date',
            sortMode: EIcebergTableSortingModes.AS_DATES,
            wpx: 70
        },
        {
            content: 'End date',
            sortMode: EIcebergTableSortingModes.AS_DATES,
            wpx: 70
        },
        {
            content: 'Price',
            sortMode: EIcebergTableSortingModes.AS_NUMBERS,
            wpx: 70
        },
        {
            content: 'Currency',
            wpx: 70
        }
    ]

    physicalIdColumnHeaderCell?: IHeaderCell = {
        content: 'Physical id',
        sortMode: EIcebergTableSortingModes.AS_STRING,
        wpx: 120
    }

    static styles = css`
        ${IcebergTable.styles}
        ${styles}
    `

    headerTemplate() {
        return html`
            <thead>
                <tr>
                    <th
                        colspan=${this.headerCells.length}
                        data-z=${
                            this.canBeExported
                                ? JSON.stringify(this.headerCellStyles)
                                : nothing
                        }
                    >
                        Category:&nbsp;${this.categoryName}
                    </th>
                </tr>
                <tr>
                    ${
                        this.headerCells.map((cell, index) => {
                            return this.headerCellTemplate(cell, index)
                        })
                    }
                </tr>
            </thead>
        `
    }

    preparedFunction() {
        if (this.showPhysicalIdColumn && this.headerCellsWhithoutPhysicalIdColumn) {
            this.headerCells = [
                ...this.headerCellsWhithoutPhysicalIdColumn.slice(FIRST_ARRAY_INDEX, this.PHISICAL_ID_COLUMN_INDEX),
                {
                    ...this.physicalIdColumnHeaderCell
                },
                ...this.headerCellsWhithoutPhysicalIdColumn.slice(this.PHISICAL_ID_COLUMN_INDEX),
            ]

            this.convertEntityFunction = convertTechResourceItemToRowItemWithPhisicalIdColumn
        } else if (this.headerCellsWhithoutPhysicalIdColumn) {
            this.headerCells = [...this.headerCellsWhithoutPhysicalIdColumn]
            this.convertEntityFunction = convertTechResourceItemToRowItemWithoutPhisicalIdColumn
        }
        return nothing
    }

    exportToExcellButtonClickHandler() {
        // exportToExcel(this, false, `${this.EXPORTED_TABLE_NAME}/Category:${this.categoryName}`, this.HEADER_ROWS_COUNT)
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'tech-resources-report-table': TechResourcesReportTable;
    }
}
