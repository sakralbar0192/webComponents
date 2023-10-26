import { html } from 'lit-html'
import { ECellClasses, ICell, IRowItem } from 'shared/ui/IcebergTable'
import { IUserItemInfo } from '../types'
import { IAssignTableUserItem } from '../../AssignUsersPopup/types'
import { dateRegEx } from 'shared/regularExpressions'
import { IIcebergInputChangeEvent } from 'shared/ui/IcebergInput'

export function convertUserItemToRowItem(userItem: IAssignTableUserItem): IRowItem {
    const userRow: ICell[] = []

    const nameCell: ICell = {
        content: userItem.Name
    }

    const dateField = document.createElement('iceberg-date-input')
    dateField.addEventListener(
        dateField.VALUE_CHANGE_EVENT,
        ((e: IIcebergInputChangeEvent) => {
            const isDateInRightFormat = dateRegEx.test(e.detail.value)
            if (isDateInRightFormat) {
                userItem.AssignedStartDate = e.detail.value
            } else {
                e.detail.input.value = userItem.AssignedStartDate ?? ''
            }
        }) as EventListener
    )
    dateField.value = userItem.AssignedStartDate ?? ''

    const startDateCell: ICell = {
        content: html`
            <div class='dateField'>
                ${dateField}
            </div>
        `,
        classes: [ECellClasses.TEXT_CENTERED]
    }

    const branchCell: ICell = {
        content: userItem.BranchName
    }

    const key: IUserItemInfo = {
        userItem: userItem,
        dateField: dateField
    }

    const checkboxCell: ICell = {
        content: html`
            <iceberg-checkbox
                ?checked=${userItem.Checked}
                .key=${key}
            ></iceberg-checkbox>
        `,
        classes: [ECellClasses.SM]
    }

    userRow.push(
        nameCell,
        startDateCell,
        branchCell,
        checkboxCell
    )

    return {
        id: userItem.Id,
        row: userRow
    }
}
