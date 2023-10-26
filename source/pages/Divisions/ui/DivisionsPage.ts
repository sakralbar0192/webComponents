import styles from './styles.lit.scss'
import { LitElement, css, html, nothing } from 'lit'
import { state } from 'lit/decorators.js'
import { choose } from 'lit/directives/choose.js'
import { createRef, Ref, ref } from 'lit/directives/ref.js'
import { defineIcebergButton } from 'shared/ui/IcebergButton'
import { IDivisionPagePopstateChangeEvent, IDivisionsPageURLParams, EDivisionsPagePopups, IAssignUsersButtonClickEvent } from '../types'
import { pushDivisionPageHistoryState } from '../helpers/pushDivisionPageHistoryState'
import { getURLParams } from 'shared/helpers/getURLParams'
import { DIVISION_ID_PARAM_NAME } from 'entities/Divisions/urlParams'
import { POOL_ID_PARAM_NAME } from 'entities/Pools/urlParams'
import { defineModifyDivisionsPopup, TModifyDivisionPopup, IModifyDivisionPopupResultEventDetail } from 'entities/Divisions/ui/ModifyDivisionPopup'
import { asyncDefineDivisionsLayer } from './DivisionsLayer'
import { asyncDefineDivisionDetaisLayer } from './DivisionDetailsLayer'
import { asyncDefinePoolDetailsLayer } from './PoolDetailLayer'
import { TIcebergPopup } from 'shared/ui/IcebergPopup'
import { TModifyPoolPopup, defineModifyPoolPopup } from 'entities/Pools/ui/ModifyPoolPopup'
import { IPoolItem } from 'entities/Pools/types'
import { EDivisionsPageLayers, IDivisionItem } from 'entities/Divisions/types'
import { defineAssignUsersPopup, TAssignUsersPopup, EAssignUsersPopupMods, IAssignUsersPopupResultEventDetail, IFilterButtonClickEvent } from 'entities/Users/ui/AssignUsersPopup'
import { defineEditPoolUserPopup, TEditPoolUserPopup, IEditUserPoolPopupResultEventDetail } from 'entities/Pools/ui/EditPoolUserPopup'
import { getBranchesNamesList } from 'entities/Branches/api/getBranchesNamesList'
import { getDivisionsNamesList } from 'entities/Divisions/api/getDivisionsNamesList'
import { getPoolsNamesList } from 'entities/Pools/api/getPoolsNamesList'
import { getAllDivisions } from 'entities/Divisions/api/getAllDivisions'
import { IChooseDivisionEvent, IModifyDivisionEvent } from 'entities/Divisions/ui/DivisionsTable'
import { IModifyPoolPopupResultEventDetail } from 'entities/Pools/ui/ModifyPoolPopup'
import { getUsersByPool } from 'entities/Users/api/getUsersByPool'
import { getDivisionDetails } from 'entities/Divisions/api/getDivisionDetails'
import { until } from 'lit/directives/until.js'
import { getPoolDetails } from 'entities/Pools/api/getPoolDetails'
import { IUserRowIconClickEvent } from 'entities/Users/ui/UsersAssignedIntoPoolTable'
import { IUserItem } from 'entities/Users/types'
import { ECRUDModes, IPopupResultEvent, IPopupResultEventDetail, MODE_PARAM_NAME } from 'shared/types'
import { getUsersByBranch } from 'entities/Users/api/getUsersByBranch'
import { defineUpdateDivisionManagersPopup, IUpdateManagersPopupResultEventDetail, TUpdateDivisionManagersPopup } from 'entities/Users/ui/UpdateDivisionManagersPopup'
import { getPossibleManagers } from 'entities/Users/api/getPossibleManagers'
import { IChoosePoolEvent, IModifyPoolEvent } from 'entities/Pools/ui/PoolsTable'

defineIcebergButton()

export class DivisionsPage extends LitElement {
    @state() currentLayer?: EDivisionsPageLayers
    @state() currentPopup?: EDivisionsPagePopups

    @state() divisions?: IDivisionItem[] | Promise<IDivisionItem[]| undefined>
    @state() divisionItem?: Promise<IDivisionItem | undefined> | IDivisionItem
    @state() poolItem?: Promise<IPoolItem | undefined> | IPoolItem

    @state() divisionId?: number
    @state() poolId?: number

    @state() isPopupVisible = false

    previousLayer?: EDivisionsPageLayers

    modifyDivisionPopup: Ref<TModifyDivisionPopup> = createRef()
    modifyPoolPopup: Ref<TModifyPoolPopup> = createRef()
    assignUsersPopup: Ref<TAssignUsersPopup> = createRef()
    editPoolUserPopup: Ref<TEditPoolUserPopup> = createRef()
    updateDivisionManagersPopup: Ref<TUpdateDivisionManagersPopup> = createRef()

    constructor() {
        super()

        const urlParams: IDivisionsPageURLParams = getURLParams()

        if (urlParams[MODE_PARAM_NAME]) {
            const modeFromURL =  urlParams[MODE_PARAM_NAME]
            switch (modeFromURL) {
                case EDivisionsPageLayers.divisionsLayer:
                    this.showDivisionsLayer()
                    break
                case EDivisionsPageLayers.divisionDetailsLayer:
                    if (urlParams[DIVISION_ID_PARAM_NAME]) {
                        this.currentLayer = modeFromURL
                        this.divisionId = Number(urlParams[DIVISION_ID_PARAM_NAME])
                        this.divisionItem = getDivisionDetails(this.divisionId).then(response => {
                            return response.IsSucceeded
                                ? response.Value
                                : undefined
                        })
                    } else {
                        this.showDivisionsLayer()
                    }
                    break
                case EDivisionsPageLayers.poolDetailsLayer:
                    if (Boolean(urlParams[DIVISION_ID_PARAM_NAME]) && Boolean(urlParams[POOL_ID_PARAM_NAME])) {
                        this.currentLayer = modeFromURL
                        this.divisionId = Number(urlParams[DIVISION_ID_PARAM_NAME])
                        this.poolId = Number(urlParams[POOL_ID_PARAM_NAME])
                        this.poolItem = getPoolDetails(this.poolId).then(response => {
                            return response.IsSucceeded
                                ? response.Value
                                : undefined
                        })
                    } else if (urlParams[DIVISION_ID_PARAM_NAME]) {
                        this.currentLayer = EDivisionsPageLayers.divisionDetailsLayer
                        this.divisionId = Number(urlParams[DIVISION_ID_PARAM_NAME])
                        this.divisionItem = getDivisionDetails(this.divisionId).then(response => {
                            return response.IsSucceeded
                                ? response.Value
                                : undefined
                        })
                    } else {
                        this.showDivisionsLayer()
                    }
                    break
                default:
                    this.currentLayer = EDivisionsPageLayers.divisionsLayer
            }
        } else {
            this.showDivisionsLayer()
        }

        window.addEventListener('popstate', this.popstateChangeHandler.bind(this))
    }

    static styles = css`
        ${styles}
    `

    render() {
        return html`
            ${this.layerTemplate()}
            ${this.modalTemplate()}  
        `
    }

    layerTemplate() {
        this.pushDivisionPageHistoryState()

        return html`
            ${
                choose(this.currentLayer, [
                    [EDivisionsPageLayers.divisionsLayer, ()=> {
                        return this.divisionsLayerTemplate()
                    }],
                    [EDivisionsPageLayers.divisionDetailsLayer, ()=> {
                        return this.divisionDetailsLayerTemplate()
                    }],
                    [EDivisionsPageLayers.poolDetailsLayer, ()=> {
                        return this.divisionPoolLayerTemplate()
                    }]
                ],
                () => html`<error-plug></error-plug>`)
            }
        `
    }

    divisionsLayerTemplate() {
        asyncDefineDivisionsLayer()

        return html`
            <divisions-layer
                .divisions=${this.divisions}
                @modifyDivision=${this.modifyDivisionHandler}
                @chooseDivision=${this.chooseDivisionHandler}
            ></divisions-layer>
        `
    }

    divisionDetailsLayerTemplate() {
        asyncDefineDivisionDetaisLayer()

        return html`
            ${until(this.divisionDetailsBreadcrumbsTemplate(), nothing)}

            <division-details-layer
                .divisionItem=${Promise.resolve(this.divisionItem)}
                @assignUsers=${this.assignUsersHandler}
                @updateManagers=${this.updateManagersHandler}
                @modifyPool=${this.modifyPoolHandler}
                @choosePool=${this.choosePoolHandler}
            ></division-details-layer>
        `
    }

    divisionPoolLayerTemplate() {
        asyncDefinePoolDetailsLayer()

        return html`
            ${until(this.poolDetailsBreadcrumbsTemplate(), nothing)}
            
            <pool-details-layer
                .poolItem=${this.poolItem}
                @userTableIconClick=${this.poolUserTableIconClickHandler}
                @assignUsersButtonClick=${this.assignUsersHandler}
                @editPoolButtonClick=${this.modifyPoolHandler}
            ></pool-details-layer>
        `
    }

    async divisionDetailsBreadcrumbsTemplate() {
        return Promise.resolve(this.divisionItem)
            .then(divisionItem => {
                return divisionItem
                    ? html`
                        <p class='breadCrumbs'>
                            <a href='#' @click=${this.goToDivisionsLayer.bind(this)}>Divisions</a>
                            >>
                            <span>
                                <span class='entityName'>${divisionItem.Name}</span> division details
                            </span>
                        </p>
                    `
                    : nothing
            })
    }

    async poolDetailsBreadcrumbsTemplate() {
        return Promise.resolve(this.poolItem)
            .then(poolItem => {
                return poolItem
                    ? html`
                        <p class='breadCrumbs'>
                            <a href='#' @click=${this.goToDivisionsLayer.bind(this)}>Divisions</a>
                            >>
                            <a href='#' @click=${this.goToDivisionDetailsLayer.bind(this)}>
                                <span class='entityName'>${poolItem.DivisionName}</span> division details
                            </a>
                            >>
                            <span>
                                <span class='entityName'>${poolItem.Name}</span> pool details
                            </span>
                        </p>
                    `
                    : nothing
            })
    }

    modalTemplate() {
        return html`
            ${choose(this.currentPopup, [
            [EDivisionsPagePopups.modifyDivision, ()=> {
                defineModifyDivisionsPopup()

                return html`
                        <modify-division-popup
                            ?visible=${this.isPopupVisible}
                            ${ref(this.modifyDivisionPopup)}
                        ></modify-division-popup>
                    `
            }],
            [EDivisionsPagePopups.modifyPool, ()=> {
                defineModifyPoolPopup()

                return html`
                        <modify-pool-popup
                            ?visible=${this.isPopupVisible}
                            ${ref(this.modifyPoolPopup)}
                        ></modify-pool-popup>
                    `
            }],
            [EDivisionsPagePopups.assignUsers, ()=> {
                defineAssignUsersPopup()

                return html`
                        <assign-users-popup
                            ?visible=${this.isPopupVisible}
                            ${ref(this.assignUsersPopup)}
                            @filterButtonClickEvent=${this.filterButtonClickEventHandler}
                        ></assign-users-popup>
                    `
            }],
            [EDivisionsPagePopups.editPoolUser, ()=> {
                defineEditPoolUserPopup()

                return html`
                        <edit-pool-user-popup
                            ?visible=${this.isPopupVisible}
                            ${ref(this.editPoolUserPopup)}
                        ></edit-pool-user-popup>
                    `
            }],
            [EDivisionsPagePopups.updateManagers, ()=> {
                defineUpdateDivisionManagersPopup()

                return html`
                        <update-division-managers-popup
                            ?visible=${this.isPopupVisible}
                            ${ref(this.updateDivisionManagersPopup)}
                        ></update-division-managers-popup>
                    `
            }]
        ],
        () => html``)}
        `
    }

    showDivisionsLayer() {
        this.currentLayer = EDivisionsPageLayers.divisionsLayer
        this.divisions = this.getDivisions()
    }

    updateManagersHandler() {
        this.updateManagers()
    }

    modifyDivisionHandler(e: IModifyDivisionEvent) {
        const {divisionItem, mode} = e.detail

        this.modifyDivision(mode, divisionItem)
    }

    chooseDivisionHandler(e: IChooseDivisionEvent) {
        this.chooseDivisionItem(e.detail.divisionItem)
    }

    choosePoolHandler(e: IChoosePoolEvent) {
        this.choosePoolItem(e.detail.poolItem)
    }

    modifyPoolHandler(e: IModifyPoolEvent) {
        const {poolItem, mode} = e.detail

        this.modifyPool(mode, poolItem)
    }

    assignUsersHandler(e: IAssignUsersButtonClickEvent) {
        this.assignUser(e.detail.mode)
    }

    filterButtonClickEventHandler(e: IFilterButtonClickEvent) {
        const {mode} = e.detail
        const popup = this.assignUsersPopup.value
        if (popup) {
            popup.filteredUsers = this.getFilteredUsers(mode, popup)
        }
    }

    poolUserTableIconClickHandler(e: IUserRowIconClickEvent) {
        const {mode, userItem} = e.detail

        this.updatePoolUser(mode, userItem)
    }

    async updateManagers() {
        this.currentPopup = EDivisionsPagePopups.updateManagers
        await this.updateComplete

        const popup = this.updateDivisionManagersPopup.value
        if (popup && this.divisionId) {
            popup.divisionId = this.divisionId
            popup.possibleDivisionManagers = this.getPossibleManagers(this.divisionId)

            const popupResponse: IUpdateManagersPopupResultEventDetail = await this.getPopupResponse(popup)

            if (popupResponse.IsSucceeded) {
                await Promise.resolve(this.divisionItem)
                    .then(divisionItem => {
                        if (popupResponse.Managers && divisionItem) {
                            this.divisionItem = {
                                ...divisionItem,
                                Managers: [...popupResponse.Managers]
                            }
                        }
                    })
            }
        }
    }

    async modifyDivision(mode: ECRUDModes, divisionItem: IDivisionItem) {
        this.currentPopup = EDivisionsPagePopups.modifyDivision
        await this.updateComplete

        const popup = this.modifyDivisionPopup.value
        if (popup) {
            popup.mode = mode
            popup.divisionItem = divisionItem

            const popupResponse: IModifyDivisionPopupResultEventDetail = await this.getPopupResponse(popup)

            if (popupResponse.IsSucceeded) {
                await Promise.resolve(this.divisions)
                    .then(divisions => {
                        if (divisions) {
                            const modifiedItem = Object.assign(divisionItem, popupResponse.DivisionItem)

                            const updateDivisions = (modifiedItemId: number) => {
                                const editedDivisionIndex = divisions.findIndex(entity => entity.Id === modifiedItemId)
                                divisions[editedDivisionIndex] = modifiedItem
                                this.divisions = [...divisions]
                            }

                            switch (mode) {
                                case ECRUDModes.CREATE:
                                    this.divisions = [...divisions, modifiedItem]
                                    break
                                case ECRUDModes.UPDATE:
                                    updateDivisions(modifiedItem.Id)
                                    break
                                case ECRUDModes.DELETE:
                                    this.divisions = divisions.filter(division => division.Id !== modifiedItem.Id)
                                    break
                            }
                        }
                    })
            }
        }
    }

    async modifyPool(mode: ECRUDModes, poolItem: IPoolItem) {
        this.currentPopup = EDivisionsPagePopups.modifyPool
        await this.updateComplete

        const popup = this.modifyPoolPopup.value
        if (popup && poolItem.DivisionId) {
            popup.mode = mode
            popup.poolItem = poolItem
            popup.currentManagerId = poolItem.ManagerId
            if (mode !== ECRUDModes.DELETE) popup.possibleManagers = this.getPossibleManagers(poolItem.DivisionId)

            const popupResponse: IModifyPoolPopupResultEventDetail = await this.getPopupResponse(popup)

            if (popupResponse.IsSucceeded) {
                if (this.divisionItem) {
                    await Promise.resolve(this.divisionItem)
                        .then(divisionItem => {
                            const modifiedItem = Object.assign(poolItem, popupResponse.PoolItem)

                            if (divisionItem && divisionItem.Pools) {
                                switch (mode) {
                                    case ECRUDModes.CREATE:
                                        this.divisionItem = {
                                            ...divisionItem,
                                            Pools: [
                                                ...divisionItem.Pools,
                                                modifiedItem
                                            ]
                                        }
                                        break
                                    case ECRUDModes.UPDATE:
                                        divisionItem.Pools[
                                            divisionItem.Pools.findIndex(pool => pool.Id === modifiedItem.Id)
                                        ] = modifiedItem
                                        this.divisionItem = {...divisionItem}
                                        this.poolItem = {...modifiedItem}
                                        break
                                    case ECRUDModes.DELETE:
                                        this.divisionItem = {
                                            ...divisionItem,
                                            Pools: divisionItem.Pools.filter(pool => pool.Id !== modifiedItem.Id)
                                        }
                                        break
                                }
                            }
                        })
                } else if (this.poolItem) {
                    const modifiedItem = Object.assign(poolItem, popupResponse.PoolItem)
                    switch (mode) {
                        case ECRUDModes.UPDATE:
                            this.poolItem = {...modifiedItem}
                            break
                    }
                }
            }
        }
    }

    async assignUser(mode: EAssignUsersPopupMods) {
        this.currentPopup = EDivisionsPagePopups.assignUsers
        await this.updateComplete

        const popup = this.assignUsersPopup.value
        if (popup && this.divisionId) {
            popup.mode = mode

            switch (mode) {
                case EAssignUsersPopupMods.assignIntoDivision:
                    popup.currentId = this.divisionId
                    popup.selectableBranches = this.getBranchesNamesList()
                    popup.selectableDivisions = this.getDivisionsNamesList()
                    break
                case EAssignUsersPopupMods.assignIntoPool:
                    if (this.poolId) popup.currentId = this.poolId
                    popup.selectablePools = this.getPoolsNamesList(this.divisionId)
                    break
            }

            popup.filteredUsers = this.getFilteredUsers(mode, popup)

            const popupResponse: IAssignUsersPopupResultEventDetail = await this.getPopupResponse(popup)

            if (popupResponse.IsSucceeded) {
                switch (mode) {
                    case EAssignUsersPopupMods.assignIntoDivision:
                        await Promise.resolve(this.divisionItem)
                            .then(divisionItem => {
                                if (divisionItem && popupResponse.Users) {
                                    this.divisionItem = {
                                        ...divisionItem,
                                        Users: [...popupResponse.Users]
                                    }
                                }
                            })
                        break
                    case EAssignUsersPopupMods.assignIntoPool:
                        await Promise.resolve(this.poolItem)
                            .then(poolItem => {
                                if (poolItem && popupResponse.Users) {
                                    this.poolItem = {
                                        ...poolItem,
                                        Users: [...popupResponse.Users]
                                    }
                                }
                            })
                        break
                }

            }
        }
    }

    async updatePoolUser(mode: ECRUDModes, userItem: IUserItem) {
        this.currentPopup = EDivisionsPagePopups.editPoolUser
        await this.updateComplete

        const popup = this.editPoolUserPopup.value
        if (popup) {
            popup.userItem = userItem

            const popupResponse: IEditUserPoolPopupResultEventDetail = await this.getPopupResponse(popup)

            if (popupResponse.IsSucceeded) {
                await Promise.resolve(this.poolItem)
                    .then(poolItem => {
                        if (poolItem && poolItem.Users) {
                            const modifiedItem = Object.assign(userItem, popupResponse.UserItem)

                            switch (mode) {
                                case ECRUDModes.UPDATE:
                                    poolItem.Users[
                                        poolItem.Users.findIndex(user => user.Id === modifiedItem.Id)
                                    ] = modifiedItem
                                    this.poolItem = {...poolItem}
                                    break
                            }
                        }
                    })
            }
        }
    }

    async getDivisions() {
        return getAllDivisions().then(response => {
            if (response.IsSucceeded && response.Value) {
                return response.Value
            } else {
                this.currentLayer = undefined
                return undefined
            }
        })
    }

    async getDivisionsNamesList() {
        return getDivisionsNamesList().then(response => {
            if (response.IsSucceeded && response.Value) {
                return response.Value
            } else {
                return undefined
            }
        })
    }

    async getBranchesNamesList() {
        return getBranchesNamesList().then(response => {
            if (response.IsSucceeded && response.Value) {
                return response.Value
            } else {
                return undefined
            }
        })
    }

    async getPoolsNamesList(divisionId: number) {
        return getPoolsNamesList(divisionId).then(response => {
            if (response.IsSucceeded && response.Value) {
                return response.Value
            } else {
                return undefined
            }
        })
    }

    async getPossibleManagers(divisionId: number) {
        return getPossibleManagers(divisionId).then(response => {
            if (response.IsSucceeded && response.Value) {
                return response.Value
            } else {
                return undefined
            }
        })
    }

    async getFilteredUsers(mode: EAssignUsersPopupMods, popup: TAssignUsersPopup) {
        let assignedUsers: IUserItem[] | undefined

        if (popup && this.divisionId) {
            switch (mode) {
                case EAssignUsersPopupMods.assignIntoDivision:
                    assignedUsers = await this.getUsersByBranch(
                        popup.selectedBranchOption,
                        popup.selectedDivisionOption,
                        this.divisionId
                    )
                    break
                case EAssignUsersPopupMods.assignIntoPool:
                    if (this.poolId) {
                        assignedUsers = await this.getUsersByPool(
                            popup.selectedPoolOption,
                            this.divisionId,
                            this.poolId
                        )
                    }
                    break
            }
        }

        return assignedUsers
            ? assignedUsers.map(user => {
                return {
                    ...user,
                    Checked: false,
                    AssignedStartDate: ''
                }
            })
            : undefined
    }

    async getUsersByBranch(
        branchId: number,
        divisionId: number,
        curretDivisionId: number
    ) {
        return getUsersByBranch(branchId, divisionId, curretDivisionId).then(response => {
            if (response.IsSucceeded && response.Value) {
                return response.Value
            } else {
                return undefined
            }
        })
    }

    async getUsersByPool(
        pooId: number,
        divisionId: number,
        curretPoolId: number
    ) {
        return getUsersByPool(pooId, divisionId, curretPoolId).then(response => {
            if (response.IsSucceeded && response.Value) {
                return response.Value
            } else {
                return undefined
            }
        })
    }

    async getPopupResponse(popup: TIcebergPopup): Promise<IPopupResultEventDetail> {
        return await new Promise((response) => {
            this.isPopupVisible = true

            const onResultHandler = (e: IPopupResultEvent) => {
                const result: IPopupResultEventDetail = e.detail

                response(result)
                this.isPopupVisible = false
                this.currentPopup = undefined
                popup.removeEventListener(popup.RESULT_EVENT_NAME, onResultHandler as EventListener)
            }

            popup.addEventListener(popup.RESULT_EVENT_NAME, onResultHandler as EventListener)
        })
    }

    async chooseDivisionItem(divisionItem: IDivisionItem) {
        this.divisionItem = divisionItem
        this.divisionId = divisionItem.Id
        this.currentLayer = EDivisionsPageLayers.divisionDetailsLayer
    }

    choosePoolItem(poolItem: IPoolItem) {
        this.poolItem = getPoolDetails(poolItem.Id).then(response => {
            return response.IsSucceeded
                ? response.Value
                : undefined
        })
        this.poolId = poolItem.Id
        this.currentLayer = EDivisionsPageLayers.poolDetailsLayer
    }

    pushDivisionPageHistoryState() {
        if (this.currentLayer && this.currentLayer !== this.previousLayer) {
            this.previousLayer = this.currentLayer

            pushDivisionPageHistoryState({
                layer: this.currentLayer,
                divisionId: this.divisionId,
                poolId: this.poolId
            })
        }
    }

    popstateChangeHandler = (e: IDivisionPagePopstateChangeEvent): void => {
        this.currentLayer = e.state.layer
        this.divisionId = e.state.divisionId
        this.poolId = e.state.poolId
    }

    goToDivisionsLayer = (e: MouseEvent) =>  {
        e.preventDefault()
        this.showDivisionsLayer()
    }

    goToDivisionDetailsLayer = (e: MouseEvent) => {
        if (this.divisionId) {
            e.preventDefault()
            this.currentLayer = EDivisionsPageLayers.divisionDetailsLayer
            this.divisionItem = getDivisionDetails(this.divisionId).then(response => {
                return response.IsSucceeded
                    ? response.Value
                    : undefined
            })
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'divisions-page': DivisionsPage;
    }
}
