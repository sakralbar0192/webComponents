import { until } from 'lit/directives/until.js'
import { defineIcebergLoader } from 'shared/ui/loaders/IcebergLoader'
import styles from './styles.lit.scss'
import { LitElement, css, html, nothing, TemplateResult } from 'lit'
import { property } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { IIcebergSelectChangeEvent, IIcebergSelectChangeEventDetail, ISelectOption } from '../types'

defineIcebergLoader()

export class IcebergSelect extends LitElement {
    @property({type: Array}) options: ISelectOption[] | Promise<ISelectOption[]>
    @property({type: Number}) selectedOptionId?: number | string
    @property({type: Boolean}) disabled = false

    SELECTED_VALUE_CHANGE_EVENT = 'changeSelectedValue'

    static styles = css`
        ${styles}
    `

    render() {
        return this.options
            ? until(this.selectTemplate(), html`<iceberg-loader></iceberg-loader>`)
            : nothing
    }

    async selectTemplate() {
        return Promise.resolve(this.options)
            .then(options => {
                return options.length
                    ? html`
                        <div>
                            <select
                                ?disabled=${this.disabled}
                                @change=${(e: Event) => {this.changeSelectedItemHandler(e, options)}}
                            >
                                ${until(this.optionsTemplate(options), '')}
                            </select>
                            <span></span>
                        </div>
                    `
                    : nothing
            })
    }

    optionsTemplate(options: ISelectOption[]) {
        return repeat(options, (item) => item.id, (item) => {
            return item.options && item.options.length
                ? this.optionsGroupTemplate(item)
                : this.optionTemplate(item)
        })
    }

    optionTemplate(item: ISelectOption): TemplateResult {
        return html`
            <option value=${item.id} ?selected=${String(item.id) === String(this.selectedOptionId)}>
                ${item.value}
            </option>
        `
    }

    optionsGroupTemplate(group: ISelectOption): TemplateResult | symbol {
        return group.options
            ? html`
                <optgroup label=${group.value}>
                    ${repeat(group.options, (item) => item.id, (item) => this.optionTemplate(item))}
                </optgroup>
            `
            : nothing
    }

    changeSelectedItemHandler(e: Event, options: ISelectOption[]) {
        this.selectedOptionId = (e.target as HTMLSelectElement).value
        let selectedOption

        options.forEach(option => {
            if (option.options && option.options.length) {
                option.options.forEach(innerOption => {
                    if (String(innerOption.id) === String(this.selectedOptionId)) selectedOption = innerOption
                })
            } else if (String(option.id) === String(this.selectedOptionId)) {
                selectedOption = option
            }
        })

        if (selectedOption) {
            const detail: IIcebergSelectChangeEventDetail = {
                selectedOption
            }
            const changeEvent: IIcebergSelectChangeEvent = new CustomEvent(this.SELECTED_VALUE_CHANGE_EVENT, {detail, bubbles: true, composed: true,})
            this.dispatchEvent(changeEvent)
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'iceberg-select': IcebergSelect;
   }
}
