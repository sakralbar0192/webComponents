import { ECustomElements } from 'shared/types/customElements'
import { fireEvent } from '@testing-library/dom'
import { defineIcebergSelect, TIcebergSelect } from '..'
import { mockOptions } from '../mock/options'

describe('IcebergSelect', () => {
    let
        selectComponent: TIcebergSelect,
        renderingSelectComponent: TIcebergSelect | null,
        shadowSelect: HTMLSelectElement | null | undefined

    const componentTag = ECustomElements.icebergSelect

    beforeAll(async () => {
        defineIcebergSelect()
        selectComponent = document.createElement(componentTag)
        selectComponent.options = mockOptions

        document.body.appendChild(selectComponent)

        await selectComponent.selectTemplate()
        await selectComponent.updateComplete

        renderingSelectComponent = document.querySelector(componentTag)
        shadowSelect = renderingSelectComponent?.shadowRoot?.querySelector('select')
    })

    test('Definition and rendering are correct', () => {
        expect(renderingSelectComponent).not.toBeNull()
        expect(shadowSelect).not.toBeNull()
    })

    test('Disabling select is correct', async () => {
        selectComponent.disabled = true
        await selectComponent.selectTemplate()
        await selectComponent.updateComplete
        shadowSelect = renderingSelectComponent?.shadowRoot?.querySelector('select')

        expect(renderingSelectComponent?.disabled).toEqual(true)
        expect(renderingSelectComponent?.disabled).toEqual(shadowSelect?.disabled)

        selectComponent.disabled = false
        await selectComponent.selectTemplate()
        await selectComponent.updateComplete
        shadowSelect = renderingSelectComponent?.shadowRoot?.querySelector('select')

        expect(renderingSelectComponent?.disabled).toEqual(false)
        expect(renderingSelectComponent?.disabled).toEqual(shadowSelect?.disabled)
    })

    test('Selected option change is correct', async () => {
        const firstSelectedOptionId = mockOptions[0]?.options?.[0]?.id
        const secondSelectedOptionId = mockOptions[1]?.id

        selectComponent.selectedOptionId = firstSelectedOptionId
        await selectComponent.updateComplete

        expect(renderingSelectComponent?.selectedOptionId).toEqual(firstSelectedOptionId)
        expect(shadowSelect?.value).toEqual(renderingSelectComponent?.selectedOptionId)

        if (shadowSelect) {
            fireEvent.change(
                shadowSelect,
                {
                    target: {
                        value: secondSelectedOptionId
                    }
                }
            )
            await selectComponent.updateComplete

            expect(shadowSelect?.value).toEqual(secondSelectedOptionId)
            expect(shadowSelect?.value).toEqual(renderingSelectComponent?.selectedOptionId)

            fireEvent.change(
                shadowSelect,
                {
                    target: {
                        value: firstSelectedOptionId
                    }
                }
            )
            await selectComponent.updateComplete

            expect(shadowSelect?.value).toEqual(firstSelectedOptionId)
            expect(shadowSelect?.value).toEqual(renderingSelectComponent?.selectedOptionId)
        }
    })
})
