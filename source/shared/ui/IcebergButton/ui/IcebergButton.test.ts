import { ECustomElements } from 'shared/types/customElements'
import { defineIcebergButton, TIcebergButton } from '..'
import { EIcebergButtonSizes, EIcebergButtonTypes } from '..'

describe('IcebergButton', () => {
    let buttonComponent: TIcebergButton
    const componentTag = ECustomElements.icebergButton

    beforeAll(() => {
        defineIcebergButton()
        buttonComponent = document.createElement(componentTag)
        document.body.appendChild(buttonComponent)
    })

    test('Definition and rendering are correct', async () => {
        const expectedText = 'someText'
        const expectedType = 'button'

        buttonComponent.text = expectedText
        await buttonComponent.updateComplete
        const renderingButtonComponent = document.querySelector(componentTag)
        expect(renderingButtonComponent).not.toBeNull()

        const shadowButton = renderingButtonComponent?.shadowRoot?.querySelector('button')
        expect(shadowButton?.type).toContain(expectedType)
        expect(shadowButton?.textContent).toContain(expectedText)
        expect(shadowButton?.classList).toContain(EIcebergButtonTypes.PRIMARY)
        expect(shadowButton?.classList).toContain(EIcebergButtonSizes.SM)

        buttonComponent.type = EIcebergButtonTypes.OUTLINED
        await buttonComponent.updateComplete
        expect(shadowButton?.classList).toContain(EIcebergButtonTypes.OUTLINED)
        expect(shadowButton?.classList).not.toContain(EIcebergButtonTypes.PRIMARY)

        buttonComponent.size = EIcebergButtonSizes.MD
        await buttonComponent.updateComplete
        expect(shadowButton?.classList).toContain(EIcebergButtonSizes.MD)
        expect(shadowButton?.classList).not.toContain(EIcebergButtonSizes.SM)
    })

    test('Changing type and size are correct', async () => {
        const renderingButtonComponent = document.querySelector(componentTag)
        expect(renderingButtonComponent).not.toBeNull()
        const shadowButton = renderingButtonComponent?.shadowRoot?.querySelector('button')

        buttonComponent.type = EIcebergButtonTypes.OUTLINED
        await buttonComponent.updateComplete
        expect(shadowButton?.classList).toContain(EIcebergButtonTypes.OUTLINED)
        expect(shadowButton?.classList).not.toContain(EIcebergButtonTypes.PRIMARY)

        buttonComponent.size = EIcebergButtonSizes.MD
        await buttonComponent.updateComplete
        expect(shadowButton?.classList).toContain(EIcebergButtonSizes.MD)
        expect(shadowButton?.classList).not.toContain(EIcebergButtonSizes.SM)
    })

    test('Disabling button is correct', async () => {
        const renderingButtonComponent = document.querySelector(componentTag)
        expect(renderingButtonComponent).not.toBeNull()
        const shadowButton = renderingButtonComponent?.shadowRoot?.querySelector('button')

        buttonComponent.disabled = true
        await buttonComponent.updateComplete

        expect(renderingButtonComponent?.disabled).toEqual(true)
        expect(renderingButtonComponent?.disabled).toEqual(shadowButton?.disabled)

        buttonComponent.disabled = false
        await buttonComponent.updateComplete

        expect(renderingButtonComponent?.disabled).toEqual(false)
        expect(renderingButtonComponent?.disabled).toEqual(shadowButton?.disabled)
    })
})
