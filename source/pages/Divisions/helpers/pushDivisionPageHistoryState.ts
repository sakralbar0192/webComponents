import { DIVISION_ID_PARAM_NAME } from 'entities/Divisions/urlParams'
import { POOL_ID_PARAM_NAME } from 'entities/Pools/urlParams'
import { IDivisionsPageHistoryState } from 'pages/Divisions/types'
import { MODE_PARAM_NAME } from 'shared/types'

export function pushDivisionPageHistoryState(
    {layer, divisionId, poolId} : IDivisionsPageHistoryState
): void {
    const state: IDivisionsPageHistoryState = {
        layer,
        divisionId,
        poolId
    }

    let urlString = `?${MODE_PARAM_NAME}=${layer}`
    if (divisionId) urlString = urlString + `&${DIVISION_ID_PARAM_NAME}=${divisionId}`
    if (poolId) urlString = urlString + `&${POOL_ID_PARAM_NAME}=${poolId}`

    history.pushState(
        state,
        '',
        urlString
    )
}
