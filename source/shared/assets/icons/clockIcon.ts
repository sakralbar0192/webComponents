import { TemplateResult, html } from 'lit'
import { ISvgParams } from 'shared/types'

const iconSize: ISvgParams = {width: 20, height: 20}

export function clockIcon({width, height}: ISvgParams = iconSize): TemplateResult {
    return html`
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" height=${height} width=${width} viewBox="0 0 24 24">
            <path d="M13,11.4226497 L13,7 C13,6.448 12.552,6 12,6 C11.448,6 11,6.448 11,7 L11,11.9888376 C10.998236,12.1652918 11.043253,12.339672 11.1300028,12.4931377 C11.2274619,12.6587312 11.3559711,12.7849072 11.509667,12.8716066 L15.830127,15.3660254 C16.308173,15.6420254 16.9201524,15.478046 17.1961524,15 C17.4721524,14.521954 17.308173,13.9099746 16.830127,13.6339746 L13,11.4226497 Z M12,2 C17.5229861,2 22,6.47701386 22,12 C22,17.5229861 17.5229861,22 12,22 C6.47701386,22 2,17.5229861 2,12 C2,6.47701386 6.47701386,2 12,2 Z"/>
        </svg>
    `
}
