import { ECustomElements } from 'shared/types/customElements'
import { defineIcebergInput, EIcebergInputTypeAttribute, TIcebergInput } from '..'
import { fireEvent } from '@testing-library/dom'

describe('IcebergInput', () => {
    let
        inputComponent: TIcebergInput,
        renderingInputComponent: TIcebergInput | null,
        shadowInput: HTMLInputElement | null | undefined

    const componentTag = ECustomElements.icebergInput
    const expectedText = 'some text'
    const expectedPlaceholder = 'any placeholder'
    const defaultType = EIcebergInputTypeAttribute.TEXT
    const changingType = EIcebergInputTypeAttribute.PASSWORD

    beforeAll(async () => {
        defineIcebergInput()
        inputComponent = document.createElement(componentTag)
        inputComponent.value = expectedText
        inputComponent.placeholder = expectedPlaceholder

        document.body.appendChild(inputComponent)

        await inputComponent.updateComplete

        renderingInputComponent = document.querySelector(componentTag)
        shadowInput = renderingInputComponent?.shadowRoot?.querySelector('input')
    })

    test('Definition and rendering are correct', () => {
        expect(renderingInputComponent).not.toBeNull()
        expect(shadowInput).not.toBeNull()

        expect(renderingInputComponent?.type).toEqual(defaultType)

        expect(renderingInputComponent?.value).toEqual(expectedText)
        expect(shadowInput?.value).toEqual(renderingInputComponent?.value)

        expect(renderingInputComponent?.placeholder).toEqual(expectedPlaceholder)
        expect(shadowInput?.placeholder).toEqual(renderingInputComponent?.placeholder)
    })

    test('Changing input type are correct', async () => {
        inputComponent.type = changingType
        await inputComponent.updateComplete

        expect(renderingInputComponent?.type).toEqual(changingType)
        expect(shadowInput?.type).toEqual(renderingInputComponent?.type)
    })

    test('Disabling inut is correct', async () => {
        inputComponent.disabled = true
        await inputComponent.updateComplete

        expect(renderingInputComponent?.disabled).toEqual(true)
        expect(renderingInputComponent?.disabled).toEqual(shadowInput?.disabled)

        inputComponent.disabled = false
        await inputComponent.updateComplete

        expect(renderingInputComponent?.disabled).toEqual(false)
        expect(renderingInputComponent?.disabled).toEqual(shadowInput?.disabled)
    })

    test('Checked change is correct', async () => {
        const typedValue = 'some typed value'
        const emptyValue = ''

        inputComponent.value = emptyValue
        await inputComponent.updateComplete

        expect(renderingInputComponent?.value).toEqual(emptyValue)
        expect(shadowInput?.value).toEqual(renderingInputComponent?.value)

        if (shadowInput) {
            fireEvent.input(
                shadowInput,
                {
                    target: {
                        value: typedValue
                    }
                }
            )
            await inputComponent.updateComplete

            expect(shadowInput?.value).toEqual(typedValue)
            expect(shadowInput?.value).toEqual(renderingInputComponent?.value)

            fireEvent.input(
                shadowInput,
                {
                    target: {
                        value: emptyValue
                    }
                }
            )
            await inputComponent.updateComplete

            expect(shadowInput?.value).toEqual(emptyValue)
            expect(shadowInput?.value).toEqual(renderingInputComponent?.value)
        }
    })
})
