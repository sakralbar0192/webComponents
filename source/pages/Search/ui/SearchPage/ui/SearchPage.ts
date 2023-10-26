import { IIcebergSearchFieldSearchEvent, defineIcebergSearchField } from 'widgets/IcebergSearchField'
import styles from './styles.lit.scss'
import { LitElement, css, html, nothing } from 'lit'
import { ESearchModes, ISearchResult, searchEntities } from 'shared/api/searchEntities'
import { state } from 'lit/decorators.js'
import { defineIcebergCheckbox, EIcebergCheckboxTypes, TIcebergCheckbox } from 'shared/ui/IcebergCheckbox'
import { until } from 'lit/directives/until.js'
import { defineIcebergLoader } from 'shared/ui/loaders/IcebergLoader'
import { choose } from 'lit/directives/choose.js'
import { defineSearchedDivisionsTable } from 'entities/Divisions/ui/SearchedDivisionsTable'
import { IDivisionItem } from 'entities/Divisions/types'
import { IAccountItem } from 'entities/Accounts/types'
import { defineAccountsTable } from 'entities/Accounts/ui/AccountsTable'
import { defineProjectsTable } from 'entities/Projects/ui/ProjectTable'
import { IProjectItem } from 'entities/Projects/types'
import { defineUsersTable } from 'entities/Users/ui/UsersTable'
import { IUserItem } from 'entities/Users/types'
import { getURLParams } from 'shared/helpers/getURLParams'
import { ESearchUrlParamsNames, ISearchFiltersChangeEvent } from '../types'
import { REQUEST_FAILED_MESSAGE } from 'shared/messages'
import { getSearchPermissions } from 'pages/Search/api/getSearchPermissions'
import { IGetSearchPermissionsResponse } from 'pages/Search/api/types'
import { IProjectRowDeleteIconClickEvent } from 'entities/Projects/ui/ProjectTable'
import { Ref, createRef, ref } from 'lit/directives/ref.js'
import { getPopupResponse } from 'shared/ui/IcebergPopup'
import { TRemoveProjectPopup, defineRemoveProjectPopup } from 'entities/Projects/ui/RemoveProjectPopup'
import { IRemoveProjectPopupResultEventDetail } from 'entities/Projects/ui/RemoveProjectPopup'
import { defineIcebergLegend, ELegendClasses, ILegendItem } from 'widgets/IcebergLegend'
import { IResponse } from 'shared/types'

defineIcebergSearchField()
defineIcebergCheckbox()
defineIcebergLoader()
defineSearchedDivisionsTable()
defineAccountsTable()
defineProjectsTable()
defineUsersTable()
defineRemoveProjectPopup()
defineIcebergLegend()

export class SearchPage extends LitElement {
    @state() loading: boolean
    @state() searchResult?: Promise<IResponse<ISearchResult>> | IResponse<ISearchResult>
    @state() checkedFilter: ESearchModes
    @state() searchText = ''
    @state() isAccountsAllowed = false
    @state() isDivisionsAllowed = false
    @state() isProjectsAllowed = false
    @state() isUsersAllowed = false
    @state() isRemoveProjectPopupActive = false
    @state() disabledFilters = true

    INACTIVE_SEARCH_FIELD_PLACEHOLDER = 'Enter a search term'
    ACTIVE_SEARCH_FIELD_PLACEHOLDER = 'Use "!" in the beginning to search inactive entities'
    HAVE_NOT_PERMISSIONS_MESSAGE = 'Sorry, you don`t have permissions to use this page'
    TIME_FOR_SEARCH = 400

    userTableLegendsItems: ILegendItem[] = [
        {
            title: 'Active user',
            class: ELegendClasses.ACTIVE_USER

        },
        {
            title: 'Inactive user',
            class: ELegendClasses.INACTIVE_USER
        }
    ]

    timerId: NodeJS.Timeout
    removeProjectPopupRef: Ref<TRemoveProjectPopup> = createRef()

    constructor() {
        super()
        this.getSearchPermissions()
    }

    static styles = css`
        ${styles}
    `

    render() {
        return html`
            ${
                this.isAccountsAllowed || this.isDivisionsAllowed || this.isProjectsAllowed || this.isUsersAllowed
                    ? html`
                        <div class='searchFieldWrapper'>
                            <label>Search query:</label>
                            <iceberg-search-field
                                .value=${this.searchText}
                                .activePlaceholder=${this.ACTIVE_SEARCH_FIELD_PLACEHOLDER}
                                .inactivePlaceholder=${this.INACTIVE_SEARCH_FIELD_PLACEHOLDER}
                                @needSearch=${this.needSearchHandler}
                            ></iceberg-search-field>
                        </div>

                        <div class='filters'>
                            <label>Search by:</label>
                            ${
                                this.isAccountsAllowed
                                    ? html`
                                        <iceberg-checkbox
                                            .type=${EIcebergCheckboxTypes.RADIO}
                                            ?disabled=${this.disabledFilters}
                                            .key=${ESearchModes.ACCOUNTS}
                                            ?checked=${this.checkedFilter === ESearchModes.ACCOUNTS}
                                            @change=${this.checkedChangeHandler}
                                        >
                                            Accounts
                                        </iceberg-checkbox>
                                    `
                                    : nothing
                            }
                            ${
                                this.isDivisionsAllowed
                                    ? html`
                                        <iceberg-checkbox
                                            .type=${EIcebergCheckboxTypes.RADIO}
                                            ?disabled=${this.disabledFilters}
                                            .key=${ESearchModes.DIVISIONS}
                                            ?checked=${this.checkedFilter === ESearchModes.DIVISIONS}
                                            @change=${this.checkedChangeHandler}
                                        >
                                            Divisions
                                        </iceberg-checkbox>
                                    `
                                    : nothing
                            }
                            ${
                                this.isProjectsAllowed
                                    ? html`
                                        <iceberg-checkbox
                                            .type=${EIcebergCheckboxTypes.RADIO}
                                            ?disabled=${this.disabledFilters}
                                            .key=${ESearchModes.PROJECTS}
                                            ?checked=${this.checkedFilter === ESearchModes.PROJECTS}
                                            @change=${this.checkedChangeHandler}
                                        >
                                            Projects
                                        </iceberg-checkbox>
                                    `
                                    : nothing
                            }
                            ${
                                this.isUsersAllowed
                                    ? html`
                                        <iceberg-checkbox
                                            .type=${EIcebergCheckboxTypes.RADIO}
                                            ?disabled=${this.disabledFilters}
                                            .key=${ESearchModes.USERS}
                                            ?checked=${this.checkedFilter === ESearchModes.USERS}
                                            @change=${this.checkedChangeHandler}
                                        >
                                            Users
                                        </iceberg-checkbox>
                                    `
                                    : nothing
                            }
                        </div>
                        <div class='result'>
                            ${
                                this.searchResult
                                    ? until(this.searchResultTemplate(), html`<iceberg-loader></iceberg-loader>`)
                                    : nothing
                            }
                        </div>

                        ${
                            this.isRemoveProjectPopupActive
                                ? html`
                                    <remove-project-popup
                                        ${ref(this.removeProjectPopupRef)}
                                        .visible=${this.isRemoveProjectPopupActive}
                                    ></remove-project-popup>
                                `
                                : nothing
                        }
                    `
                    : this.HAVE_NOT_PERMISSIONS_MESSAGE
            }            
        `
    }

    async searchResultTemplate() {
        return Promise.resolve(this.searchResult)
            .then((searchResult) => {
                this.disabledFilters = false
                if (searchResult) {
                    const value = searchResult.Value
                    return searchResult.IsSucceeded && value
                        ? html`
                            ${
                                choose(this.checkedFilter, [
                                    [ESearchModes.ACCOUNTS, ()=> {
                                        return this.accountsTableTemplate(value.ACCOUNTS)
                                    }],
                                    [ESearchModes.DIVISIONS, ()=> {
                                        return this.divisionsTableTemplate(value.DIVISIONS)
                                    }],
                                    [ESearchModes.PROJECTS, ()=> {
                                        return this.projectsTableTemplate(value.PROJECTS)
                                    }],
                                    [ESearchModes.USERS, ()=> {
                                        return this.usersTableTemplate(value.USERS)
                                    }],
                                    [ESearchModes.ALL, ()=> {
                                        if (value.ACCOUNTS && value.ACCOUNTS.length) {
                                            this.checkedFilter = ESearchModes.ACCOUNTS
                                        } else if (value.DIVISIONS && value.DIVISIONS.length) {
                                            this.checkedFilter = ESearchModes.DIVISIONS
                                        } else if (value.PROJECTS && value.PROJECTS.length) {
                                            this.checkedFilter = ESearchModes.PROJECTS
                                        } else if (value.USERS && value.USERS.length) {
                                            this.checkedFilter = ESearchModes.USERS
                                        }
                                    }],
                                ],
                                () => html`${nothing}`)
                        }
                        `

                        : html`${searchResult.Message ? searchResult.Message : REQUEST_FAILED_MESSAGE}`
                } else return nothing
            })
    }

    accountsTableTemplate(searchResult?: IAccountItem[]) {
        return searchResult && searchResult.length
        ? html`
            <accounts-table
                .displayedEntities=${searchResult}
            ></accounts-table>    
        `
        : 'Nothing to display'
    }

    divisionsTableTemplate(searchResult?: IDivisionItem[]) {
        return searchResult && searchResult.length
        ? html`
            <searched-divisions-table
                .displayedEntities=${searchResult}
            ></searched-divisions-table>
        `
        : 'Nothing to display'
    }

    projectsTableTemplate(searchResult?: IProjectItem[]) {
        return searchResult && searchResult.length
        ? html`
            <projects-table
                .displayedEntities=${searchResult}
                @deleteIconClick=${this.projectDeleteIconClickHandler}
            ></projects-table>            
        `
        : 'Nothing to display'
    }

    usersTableTemplate(searchResult?: IUserItem[]) {
        return searchResult && searchResult.length
        ? html`
            <div class='tableWrapper'>
                <users-table
                    .displayedEntities=${searchResult} 
                ></users-table>                
                ${
                    searchResult.length
                        ? html`
                            <iceberg-legend
                                .legendItems=${this.userTableLegendsItems}
                            ></iceberg-legend>
                        `
                        : nothing
                }
                
            </div>
        `
        : 'Nothing to display'
    }

    needSearchHandler(e: IIcebergSearchFieldSearchEvent) {
        if (this.timerId) {
            clearTimeout(this.timerId)
        }

        this.searchText = e.detail.searchText.replace(/"/g, '')
        this.getSearchResult()
    }

    checkedChangeHandler(e: ISearchFiltersChangeEvent) {
        const {checked, key} = e.detail

        if (this.checkedFilter !== key) {
            this.checkedFilter = key
            this.getSearchResult()
        } else {
            if (!checked) (e.target as TIcebergCheckbox).checked = true
        }
    }

    async projectDeleteIconClickHandler(e: IProjectRowDeleteIconClickEvent) {
        this.isRemoveProjectPopupActive = true
        await this.updateComplete

        const popup = this.removeProjectPopupRef.value
        if (popup) {
            popup.projectItem = e.detail.projectItem

            if (popup) {
                const popupResponse: IRemoveProjectPopupResultEventDetail = await getPopupResponse(popup)
                this.isRemoveProjectPopupActive = false

                if (popupResponse.IsSucceeded) {
                    Promise.resolve(this.searchResult)
                        .then(searchResult => {
                            if (searchResult && popupResponse.ProjectItem) {
                                const projectId = popupResponse.ProjectItem.Id
                                const newProjects = searchResult.Value && searchResult.Value.PROJECTS
                                    ? searchResult.Value.PROJECTS.filter(project => project.Id !== projectId)
                                    : []
                                this.searchResult = {
                                    ...searchResult,
                                    Value: {
                                        ...searchResult.Value,
                                        PROJECTS: [...newProjects]
                                    }
                                }
                            }
                        })
                }
            }
        }
    }

    async getSearchPermissions() {
        const params = getURLParams()
        const response: IGetSearchPermissionsResponse = await getSearchPermissions()
        let urlSearchTarget = ESearchModes.ALL

        if (params[ESearchUrlParamsNames.SEARCH_TARGET]) {
            urlSearchTarget = Number(params[ESearchUrlParamsNames.SEARCH_TARGET])
        }

        if (params[ESearchUrlParamsNames.SEARCH_TEXT]) {
            this.searchText = params[ESearchUrlParamsNames.SEARCH_TEXT]
        }

        if (response.IsSucceeded && response.Value) {
            this.isAccountsAllowed = response.Value.IsAccountsAllowed
            this.isDivisionsAllowed = response.Value.IsDivisionsAllowed
            this.isProjectsAllowed = response.Value.IsProjectsAllowed
            this.isUsersAllowed = response.Value.IsUsersAllowed

            this.checkPermission(urlSearchTarget)
            this.getSearchResult()
        }
    }

    checkPermission(urlSearchTarget: ESearchModes) {
        switch (urlSearchTarget) {
            case ESearchModes.ACCOUNTS:
                this.isAccountsAllowed
                    ? this.checkedFilter = urlSearchTarget
                    : this.checkPermission(ESearchModes.DIVISIONS)
                break
            case ESearchModes.DIVISIONS:
                this.isDivisionsAllowed
                    ? this.checkedFilter = urlSearchTarget
                    : this.checkPermission(ESearchModes.PROJECTS)
                break
            case ESearchModes.PROJECTS:
                this.isProjectsAllowed
                    ? this.checkedFilter = urlSearchTarget
                    : this.checkPermission(ESearchModes.USERS)
                break
            case ESearchModes.USERS:
                this.isUsersAllowed
                    ? this.checkedFilter = urlSearchTarget
                    : this.checkPermission(ESearchModes.ACCOUNTS)
                break
            default:
                if (
                    this.isAccountsAllowed ||
                    this.isDivisionsAllowed ||
                    this.isProjectsAllowed ||
                    this.isUsersAllowed
                ) this.checkedFilter = ESearchModes.ALL
        }
    }

    getSearchResult(checkedFilter = this.checkedFilter) {
        this.disabledFilters = true
        this.searchResult = undefined
        let isActiveOnly = true, searchText = this.searchText

        if (searchText[0] === '!') {
            searchText = searchText.substring(1)
            isActiveOnly = false
        }

        if (searchText.length < 2)  {
            this.disabledFilters = false
            return
        }

        this.timerId = setTimeout(() => {
            this.loading = true
            this.searchResult = searchEntities(searchText, checkedFilter, isActiveOnly)
        }, this.TIME_FOR_SEARCH)
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'search-page': SearchPage;
    }
}
