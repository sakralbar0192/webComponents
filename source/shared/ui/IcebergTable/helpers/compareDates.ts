import { TemplateResult } from 'lit'
import { VALUE_EQUIAL_ONE_BEING_COMPARED, VALUE_FOLLOWS_ONE_BEING_COMPARED, VALUE_PRESEDES_ONE_BEING_COMPARED } from 'shared/consts'

export function compareDates(
    a?: string | Date | number| TemplateResult,
    b?: string | Date | number| TemplateResult
) {
    if (
        (!a && b) ||
        !(a instanceof Date) ||
        ((a && b) && a < b)
    ) {
        return VALUE_PRESEDES_ONE_BEING_COMPARED
    } else if (
        (!b && a) ||
        !(b instanceof Date) ||
        (a && b && a > b)
    ) {
        return VALUE_FOLLOWS_ONE_BEING_COMPARED
    } else {
        return VALUE_EQUIAL_ONE_BEING_COMPARED
    }
}
