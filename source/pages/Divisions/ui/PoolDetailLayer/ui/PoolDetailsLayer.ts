import { IPoolItem } from 'entities/Pools/types'
import { EAssignUsersPopupMods } from 'entities/Users/ui/AssignUsersPopup'
import { defineUsersAssignedIntoPoolTable } from 'entities/Users/ui/UsersAssignedIntoPoolTable'
import { LitElement, css, html } from 'lit'
import { property } from 'lit/decorators.js'
import { definePageLoader } from 'shared/ui/loaders/PageLoader'
import styles from './styles.lit.scss'
import { until } from 'lit/directives/until.js'
import { IAssignUsersButtonClickEvent } from 'pages/Divisions/types'
import { defineIcebergButton } from 'shared/ui/IcebergButton'
import { ECRUDModes } from 'shared/types'
import { defineErrorPlug } from 'shared/ui/loaders/ErrorPlug'
import { IModifyPoolEvent } from 'entities/Pools/ui/PoolsTable'
import { EIcebergButtonSizes } from 'shared/ui/IcebergButton'

defineUsersAssignedIntoPoolTable()
definePageLoader()
defineIcebergButton()
defineErrorPlug()

export class PoolDetailsLayer extends LitElement {
    @property({type: Object, reflect: false, attribute: false}) poolItem?: Promise<IPoolItem | undefined> | IPoolItem

    ASSIGN_USERS_BUTTON_CLICK_EVENT_NAME = 'assignUsersButtonClick'
    EDIT_POOL_BUTTON_CLICK_EVENT_NAME = 'editPoolButtonClick'

    static styles = css`
        ${styles}
    `

    render() {
        if (this.poolItem) {
            return html`${until(this.poolDetailsTemplate(), html`<page-loader></page-loader>`)}`
        } else return html`<error-plug></error-plug>`
    }

    async poolDetailsTemplate() {
        return Promise.resolve(this.poolItem)
            .then(poolItem => {
                return poolItem
                    ? html`
                        <div class='topInfo'>
                            <p>
                                Manager:
                                <span>
                                    ${poolItem.ManagerName ? poolItem.ManagerName : 'Not assigned'}
                                </span>
                            </p>
                            <p>
                                Division:
                                <span>
                                    ${poolItem.DivisionName}
                                </span>
                            </p>
                        </div>

                        <div class='editButton'>
                            <iceberg-button
                                .size=${EIcebergButtonSizes.XS}
                                @click=${this.editPoolButtonClickHandler}
                            >
                                Edit
                            </iceberg-button>
                        </div>

                        <div class='section'>
                            <h2>Users list</h2>
                            <div>
                                <users-assigned-into-pool-table
                                    .displayedEntities=${poolItem.Users ?? []}
                                ></users-assigned-into-pool-table> 
                            </div>
                            <iceberg-button
                                .size=${EIcebergButtonSizes.XS}
                                @click=${this.assignUsersButtonClickHandler}
                            >
                                Assign users
                            </iceberg-button>
                        </div>
                    `
                    : html`<error-plug></error-plug>`
            })
    }

    assignUsersButtonClickHandler() {
        const detail = {
            mode: EAssignUsersPopupMods.assignIntoPool,
        }

        const assignEvent: IAssignUsersButtonClickEvent = new CustomEvent(
            this.ASSIGN_USERS_BUTTON_CLICK_EVENT_NAME,
            {
                detail: detail,
                bubbles: true,
                composed: true
            }
        )

        this.dispatchEvent(assignEvent)
    }

    editPoolButtonClickHandler() {
        Promise.resolve(this.poolItem)
            .then(poolItem => {
                if (poolItem) {
                    const detail = {
                        mode: ECRUDModes.UPDATE,
                        poolItem: poolItem
                    }

                    const editEvent: IModifyPoolEvent = new CustomEvent(
                        this.EDIT_POOL_BUTTON_CLICK_EVENT_NAME,
                        {
                            detail,
                            bubbles: true,
                            composed: true
                        }
                    )

                    this.dispatchEvent(editEvent)
                }
            })
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pool-details-layer': PoolDetailsLayer;
    }
}
