import { IcebergInput } from 'shared/ui/IcebergInput'

export class IcebergDateInput extends IcebergInput {
    onInputHandler(e: Event) {
        const input = (e.target as IcebergInput)
        const string = input.value.trim().replace(/[^0-9.]?/g, '')
        this.value = string
        input.value = string
        super.onInputHandler(e)
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'iceberg-date-input': IcebergDateInput;
    }
}
