import { IPoolItem } from 'entities/Pools/types'
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { UNKNOWN_ERROR_MESSAGE } from 'shared/messages'
import { until } from 'lit/directives/until.js'
import { modifyPool } from 'entities/Pools/api/modifyPool'
import { TIcebergInput, defineIcebergInput, IIcebergInputChangeEvent } from 'shared/ui/IcebergInput'
import { IIcebergSelectChangeEvent, ISelectOption, defineIcebergSelect } from 'shared/ui/IcebergSelect'
import { IModifyPoolPopupResultEvent, IModifyPoolPopupResultEventDetail } from '../types'
import { IcebergPopup } from 'shared/ui/IcebergPopup'
import { ECRUDModes } from 'shared/types'
import { Ref, createRef, ref } from 'lit/directives/ref.js'
import { IPossibleManagerItem } from 'entities/Users/types'
import { ifDefined } from 'lit/directives/if-defined.js'

defineIcebergInput()
defineIcebergSelect()

export class ModifyPoolPopup extends IcebergPopup {
    @property({type: Object, reflect: false, attribute: false}) poolItem: IPoolItem
    @property({type: String, reflect: false, attribute: false}) mode: ECRUDModes
    @property({type: Array, reflect: false, attribute: false}) possibleManagers: Promise<IPossibleManagerItem[] | undefined>

    currentManagerId?: number
    EMPTY_MANAGER_ID = 0
    INVALID_EMPTY_POOL_NAME_MESSAGE = 'The pool name cannot be empty'

    nameFieldRef: Ref<TIcebergInput> = createRef()

    headerTemplate() {
        return html`
            <header>
                ${this.mode} pool
            </header>
        `
    }

    mainTemplate() {
        if (this.mode && this.poolItem && (this.mode === ECRUDModes.DELETE || this.possibleManagers) ) {
            const disableForm = this.mode === ECRUDModes.DELETE

            return html`
                <main>
                    <div class="form">
                        <div class="fieldset requiredFieldset">
                            <label>Pool name</label>
                            <iceberg-input
                                ${ref(this.nameFieldRef)}
                                ?disabled=${disableForm}
                                .value=${this.poolItem.Name}
                                @valueChange=${this.poolNameChangeHandler}
                            ></iceberg-input>                     
                        </div>
                        
                        <div class="fieldset">
                            <label>Manager name</label>
                            ${
                                disableForm
                                    ? html`
                                        <iceberg-input
                                            disabled
                                            value=${ifDefined(this.poolItem.ManagerName)}
                                        ></iceberg-input> 
                                    `
                                    : until(this.managersSelectTemplate(), this.loaderTemplate())
                            }
                        </div>
                    </div>
                </main>
            `
        } else {
            return this.loaderTemplate()
        }
    }

    async managersSelectTemplate() {
        return Promise.resolve(this.possibleManagers)
            .then(possibleManagers => {
                if (possibleManagers) {
                    const selectOptions = this.createSelectOptions(possibleManagers)

                    return html`
                        <iceberg-select
                            .options=${selectOptions}
                            .selectedOptionId=${this.poolItem.ManagerId}
                            @changeSelectedValue=${this.changeManagerIdHandler}
                        ></iceberg-select>
                    `
                } else return 'error'
            })
    }

    async okClick() {
        this.isLoading = true
        const nameField = this.nameFieldRef.value
        const poolItem = {...this.poolItem}

        if (nameField && poolItem.Name !== nameField.value) poolItem.Name = nameField.value

        if (!poolItem.Name) {
            const message = this.INVALID_EMPTY_POOL_NAME_MESSAGE
            this.showMessage(message, false)
            this.isLoading = false
        }

        if (!this.currentManagerId) this.currentManagerId = this.EMPTY_MANAGER_ID

        const response  = await modifyPool(
            this.mode,
            poolItem
        )

        if (response.IsSucceeded) {
            const detail: IModifyPoolPopupResultEventDetail = {
                IsSucceeded: response.IsSucceeded,
                PoolItem: response.Value
            }
            const resultEvent: IModifyPoolPopupResultEvent = new CustomEvent(
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
    }

    createSelectOptions(possibleManagers: IPossibleManagerItem[]): ISelectOption[] {
        const selectOptions = possibleManagers.map(manager => {
            return {
                id: manager.Id,
                value: manager.Name
            }
        })

        selectOptions.unshift({id: this.EMPTY_MANAGER_ID, value: ''})

        return selectOptions
    }

    poolNameChangeHandler(e: IIcebergInputChangeEvent) {
        this.needToAskBeforeClosing = true

        this.poolItem = {
            ...this.poolItem,
            Name: e.detail.value
        }
    }

    changeManagerIdHandler(e: IIcebergSelectChangeEvent) {
        this.needToAskBeforeClosing = true

        this.poolItem = {
            ...this.poolItem,
            ManagerId: Number(e.detail.selectedOption.id)
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'modify-pool-popup': ModifyPoolPopup;
    }
}
