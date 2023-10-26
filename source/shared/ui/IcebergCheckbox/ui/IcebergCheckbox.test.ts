import { ECustomElements } from 'shared/types/customElements'
import { defineIcebergCheckbox, EIcebergCheckboxPositioningTypes, EIcebergCheckboxTypes, TIcebergCheckbox } from '..'
import {fireEvent} from '@testing-library/dom'

describe('IcebergCheckbox', () => {
    let
        checkboxComponent: TIcebergCheckbox,
        renderingCheckboxComponent: TIcebergCheckbox | null,
        shadowInput: HTMLInputElement | null | undefined,
        shadowLabel: HTMLLabelElement | null | undefined

    const componentTag = ECustomElements.icebergCheckbox
    const expectedType = EIcebergCheckboxTypes.CHECKBOX
    const changingType = EIcebergCheckboxTypes.RADIO
    const changingPositioningType = EIcebergCheckboxPositioningTypes.REVERSE
    const expectedText = 'some text'

    beforeAll(async () => {
        defineIcebergCheckbox()
        checkboxComponent = document.createElement(componentTag)
        checkboxComponent.label = expectedText

        document.body.appendChild(checkboxComponent)

        await checkboxComponent.updateComplete

        renderingCheckboxComponent = document.querySelector(componentTag)
        shadowInput = renderingCheckboxComponent?.shadowRoot?.querySelector('input')
        shadowLabel = renderingCheckboxComponent?.shadowRoot?.querySelector('label')
    })

    test('Definition and rendering are correct', () => {
        expect(renderingCheckboxComponent).not.toBeNull()

        expect(shadowInput).not.toBeNull()
        expect(shadowLabel).not.toBeNull()

        expect(shadowInput?.type).toEqual(expectedType)
        expect(renderingCheckboxComponent?.checked).toEqual(shadowInput?.checked)
        expect(shadowLabel?.querySelector('span')?.textContent).toContain(expectedText)
    })

    test('Changing positioning type and input type are correct', async () => {
        checkboxComponent.type = changingType
        checkboxComponent.positioningType = changingPositioningType

        await checkboxComponent.updateComplete

        expect(shadowInput?.type).toEqual(changingType)
        expect(shadowLabel?.classList).toContain(changingPositioningType)
    })

    test('Disabling button is correct', async () => {
        checkboxComponent.disabled = true
        await checkboxComponent.updateComplete

        expect(renderingCheckboxComponent?.disabled).toEqual(true)
        expect(renderingCheckboxComponent?.disabled).toEqual(shadowInput?.disabled)

        checkboxComponent.disabled = false
        await checkboxComponent.updateComplete

        expect(renderingCheckboxComponent?.disabled).toEqual(false)
        expect(renderingCheckboxComponent?.disabled).toEqual(shadowInput?.disabled)
    })

    test('Checked change is correct', async () => {
        const currentCheckedState = checkboxComponent.checked
        const oppositeCheckedState = !currentCheckedState

        expect(shadowInput?.checked).toEqual(currentCheckedState)
        expect(renderingCheckboxComponent?.checked).toEqual(currentCheckedState)

        if (shadowInput) {
            fireEvent(
                shadowInput,
                new InputEvent('change', {
                    bubbles: true,
                    cancelable: true,
                }),
            )
            await checkboxComponent.updateComplete

            expect(shadowInput?.checked).toEqual(oppositeCheckedState)
            expect(renderingCheckboxComponent?.checked).toEqual(oppositeCheckedState)

            fireEvent(
                shadowInput,
                new InputEvent('change', {
                    bubbles: true,
                    cancelable: true,
                }),
            )
            await checkboxComponent.updateComplete

            expect(shadowInput?.checked).toEqual(currentCheckedState)
            expect(renderingCheckboxComponent?.checked).toEqual(currentCheckedState)
        }
    })
})
