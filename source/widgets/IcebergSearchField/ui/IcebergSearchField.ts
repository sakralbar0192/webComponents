import { defineIcebergInput, IIcebergInputInputEvent, EIcebergInputTypeAttribute } from 'shared/ui/IcebergInput'
import styles from './styles.lit.scss'
import { LitElement, css, html, nothing } from 'lit'
import { searchIcon } from 'shared/assets/icons/searchIcon'
import { IIcebergSearchFieldSearchEventDetail } from '../types'
import { property, state } from 'lit/decorators.js'
import { ISizes } from 'shared/types'

defineIcebergInput()

export class IcebergSearchField extends LitElement {
    @state() fieldInFocus: boolean
    @property({type: String, attribute: false, reflect: false}) value = ''
    @property({type: String, attribute: false, reflect: false}) activePlaceholder: string
    @property({type: String, attribute: false, reflect: false}) inactivePlaceholder: string

    SEARCH_ICON_SIZES: ISizes = {width: 16, height: 16}
    SEARCH_EVENT_NAME = 'needSearch'
    INPUT_TYPE: EIcebergInputTypeAttribute = 'search'

    static styles = css`
        ${styles}
    `

    render() {
        return html`
            <label>
                <iceberg-input
                    .type=${this.INPUT_TYPE}
                    .value=${this.value}
                    .placeholder=${
                        this.fieldInFocus
                            ? this.activePlaceholder
                            : this.inactivePlaceholder
                    }
                    @valueInput=${this.valueInputHandler}
                    @inputBlur=${this.inputBlurHandler}
                    @inputFocus=${this.inputFocusHandler}
                ></iceberg-input>
                ${
                    !this.fieldInFocus && !this.value
                        ? searchIcon(this.SEARCH_ICON_SIZES)
                        : nothing
                    }
            </label>
        `
    }

    valueInputHandler(e: IIcebergInputInputEvent) {
        const searchText = e.detail.value.trim()
        this.value = searchText

        const detail: IIcebergSearchFieldSearchEventDetail = {
            searchText
        }

        const searchEvent = new CustomEvent(
            this.SEARCH_EVENT_NAME,
            {
                detail,
                bubbles: true,
                composed: true
            }
        )

        this.dispatchEvent(searchEvent)
    }

    inputBlurHandler() {
        this.fieldInFocus = false
    }

    inputFocusHandler() {
        this.fieldInFocus = true
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'iceberg-search-field': IcebergSearchField;
    }
}
