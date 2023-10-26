import { updatePoolUser } from 'entities/Pools/api/updatePoolUser'
import { IUserItem } from 'entities/Users/types'
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { formatStringToDate } from 'shared/helpers/formatStringToDate'
import { UNKNOWN_ERROR_MESSAGE } from 'shared/messages'
import { IcebergPopup } from 'shared/ui/IcebergPopup'
import { IChangeCurrentDateEvent } from 'widgets/IcebergDateField'
import { IEditUserPoolPopupResultEvent, IEditUserPoolPopupResultEventDetail } from '../types'
import { ifDefined } from 'lit/directives/if-defined.js'

export class EditPoolUserPopup extends IcebergPopup {
    @property({type: Object, reflect: false, attribute: false}) userItem: IUserItem

    headerTemplate() {
        return html`
            <header>
                Edit user pool
            </header>
        `
    }

    mainTemplate() {
        if (this.userItem) {
            const startDate: Date = formatStringToDate(this.userItem.StartDate) ?? new Date()
            return html`
                <main>
                    <div class="form">
                        <div class="fieldset requiredFieldset">
                            <label>User name:</label>
                            <iceberg-input
                                disabled
                                .value=${this.userItem.Name}
                            ></iceberg-input>                        
                        </div>
                        
                        <div class="fieldset requiredFieldset">
                            <label>Pool:</label>
                            <iceberg-input
                                disabled
                                value=${ifDefined(this.userItem.PoolName)}
                            ></iceberg-input>                        
                        </div>
                        <div class="fieldset requiredFieldset">
                            <label>Pool start date:</label>
                            <iceberg-date-field
                                .currentDate=${startDate}
                                @changeDate=${this.changeDateHandler}
                            ></iceberg-date-field>                        
                        </div>
                    </div>
                </main>
            `
        } else {
            return this.loaderTemplate()
        }
    }

    changeDateHandler(e: IChangeCurrentDateEvent) {
        this.needToAskBeforeClosing = true

        this.userItem = {...this.userItem, StartDate: e.detail.dateString}
    }

    async okClick() {
        this.isLoading = true

        if (this.userItem.StartDate && this.userItem.FrameId && this.userItem.PoolId) {
            const response  = await updatePoolUser(
                this.userItem.Id,
                this.userItem.FrameId,
                this.userItem.PoolId,
                this.userItem.StartDate
            )

            if (response.IsSucceeded) {
                const detail: IEditUserPoolPopupResultEventDetail = {
                    IsSucceeded: response.IsSucceeded,
                    UserItem: response.Value
                }
                const resultEvent: IEditUserPoolPopupResultEvent = new CustomEvent(this.RESULT_EVENT_NAME, {detail, bubbles: true, composed: true})
                this.dispatchEvent(resultEvent)
                this.visible = false
                this.isLoading = false
            } else {
                const message = response.Message ? response.Message : UNKNOWN_ERROR_MESSAGE
                this.showMessage(message, false)
                this.isLoading = false
            }
        } else  {
            const message = 'Specify date'
            this.showMessage(message, false)
            this.isLoading = false
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'edit-pool-user-popup': EditPoolUserPopup;
    }
}
