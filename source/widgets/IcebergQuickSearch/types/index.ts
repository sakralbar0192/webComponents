import { IAccountItem } from 'entities/Accounts/types'
import { ACCOUNT_ID_PARAM_NAME } from 'entities/Accounts/urlParams'
import { EDivisionsPageLayers, IDivisionItem } from 'entities/Divisions/types'
import { DIVISION_ID_PARAM_NAME } from 'entities/Divisions/urlParams'
import { IProjectItem } from 'entities/Projects/types'
import { PROJECT_ID_PARAM_NAME } from 'entities/Projects/urlParams'
import { IUserItem } from 'entities/Users/types'
import { USER_ID_PARAM_NAME } from 'entities/Users/urlParams'
import { MODE_PARAM_NAME } from 'shared/types'

export const EQuickSearchListFillers = {
    USERS: {
        title: 'Users',
        linkHref:`UserDetails.aspx?${USER_ID_PARAM_NAME}=`
    },
    PROJECTS: {
        title: 'Projects',
        linkHref: `ProjectDetails.aspx?${PROJECT_ID_PARAM_NAME}=`
    },
    DIVISIONS: {
        title: 'Divisions',
        linkHref: `Divisions.aspx?${MODE_PARAM_NAME}=${EDivisionsPageLayers.divisionDetailsLayer}&${DIVISION_ID_PARAM_NAME}=`
    },
    ACCOUNTS: {
        title: 'Accounts',
        linkHref: `AccountDetails.aspx?${ACCOUNT_ID_PARAM_NAME}=`
    }
}

export interface IQuickSearchDropdownItem {
    item: IAccountItem | IUserItem | IDivisionItem | IProjectItem
    linkHref: string
}
