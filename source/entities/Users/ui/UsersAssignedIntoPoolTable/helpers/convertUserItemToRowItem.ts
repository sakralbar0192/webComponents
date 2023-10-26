import { IUserItem } from 'entities/Users/types'
import { html } from 'lit-html'
import { ECellClasses, ICell, IRowItem } from 'shared/ui/IcebergTable'
import { IUserRowIconClickEvent } from '../types'
import updateIcon from 'shared/assets/icons/updateIcon.svg'
import { ECRUDModes } from 'shared/types'
import { USER_ID_PARAM_NAME } from 'entities/Users/urlParams'
import { UsersAssignedIntoPoolTable } from '../ui/UsersAssignedIntoPoolTable'
import { formatStringToDate } from 'shared/helpers/formatStringToDate'

export const ICON_CLICK_EVENT_NAME = 'userTableIconClick'

export function convertUserItemToRowItem(this: UsersAssignedIntoPoolTable, userItem: IUserItem): IRowItem {
    const userRow: ICell[] = []

    const updateIconClickHandler = () => {
        const detail = {
            mode: ECRUDModes.UPDATE,
            userItem
        }
        const updateIconClickEvent: IUserRowIconClickEvent = new CustomEvent(
            ICON_CLICK_EVENT_NAME,
            {
                detail,
                bubbles: true,
                composed: true
            }
        )

        this.dispatchEvent(updateIconClickEvent)
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

    const branchCell: ICell = {
        content: userItem.BranchName
    }

    const startDateCell: ICell = {
        content: userItem.StartDate,
        compareContent: formatStringToDate(userItem.StartDate ?? '') ?? ''
    }

    const editButtonCell: ICell = {
        content: html`
            <button
                type="button"
                @click=${updateIconClickHandler}
                title='Update user pool start date'
            >
                ${updateIcon}
            </button>
        `,
        classes: [ECellClasses.PRIMARY_BUTTON, ECellClasses.SM]
    }

    userRow.push(
        nameCell,
        branchCell,
        startDateCell,
        editButtonCell
    )

    return {
        id: userItem.Id,
        row: userRow
    }
}
