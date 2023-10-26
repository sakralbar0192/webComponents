import { IUserItem } from 'entities/Users/types'
import styles from './styles.lit.scss'
import { html, css } from 'lit'
import { property } from 'lit/decorators.js'
import { defineIcebergDateField } from 'widgets/IcebergDateField'
import { ECellClasses, ICell, IcebergTable } from 'shared/ui/IcebergTable'
import { convertUserItemToRowItem } from '../helpers/convertUserItemToRowItem'
import { IAssignTableUserItem } from '../../AssignUsersPopup/types'
import { TConvertEntityFunction } from 'shared/ui/IcebergTable/types'

defineIcebergDateField()

export class AssignUsersPopupTable extends IcebergTable {
    @property({type: Object, reflect: false, attribute: false}) displayedEntities?: IUserItem[] | Promise<IUserItem[] | undefined>
    @property({type: Date, reflect: false, attribute: false}) selectedDate?: Date

    NOT_DEFINED_TABLE_MESSAGE = 'Not assigned user list is empty.'

    convertEntityFunction: TConvertEntityFunction<AssignUsersPopupTable, IAssignTableUserItem> = convertUserItemToRowItem

    headerCells: ICell[] = []

    static styles = [
        IcebergTable.styles,
        css`
          ${styles}  
        `
    ]

    headerTemplate() {
        const headerCells: ICell[] = [
            {
                content: 'User'
            },
            {
                content: this.selectedDate
                    ? html`
                        <div class='dateHeaderCell'> 
                            <label>
                                Start date: 
                            </label>
                            <iceberg-date-field
                                .currentDate=${this.selectedDate}
                            ></iceberg-date-field>
                        </div>
                    `
                    : html`<iceberg-loader></iceberg-loader>`
            },
            {
                content: 'Branch'
            },
            {
                content: '',
                classes: [ECellClasses.SM]
            },
        ]

        return html`
            <thead>
                <tr>
                    ${headerCells.map((cell, index) => {
            return this.headerCellTemplate(cell, index)
        })}
                </tr>
            </thead>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'assign-users-popup-table': AssignUsersPopupTable;
    }
}
