import { EDivisionsPageLayers, IDivisionItem } from 'entities/Divisions/types'
import { USER_ID_PARAM_NAME } from 'entities/Users/urlParams'
import { html } from 'lit'
import { ICell, IRowItem } from 'shared/ui/IcebergTable'

export function convertDivisionItemToRowItem(divisionItem: IDivisionItem): IRowItem  {
    const divisionRow: ICell[] = []

    const divisionLinkHref = `Divisions.aspx?mode=${EDivisionsPageLayers.divisionDetailsLayer}&division_id=${divisionItem.Id}`

    const nameCell: ICell = {
        content: html`
            <a
                href=${divisionLinkHref}
                title='View division details'
            >
                ${divisionItem.Name}
            </a>
        `,
        compareContent: divisionItem.Name
    }

    const headcountCell: ICell = {
        content: divisionItem.UserCount
    }

    const managersString = divisionItem.Managers
        ? html`
            ${
                divisionItem.Managers.map((manager, index) => {
                    const managerLink = html`
                        <a
                            href='UserDetails.aspx?${USER_ID_PARAM_NAME}=${manager.Id}'
                            title='View user details'
                        >
                            ${manager.Name}
                        </a>
                    `
                    return divisionItem.Managers && index + 1 === divisionItem.Managers.length
                            ? managerLink
                            : html`${managerLink} <br />`
                })
            }
        `
        : ''

    const managersCell: ICell = {
        content: managersString,
        compareContent: divisionItem.Managers
            ? divisionItem.Managers.map(manager => manager.Name).join(' ')
            : ''
    }

    divisionRow.push(
        nameCell,
        headcountCell,
        managersCell
    )

    return {
        id: divisionItem.Id,
        row: divisionRow
    }
}
