import { css, html } from 'lit'
import { IcebergLoader } from '../../IcebergLoader/ui/IcebergLoader'
import styles from './styles.lit.scss'

export class PageLoader extends IcebergLoader {

    static styles = [
        IcebergLoader.styles,
        css`
          ${styles}  
        `
    ]

    render() {
        return html`
            <div>
                <span></span>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'page-loader': PageLoader;
    }
}
