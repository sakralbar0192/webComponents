import { IAccountItem } from 'entities/Accounts/types'
import { html } from 'lit'
import { ACCOUNT_ID_PARAM_NAME } from 'entities/Accounts/urlParams'
import { USER_ID_PARAM_NAME } from 'entities/Users/urlParams'
import { formatStringToDate } from 'shared/helpers/formatStringToDate'
import { ECellClasses, ICell, IRowItem } from 'shared/ui/IcebergTable'

export function convertAccountItemToRowItem(accountItem: IAccountItem): IRowItem  {
    const accountRow: ICell[] = []
    const accountLinkHref = `AccountDetails.aspx?${ACCOUNT_ID_PARAM_NAME}=${accountItem.Id}`
    const nameCell: ICell = {
        content: html`
            <a
                href=${accountLinkHref}
                title='View account details'
            >
                ${accountItem.Name}
            </a>
        `,
        compareContent: accountItem.Name
    }

    const descriptionCell: ICell = {
        content: accountItem.Description
    }

    const statusCell: ICell = {
        content: accountItem.IsActive ? 'Active' : 'Inactive',
        classes: [ECellClasses.TEXT_CENTERED]
    }

    const startDateCell: ICell = {
        content: accountItem.StartDate,
        compareContent: formatStringToDate(accountItem.StartDate) ?? ''
    }

    const endDateCell: ICell = {
        content: accountItem.EndDate,
        compareContent: formatStringToDate(accountItem.EndDate) ?? ''
    }

    const projectCountCell: ICell = {
        content: accountItem.ProjectsCount,
        classes: [ECellClasses.TEXT_CENTERED]
    }

    const managerLinkHref = `UserDetails.aspx?${USER_ID_PARAM_NAME}=${accountItem.ManagerId}`

    const keyManagerCell: ICell = {
        content: html`
            <a
                href=${managerLinkHref}
                title='View user details'
            >
                ${accountItem.ManagerName}
            </a>
        `,
        compareContent: accountItem.ManagerName
    }

    accountRow.push(
        nameCell,
        descriptionCell,
        statusCell,
        startDateCell,
        endDateCell,
        projectCountCell,
        keyManagerCell
    )

    return {
        id: accountItem.Id,
        row: accountRow
    }
}
