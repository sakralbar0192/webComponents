import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { modifyDivision } from 'entities/Divisions/api/modifyDivision'
import { UNKNOWN_ERROR_MESSAGE } from 'shared/messages'
import { INVALID_EMPTY_DIVISION_NAME_MESSAGE } from 'entities/Divisions/messages'
import { IDivisionItem } from 'entities/Divisions/types'
import { defineIcebergCheckbox, IIcebergCheckboxChangeEvent } from 'shared/ui/IcebergCheckbox'
import { TIcebergInput, defineIcebergInput, IIcebergInputChangeEvent } from 'shared/ui/IcebergInput'
import { IModifyDivisionPopupResultEvent, IModifyDivisionPopupResultEventDetail } from '../types'
import { IcebergPopup } from 'shared/ui/IcebergPopup'
import { ECRUDModes } from 'shared/types'
import { Ref, createRef, ref } from 'lit/directives/ref.js'

defineIcebergInput()
defineIcebergCheckbox()

export class ModifyDivisionPopup extends IcebergPopup {
    @property({type: String, reflect: false, attribute: false}) mode: ECRUDModes
    @property({type: Object, reflect: false, attribute: false}) divisionItem: IDivisionItem

    nameFieldRef: Ref<TIcebergInput> = createRef()

    headerTemplate() {
        return html`
            <header>
                ${this.mode} division
            </header>
        `
    }

    mainTemplate() {
        const disableForm = this.mode === ECRUDModes.DELETE

        if (this.divisionItem) {
            return html`
                <main>
                    <div class="form">
                        <div class="fieldset requiredFieldset">
                            <label>Division name</label>
                            <iceberg-input
                                ${ref(this.nameFieldRef)}
                                ?disabled=${disableForm}
                                .value=${this.divisionItem.Name}
                                @valueChange=${this.divisionsNameChangeHandler}
                            ></iceberg-input>                        
                        </div>
                        
                        <div class="fieldset checkboxFieldset">
                            <iceberg-checkbox
                                @change=${this.DDCheckboxChangeHandler}
                                ?disabled=${disableForm}
                                ?checked=${this.divisionItem.IsProduction}
                            >
                                Delivery division
                            </iceberg-checkbox>
                        </div>
                        <div class="fieldset checkboxFieldset">
                            <iceberg-checkbox
                                @change=${this.STAChangeHandler}
                                ?disabled=${disableForm}
                                ?checked=${this.divisionItem.SendTimeApprovalNotifications}
                            >
                                Send time approval notifications
                            </iceberg-checkbox>
                        </div>
                    </div>
                </main>
            `
        } else {
            return this.loaderTemplate()
        }
    }

    async okClick() {
        this.isLoading = true
        const nameField = this.nameFieldRef.value
        const divisionItem = {...this.divisionItem}

        if (nameField && divisionItem.Name !== nameField.value) divisionItem.Name = nameField.value

        if (divisionItem.Name) {
            const response = await modifyDivision(
                this.mode,
                divisionItem
            )

            if (response.IsSucceeded) {
                const detail: IModifyDivisionPopupResultEventDetail = {
                    IsSucceeded: response.IsSucceeded,
                    DivisionItem: response.Value
                }
                const resultEvent: IModifyDivisionPopupResultEvent = new CustomEvent(
                    this.RESULT_EVENT_NAME,
                    {
                        detail,
                        bubbles: true,
                        composed: true
                    }
                )
                this.dispatchEvent(resultEvent)
                this.visible = false
                this.isLoading = false
            } else {
                const message = response.Message ? response.Message : UNKNOWN_ERROR_MESSAGE
                this.showMessage(message, false)
                this.isLoading = false
            }
        } else  {
            const message = INVALID_EMPTY_DIVISION_NAME_MESSAGE
            this.showMessage(message, false)
            this.isLoading = false
        }
    }

    STAChangeHandler(e: IIcebergCheckboxChangeEvent) {
        this.needToAskBeforeClosing = true

        this.divisionItem = {
            ...this.divisionItem,
            SendTimeApprovalNotifications: e.detail.checked
        }
    }

    DDCheckboxChangeHandler(e: IIcebergCheckboxChangeEvent) {
        this.needToAskBeforeClosing = true

        this.divisionItem = {
            ...this.divisionItem,
            IsProduction: e.detail.checked
        }
    }

    divisionsNameChangeHandler(e: IIcebergInputChangeEvent) {
        this.needToAskBeforeClosing = true

        this.divisionItem = {
            ...this.divisionItem,
            Name: e.detail.value
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'modify-division-popup': ModifyDivisionPopup;
    }
}
