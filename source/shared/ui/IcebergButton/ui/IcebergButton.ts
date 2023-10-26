import styles from './styles.lit.scss'
import { LitElement, css, html } from 'lit'
import { property } from 'lit/decorators.js'
import { EIcebergButtonSizes, EIcebergButtonTypes } from '../types'
import { when } from 'lit/directives/when.js'

export class IcebergButton extends LitElement {
    @property({type: String, attribute: false}) type: EIcebergButtonTypes = EIcebergButtonTypes.PRIMARY
    @property({type: String, attribute: false}) size: EIcebergButtonSizes = EIcebergButtonSizes.SM
    @property({type: Boolean}) disabled = false
    @property({type: String}) text: string

    static styles = css`
        ${styles}
    `

    render() {
        return html`
            <button
                type='button'
                class='${this.type} ${this.size}'
                ?disabled=${this.disabled}
            >
                ${when(this.text, () => html`${this.text}`, () => html`<slot></slot>`)}
            </button>
        `
    }
}

declare global {
	interface HTMLElementTagNameMap {
	    'iceberg-button': IcebergButton;
	}
}
