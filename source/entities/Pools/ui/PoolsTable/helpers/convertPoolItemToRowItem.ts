import { IPoolItem } from 'entities/Pools/types'
import { html } from 'lit-html'
import updateIcon from 'shared/assets/icons/updateIcon.svg'
import deleteIcon from 'shared/assets/icons/deleteIcon.svg'
import { ECellClasses, ICell, IRowItem } from 'shared/ui/IcebergTable'
import { IModifyPoolEvent, IChoosePoolEvent } from '../types'
import { ECRUDModes } from 'shared/types'
import { EDivisionsPageLayers } from 'entities/Divisions/types'
import { USER_ID_PARAM_NAME } from 'entities/Users/urlParams'
import { PoolsTable } from '../ui/PoolsTable'

export function convertPoolItemToRowItem(this: PoolsTable, poolItem: IPoolItem): IRowItem {
    const choosePoolHandler = (e: MouseEvent) => {
        e.preventDefault()

        const detail = {
            poolItem
        }
        const divisionNameClickEvent: IChoosePoolEvent = new CustomEvent(
            this.CHOOSE_POOL_EVENT_NAME ?? '',
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
            poolItem
        }
        const updateIconClickEvent: IModifyPoolEvent = new CustomEvent(
            this.MODIFY_POOL_EVENT_NAME ?? '',
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
            poolItem
        }
        const deleteIconClickEvent: IModifyPoolEvent = new CustomEvent(
            this.MODIFY_POOL_EVENT_NAME ?? '',
            {
                detail,
                bubbles: true,
                composed: true
            }
        )

        this.dispatchEvent(deleteIconClickEvent)
    }

    const poolRow: ICell[] = []

    const poolLinkHref = `Divisions.aspx?mode=${EDivisionsPageLayers.poolDetailsLayer}&division_id=${poolItem.DivisionId}&pool_id=${poolItem.Id}`

    const nameCell: ICell = {
        content: html`
            <a
                href=${poolLinkHref}
                title='View poll details'
                @click=${choosePoolHandler}
            >
                ${poolItem.Name}
            </a>
        `,
        compareContent: poolItem.Name
    }

    const headCountCell: ICell = {
        content: poolItem.UserCount ? poolItem.UserCount : 0
    }

    const managerLinkHref = `UserDetails.aspx?${USER_ID_PARAM_NAME}=${poolItem.ManagerId}`

    const managerCell: ICell = {
        content: html`
            <a
                href=${managerLinkHref}
                title='View user details'
            >
                ${poolItem.ManagerName}
            </a>
        `,
        compareContent: poolItem.ManagerName
    }

    const editButtonCell: ICell = {
        content: html`
            <button
                type="button"
                @click=${updateIconClickHandler}
                title='Update pool'
            >
                ${updateIcon}
            </button>
        `,
        classes: [ECellClasses.SM, ECellClasses.PRIMARY_BUTTON]
    }

    const removeButtonCell: ICell = {
        content: html`
            <button
                type="button"
                @click=${deleteIconClickHandler}
                title='Delete pool'
            >
                ${deleteIcon}
            </button>
        `,
        classes: [ECellClasses.SM, ECellClasses.SECONDARY_BUTTON]
    }

    poolRow.push(
        nameCell,
        headCountCell,
        managerCell,
        editButtonCell,
        removeButtonCell
    )

    return {
        id: poolItem.Id,
        row: poolRow
    }
}
