import { ECustomElements } from 'shared/types/customElements'

export function defineCustomElement(name: ECustomElements, elementClass: CustomElementConstructor) {
    const isCustomElementUndefined = Boolean(customElements.get(name) === undefined)
    if (isCustomElementUndefined) {
        customElements.define(name, elementClass)
    }
}
