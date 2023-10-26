import styles from './styles.lit.scss'
import { CSSResultGroup, LitElement, css, html } from 'lit'
import { property } from 'lit/decorators.js'
import { EIcebergInputTypeAttribute, IIcebergInputChangeEvent, IIcebergInputChangeEventDetail, IIcebergInputInputEvent, IIcebergInputInputEventDetail } from '../types'
import { ifDefined } from 'lit/directives/if-defined.js'

export class IcebergInput extends LitElement {
    @property({type: String, attribute: false}) placeholder = ''
    @property({type: String, attribute: false}) type: EIcebergInputTypeAttribute = 'text'
    @property({type: String, attribute: false}) value = ''
    @property({type: Boolean}) disabled: boolean
    @property({type: Number}) maxLength: number

    VALUE_CHANGE_EVENT = 'valueChange'
    INPUT_VALUE_EVENT = 'valueInput'
    FOCUS_EVENT = 'inputFocus'
    BLUR_EVENT = 'inputBlur'

    static styles = css`
        ${styles}
    ` as CSSResultGroup

    render() {
        return html`
            <input
                type=${this.type}
                .value=${this.value}
                @input=${this.onInputHandler}
                @focus=${this.onFocusHandler}
                @blur=${this.onBlurHandler}
                placeholder=${this.placeholder}
                ?disabled=${this.disabled}
                @change = ${this.onChangeHandler}
                maxlength=${ifDefined(this.maxLength ? this.maxLength : undefined)}
            />
        `
    }

    onInputHandler(e: Event) {
        const target =  (e.target as HTMLInputElement)
        this.value = target.value
        const detail: IIcebergInputInputEventDetail = {
            input: target,
            value: target.value
        }
        const inputEvent: IIcebergInputInputEvent = new CustomEvent(this.INPUT_VALUE_EVENT, {detail, bubbles: true, composed: true,})
        this.dispatchEvent(inputEvent)
    }

    onChangeHandler(e: Event) {
        const target =  (e.target as HTMLInputElement)
        this.value = target.value
        const detail: IIcebergInputChangeEventDetail = {
            input: target,
            value: target.value
        }
        const changeEvent: IIcebergInputChangeEvent = new CustomEvent(this.VALUE_CHANGE_EVENT, {detail, bubbles: true, composed: true,})
        this.dispatchEvent(changeEvent)
    }

    onFocusHandler() {
        const focusEvent = new Event(this.FOCUS_EVENT, {bubbles: true, composed: true,})
        this.dispatchEvent(focusEvent)
    }

    onBlurHandler() {
        const blurEvent = new Event(this.BLUR_EVENT, {bubbles: true, composed: true,})
        this.dispatchEvent(blurEvent)
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'iceberg-input': IcebergInput;
    }
}
