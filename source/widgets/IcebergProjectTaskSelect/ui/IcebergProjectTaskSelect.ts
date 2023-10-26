import { LitElement, css, html, nothing } from 'lit'
import styles from './styles.lit.scss'
import { defineIcebergSelect, IIcebergSelectChangeEvent, ISelectOption } from 'shared/ui/IcebergSelect'
import { until } from 'lit/directives/until.js'
import { defineIcebergLoader } from 'shared/ui/loaders/IcebergLoader'
import { state } from 'lit/decorators.js'
import { IProjectTaskInfo } from 'entities/Projects/types'
import { getProjectsTasks } from 'entities/Projects/api/getProjectsTasks'
import { getURLParams } from 'shared/helpers/getURLParams'
import { USER_ID_PARAM_NAME } from 'entities/Users/urlParams'
import { DATE_PARAM_NAME } from 'shared/urlParams'
import { formatStringToDate } from 'shared/helpers/formatStringToDate'
import { createSelectOptionsGroups } from '../helpers/createSelectOptionsGroups'
import { PROJECT_ID_PARAM_NAME, PROJECT_ROLE_ID_PARAM_NAME, PROJECT_TASK_ID_PARAM_NAME } from 'entities/Projects/urlParams'

defineIcebergSelect()
defineIcebergLoader()

export class IcebergProjectTaskSelect extends LitElement {
    @state() selectOptionsGroups: Promise<ISelectOption[]>

    userId: number
    dateString: string
    selectedOptionId: string
    PROJECT_ID_VALUE_INDEX = 0
    PROJECT_ROLE_ID_VALUE_INDEX = 1
    PROJECT_TASK_ID_VALUE_INDEX = 2
    MINIMUM_TASK_AND_PROJECT_COUNT = 1
    FIRST_AND_SINGLE_ELEMENT_INDEX = 0

    constructor() {
        super()
        const urlParams = getURLParams()

        if (Boolean(urlParams[USER_ID_PARAM_NAME]) && Boolean(urlParams[DATE_PARAM_NAME])) {
            this.dateString = urlParams[DATE_PARAM_NAME]
            this.userId = Number(urlParams[USER_ID_PARAM_NAME])
            const date = formatStringToDate(this.dateString)

            if (date !== null && this.userId) {
                const projectsTasksInfo: Promise<IProjectTaskInfo[]>  = getProjectsTasks(
                    this.userId,
                    new Date(date.getFullYear(), date.getMonth(), 1),
                    new Date(date.getFullYear(), date.getMonth() + 1, -1)
                )

                this.createSelectOptions(projectsTasksInfo)
            }
        }
    }

    static styles = css`
        ${styles}
    `

    render() {
        return html`
            ${until(this.projectTasksSelectTemplate(), html`<iceberg-loader></iceberg-loader>`)}
        `
    }

    projectTasksSelectTemplate() {
        if (this.selectOptionsGroups) {
            return Promise.resolve(this.selectOptionsGroups).then(selectOptionsGroups => {
                return selectOptionsGroups.length
                    ?  html`
                        <div>
                            <label>Choose project task:</label>
                            <iceberg-select
                                .options=${selectOptionsGroups}
                                .selectedOptionId=${this.selectedOptionId}
                                @changeSelectedValue=${this.changeSelectedValueHandler}
                            ></iceberg-select>
                        </div>
                    `
                    : nothing
            })
        } else return nothing
    }

    async createSelectOptions(promiseOfProjectsTasksInfo: Promise<IProjectTaskInfo[]>) {
        this.selectOptionsGroups = Promise.resolve(promiseOfProjectsTasksInfo).then(projectsTasksInfo => {
            if (
                projectsTasksInfo.length > this.MINIMUM_TASK_AND_PROJECT_COUNT ||
                (
                    projectsTasksInfo.length &&
                    projectsTasksInfo[this.FIRST_AND_SINGLE_ELEMENT_INDEX].ProjectTasks.length > this.MINIMUM_TASK_AND_PROJECT_COUNT
                )
            ) {
                this.selectedOptionId = ''
                const urlParams = getURLParams()
                if (urlParams[PROJECT_ID_PARAM_NAME]) this.selectedOptionId = urlParams[PROJECT_ID_PARAM_NAME]
                if (urlParams[PROJECT_ROLE_ID_PARAM_NAME]) this.selectedOptionId = `${this.selectedOptionId},${urlParams[PROJECT_ROLE_ID_PARAM_NAME]}`

                if (urlParams[PROJECT_TASK_ID_PARAM_NAME]) {
                    this.selectedOptionId = `${this.selectedOptionId},${urlParams[PROJECT_TASK_ID_PARAM_NAME]}`
                }

                return createSelectOptionsGroups(projectsTasksInfo)
            } else return []
        })
    }

    changeSelectedValueHandler(e: IIcebergSelectChangeEvent) {
        if (this.selectedOptionId !== e.detail.selectedOption.id) {
            const ids = String(e.detail.selectedOption.id).split(',')
            const projectId = ids[this.PROJECT_ID_VALUE_INDEX]
            const projectRoleId = ids[this.PROJECT_ROLE_ID_VALUE_INDEX]
            const projectTaskId = ids[this.PROJECT_TASK_ID_VALUE_INDEX]

            let url = `TimeSheetByMonth.aspx?${USER_ID_PARAM_NAME}=${this.userId}&${PROJECT_ID_PARAM_NAME}=${projectId}&${PROJECT_ROLE_ID_PARAM_NAME}=${projectRoleId}&${DATE_PARAM_NAME}=${this.dateString}`

            url = projectTaskId
                ? `${url}&${PROJECT_TASK_ID_PARAM_NAME}=${projectTaskId}`
                : url

            window.location.href = url
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'iceberg-project-taks-select': IcebergProjectTaskSelect;
    }
}
