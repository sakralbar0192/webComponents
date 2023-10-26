import { IUserItem } from 'entities/Users/types'
import { USER_ID_PARAM_NAME } from 'entities/Users/urlParams'
import { html } from 'lit-html'
import { ICell, IRowItem } from 'shared/ui/IcebergTable'

export function convertManagerItemToRowItem(manager: IUserItem): IRowItem  {
    const managerRow: ICell[] = []

    const managerLinkHref = `UserDetails.aspx?${USER_ID_PARAM_NAME}=${manager.Id}`

    const nameCell: ICell = {
        content: html`
            <a
                href=${managerLinkHref}
                title='View user details'
            >
                ${manager.Name}
            </a>
        `,
        compareContent: manager.Name
    }

    const branchCell: ICell = {
        content: manager.BranchName
    }

    managerRow.push(
        nameCell,
        branchCell
    )

    return {
        id: manager.Id,
        row: managerRow
    }
}
