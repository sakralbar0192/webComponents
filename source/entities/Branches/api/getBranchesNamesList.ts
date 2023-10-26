import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'
import { EServerRequestMethods, IResponse } from 'shared/types'
import { EBranchesMethods, IRegionItem } from '../types'

export async function getBranchesNamesList(): Promise<IResponse<IRegionItem[]>> {
    const url = EBranchesMethods.GET_BRANCHES_NAMES_LIST
    const method = EServerRequestMethods.POST

    return requestFromServer<IRegionItem[]>({url, method})
}
