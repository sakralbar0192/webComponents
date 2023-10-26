import styles from './styles.lit.scss'
import { LitElement, css, html, CSSResultGroup, nothing } from 'lit'
import { property, state } from 'lit/decorators.js'
import { until } from 'lit/directives/until.js'
import { repeat } from 'lit/directives/repeat.js'
import { ECellClasses, TConvertEntityFunction, ICell, IHeaderCell, IIcebergTableSortingOptions, EIcebergTableSortingModes, TCompareEntityFunction, IRowItem } from '../types'
import { defineIcebergLoader } from 'shared/ui/loaders/IcebergLoader'
import { IEntityItem } from 'shared/types'
import { classMap } from 'lit/directives/class-map.js'
import { compareStrings } from '../helpers/compareStrings'
import { compareDates } from '../helpers/compareDates'
import { compareNumbers } from '../helpers/compareNumbers'
import { compare1CIds } from '../helpers/compare1CIds'
import { createRef, Ref, ref } from 'lit/directives/ref.js'
import exportToExcel from '../helpers/exportTableToExcell'
import { defineIcebergButton } from 'shared/ui/IcebergButton'
import {ifDefined} from 'lit/directives/if-defined.js'
import { NOTHING_TO_DISPLAY_MESSAGE } from 'shared/messages'

defineIcebergLoader()
defineIcebergButton()

export class IcebergTable extends LitElement {
    @property({type: Object, reflect: false, attribute: false}) displayedEntities?: IEntityItem[] | Promise<IEntityItem[] | undefined>
    @property({type: Boolean}) canBeExported: boolean

    @state() sortOptions: IIcebergTableSortingOptions

    headerCells: IHeaderCell[]
    footerCells: ICell[]
    bodyRows: IRowItem[]

    convertEntityFunction: TConvertEntityFunction<IcebergTable, IEntityItem>

    NOT_DEFINED_TABLE_MESSAGE = NOTHING_TO_DISPLAY_MESSAGE

    tableRef: Ref<HTMLTableElement> = createRef()

    cellStyles = {
        alignment: {
            vertical: 'center',
            horizontal: 'left',
            wrapText: 'true'
        },
        font: {
            fs: 10
        },
        border: {
            top: {style: 'thin', color: {rgb: '000000'}},
            bottom: {style: 'thin', color: {rgb: '000000'}},
            left: {style: 'thin', color: {rgb: '000000'}},
            right: {style: 'thin', color: {rgb: '000000'}}
        }
    }

    headerCellStyles = {
        alignment: {
            ...this.cellStyles.alignment,
            horizontal: 'center'
        },
        font: {
            ...this.cellStyles.font,
            bold: true,
        },
        border: {
            ...this.cellStyles.border
        }
    }

    static styles = css`
        ${styles}
    ` as CSSResultGroup

    render() {
        this.preparedFunction()

        if (this.isTableDefined()) {
            return html`
                <table
                    ${ref(this.tableRef)}
                >
                    ${this.headerTemplate()}
                    ${until(this.bodyTemplate(), this.loaderTemplate())}
                    ${this.footerTemplate()}                
                </table>

                ${
                    this.canBeExported
                        ? html`
                            <iceberg-button
                                @click=${() => this.exportToExcellButtonClickHandler()}
                            >
                                Export to excel
                            </iceberg-button>
                        `
                        : nothing
                }
            `
        } else return this.NOT_DEFINED_TABLE_MESSAGE
    }

    headerTemplate() {
        return html`
            <thead>
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

    async bodyTemplate() {
        return await Promise.resolve(this.displayedEntities)
            .then(async displayedEntities => {
                if (displayedEntities && displayedEntities.length) {
                    this.bodyRows = this.convertEntitiesIntoRows(displayedEntities)
                    return html`
                        <tbody>
                            ${
                                repeat(this.bodyRows, (item) => item.id, (item) => {
                                    return html`
                                        <tr>
                                            ${
                                                item.row.map((cell)=> this.cellTemplate(cell))
                                            }
                                        </tr>
                                    `
                                })
                            }
                        </tbody>
                    `
                } else {
                    this.displayedEntities = undefined
                    return nothing
                }
            })
    }

    footerTemplate() {
        if (this.footerCells) {
            return html`
                <tfoot>
                    <tr>
                        ${
                            this.footerCells.map((cell)=> this.cellTemplate(cell))
                        }
                    </tr>
                </tfoot>
            `
        } else {
            return nothing
        }
    }

    headerCellTemplate(cell: IHeaderCell, index: number) {
        const staticClasses = cell.classes ? cell.classes : []
        const dinamicClasses: Record<string, boolean> = {
            sortable: Boolean(cell.sortMode),
            asc: this.sortOptions && this.sortOptions.sortingCell === cell && this.sortOptions.sortByAsc,
            des: this.sortOptions && this.sortOptions.sortingCell === cell && !this.sortOptions.sortByAsc
        }

        staticClasses.forEach(staticClass => {
            dinamicClasses[staticClass] = true
        })

        return html`
            <th
                class='${classMap(dinamicClasses)}'
                data-z=${
                    this.canBeExported
                        ? JSON.stringify(this.headerCellStyles)
                        : nothing
                }
                @click=${cell.sortMode ? () => this.sortRows(cell, index) : nothing}
            >
                ${cell.content ? cell.content : ''}
            </th>
        `
    }

    cellTemplate(cell: ICell) {
        return html`
            <td
                colspan=${ifDefined(cell.colspan)}
                class=${ifDefined(cell.classes ? cell.classes.join(' ') : undefined)}
                data-z=${
                    this.canBeExported
                        ? JSON.stringify(this.cellStyles)
                        : nothing
                }
            >
                ${cell.content ? cell.content : ''}
            </td>
        `
    }

    loaderTemplate() {
        return html`
            <tbody>
                <tr>
                    <td colspan=${this.headerCells.length} class=${ECellClasses.TEXT_CENTERED}>
                        <iceberg-loader></iceberg-loader>
                    </td>
                </tr>
            </tbody>
        `
    }

    addEntityItemRow(entityItem: IEntityItem) {
        Promise.resolve(this.displayedEntities)
            .then(displayedEntities => {
                if (displayedEntities) this.displayedEntities = [...displayedEntities, entityItem]
            })
    }

    editTableItemRow(entityItem: IEntityItem) {
        Promise.resolve(this.displayedEntities)
            .then(displayedEntities => {
                if (displayedEntities) {
                    const editedEntityIndex = displayedEntities.findIndex(entity => entity.Id === entityItem.Id)
                    displayedEntities[editedEntityIndex] = entityItem
                    this.displayedEntities = [...displayedEntities]
                }
            })
    }

    removeTableRow(entityItem: IEntityItem) {
        Promise.resolve(this.displayedEntities)
            .then(displayedEntities => {
                if (displayedEntities) {
                    this.displayedEntities = displayedEntities.filter(entity => entity.Id !== entityItem.Id)
                }
            })
    }

    isTableDefined() {
        return Boolean(this.headerCells && this.displayedEntities)
    }

    convertEntitiesIntoRows(displayedEntities: IEntityItem[]) {
        let convertedEntities =  displayedEntities.map(entity => {
            return this.convertEntityFunction(entity)
        })

        if (this.sortOptions) {
            let sortingFunction: TCompareEntityFunction

            switch (this.sortOptions.sortingCell.sortMode) {
                case EIcebergTableSortingModes.AS_STRING:
                    sortingFunction = compareStrings
                    break
                case EIcebergTableSortingModes.AS_DATES:
                    sortingFunction = compareDates
                    break
                case EIcebergTableSortingModes.AS_NUMBERS:
                    sortingFunction = compareNumbers
                    break
                case EIcebergTableSortingModes.AS_1C_ID:
                    sortingFunction = compare1CIds
                    break
                default:
                    sortingFunction = compareStrings
                    break
            }

            convertedEntities = convertedEntities.sort((a, b) => {
                const compareValueA = a.row[this.sortOptions.indexCellSortingBy].compareContent
                    ? a.row[this.sortOptions.indexCellSortingBy].compareContent
                    : a.row[this.sortOptions.indexCellSortingBy].content

                const compareValueB = b.row[this.sortOptions.indexCellSortingBy].compareContent
                    ? b.row[this.sortOptions.indexCellSortingBy].compareContent
                    : b.row[this.sortOptions.indexCellSortingBy].content

                return sortingFunction(
                    compareValueA,
                    compareValueB
                )
            })

            if (!this.sortOptions.sortByAsc) {
                convertedEntities = convertedEntities.reverse()
            }
        }

        return convertedEntities
    }

    sortRows(cell: IHeaderCell, index: number) {
        const newSortOptions: IIcebergTableSortingOptions = {
            indexCellSortingBy: index,
            sortingCell: cell,
            sortByAsc: this.sortOptions && this.sortOptions.indexCellSortingBy === index
                ? !this.sortOptions.sortByAsc
                : true
        }

        this.sortOptions = {...newSortOptions}
    }

    exportToExcellButtonClickHandler() {
        // exportToExcel(this)
    }

    preparedFunction() {
        return nothing
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'iceberg-table': IcebergTable;
    }
}
