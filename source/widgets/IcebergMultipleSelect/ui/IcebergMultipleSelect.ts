import { property, state } from 'lit/decorators.js'
import styles from './styles.lit.scss'
import { css, html, nothing } from 'lit'
import { IcebergSelect } from 'shared/ui/IcebergSelect'
import { repeat } from 'lit/directives/repeat.js'
import { IMultipleSelectAwaitedOptionsEvent, IMultipleSelectAwaitedOptionsEventDetail, IMultipleSelectCheckboxChangeEvent, IMultipleSelectCheckboxChangeEventDetail, IMultipleSelectOption } from '../types'
import { defineIcebergCheckbox } from 'shared/ui/IcebergCheckbox'

defineIcebergCheckbox()

export class IcebergMultipleSelect extends IcebergSelect {
    @property({type: String, reflect: false, attribute: false}) title: string
    @property(
        {
            type: Array,
            reflect: false,
            attribute: false,
            hasChanged: (
                newOptions: IMultipleSelectOption[] | Promise<IMultipleSelectOption[]>,
                oldOptions: IMultipleSelectOption[] | Promise<IMultipleSelectOption[]>
            ) => {
                if (newOptions instanceof Promise || oldOptions instanceof Promise) {
                    return true
                } else {
                    if (newOptions.length === oldOptions.length) {
                        return JSON.stringify(oldOptions) !== JSON.stringify(newOptions)
                    } else return true
                }
            }
        }
    ) options: IMultipleSelectOption[] | Promise<IMultipleSelectOption[]>
    @state() isAllSelected: boolean

    CHANGE_OPTION_SELECTED_STATE_EVENT_NAME = 'optionSelectedChange'
    OPTIONS_AWATED_EVENT_NAME = 'awaitedOptions'

    static styles = css`
        ${styles}
    `

    async selectTemplate() {
        if (this.options instanceof Promise) {
            return await Promise.resolve(this.options)
                .then(options => {
                    this.options = [...options]

                    const detail: IMultipleSelectAwaitedOptionsEventDetail = {
                        options: [...options]
                    }

                    const awaitedOptionsEvent: IMultipleSelectAwaitedOptionsEvent = new CustomEvent(
                        this.OPTIONS_AWATED_EVENT_NAME,
                        {
                            detail,
                            composed: true,
                            bubbles: true
                        }
                    )

                    this.dispatchEvent(awaitedOptionsEvent)

                    return html`<iceberg-loader></iceberg-loader>`
                })
        } else {
            return this.options.length
                ? html`
                    <div class='container'>
                        <p class='title'>
                            ${this.title}
                        </p>
                        <ul class='list'>
                            ${this.optionsTemplate(this.options)}
                        </ul>
                        <iceberg-checkbox
                            ?checked=${this.isAllSelected}
                            @change=${this.selectAllcheckedChangeHandler}
                        >
                            Select all
                        </iceberg-checkbox>
                    </div>
                `
                : nothing
        }
    }

    optionsGroupTemplate(group: IMultipleSelectOption) {
        return group.options
            ? html`
                <ul class='grouplist'>
                    ${repeat(group.options, (item) => item.id, (item) => this.optionTemplate(item))}
                </ul>
            `
            : nothing
    }

    optionTemplate(item: IMultipleSelectOption) {
        return html`
            <li>
                <iceberg-checkbox
                    .key=${item}
                    ?checked=${item.checked}
                    @change=${this.checkedChangeHandler}
                >
                    ${item.value}
                </iceberg-checkbox>
            </li>
        `
    }

    selectAllcheckedChangeHandler(e: IMultipleSelectCheckboxChangeEvent) {
        const {checked} = e.detail
        const detail: IMultipleSelectCheckboxChangeEventDetail = {
            ...e.detail,
            isItSelectAllCheckbox: true
        }

        if (!(this.options instanceof Promise)) {
            this.options = [...this.options.map(option => {
                return {
                    ...option,
                    checked
                }
            })]
        }

        this.checkAllSelected()

        this.dispatchOptionSelectedChangeEvent(detail)
    }

    async checkedChangeHandler(e: IMultipleSelectCheckboxChangeEvent) {
        const {key, checked} = e.detail

        const detail: IMultipleSelectCheckboxChangeEventDetail = {
            ...e.detail,
            isItSelectAllCheckbox: false
        }

        if (!(this.options instanceof Promise) && key) {
            const selectedItemIndex = this.options.findIndex(option => option.id === key.id && option.value === key.value)

            this.options[selectedItemIndex] = {...this.options[selectedItemIndex], checked}

            this.options = [...this.options]
        }

        this.checkAllSelected()

        this.dispatchOptionSelectedChangeEvent(detail)
    }

    dispatchOptionSelectedChangeEvent(detail: IMultipleSelectCheckboxChangeEventDetail) {
        const optionSelectedChangeEvent: IMultipleSelectCheckboxChangeEvent = new CustomEvent(
            this.CHANGE_OPTION_SELECTED_STATE_EVENT_NAME,
            {
                detail,
                composed: true,
                bubbles: true
            }
        )

        this.dispatchEvent(optionSelectedChangeEvent)
    }

    checkAllSelected() {
        this.isAllSelected = this.options instanceof Promise
            ? false
            : !(this.options.find(option => !option.checked))
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'iceberg-multiple-select': IcebergMultipleSelect;
    }
}
