import { IcebergPopup } from 'shared/ui/IcebergPopup'
import { html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { IProjectItem } from 'entities/Projects/types'
import { IRemoveProjectPopupResultEvent, IRemoveProjectPopupResultEventDetail } from '../types'
import { deleteProject } from 'entities/Projects/api/deleteProject'
import { UNKNOWN_ERROR_MESSAGE } from 'shared/messages'

export class RemoveProjectPopup extends IcebergPopup {
    @property({type: Object, reflect: false, attribute: false}) projectItem: IProjectItem

    headerTitle = 'Delete project'
    narrow = true

    mainTemplate() {
        return html`
            ${
                this.projectItem
                    ? html`
                        <main>
                            <div class="form">
                                <div class="fieldset">
                                    <label>Project name</label>
                                    <iceberg-input
                                        disabled
                                        .value=${this.projectItem.Name}
                                    ></iceberg-input>                        
                                </div>
                                <div class="fieldset fieldsetRequired">
                                    <p class='note'>All the timesheet data for this project also will be deleted</p>
                                </div>
                            </div>
                        </main>
                    `
                    : nothing
            }
        `
    }

    async okClick() {
        this.isLoading = true
        const response = await deleteProject(this.projectItem.Id)

        if (response.IsSucceeded) {
            const detail: IRemoveProjectPopupResultEventDetail = {
                IsSucceeded: response.IsSucceeded,
                ProjectItem: response.Value
            }
            const resultEvent: IRemoveProjectPopupResultEvent = new CustomEvent(
                this.RESULT_EVENT_NAME,
                {
                    detail,
                    bubbles: true,
                    composed: true
                }
            )
            this.dispatchEvent(resultEvent)
            this.visible = false
        } else {
            const message = response.Message ? response.Message : UNKNOWN_ERROR_MESSAGE
            this.showMessage(message, false)
        }
        this.isLoading = false
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'remove-project-popup': RemoveProjectPopup;
    }
}
