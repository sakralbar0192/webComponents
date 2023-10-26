import styles from './styles.lit.scss'
import { LitElement, css, html, CSSResultGroup } from 'lit'
import { property, state } from 'lit/decorators.js'
import { ClassInfo, classMap } from 'lit/directives/class-map.js'
import { defineIcebergButton } from 'shared/ui/IcebergButton'
import { defineIcebergLoader } from 'shared/ui/loaders/IcebergLoader'
import { IPopupResultEvent, IPopupResultEventDetail } from 'shared/types'
import { EIcebergButtonSizes, EIcebergButtonTypes } from 'shared/ui/IcebergButton'

defineIcebergButton()
defineIcebergLoader()

export class IcebergPopup extends LitElement {
    @property({type: Boolean}) visible = false
    @state() isLoading = false
    @state() message = ''

    isSuccess = true
    isNote: boolean
    timer?: NodeJS.Timeout
    headerTitle = ''
    needToAskBeforeClosing: boolean
    narrow: boolean

    MESSAGE_SHOW_TIME = 5000
    RESULT_EVENT_NAME = 'popupResult'
    PREVENT_ACCIDENTAL_CLOSE_MESSAGE = 'if you want to close the popup click on the overlay again'

    connectedCallback(): void {
        super.connectedCallback()
        document.addEventListener('keydown', this.checkKeyHandler)
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()
        document.removeEventListener('keydown', this.checkKeyHandler)
    }

    static styles = css`
        ${styles}
    ` as CSSResultGroup

    render() {
        const classes: ClassInfo = {
            visible: this.visible,
            invisible: !this.visible,
            narrow: this.narrow
        }

        return html`
            <div class="modal ${classMap(classes)}">
                <div class="overlay" @click=${this.overlayClick}></div>
                <div class="popup">
                    ${this.headerTemplate()}
                    ${this.mainTemplate()}
                    ${this.footerTemplate()}
                </div>
            </div>
        `
    }

    headerTemplate() {
        return html`
            <header>
                ${this.headerTitle}
            </header>
        `
    }

    mainTemplate() {
        return html`
            <main>
                popup body
            </main>
        `
    }

    footerTemplate() {
        const classes: ClassInfo = {
            success: this.isSuccess && !this.isNote,
            error: !this.isSuccess && !this.isNote,
            note: this.isNote
        }

        return html`
            <footer>
                <p class=${classMap(classes)}>${this.message}</p>
                <div class='bottomRow'>
                    <div>
                        ${this.isLoading
                            ? html`<iceberg-loader></iceberg-loader>`
                            : ''
                        }
                    </div>
                    <div>
                        <iceberg-button
                            .size=${EIcebergButtonSizes.XS}
                            @click=${this.okClick}
                            ?disabled=${this.isLoading}
                        >
                            Ok
                        </iceberg-button>
                        <iceberg-button
                            .type=${EIcebergButtonTypes.OUTLINED}
                            .size=${EIcebergButtonSizes.XS}
                            @click=${this.cancelClick}
                            ?disabled=${this.isLoading}
                        >
                            Cancel
                        </iceberg-button>
                    </div>
                </div>
            </footer>
        `
    }

    loaderTemplate() {
        return  html`
            <div class='centered'>
                <iceberg-loader></iceberg-loader>
            </div>
        `
    }

    cancelClick() {
        const detail: IPopupResultEventDetail = {
            IsSucceeded: false
        }
        const cancelEvent: IPopupResultEvent = new CustomEvent(
            this.RESULT_EVENT_NAME,
            {
                detail,
                bubbles: true,
                composed: true
            }
        )
        this.dispatchEvent(cancelEvent)
        this.visible = false
        this.message = ''
    }

    okClick() {
        const detail: IPopupResultEventDetail = {
            IsSucceeded: true
        }
        const okEvent: IPopupResultEvent = new CustomEvent(
            this.RESULT_EVENT_NAME,
            {
                detail,
                bubbles: true,
                composed: true
            }
        )

        this.dispatchEvent(okEvent)
        this.visible = false
    }

    overlayClick() {
        if (this.needToAskBeforeClosing) {
            this.needToAskBeforeClosing = false
            this.showMessage(this.PREVENT_ACCIDENTAL_CLOSE_MESSAGE, false, true)
        } else {
            this.cancelClick()
        }
    }

    showMessage(message: string, isSuccess = false, isNote = false) {
        this.isNote = isNote
        this.isSuccess = isSuccess
        this.message = message
        this.resetMessage()
    }

    resetMessage() {
        if (this.timer) {
            clearTimeout(this.timer)
        }

        this.timer = setTimeout(() => {
            this.isSuccess = true
            this.message = ''
        }, this.MESSAGE_SHOW_TIME)
    }

    checkKey(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            this.cancelClick()
        } else if (e.key === 'Enter') {
            this.okClick()
        }
    }

    checkKeyHandler = this.checkKey.bind(this)
}

declare global {
    interface HTMLElementTagNameMap {
        'iceberg-popup': IcebergPopup;
    }
}
