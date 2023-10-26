import { TemplateResult } from 'lit'
import { BASIS_OF_DECIMAL_SYSTEM_OF_CALCULATION, VALUE_FOLLOWS_ONE_BEING_COMPARED, VALUE_PRESEDES_ONE_BEING_COMPARED, VALUE_EQUIAL_ONE_BEING_COMPARED } from 'shared/consts'
import { compareNumbers } from './compareNumbers'

export function compare1CIds(
    a?: string | Date | number | TemplateResult,
    b?: string | Date | number | TemplateResult
) {
    if (a === undefined && b !== undefined) {
        return VALUE_PRESEDES_ONE_BEING_COMPARED
    } else if (a !== undefined && b === undefined) {
        return VALUE_FOLLOWS_ONE_BEING_COMPARED
    } else if (a !== undefined && b !== undefined) {
        const comparedNumberA: number = parseInt(String(a).replace('-', ''), BASIS_OF_DECIMAL_SYSTEM_OF_CALCULATION)
        const comparedNumberB: number = parseInt(String(b).replace('-', ''), BASIS_OF_DECIMAL_SYSTEM_OF_CALCULATION)

        return compareNumbers(comparedNumberA, comparedNumberB)
    } else return VALUE_EQUIAL_ONE_BEING_COMPARED
}
