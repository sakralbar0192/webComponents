import styles from './styles.lit.scss'
import { LitElement, css, html } from 'lit'
import { defineIcebergButton } from 'shared/ui/IcebergButton'
import { defineDivisionsTable, IModifyDivisionEvent } from 'entities/Divisions/ui/DivisionsTable'
import { IDivisionItem } from 'entities/Divisions/types'
import { property } from 'lit/decorators.js'
import { definePageLoader } from 'shared/ui/loaders/PageLoader'
import { ECRUDModes } from 'shared/types'
import { defineErrorPlug } from 'shared/ui/loaders/ErrorPlug'

defineDivisionsTable()
defineIcebergButton()
definePageLoader()
defineErrorPlug()

export class DivisionsLayer extends LitElement {
    @property({type: Object, attribute: false}) divisions?: IDivisionItem[] | Promise<IDivisionItem[] | undefined>

    MODIFY_DIVISION_EVENT_NAME = 'modifyDivision'

    static styles = css`
        ${styles}
    `

    render() {
        if (this.divisions) {
            return html`
                <div>
                    <divisions-table
                        .displayedEntities=${this.divisions}
                        @modifyDivision=${this.modifyDivisionHandler}
                    ></divisions-table>
                    
                    <iceberg-button
                        @click=${this.modifyDivisionHandler}
                    >
                        Add division
                    </iceberg-button>
                </div>
            `
        } else {
            return html`<error-plug></error-plug>`
        }

    }

    modifyDivisionHandler(e?: IModifyDivisionEvent) {
        if (e) e.stopPropagation()

        const detail = {
            mode: e?.detail.mode || ECRUDModes.CREATE,
            divisionItem: e?.detail.divisionItem || {
                Id: 0,
                IsProduction: false,
                Name: '',
                SendTimeApprovalNotifications: false
            }
        }

        const modifyDivisionEvent: IModifyDivisionEvent = new CustomEvent(
            this.MODIFY_DIVISION_EVENT_NAME,
            {
                detail,
                bubbles: true,
                composed: true
            }
        )

        this.dispatchEvent(modifyDivisionEvent)
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'divisions-layer': DivisionsLayer;
    }
}
