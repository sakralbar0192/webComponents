import styles from './styles.lit.scss'
import { LitElement, css, html } from 'lit'
import { property } from 'lit/decorators.js'
import { DEFAULT_ERROR_MESSAGE } from 'shared/messages'
import { defineIcebergButton } from 'shared/ui/IcebergButton'

defineIcebergButton()

export class ErrorPlug extends LitElement {
    @property() errorMessage = DEFAULT_ERROR_MESSAGE

    ADDITIONAL_MESSAGE = 'Try to reload this page'
    static styles = css`
        ${styles}
    `

    render() {
        return html`
            <div>
                <p>${this.errorMessage}</p>
                <p>${this.ADDITIONAL_MESSAGE}</p>
                <iceberg-button
                    @click=${() => window.location.reload()}
                >
                    Reload page
                </iceberg-button>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'error-plug': ErrorPlug;
    }
}
