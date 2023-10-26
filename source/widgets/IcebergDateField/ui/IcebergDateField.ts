import styles from './styles.lit.scss'
import { LitElement, css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { calendarIcon } from 'shared/assets/icons/calendarIcon'
import { property, state } from 'lit/decorators.js'
import { defineIcebergCalendar, TIcebergCalendar, IChooseDateEvent } from 'widgets/IcebergCalendar'
import { createRef, ref, Ref } from 'lit/directives/ref.js'
import { formatDateToString } from 'shared/helpers/formatDateToString'
import { IcebergInput, IIcebergInputChangeEvent } from 'shared/ui/IcebergInput'
import { defineIcebergDateInput } from 'widgets/IcebergDateInput'
import { dateRegEx } from 'shared/regularExpressions'
import { formatStringToDate } from 'shared/helpers/formatStringToDate'
import { reportAboutInvalidity } from 'shared/helpers/validation/reportAboutInvalidity'
import { IChangeCurrentDateEvent, IChangeCurrentDateEventDetail } from '../types'
import { ISvgParams } from 'shared/types'

defineIcebergDateInput()
defineIcebergCalendar()

export class IcebergDateField extends LitElement {
    @state() dropdownShow = false
    @property() currentDate: Date = new Date()

    calendarIconSizes: ISvgParams = {width: 16, height: 16}

    INPUT_MAX_LENGHT = 10
    CHANGE_CURRENT_DATE_EVENT_NAME = 'changeDate'

    static styles = css`
        ${styles}
    `

    icebergCalendarRef: Ref<TIcebergCalendar> = createRef()

    render() {
        const classes = {
            container: true,
            dropdownShow: this.dropdownShow
        }

        return html`
            <div class=${classMap(classes)}>
                <iceberg-date-input
                    @focus=${this.showCalendar}
                    .value=${formatDateToString(this.currentDate)}
                    @valueChange=${this.valueChangeHandler}
                    maxlength=${this.INPUT_MAX_LENGHT}
                ></iceberg-date-input>
                <button
                    type='button'
                    @click=${this.showCalendar}
                >
                    ${calendarIcon(this.calendarIconSizes)}
                </button>
                <div class='dropdown'>
                    <iceberg-calendar
                        ${ref(this.icebergCalendarRef)}
                        .choosenDate=${this.currentDate}
                        .currentDate=${this.currentDate}
                        @chooseDate=${this.chooseDateHandler}
                    ></iceberg-calendar>
                </div>
                <div class='overlay' @click=${this.hideCalendar}></div>
            </div>
        `
    }

    showCalendar() {
        this.dropdownShow = true
    }

    hideCalendar() {
        this.dropdownShow = false
    }

    chooseDateHandler(e: IChooseDateEvent) {
        this.currentDate = e.detail.date
        this.dispatchChangeCurrentDateEvent()
        this.hideCalendar()
    }

    valueChangeHandler(e: IIcebergInputChangeEvent) {
        const value = (e.target as IcebergInput).value
        const isDateInRightFormat = dateRegEx.test(value)

        if (isDateInRightFormat) {
            const inputedDate = formatStringToDate(value)

            inputedDate === null
                ? reportAboutInvalidity(e.detail.input, 'Invalid date')
                : this.setDates(inputedDate)
        } else {
            (e.target as IcebergInput).value = formatDateToString(this.currentDate)
            this.setDates(new Date())
        }
    }

    setDates(date: Date) {
        this.currentDate = new Date(date)
        if (this.icebergCalendarRef.value) this.icebergCalendarRef.value.choosenDate = new Date(date)

        this.dispatchChangeCurrentDateEvent()
    }

    dispatchChangeCurrentDateEvent() {
        const detail: IChangeCurrentDateEventDetail = {
            date: new Date(this.currentDate),
            dateString: formatDateToString(this.currentDate)
        }
        const changeEvent: IChangeCurrentDateEvent = new CustomEvent(this.CHANGE_CURRENT_DATE_EVENT_NAME, {detail, bubbles: true, composed: true,})
        this.dispatchEvent(changeEvent)
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'iceberg-date-field': IcebergDateField;
    }
}
