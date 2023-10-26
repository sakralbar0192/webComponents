import styles from './styles.lit.scss'
import { IDivisionItem } from 'entities/Divisions/types'
import { definePoolsTable } from 'entities/Pools/ui/PoolsTable'
import { LitElement, css, html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { IAssignUsersButtonClickEvent } from 'pages/Divisions/types'
import { defineUsersAssignedIntoDivisionTable } from 'entities/Users/ui/UsersAssignedIntoDivisionTable'
import { EAssignUsersPopupMods } from 'entities/Users/ui/AssignUsersPopup'
import { until } from 'lit/directives/until.js'
import { definePageLoader } from 'shared/ui/loaders/PageLoader'
import { ECRUDModes } from 'shared/types'
import { defineManagersTable } from 'entities/Users/ui/ManagersTable'
import { defineErrorPlug } from 'shared/ui/loaders/ErrorPlug'
import { IModifyPoolEvent } from 'entities/Pools/ui/PoolsTable/types'
import { EIcebergButtonSizes } from 'shared/ui/IcebergButton'

defineManagersTable()
definePoolsTable()
defineUsersAssignedIntoDivisionTable()
definePageLoader()
defineErrorPlug()

export class DivisionDetailsLayer extends LitElement {
    @property() divisionItem?: Promise<IDivisionItem | undefined>

    UPDATE_MANAGERS_EVENT_NAME = 'updateManagers'
    MODIFY_POOL_EVENT_NAME = 'modifyPool'
    ASSIGN_USERS_EVENT_NAME = 'assignUsers'

    static styles = css`
        ${styles}
    `

    render() {
        if (this.divisionItem) {
            return html`${until(this.divisionDetailsTemplate(), html`<page-loader></page-loader>`)}`
        } else {
            return html`
                <error-plug></error-plug>
            `
        }
    }

    async divisionDetailsTemplate() {
        return Promise.resolve(this.divisionItem)
            .then(divisionItem => {
                return divisionItem
                    ? html`
                        <div>
                            <p class='sendInfo'>
                                Send Time Approval notifications:
                                <span>
                                    ${
                                        divisionItem.SendTimeApprovalNotifications
                                            ? 'Yes'
                                            : 'No'
                                    } 
                                </span>
                            </p>

                            <div class='section'>
                                <h2>Managers list</h2>
                                <div>
                                    <managers-table
                                        .displayedEntities=${divisionItem.Managers}
                                    ></managers-table>
                                </div>
                                <iceberg-button
                                    .size=${EIcebergButtonSizes.XS}
                                    @click=${this.updateManagersHandler}
                                >
                                    Update managers
                                </iceberg-button>
                            </div>

                            <div class='section'>
                                <h2>Resource pools</h2>
                                <div>
                                    <pools-table
                                        .displayedEntities=${divisionItem.Pools}
                                        @modifyPool=${this.modifyPoolHandler}
                                    ></pools-table>
                                </div>
                                <iceberg-button
                                    .size=${EIcebergButtonSizes.XS}
                                    @click=${this.modifyPoolHandler}
                                >
                                    Add pool
                                </iceberg-button>
                            </div>

                            <div class='section'>
                                <h2>Users list</h2>
                                <div>
                                    ${
                                        divisionItem.Users && divisionItem.Users.length
                                            ? html`
                                                <iceberg-button
                                                    .size=${EIcebergButtonSizes.XS}
                                                    @click=${this.assignUsersButtonClickHandler}
                                                >
                                                    Assign users
                                                </iceberg-button>
                                            `
                                            : nothing
                                    }
                                </div>
                                <div>
                                    <users-assigned-into-division-table
                                        .displayedEntities=${divisionItem.Users ?? []}
                                    ></users-assigned-into-division-table> 
                                </div>
                                <iceberg-button
                                    .size=${EIcebergButtonSizes.XS}
                                    @click=${this.assignUsersButtonClickHandler}
                                >
                                    Assign users
                                </iceberg-button>
                            </div>
                        </div>
                    `
                    : html`
                        <error-plug></error-plug>
                    `
            })
    }

    updateManagersHandler() {
        const updateEvent = new Event(
            this.UPDATE_MANAGERS_EVENT_NAME, {
                bubbles: true,
                composed: true
            }
        )

        this.dispatchEvent(updateEvent)
    }

    async modifyPoolHandler(e?: IModifyPoolEvent) {
        if (e) e.stopPropagation()
        await Promise.resolve(this.divisionItem)
            .then(divisionItem => {
                if (divisionItem) {
                    const detail = {
                        mode: e?.detail.mode || ECRUDModes.CREATE,
                        poolItem: e?.detail.poolItem || {
                            Id: 0,
                            Name: '',
                            DivisionId: divisionItem.Id,
                            ManagerId: 0
                        }
                    }

                    const modifyPoolEvent: IModifyPoolEvent = new CustomEvent(
                        this.MODIFY_POOL_EVENT_NAME,
                        {
                            detail,
                            bubbles: true,
                            composed: true
                        }
                    )

                    this.dispatchEvent(modifyPoolEvent)
                }
            })
    }

    assignUsersButtonClickHandler() {
        const detail = {
            mode: EAssignUsersPopupMods.assignIntoDivision
        }

        const assignEvent: IAssignUsersButtonClickEvent = new CustomEvent(
            this.ASSIGN_USERS_EVENT_NAME,
            {
                detail,
                bubbles: true,
                composed: true
            }
        )

        this.dispatchEvent(assignEvent)
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'division-details-layer': DivisionDetailsLayer;
    }
}
