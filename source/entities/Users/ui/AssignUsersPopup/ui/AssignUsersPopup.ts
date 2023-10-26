import styles from './styles.lit.scss'
import { css, html } from 'lit'
import { property } from 'lit/decorators.js'
import { defineIcebergButton } from 'shared/ui/IcebergButton'
import { IcebergPopup } from 'shared/ui/IcebergPopup'
import { defineIcebergSelect, IIcebergSelectChangeEvent, ISelectOption } from 'shared/ui/IcebergSelect'
import { defineAssignUsersPopupTable } from 'entities/Users/ui/AssignUsersPopupTable'
import { EAssignUsersPopupMods, IAssignTableUserItem, IAssignUsersPopupResultEvent, IAssignUsersPopupResultEventDetail, IFilterButtonClickEvent, IFilterButtonClickEventDetail } from '../types'
import { choose } from 'lit/directives/choose.js'
import { until } from 'lit/directives/until.js'
import { IRegionItem } from 'entities/Branches/types'
import { IDivisionItem } from 'entities/Divisions/types'
import { IPoolItem } from 'entities/Pools/types'
import { IChangeCurrentDateEvent } from 'widgets/IcebergDateField/types'
import { Ref, createRef, ref } from 'lit/directives/ref.js'
import { TAssignUsersPopupTable } from '../../AssignUsersPopupTable'
import { formatDateToString } from 'shared/helpers/formatDateToString'
import { IIcebergCheckboxInAssignTableChangeEvent } from '../../AssignUsersPopupTable/types'
import { UNKNOWN_ERROR_MESSAGE } from 'shared/messages'
import { assignUsersIntoDivision } from 'entities/Users/api/assignUsersIntoDivision'
import { assignUsersIntoPool } from 'entities/Users/api/assignUsersIntoPool'
import { IResponse } from 'shared/types'
import { IUserItem } from 'entities/Users/types'
import { EIcebergButtonSizes } from 'shared/ui/IcebergButton'

defineIcebergSelect()
defineIcebergButton()
defineAssignUsersPopupTable()

export class AssignUsersPopup extends IcebergPopup {
    @property({type: Number, reflect: false, attribute: false}) currentId: number
    @property({type: String, reflect: false, attribute: false}) mode: EAssignUsersPopupMods
    @property({type: Array, reflect: false, attribute: false}) selectableBranches?: Promise<IRegionItem[] | undefined>
    @property({type: Array, reflect: false, attribute: false}) selectableDivisions?: Promise<IDivisionItem[] | undefined>
    @property({type: Array, reflect: false, attribute: false}) selectablePools?: Promise<IPoolItem[] | undefined>
    @property({type: Array, reflect: false, attribute: false}) filteredUsers?: Promise<IAssignTableUserItem[] | undefined> | IAssignTableUserItem[]

    selectedDate: Date = new Date()

    ALL_OPTION_ID = 0
    USERS_WITHOUT_OPTION_ID = -1
    FILTER_BUTTON_CLICK_EVENT_NAME = 'filterButtonClickEvent'
    EMPTY_CHOSEN_USER_LIST_MESSAGE = 'No user has been selected'
    ERROR_WHILE_CREATE_FILTERS = 'Sorry, the filtering is broken'
    ERROR_WHILE_CREATE_USER_TABLE = 'Sorry, failed to show users'

    selectedPoolOption: number = this.ALL_OPTION_ID
    selectedDivisionOption: number = this.ALL_OPTION_ID
    selectedBranchOption: number = this.ALL_OPTION_ID

    assignUsersTableRef: Ref<TAssignUsersPopupTable> = createRef()

    static styles = [
        IcebergPopup.styles,
        css`
          ${styles}  
        `
    ]

    headerTemplate() {
        return html`
            <header>
                Assign users ${this.mode}
            </header>
        `
    }

    mainTemplate() {
        if (this.mode) {
            return html`
                ${choose(this.mode, [
                [EAssignUsersPopupMods.assignIntoDivision, ()=> {
                    return until(this.divisionFiltersTemplate(), this.loaderTemplate())
                }],
                [EAssignUsersPopupMods.assignIntoPool, ()=> {
                    return until(this.poolFiltersTemplate(), this.loaderTemplate())
                }]
            ],
            () => this.filtersErrorTemplate())}

                <div class ='userTable'>
                    ${until(this.userTableTemplate(), this.loaderTemplate())}
                </div>
            `
        } else {
            return this.loaderTemplate()
        }
    }

    divisionFiltersTemplate() {
        if (this.selectableBranches && this.selectableDivisions) {
            return Promise.all([this.selectableBranches, this.selectableDivisions])
                .then(([selectableBranches, selectableDivisions]) => {
                    if (selectableDivisions && selectableBranches) {
                        const divisionsOptions: ISelectOption[] = this.createDivisionOptions(selectableDivisions)
                        const branchesOptions: ISelectOption[] = this.createBranchesOptions(selectableBranches)
                        return html`
                            <div class="filters">
                                <div class='fieldset'>
                                    <label>
                                        Branch:
                                    </label>
                                    <iceberg-select
                                        .options=${branchesOptions}
                                        .selectedOptionId=${this.selectedBranchOption}
                                        @changeSelectedValue=${this.changeSelectedBranchOptionHandler}
                                    ></iceberg-select>
                                </div>

                                <div class='fieldset'>
                                    <label>
                                        Division:
                                    </label>
                                    <iceberg-select
                                        .options=${divisionsOptions}
                                        .selectedOptionId=${this.selectedDivisionOption}
                                        @changeSelectedValue=${this.changeSelectedDivisionOptionHandler}
                                    ></iceberg-select>
                                </div>
                            
                                <iceberg-button
                                    .size=${EIcebergButtonSizes.XS}
                                    @click=${this.filterButtonClickHandler}
                                >
                                    Filter
                                </iceberg-button>
                            </div>
                        `
                    } else return this.filtersErrorTemplate()
                })
        } else return this.filtersErrorTemplate()
    }

    async poolFiltersTemplate() {
        if (this.selectablePools) {
            return Promise.resolve(this.selectablePools)
                .then(selectablePools => {
                    if (selectablePools) {
                        const poolsOptions: ISelectOption[] = this.createPoolsOptions(selectablePools)

                        return html`
                            <div class="filters">
                                <div class='fieldset'>
                                    <label>
                                        Pool:
                                    </label>
                                    <iceberg-select
                                        .options=${poolsOptions}
                                        .selectedOptionId=${this.selectedPoolOption}
                                        @changeSelectedValue=${this.changeSelectedPoolOptionHandler}
                                    ></iceberg-select>
                                </div>
                            
                                <iceberg-button
                                    .size=${EIcebergButtonSizes.XS}
                                    @click=${this.filterButtonClickHandler}
                                >
                                    Filter
                                </iceberg-button>
                            </div>
                        `
                    } else return this.filtersErrorTemplate()
                })
        } else return  this.filtersErrorTemplate()
    }

    filtersErrorTemplate() {
        return html`<span class='error'>${this.ERROR_WHILE_CREATE_FILTERS}</span>`
    }

    async userTableTemplate() {
        if (this.filteredUsers) {
            return await Promise.resolve(this.filteredUsers)
                .then(filteredUsers => {
                    return html`
                        <assign-users-popup-table
                            ${ref(this.assignUsersTableRef)} 
                            .displayedEntities=${filteredUsers}
                            .selectedDate=${this.selectedDate}
                            @changeDate=${this.changeDateHandler}
                            @change=${this.checkedChangeHandler}
                        ></assign-users-popup-table>
                    `
                })
        } else return this.userTableErrorTemplate()
    }

    userTableErrorTemplate() {
        return html`<span class='error'>${this.ERROR_WHILE_CREATE_USER_TABLE}</span>`
    }

    createDivisionOptions(divisions: IDivisionItem[]) {
        const divisionsOptions: ISelectOption[] = divisions.map(division => {
            return {
                id: division.Id,
                value: division.Name
            }
        })

        const usersWithoutDivisionsOption: ISelectOption = {id: this.USERS_WITHOUT_OPTION_ID, value: 'Users without division'}
        const allUsersOption: ISelectOption = {id: this.ALL_OPTION_ID, value: 'All'}

        divisionsOptions.unshift(allUsersOption, usersWithoutDivisionsOption)

        return divisionsOptions
    }

    createBranchesOptions(regions: IRegionItem[]) {
        const branchesOptionsGroups: ISelectOption[] = regions.map(region => {
            const branchesOptions = region.Branches.map(branch => {
                return {
                    id: branch.Id,
                    value: branch.Name
                }
            })
            return {
                value: region.Name,
                id: region.Id,
                options: branchesOptions
            }
        })

        const allBranchesOption: ISelectOption = {id: this.ALL_OPTION_ID, value: 'All'}

        branchesOptionsGroups.unshift(allBranchesOption)

        return branchesOptionsGroups
    }

    createPoolsOptions(pools: IPoolItem[]) {
        const poolsOptions: ISelectOption[] = pools.map(pool => {
            return {
                id: pool.Id,
                value: pool.Name
            }
        })

        const usersWithoutPoolOption: ISelectOption = {id: this.USERS_WITHOUT_OPTION_ID, value: 'Users without pool'}
        const allUsersOption: ISelectOption = {id: this.ALL_OPTION_ID, value: 'All'}

        poolsOptions.unshift(allUsersOption, usersWithoutPoolOption)

        return poolsOptions
    }

    filterButtonClickHandler() {
        this.needToAskBeforeClosing = true

        const detail: IFilterButtonClickEventDetail = {
            mode: this.mode
        }

        const filterButtonClickEvent: IFilterButtonClickEvent = new CustomEvent(
            this.FILTER_BUTTON_CLICK_EVENT_NAME,
            {
                detail,
                bubbles: true,
                composed: true
            }
        )

        this.dispatchEvent(filterButtonClickEvent)
    }

    changeSelectedPoolOptionHandler(e: IIcebergSelectChangeEvent) {
        this.needToAskBeforeClosing = true

        this.selectedPoolOption = Number(e.detail.selectedOption.id)
    }

    changeSelectedDivisionOptionHandler(e: IIcebergSelectChangeEvent) {
        this.needToAskBeforeClosing = true

        this.selectedDivisionOption = Number(e.detail.selectedOption.id)
    }

    changeSelectedBranchOptionHandler(e: IIcebergSelectChangeEvent) {
        this.needToAskBeforeClosing = true

        this.selectedBranchOption = Number(e.detail.selectedOption.id)
    }

    async checkedChangeHandler(e: IIcebergCheckboxInAssignTableChangeEvent) {
        this.needToAskBeforeClosing = true

        const {checked, key} = e.detail
        const assignedStartDate = checked
            ? formatDateToString(this.selectedDate)
            : ''

        Promise.resolve(this.filteredUsers)
            .then(filteredUsers => {
                if (filteredUsers) {
                    const changedItem = filteredUsers.find(user => user.Id === key.userItem.Id)
                    if (changedItem) {
                        changedItem.Checked = checked
                        changedItem.AssignedStartDate = assignedStartDate
                    }
                    this.filteredUsers = [...filteredUsers]
                }
            })

        key.dateField.value = assignedStartDate
    }

    changeDateHandler(e: IChangeCurrentDateEvent) {
        this.needToAskBeforeClosing = true

        this.selectedDate = e.detail.date
    }

    async okClick() {
        this.isLoading = true
        const checkedUsers = await Promise.resolve(this.filteredUsers)
            .then(filteredUsers => {
                if (filteredUsers) {
                    return filteredUsers
                        .filter(user => {
                            return user.Checked
                        })
                } else return []
            })

        let response: IResponse<IUserItem[]> = {
            IsSucceeded: false
        }

        if (this.mode === EAssignUsersPopupMods.assignIntoDivision) {
            const assignedIntoDivisionUsers = checkedUsers
                .map(user => {
                    return {
                        UserId: user.Id,
                        StartDate: user.AssignedStartDate ?? ''
                    }
                })
            if (assignedIntoDivisionUsers.length) {
                response = await assignUsersIntoDivision(this.currentId, assignedIntoDivisionUsers)
            } else {
                this.showMessage(this.EMPTY_CHOSEN_USER_LIST_MESSAGE, false)
                this.isLoading = false
            }

        } else if (this.mode === EAssignUsersPopupMods.assignIntoPool) {
            const assignedIntoPoolUsers = checkedUsers
                .map(user => {
                    return {
                        UserId: user.Id,
                        StartDate: user.AssignedStartDate ?? ''
                    }
                })
            if (assignedIntoPoolUsers.length) {
                response = await assignUsersIntoPool(this.currentId, assignedIntoPoolUsers)
            } else {
                this.showMessage(this.EMPTY_CHOSEN_USER_LIST_MESSAGE, false)
                this.isLoading = false
            }
        }

        if (response.IsSucceeded) {
            const detail: IAssignUsersPopupResultEventDetail = {
                IsSucceeded: true,
                Users: response.Value
            }

            const resultEvent: IAssignUsersPopupResultEvent = new CustomEvent(
                this.RESULT_EVENT_NAME,
                {
                    detail,
                    bubbles: true,
                    composed: true
                }
            )
            this.dispatchEvent(resultEvent)
            this.visible = false
            this.isLoading = false
        } else {
            const message = response.Message ? response.Message : UNKNOWN_ERROR_MESSAGE
            this.showMessage(message, false)
            this.isLoading = false
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'assign-users-popup': AssignUsersPopup;
    }
}
