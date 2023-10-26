import styles from './styles.lit.scss'
import { html, css } from 'lit'
import { repeat } from 'lit-html/directives/repeat.js'
import { until } from 'lit-html/directives/until.js'
import { property } from 'lit/decorators.js'
import { DEFAULT_ERROR_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'shared/messages'
import { defineIcebergCheckbox, EIcebergCheckboxPositioningTypes } from 'shared/ui/IcebergCheckbox'
import { IcebergPopup } from 'shared/ui/IcebergPopup'
import { IPossibleManagerCheckboxChangeEvent, IUpdateManagersPopupResultEvent, IUpdateManagersPopupResultEventDetail } from '../types'
import { IPossibleManagerItem } from 'entities/Users/types'
import { updateDivisionManagers } from 'entities/Users/api/updateDivisionManagers'

defineIcebergCheckbox()

export class UpdateDivisionManagersPopup extends IcebergPopup {
    @property() divisionId?: number
    @property() possibleDivisionManagers?: Promise<IPossibleManagerItem[] | undefined>

    headerTitle = 'Edit division manager list'

    static styles = [
        IcebergPopup.styles,
        css`
          ${styles}  
        `
    ]

    mainTemplate() {
        return html`
            ${
                until(
                    this.possibleDivisionManagersListTemplate(),
                    this.loaderTemplate()
                )
            }
        `
    }

    async possibleDivisionManagersListTemplate() {
        return Promise.resolve(this.possibleDivisionManagers)
            .then(possibleDivisionManagers => {
                if (possibleDivisionManagers) {
                    return html`
                        <main>
                            <ul>
                                ${
                                    repeat(
                                        possibleDivisionManagers,
                                        (possibleManager) => possibleManager.Id,
                                        (possibleManager) => this.possibleDivisionManagerItemTemplate(possibleManager)
                                    )
                                }
                            </ul>
                        </main>
                    `
                } else return DEFAULT_ERROR_MESSAGE
            })
    }

    possibleDivisionManagerItemTemplate(possibleManager: IPossibleManagerItem) {
        return html`
            <li>
                <iceberg-checkbox
                    .positioningType=${EIcebergCheckboxPositioningTypes.REVERSE}
                    ?checked=${possibleManager.IsManager}
                    .key=${possibleManager}
                    @change=${this.checkedChangeHandler}
                >
                    ${possibleManager.Name}
                </iceberg-checkbox>
            </li>
        `
    }

    checkedChangeHandler(e: IPossibleManagerCheckboxChangeEvent) {
        this.needToAskBeforeClosing = true

        const {checked, key} = e.detail

        key.IsManager = checked
    }

    async okClick() {
        this.isLoading = true
        const divisionManagerIds = await this.getdivisionManagerIds()

        if (this.divisionId) {
            const response = await updateDivisionManagers(
                divisionManagerIds,
                this.divisionId
            )

            if (response.IsSucceeded) {
                const detail: IUpdateManagersPopupResultEventDetail = {
                    IsSucceeded: response.IsSucceeded,
                    Managers: response.Value
                }

                const resultEvent: IUpdateManagersPopupResultEvent = new CustomEvent(this.RESULT_EVENT_NAME, {detail, bubbles: true, composed: true})
                this.dispatchEvent(resultEvent)
                this.visible = false
                this.isLoading = false
            } else {
                const message = response.Message ? response.Message : UNKNOWN_ERROR_MESSAGE
                this.showMessage(message, false)
                this.isLoading = false
            }
        }
    }

    async getdivisionManagerIds() {
        const chosenDivisionManagers: number[] = []
        await Promise.resolve(this.possibleDivisionManagers)
            .then(possibleDivisionManagers => {
                if (possibleDivisionManagers) {
                    possibleDivisionManagers.forEach(possibleManager => {
                        if (possibleManager.IsManager) chosenDivisionManagers.push(possibleManager.Id)
                    })
                }
            })
        return chosenDivisionManagers
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'update-division-managers-popup': UpdateDivisionManagersPopup;
    }
}
