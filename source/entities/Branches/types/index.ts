import { IEntityItem } from 'shared/types'

export interface IRegionItem extends IEntityItem {
    Branches: IBranchItem[]
}

export type IBranchItem = IEntityItem

export const EBranchesMethods = {
    GET_BRANCHES_NAMES_LIST: '/BranchService.asmx/GetBranchGroupsWithBranchesList'
}
