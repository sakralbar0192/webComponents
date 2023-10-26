import styles from './styles.lit.scss'
import { LitElement, css, html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { ILegendItem } from '../types'

export class IcebergLegend extends LitElement {
    @property({type: Object, reflect: false, attribute: false}) legendItems: ILegendItem[]

    static styles = css`
        ${styles}
    `

    render() {
        if (this.legendItems && this.legendItems.length) {
            return html`
                <div class='container'>
                    <h3>Legend</h3>
                    ${
                        this.legendItems.map(item => {
                            return this.itemRowTemplate(item)
                        })
                    }
                </div>
            `
        } else return nothing
    }

    itemRowTemplate(item: ILegendItem) {
        return html`
            <div class='row'>
                <div class='${item.class} color'></div>
                <span>
                    ${item.title}
                </span>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'iceberg-legend': IcebergLegend;
    }
}
