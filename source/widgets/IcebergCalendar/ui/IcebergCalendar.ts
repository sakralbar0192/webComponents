import styles from './styles.lit.scss'
import { LitElement, css, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { choose } from 'lit/directives/choose.js'
import { ECalendarLayers, IChooseDateEvent, IChooseDateEventDetail, IDayInfo, IMonthInfo, IYearInfo } from '../types'
import { getDaysArray } from '../helpers/getDaysArray'
import { classMap } from 'lit/directives/class-map.js'
import { checkDatesEquality } from '../helpers/checkDatesEquality'
import { getYearsArray } from '../helpers/getYearsArray'
import { getMonthsArray } from '../helpers/getMonthsArray'
import { checkMonthsEquality } from '../helpers/checkMonthsEquality'
import { checkYearsEquality } from '../helpers/checkYearsEquality'

export class IcebergCalendar extends LitElement {
    @state() currentLayer: ECalendarLayers = ECalendarLayers.month
    @state() currentHeader: string
    @state() choosenDate: Date = new Date()
    @property() currentDate: Date = new Date()

    today: Date = new Date()

    MONTH_STEP = 1
    YEAR_STEP = 1
    DECADE_STEP = 9
    YEARS_AMPLITUDE_ON_DECADE_LAYER = 4
    WEEK_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

    DATE_CHOOSE_EVENT_NAME = 'chooseDate'

    static styles = css`
        ${styles}
    `

    render() {
        return html`
            <div class='calendar'>
                ${this.headerTemplate()}
                <main>
                    ${
                        choose(this.currentLayer, [
                            [ECalendarLayers.month, ()=> {
                                return this.monthTemplate()
                            }],
                            [ECalendarLayers.year, ()=> {
                                return this.yearTemplate()
                            }],
                            [ECalendarLayers.decade, ()=> {
                                return this.decadeTemplate()
                            }]
                        ],
                        () => html`<h1>Error</h1>`)
                    }
                </main>
                ${this.footerTemplate()}
            </div>
        `
    }

    headerTemplate() {
        return html`
            <header>
                <button 
                    class='navButton prev'
                    type='button'
                    @click=${this.prevButtonClickHandler}
                ></button>
                <button
                    @click=${this.changeLayer}
                >
                    ${
                        choose(this.currentLayer, [
                            [ECalendarLayers.month, ()=> {
                                return this.monthYearDateTemplate(this.currentDate)
                            }],
                            [ECalendarLayers.year, ()=> {
                                return this.yearDateTemplate(this.currentDate)
                            }],
                            [ECalendarLayers.decade, ()=> {
                                return this.decadeDateTemplate(this.currentDate)
                            }]
                        ],
                        () => html`<h1>Error</h1>`)
                    }
                </button>
                <button 
                    class='navButton next'
                    type='button'
                    @click=${this.nextButtonClickHandler}
                ></button>
            </header>
        `
    }

    monthTemplate() {
        return html`
            ${this.weekDaysTemplate()}
            ${this.monthDaysTemplate()}
        `
    }

    weekDaysTemplate() {
        return html`
            <div class='calendarRow week'>
                ${this.WEEK_DAYS.map(weekDay => html`<span>${weekDay}</span>`)}
            </div>
        `
    }

    monthDaysTemplate() {
        const calendarDaysArray: IDayInfo[][] = getDaysArray(this.currentDate)

        return html`
            ${calendarDaysArray.map(week => html`
                <div class='calendarRow week'>
                    ${this.weekTemplate(week)}
                </div>
            `)}
        `
    }

    weekTemplate(week: IDayInfo[]) {
        return html`
            ${
                week.map(dayInfo => {
                    const buttonClasses = {
                        notCurrentMonthDay: !dayInfo.isDayInCurrentMonth,
                        current: checkDatesEquality(dayInfo.date ,this.choosenDate)
                    }
                    return html`
                        <button
                            class=${classMap(buttonClasses)}
                            @click=${
                                () => this.dayClickHandler(dayInfo.date)
                            }
                        >
                            ${dayInfo.day}
                        </button>
                    `
                })
            }
        `
    }

    yearTemplate() {
        const calendarMonthsArray: IMonthInfo[][] = getMonthsArray(this.currentDate)
        return html`
            ${calendarMonthsArray.map(monthsGroup => this.monthsGroupTemplate(monthsGroup))}
        `
    }

    monthsGroupTemplate(monthsGroup: IMonthInfo[]) {
        return html`
            <div class='calendarRow month'>
                ${monthsGroup.map(monthInfo => this.monthButtonTemplate(monthInfo))}
            </div>
        `
    }

    monthButtonTemplate(monthInfo: IMonthInfo) {
        const buttonClasses = {
            current: checkMonthsEquality(monthInfo.date ,this.choosenDate)
        }
        return html`
            <button
                class=${classMap(buttonClasses)}
                @click=${()=>this.monthButtonClickHandler(monthInfo.date)}
            >
                ${monthInfo.month}
            </button>
        `
    }

    decadeTemplate() {
        const calendarYearsArray: IYearInfo[][] = getYearsArray(this.currentDate)

        return html`
            ${calendarYearsArray.map(yearsGroup => html`
                <div class='calendarRow year'>
                    ${this.yearsGroupTemplate(yearsGroup)}
                </div>
            `)}
        `
    }

    yearsGroupTemplate(yearsGroup: IYearInfo[]) {
        return html`
            ${yearsGroup.map(yearInfo => html`
                <div class='calendarRow year'>
                    ${this.yearButtonTemplate(yearInfo)}
                </div>
            `)}
        `
    }

    yearButtonTemplate(yearInfo: IYearInfo) {
        const buttonClasses = {
            current: checkYearsEquality(yearInfo.date, this.choosenDate)
        }
        return html`
            <button
                class=${classMap(buttonClasses)}
                @click=${()=>this.yearButtonClickHandler(yearInfo.date)}
            >
                ${yearInfo.year}
            </button>
        `
    }

    footerTemplate() {
        return html`
            <footer>
                <button
                    @click=${() => {this.dayClickHandler(this.today)}}
                >
                    Today: ${this.monthDayDateTemplate(this.today)}, ${this.today.getFullYear()}
                </button>
            </footer>
        `
    }

    monthDayDateTemplate(date: Date) {
        return date.toLocaleString('en', { month: 'long', day: '2-digit'})
    }

    monthYearDateTemplate(date: Date) {
        return  html`${date.toLocaleString('en', { month: 'long', year: 'numeric'})}`
    }

    yearDateTemplate(date: Date) {
        return  html`${date.toLocaleString('en', {year: 'numeric'})}`
    }

    decadeDateTemplate(date: Date) {
        return  html`${date.getFullYear() - this.YEARS_AMPLITUDE_ON_DECADE_LAYER} - ${date.getFullYear() + this.YEARS_AMPLITUDE_ON_DECADE_LAYER}`
    }

    prevButtonClickHandler() {
        switch (this.currentLayer) {
            case ECalendarLayers.month:
                this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - this.MONTH_STEP)
                break
            case ECalendarLayers.year:
                this.currentDate = new Date(this.currentDate.getFullYear() - this.YEAR_STEP, this.currentDate.getMonth())
                break
            case ECalendarLayers.decade:
                this.currentDate = new Date(this.currentDate.getFullYear() - this.DECADE_STEP, this.currentDate.getMonth())
                break
        }
    }

    nextButtonClickHandler() {
        switch (this.currentLayer) {
            case ECalendarLayers.month:
                this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + this.MONTH_STEP)
                break
            case ECalendarLayers.year:
                this.currentDate = new Date(this.currentDate.getFullYear() + this.YEAR_STEP, this.currentDate.getMonth())
                break
            case ECalendarLayers.decade:
                this.currentDate = new Date(this.currentDate.getFullYear() + this.DECADE_STEP, this.currentDate.getMonth())
                break
        }
    }

    dayClickHandler(date: Date) {
        this.choosenDate = date

        this.dispatchDateChooseEvent(date)
    }

    monthButtonClickHandler(date: Date) {
        this.currentDate = new Date(this.currentDate.getFullYear(), date.getMonth())
        this.currentLayer = ECalendarLayers.month
    }

    yearButtonClickHandler(date: Date) {
        this.currentDate = new Date(date.getFullYear(), this.currentDate.getMonth())
        this.currentLayer = ECalendarLayers.year
    }

    dispatchDateChooseEvent(date: Date) {
        const detail: IChooseDateEventDetail = {date}
        const chooseEvent: IChooseDateEvent = new CustomEvent(this.DATE_CHOOSE_EVENT_NAME, {detail, bubbles: true, composed: true})
        this.dispatchEvent(chooseEvent)
    }

    changeLayer() {
        switch (this.currentLayer) {
            case ECalendarLayers.month:
                this.currentLayer = ECalendarLayers.year
                break
            case ECalendarLayers.year:
                this.currentLayer = ECalendarLayers.decade
                break
            case ECalendarLayers.decade:
                this.currentLayer = ECalendarLayers.month
                break
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'iceberg-calendar': IcebergCalendar;
    }
}
