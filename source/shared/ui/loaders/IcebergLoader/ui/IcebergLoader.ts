import { LitElement, css, html, CSSResultGroup } from 'lit'
import { property } from 'lit/decorators.js'
import styles from './styles.lit.scss'

export class IcebergLoader extends LitElement {
    @property({type: Boolean}) big = false

    static styles = css`
        ${styles}
    ` as CSSResultGroup

    render() {
        return html`
            <span></span>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'iceberg-loader': IcebergLoader;
    }
}
