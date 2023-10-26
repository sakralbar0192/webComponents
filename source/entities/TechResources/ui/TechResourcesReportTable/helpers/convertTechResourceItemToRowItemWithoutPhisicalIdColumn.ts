import { PROJECT_ID_PARAM_NAME } from 'entities/Projects/urlParams'
import { ITechResourceItem } from 'entities/TechResources/types'
import { html } from 'lit'
import { formatStringToDate } from 'shared/helpers/formatStringToDate'
import { ICell, IRowItem } from 'shared/ui/IcebergTable'

export function convertTechResourceItemToRowItemWithoutPhisicalIdColumn(techResourceItem: ITechResourceItem): IRowItem  {
    const techResourceRow: ICell[] = []

    const nameCell: ICell = {
        content: techResourceItem.Name
    }

    const stateCell: ICell = {
        content: techResourceItem.Status
    }

    const projectLink = `TechResourcesEditor.aspx?${PROJECT_ID_PARAM_NAME}=${techResourceItem.ProjectId}`

    const projectShortNameCell: ICell = {
        content: html`
            <a
                href=${projectLink}
                title='Open tech resources editor'
            >
                ${techResourceItem.ProjectShortName}
            </a>
        `,
        compareContent: techResourceItem.ProjectShortName
    }

    const startDateCell: ICell = {
        content: techResourceItem.DateStart,
        compareContent: formatStringToDate(techResourceItem.DateStart) ?? ''
    }

    const endDateCell: ICell = {
        content: techResourceItem.DateEnd,
        compareContent: formatStringToDate(techResourceItem.DateEnd) ?? ''
    }

    const priceCell: ICell = {
        content: techResourceItem.Price
    }

    const currencyCell: ICell = {
        content: techResourceItem.Currency
    }

    techResourceRow.push(
        nameCell,
        stateCell,
        projectShortNameCell,
        startDateCell,
        endDateCell,
        priceCell,
        currencyCell
    )

    return {
        id: techResourceItem.Id,
        row: techResourceRow
    }
}
