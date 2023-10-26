import { ECellClasses, ICell, IRowItem } from 'shared/ui/IcebergTable'
import { IUserItem } from 'entities/Users/types'
import { USER_ID_PARAM_NAME } from 'entities/Users/urlParams'
import { html } from 'lit'
import deleteIcon from 'shared/assets/icons/deleteIcon.svg'
import { listIcon } from 'shared/assets/icons/listIcon'
import { clockIcon } from 'shared/assets/icons/clockIcon'
import { refreshIcon } from 'shared/assets/icons/refreshIcon'
import { formatStringToDate } from 'shared/helpers/formatStringToDate'

export function convertUserItemToRowItem(userItem: IUserItem): IRowItem  {
    const userRow: ICell[] = []

    const userSkillLinkHref = `UserSkills.aspx?${USER_ID_PARAM_NAME}=${userItem.Id}`

    const skillButtonCell: ICell = {
        content: html`
            <a
                href=${userSkillLinkHref}
                title='View user skills'
            >
                ${listIcon()}
            </a>
        `,
        classes: [ECellClasses.SM, ECellClasses.PRIMARY_BUTTON]
    }

    const timeButtonCell: ICell = {
        content: html`
            <a
                href='UserTime.aspx?${USER_ID_PARAM_NAME}=${userItem.Id}'
                title='View user time'
            >
                ${clockIcon()}
            </a>
        `,
        classes: [ECellClasses.SM, ECellClasses.PRIMARY_BUTTON]
    }

    const nameCell: ICell = {
        content: html`
            <a
                href='UserDetails.aspx?${USER_ID_PARAM_NAME}=${userItem.Id}'
                title='View user details'
            >
                ${userItem.Name}
            </a>
        `,
        compareContent: userItem.Name
    }

    const loginCell: ICell = {
        content: userItem.Login
    }

    const statusCell: ICell = {
        content: userItem.IsActive ? 'Active' : 'Inactive',
        classes: [ECellClasses.TEXT_CENTERED]
    }

    const startDateCell: ICell = {
        content: userItem.StartDate ?? '',
        compareContent:  formatStringToDate(userItem.StartDate ?? '') ?? ''
    }

    const branchCell: ICell = {
        content: userItem.BranchName
    }

    const Id1CCell: ICell = {
        content: userItem.Id1C
    }

    const divisionCell: ICell = {
        content: userItem.Division
    }

    const deleteButtonLinkHref = `UserActionDate.aspx?${USER_ID_PARAM_NAME}=${userItem.Id}&mode=${userItem.IsActive ? 'Delete' : 'Activate'}`

    const deleteButtonCell: ICell = {
        content: html`
                <a
                    href=${deleteButtonLinkHref}
                    title=${userItem.IsActive ? 'Delete user' : 'Reactivate user'}
                >
                    ${userItem.IsActive ? deleteIcon : refreshIcon()}
                </a>
            `,
        classes: [ECellClasses.SM, userItem.IsActive ? ECellClasses.SECONDARY_BUTTON : ECellClasses.PRIMARY_BUTTON]
    }

    userRow.push(
        skillButtonCell,
        timeButtonCell,
        nameCell,
        loginCell,
        statusCell,
        startDateCell,
        branchCell,
        Id1CCell,
        divisionCell,
        deleteButtonCell
    )

    if (!userItem.IsActive) {
        userRow.forEach(cell => {
            cell.classes = cell.classes
                ? [...cell.classes, ECellClasses.INACTIVE_USER]
                : [ECellClasses.INACTIVE_USER]
        })
    }

    return {
        id: userItem.Id,
        row: userRow
    }
}
