import { EDivisionsPageLayers, IDivisionItem } from 'entities/Divisions/types'
import { html } from 'lit'
import { IChooseDivisionEvent, IModifyDivisionEvent } from '../types'
import { ECRUDModes } from 'shared/types'
import { ECellClasses, ICell, IRowItem } from 'shared/ui/IcebergTable'
import { USER_ID_PARAM_NAME } from 'entities/Users/urlParams'
import { DivisionsTable } from '../ui/DivisionsTable'
import deleteIcon from 'shared/assets/icons/deleteIcon.svg'
import updateIcon from 'shared/assets/icons/updateIcon.svg'

export function convertDivisionItemToRowItem(this: DivisionsTable, divisionItem: IDivisionItem): IRowItem  {
    const divisionRow: ICell[] = []

    const divisionNameClickHandler = (e: MouseEvent) => {
        e.preventDefault()
        const detail = {
            divisionItem
        }
        const divisionNameClickEvent: IChooseDivisionEvent = new CustomEvent(
            this.CHOOSE_DIVISION_EVENT_NAME ?? '',
            {
                detail,
                bubbles: true,
                composed: true
            }
        )

        this.dispatchEvent(divisionNameClickEvent)
    }

    const updateIconClickHandler = () => {
        const detail = {
            mode: ECRUDModes.UPDATE,
            divisionItem
        }
        const updateIconClickEvent: IModifyDivisionEvent = new CustomEvent(
            this.MODIFY_DIVISION_EVENT_NAME ?? '',
            {
                detail,
                bubbles: true,
                composed: true
            }
        )

        this.dispatchEvent(updateIconClickEvent)
    }

    const deleteIconClickHandler = () => {
        const detail = {
            mode: ECRUDModes.DELETE,
            divisionItem
        }
        const deleteIconClickEvent: IModifyDivisionEvent = new CustomEvent(
            this.MODIFY_DIVISION_EVENT_NAME ?? '',
            {
                detail,
                bubbles: true,
                composed: true
            }
        )

        this.dispatchEvent(deleteIconClickEvent)
    }

    const divisionLinkHref = `Divisions.aspx?mode=${EDivisionsPageLayers.divisionDetailsLayer}&division_id=${divisionItem.Id}`

    const nameCell: ICell = {
        content: html`
            <a
                href=${divisionLinkHref}
                title='View division details'
                @click=${divisionNameClickHandler}
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
                divisionItem.Managers.map((managerItem, index) => {
                    const content = html`
                            <a
                                href='UserDetails.aspx?${USER_ID_PARAM_NAME}=${managerItem.Id}'
                                title='View user details'
                            >
                                ${managerItem.Name}
                            </a>
                        `
                    return divisionItem.Managers && index + 1 === divisionItem.Managers.length
                            ? content
                            : html`${content} <br />`
                })
            }
        `
        : ''

    const managersCell: ICell = {
        content: managersString,
        compareContent: divisionItem.Managers ? divisionItem.Managers.map(manager => manager.Name).join(' ') : ''
    }

    const updateButtonCell: ICell = {
        content: html`
            <button
                type="button"
                @click=${updateIconClickHandler}
                title='Update division'
            >
                ${updateIcon}
            </button>
        `,
        classes: [ECellClasses.SM, ECellClasses.PRIMARY_BUTTON]
    }

    const deleteButtonCell: ICell = {
        content: html`
            <button
                type="button"
                @click=${deleteIconClickHandler}
                title='Delete division'
            >
                ${deleteIcon}
            </button>
        `,
        classes: [ECellClasses.SM, ECellClasses.SECONDARY_BUTTON]
    }

    divisionRow.push(
        nameCell,
        headcountCell,
        managersCell,
        updateButtonCell,
        deleteButtonCell
    )

    return {
        id: divisionItem.Id,
        row: divisionRow
    }
}
