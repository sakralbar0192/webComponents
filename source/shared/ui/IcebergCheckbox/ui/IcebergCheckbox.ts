import styles from './styles.lit.scss'
import { LitElement, css, html } from 'lit'
import { property } from 'lit/decorators.js'
import { IIcebergCheckboxChangeEvent, IIcebergCheckboxChangeEventDetail, EIcebergCheckboxTypes, EIcebergCheckboxPositioningTypes } from '../types'
import { ifDefined } from 'lit/directives/if-defined.js'
import { when } from 'lit/directives/when.js'
import { getUniqId } from 'shared/helpers/generators/getIdGenerator'

export class IcebergCheckbox extends LitElement {
    @property({type: Boolean}) disabled?: boolean
    @property({type: Boolean}) checked? = false
    @property({type: String}) label?: string
    @property({type: Object, attribute: false}) type: EIcebergCheckboxTypes = EIcebergCheckboxTypes.CHECKBOX
    @property({type: Object, attribute: false}) positioningType?: EIcebergCheckboxPositioningTypes
    @property({type: Object, attribute: false}) key?: unknown

    CHECKED_CHANCHE_EVENT = 'change'
    uniqId: string

    connectedCallback() {
        super.connectedCallback()
        this.uniqId = String(getUniqId())
    }

    static styles = css`
        ${styles}
    `

    render() {
        return html`
            <input
                id=${this.uniqId}
                type=${this.type}
                ?checked=${this.checked}
                ?disabled=${this.disabled}
                @change=${this.onChangeHandler}
            />
            <label
                for=${this.uniqId}
                class=${ifDefined(this.positioningType || undefined)}
            >
                <span>
                ${
                    when(
                        this.label,
                        () => html`${this.label}`,
                        () => html`<slot></slot>`
                    )
                }
                </span>
            </label>
        `
    }

    onChangeHandler(e: Event) {
        const target = e.target as HTMLInputElement
        this.checked = !this.checked

        const detail: IIcebergCheckboxChangeEventDetail = {
            checkbox: target,
            checked: this.checked,
            key: this.key
        }

        const checkedEvent: IIcebergCheckboxChangeEvent = new CustomEvent(this.CHECKED_CHANCHE_EVENT, {detail, bubbles: true, composed: true,})
        this.dispatchEvent(checkedEvent)
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'iceberg-checkbox': IcebergCheckbox;
    }
}
