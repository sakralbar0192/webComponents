import { EServerRequestTypes } from 'shared/types'
import { ASMX_DEFINITION_STRING } from 'shared/consts'

export function defineRequestType(url: string): EServerRequestTypes {
    return url.includes(ASMX_DEFINITION_STRING)
        ? EServerRequestTypes.FROM_SERVICE
        : EServerRequestTypes.FROM_API
}
