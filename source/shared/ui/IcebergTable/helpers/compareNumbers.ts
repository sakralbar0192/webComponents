import { TemplateResult } from 'lit'
import { VALUE_EQUIAL_ONE_BEING_COMPARED, VALUE_FOLLOWS_ONE_BEING_COMPARED, VALUE_PRESEDES_ONE_BEING_COMPARED } from 'shared/consts'

export function compareNumbers(
    a?: string | Date | number | TemplateResult,
    b?: string | Date | number | TemplateResult
) {
    if (
        (!a && a !== 0 && b !== undefined) ||
        (typeof a !== 'number') ||
        (a !== undefined && b !== undefined && a < b )
    ) {
        return VALUE_PRESEDES_ONE_BEING_COMPARED
    } else if (
        (a !== undefined && b === undefined) ||
        (typeof b !== 'number') ||
        (a !== undefined && b !== undefined && a > b )
    ) {
        return VALUE_FOLLOWS_ONE_BEING_COMPARED
    } else {
        return VALUE_EQUIAL_ONE_BEING_COMPARED
    }
}
