import { ISelectOption } from '../types'

export const mockOptions: ISelectOption[] = [
    {
        value: 'value 1',
        id: 1,
        options : [
            {
                value: 'inner value 1.1',
                id: 1.1
            },
            {
                value: 'inner value 1.2',
                id: 1.2
            }
        ]
    },
    {
        value: 'value 2',
        id: 2,
    },
    {
        value: 'value 3',
        id: 3,
    }
]
