import { TemplateResult } from 'lit'
import { VALUE_FOLLOWS_ONE_BEING_COMPARED, VALUE_PRESEDES_ONE_BEING_COMPARED, VALUE_EQUIAL_ONE_BEING_COMPARED } from 'shared/consts'

export function compareStrings(
    a?: string | Date | number | TemplateResult,
    b?: string | Date | number | TemplateResult
): number {
    if (!a && b) {
        return VALUE_PRESEDES_ONE_BEING_COMPARED
    } else if (a && !b) {
        return VALUE_FOLLOWS_ONE_BEING_COMPARED
    } else if (a && b) {
        return String(a).localeCompare(String(b))
    } else return VALUE_EQUIAL_ONE_BEING_COMPARED
}
