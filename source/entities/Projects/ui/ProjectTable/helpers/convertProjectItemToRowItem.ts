import { ECellClasses, ICell, IRowItem } from 'shared/ui/IcebergTable'
import { IProjectItem } from 'entities/Projects/types'
import { PROJECT_ID_PARAM_NAME } from 'entities/Projects/urlParams'
import { html } from 'lit'
import { CUSTOMER_ID_PARAM_NAME } from 'entities/Customers/urlParams'
import { ACCOUNT_ID_PARAM_NAME } from 'entities/Accounts/urlParams'
import deleteIcon from 'shared/assets/icons/deleteIcon.svg'
import { ECRUDModes } from 'shared/types'
import { dollarIcon } from 'shared/assets/icons/dollarIcon'
import { USER_ID_PARAM_NAME } from 'entities/Users/urlParams'
import { IProjectRowDeleteIconClickEvent } from '../types'
import { formatStringToDate } from 'shared/helpers/formatStringToDate'
import { ifDefined } from 'lit/directives/if-defined.js'
import { ProjectsTable } from '../ui/ProjectsTable'

const DELETE_ICON_CLICK_EVENT = 'deleteIconClick'

export function convertProjectItemToRowItem(this: ProjectsTable, projectItem: IProjectItem): IRowItem  {
    const projectRow: ICell[] = []

    const deleteIconClickHandler = () => {
        const detail = {
            mode: ECRUDModes.DELETE,
            projectItem
        }
        const deleteIconClickEvent: IProjectRowDeleteIconClickEvent = new CustomEvent(
            DELETE_ICON_CLICK_EVENT,
            {
                detail,
                bubbles: true,
                composed: true
            }
        )

        this.dispatchEvent(deleteIconClickEvent)
    }

    const linkHref = `ProjectDetails.aspx?${PROJECT_ID_PARAM_NAME}=${projectItem.Id}`

    const nameCell: ICell = {
        content: html`
            <a
                href=${linkHref}
                title='View project details'
            >
                ${projectItem.Name}
            </a>
        `,
        compareContent: projectItem.Name
    }

    const customerLink = `CustomerAddUpdate.aspx?mode=Edit&${CUSTOMER_ID_PARAM_NAME}=${projectItem.CustomerId}`

    const customerCell: ICell = {
        content: html`
            <a
                href=${customerLink}
                title='Edit customer'
            >
                ${projectItem.CustomerName}
            </a>
        `,
        compareContent: projectItem.CustomerName
    }

    const statusCell: ICell = {
        content: projectItem.IsActive ? 'Active' : 'Inactive',
        classes: [ECellClasses.TEXT_CENTERED]
    }

    const startDateCell: ICell = {
        content: projectItem.StartDate,
        compareContent: formatStringToDate(projectItem.StartDate) ?? ''
    }

    const endDateCell: ICell = {
        content: projectItem.EndDate,
        compareContent: formatStringToDate(projectItem.EndDate) ?? ''
    }

    const accountLink = `AccountDetails.aspx?${ACCOUNT_ID_PARAM_NAME}=${projectItem.AccountId}`

    const accountCell: ICell = {
        content: html`
            <a
                href=${accountLink}
                title='View account details'
            >
                ${projectItem.AccountName}
            </a>
        `,
        compareContent: projectItem.AccountName
    }

    const supervisorsString = projectItem.Supervisors
        ? html`
            ${
                projectItem.Supervisors.map((supervisor, index) => {
                    const supervisorLinkHref = `UserDetails.aspx?${USER_ID_PARAM_NAME}=${supervisor.Id}`

                    const supervisorLink = html`
                        <a
                            class=${ifDefined(supervisor.IsActive ? undefined : ECellClasses.INACTIVE_ENTITY_LINK)}
                            href=${supervisorLinkHref}
                            title='View user details'
                        >
                            ${supervisor.Name}
                        </a>
                    `
                    return projectItem.Managers && index + 1 === projectItem.Managers.length
                        ? supervisorLink
                        : html`${supervisorLink} <br />`
                })
            }
        `
        : ''

    const managersString = projectItem.Managers
        ? html`
            ${
                projectItem.Managers.map((manager, index) => {
                    const managerLinkHref = `UserDetails.aspx?${USER_ID_PARAM_NAME}=${manager.Id}`

                    const managerLink = html`
                            <a
                                class=${ifDefined(manager.IsActive ? undefined : ECellClasses.INACTIVE_ENTITY_LINK)}
                                href=${managerLinkHref}
                                title='View user details'
                            >
                                ${manager.Name}
                            </a>
                        `
                    return projectItem.Managers && index + 1 === projectItem.Managers.length
                            ? managerLink
                            : html`${managerLink} <br />`
                })
            }
        `
        : ''

    const supervisorCell: ICell = {
        content: supervisorsString,
        compareContent: projectItem.Supervisors
            ? projectItem.Supervisors.map(supervisor => supervisor.Name).join(' ')
            : ''
    }

    const managerCell: ICell = {
        content: managersString,
        compareContent: projectItem.Managers
            ? projectItem.Managers.map(manager => manager.Name).join(' ')
            :''
    }

    const projectFinanceLinkHref = `ProjectFinances.aspx?${PROJECT_ID_PARAM_NAME}=${projectItem.Id}`

    const budgetButtonCell: ICell = projectItem.IsViewProjectFinancesAllowed
		? {
		    content: html`
				<a
					href=${projectFinanceLinkHref}
					title='View project finances'
				>
					${dollarIcon()}
				</a>
			`,
		    classes: [ECellClasses.SM, ECellClasses.ADDITIONAL_BUTTON]
		}
		: {
		    content: ''
		}

    const deleteButtonCell: ICell = projectItem.IsDeleteAllowed
        ? {
            content: html`
                <button
                    type="button"
                    @click=${deleteIconClickHandler}
                    title='Delete project'
                >
                    ${deleteIcon}
                </button>
            `,
            classes: [ECellClasses.SM, ECellClasses.SECONDARY_BUTTON]
        }
        : {
            content: ''
        }

    projectRow.push(
        nameCell,
        customerCell,
        statusCell,
        startDateCell,
        endDateCell,
        accountCell,
        supervisorCell,
        managerCell,
        budgetButtonCell,
        deleteButtonCell
    )

    return {
        id: projectItem.Id,
        row: projectRow
    }
}
