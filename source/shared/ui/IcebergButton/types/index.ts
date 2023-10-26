import { TValueOf } from 'shared/types'

export const EIcebergButtonTypes = {
    PRIMARY: 'primary',
    OUTLINED: 'outlined'
} as const
export type EIcebergButtonTypes = TValueOf<typeof EIcebergButtonTypes>

export const EIcebergButtonSizes = {
    MD: 'md',
    SM: 'sm',
    XS: 'xs',
    XXS: 'xxs'
} as const
export type EIcebergButtonSizes = TValueOf<typeof EIcebergButtonSizes>
