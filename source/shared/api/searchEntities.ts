import { IAccountItem } from 'entities/Accounts/types'
import { IDivisionItem } from 'entities/Divisions/types'
import { IProjectItem } from 'entities/Projects/types'
import { IUserItem } from 'entities/Users/types'
import { REQUEST_FAILED_MESSAGE } from 'shared/messages'
import { IResponse } from 'shared/types'

export enum ESearchModes {
    ALL = 0,
    ACCOUNTS =  1,
    DIVISIONS =  2,
    PROJECTS =  3,
    USERS =  4
}

export enum ESearchResultItemsTypes {
    ACCOUNTS = 'AccountSearchResultDto',
    DIVISIONS = 'DivisionSearchResultDto',
    PROJECTS = 'ProjectSearchResultDto',
    USERS = 'UserSearchResultDto'
}

export interface ISearchResultItem {
    Type: ESearchResultItemsTypes
    Items: IAccountItem[] | IUserItem[] | IDivisionItem[] | IProjectItem[]
}

export interface ISearchResult {
    ACCOUNTS?: IAccountItem[] | undefined
    DIVISIONS?: IDivisionItem[] | undefined
    PROJECTS?: IProjectItem[] | undefined
    USERS?: IUserItem[] | undefined
}

export async function searchEntities(
    searchText: string,
    searchBy: ESearchModes,
    isActiveOnly = true
): Promise<IResponse<ISearchResult>> {
    const response: IResponse<ISearchResult> = {
        IsSucceeded: false,
        Message: '',
        Value: {
            ACCOUNTS: [],
            DIVISIONS: [],
            PROJECTS: [],
            USERS: []
        }
    }

    const data = {
        searchText,
        searchBy,
        isActiveOnly
    }

    return await fetch('/Services/SearchService.asmx/Search', {
        method: 'post',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then((data) => {
            response.IsSucceeded = data.d.IsSucceeded
            response.Message = data.d.Message
            if (!response.IsSucceeded) return response

            const result = data.d.Value as ISearchResultItem[]
            if (searchBy === ESearchModes.ACCOUNTS || searchBy === ESearchModes.ALL) {
                const fetchedAccounts = result.find(resultItem => resultItem.Type === ESearchResultItemsTypes.ACCOUNTS)

                if (fetchedAccounts && response.Value) {
                    response.Value.ACCOUNTS = fetchedAccounts.Items.sort((a, b) => a.Name.localeCompare(b.Name))
                }
            }

            if (searchBy === ESearchModes.DIVISIONS || searchBy === ESearchModes.ALL) {
                const fetchedDivisions = result.find(resultItem => resultItem.Type === ESearchResultItemsTypes.DIVISIONS)

                if (fetchedDivisions && response.Value) {
                    response.Value.DIVISIONS = fetchedDivisions.Items.sort((a, b) => a.Name.localeCompare(b.Name))
                }
            }

            if (searchBy === ESearchModes.PROJECTS || searchBy === ESearchModes.ALL) {
                const fetchedProjects = result.find(resultItem => resultItem.Type === ESearchResultItemsTypes.PROJECTS)

                if (fetchedProjects && response.Value) {
                    response.Value.PROJECTS = fetchedProjects.Items.sort((a, b) => a.Name.localeCompare(b.Name))
                }
            }

            if (searchBy === ESearchModes.USERS || searchBy === ESearchModes.ALL) {
                const fetchedUsers = result.find(resultItem => resultItem.Type === ESearchResultItemsTypes.USERS)

                if (fetchedUsers && response.Value) {
                    response.Value.USERS = fetchedUsers.Items.sort((a, b) => a.Name.localeCompare(b.Name))
                }
            }

            return response
        })
        .catch(() => {
            response.IsSucceeded = false
            response.Message = REQUEST_FAILED_MESSAGE
            return response
        })
}
