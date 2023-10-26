import { IUserItem } from 'entities/Users/types'
import { USER_ID_PARAM_NAME } from 'entities/Users/urlParams'
import { html } from 'lit-html'
import { formatStringToDate } from 'shared/helpers/formatStringToDate'
import { ICell, IRowItem } from 'shared/ui/IcebergTable'

export function convertUserItemToRowItem(user: IUserItem): IRowItem {
    const userRow: ICell[] = []

    const nameCell: ICell = {
        content: html`
            <a
                href='UserDetails.aspx?${USER_ID_PARAM_NAME}=${user.Id}'
                title='View user details'
            >
                ${user.Name}
            </a>
        `,
        compareContent: user.Name
    }

    const poolCell: ICell = {
        content: user.PoolName
    }

    const branchCell: ICell = {
        content: user.BranchName
    }

    const startDateCell: ICell = {
        content: user.StartDate,
        compareContent: formatStringToDate(user.StartDate ?? '') ?? ''
    }

    userRow.push(
        nameCell,
        poolCell,
        branchCell,
        startDateCell
    )

    return {
        id: user.Id,
        row: userRow
    }
}
