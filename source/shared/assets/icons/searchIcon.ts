import { TemplateResult, html } from 'lit'
import { ISvgParams } from 'shared/types'

export function searchIcon({width, height}: ISvgParams): TemplateResult {
    return html`
        <svg height=${height} width=${width} viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">       
            <g transform="scale(0.166667)">
                <path d="M86.829,81.172l-22.701,-22.701c4.927,-6.159 7.872,-13.971 7.872,-22.471c0,-19.882 -16.117,-36 -36,-36c-19.882,0 -36,16.118 -36,36c0,19.882 16.118,36 36,36c8.5,0 16.312,-2.946 22.471,-7.873l22.701,22.701c0.781,0.781 1.805,1.172 2.828,1.172c1.024,0 2.048,-0.391 2.829,-1.172c1.562,-1.561 1.562,-4.095 0,-5.656Zm-50.829,-17.172c-15.464,0 -28,-12.536 -28,-28c0,-15.464 12.536,-28 28,-28c15.465,0 28,12.536 28,28c0,15.464 -12.535,28 -28,28Z" transform="translate(4, 4)"></path>
            </g>
        </svg>
    `
}
