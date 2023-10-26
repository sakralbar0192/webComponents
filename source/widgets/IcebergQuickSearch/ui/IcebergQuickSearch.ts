import { IIcebergSearchFieldSearchEvent, TIcebergSearchField, defineIcebergSearchField } from 'widgets/IcebergSearchField'
import styles from './styles.lit.scss'
import { LitElement, TemplateResult, css, html, nothing } from 'lit'
import { state } from 'lit/decorators.js'
import { ESearchModes, ISearchResult, searchEntities } from 'shared/api/searchEntities'
import { defineIcebergLoader } from 'shared/ui/loaders/IcebergLoader'
import { EQuickSearchListFillers, IQuickSearchDropdownItem } from '../types'
import { classMap } from 'lit/directives/class-map.js'
import { getSearchPageUrl } from '../helpers/getSearchPageUrl'
import { Ref, createRef, ref } from 'lit/directives/ref.js'
import { userIcon } from 'shared/assets/icons/userIcon'
import { projectIcon } from 'shared/assets/icons/projectIcon'
import { divisionIcon } from 'shared/assets/icons/divisionIcon'
import { accountIcon } from 'shared/assets/icons/accountIcon'
import { IEntityItem, IResponse, ISizes } from 'shared/types'
import { REQUEST_FAILED_MESSAGE } from 'shared/messages'

defineIcebergSearchField()
defineIcebergLoader()

export class IcebergQuickSearch extends LitElement {
    @state() isSearchFieldActive: boolean
    @state() searchResult?: IResponse<ISearchResult>
    @state() loading: boolean
    @state() activeDropdownItem?: IQuickSearchDropdownItem
    @state() dropdownScroll: boolean
    @state() dropdownScrollTop: boolean
    @state() dropdownScrollBottom: boolean
    @state() searchText = ''

    @state() minimumNumberLinks: number
    dropdownItems: IQuickSearchDropdownItem[] = []

    TIME_FOR_SEARCH = 400
    INACTIVE_SEARCH_FIELD_PLACEHOLDER = 'Enter a search term'
    ACTIVE_SEARCH_FIELD_PLACEHOLDER = 'Use "!" in the beginning to search inactive entities'
    LINK_HEIGHT = 24
    TITLE_HEIGHT = 18
    MAX_SHOW_LIMIT = 6
    MIN_SHOW_LIMIT = 3
    NUMBER_OF_BLOCK = 4
    NO_RESULTS_MESSAGE = 'No results'

    ICON_SIZES: ISizes = {width: 16, height: 16}

    timerId: NodeJS.Timeout
    resizeTimer: NodeJS.Timeout

    inputFieldRef: Ref<TIcebergSearchField> = createRef()
    searchResultListRef: Ref<HTMLDivElement> = createRef()

    static styles = css`
        ${styles}
    `

    render() {
        const classes = {
            dropdown: true,
            scroll: this.dropdownScroll,
            scrollTop: this.dropdownScrollTop,
            scrollBottom: this.dropdownScrollBottom
        }
        return html`
            <div class='quickSearch'>
                <iceberg-search-field
                    ${ref(this.inputFieldRef)}
                    .activePlaceholder=${this.ACTIVE_SEARCH_FIELD_PLACEHOLDER}
                    .inactivePlaceholder=${this.INACTIVE_SEARCH_FIELD_PLACEHOLDER}
                    .value=${this.searchText}
                    @needSearch=${this.needSearchHandler}
                    @inputFocus=${this.enableQuickSearch}
                ></iceberg-search-field>
                ${
                    this.isSearchFieldActive
                        ? html`
                            <div
                                class='overlay'
                                @click=${this.disableQuickSearch}
                            ></div>

                            <div class='dropdown ${classMap(classes)}'>
                                ${
                                    this.searchResult
                                        ? html`
                                            ${this.resultListTemplate()}
                                        `
                                        : this.loading
                                            ? html`
                                                <div class='loader'>
                                                    <iceberg-loader></iceberg-loader>
                                                </div>
                                            `
                                            : nothing
                                }

                            </div>
                        `
                        : nothing
                }
            </div>
        `
    }

    resultListTemplate() {
        const classes = {
            scroll: this.dropdownScroll
        }

        this.dropdownItems = []

        return this.searchResult && this.searchResult.IsSucceeded && this.searchResult.Value
            ? html`
                <ul
                    ${ref(this.searchResultListRef)}
                    class='resultList ${classMap(classes)}'
                >
                    ${
                        this.resultItemListTemplate(
                            EQuickSearchListFillers.USERS.title,
                            EQuickSearchListFillers.USERS.linkHref,
                            this.searchResult.Value.USERS,
                            ESearchModes.USERS,
                            userIcon(this.ICON_SIZES)
                        )
                    }
                    ${
                        this.resultItemListTemplate(
                            EQuickSearchListFillers.PROJECTS.title,
                            EQuickSearchListFillers.PROJECTS.linkHref,
                            this.searchResult.Value.PROJECTS,
                            ESearchModes.PROJECTS,
                            projectIcon(this.ICON_SIZES)
                        )
                    }
                    ${
                        this.resultItemListTemplate(
                            EQuickSearchListFillers.DIVISIONS.title,
                            EQuickSearchListFillers.DIVISIONS.linkHref,
                            this.searchResult.Value.DIVISIONS,
                            ESearchModes.DIVISIONS,
                            divisionIcon(this.ICON_SIZES)
                        )
                    }
                    ${
                        this.resultItemListTemplate(
                            EQuickSearchListFillers.ACCOUNTS.title,
                            EQuickSearchListFillers.ACCOUNTS.linkHref,
                            this.searchResult.Value.ACCOUNTS,
                            ESearchModes.ACCOUNTS,
                            accountIcon(this.ICON_SIZES)
                        )
                    }
                </ul>
            `
            : html`${
                this.searchResult && this.searchResult.Message
                    ? this.searchResult.Message
                    : REQUEST_FAILED_MESSAGE
            }`
    }

    resultItemListTemplate(
        title: string,
        linkHref: string,
        items: IEntityItem[] | undefined,
        targetId: ESearchModes,
        icon: TemplateResult
    ) {
        return html`
            ${
                items
                    ? html`
                        <li>
                            <h4>${title}</h4>
                            <ul>
                                ${
                                    items.length
                                        ? items.slice(0, this.minimumNumberLinks).map(item => this.listItemTemplate(item, linkHref + item.Id, icon, false))
                                        : html`<li class='emptyItem'>${this.NO_RESULTS_MESSAGE}</li>`
                                }
                                ${this.showMoreLinkTemplate(items, targetId)}
                            </ul>
                        </li>
                    `
                    : nothing
            }
               
        `
    }

    showMoreLinkTemplate(items: IEntityItem[], targetId: ESearchModes) {
        return html`
            ${
                items.length > this.minimumNumberLinks
                    ? this.listItemTemplate(
                        {
                            Id: targetId * Math.PI,
                            Name: `View all ${items.length} results`
                        },
                        getSearchPageUrl(this.searchText, targetId),
                        undefined,
                        true
                    )
                    : nothing
                }
        `
    }

    listItemTemplate(
        item: IEntityItem,
        linkHref: string,
        icon: TemplateResult| undefined,
        isItShowMoreLink = false
    ) {
        const classes = {
            showMoreLink: isItShowMoreLink,
            activeLink: this.activeDropdownItem ?
                item.Id === this.activeDropdownItem.item.Id
                : false,
            inactiveItemLink: !item.IsActive
        }

        this.dropdownItems.push({item, linkHref})

        return html`
            <li>
                <a
                    href=${linkHref}
                    class='itemLink ${classMap(classes)}'
                    @mouseover=${
                        () => {
                            if (!this.activeDropdownItem || item.Id !== this.activeDropdownItem.item.Id) {
                                this.activeDropdownItem = {item, linkHref}
                            }
                        }
                    }
                >
                    ${icon}
                    ${item.Name}
                </a>
            </li>
        `
    }

    determineMinimumNumberLinks() {
        const viewHeight = document.documentElement.clientHeight
        let minimumNumberLinks = Math.trunc((viewHeight * 0.80 - this.TITLE_HEIGHT * this.NUMBER_OF_BLOCK - this.LINK_HEIGHT * this.NUMBER_OF_BLOCK)/(this.LINK_HEIGHT * this.NUMBER_OF_BLOCK))

        if (minimumNumberLinks < this.MIN_SHOW_LIMIT) {
            minimumNumberLinks = this.MAX_SHOW_LIMIT
            this.dropdownScroll = true
        } else {
            this.dropdownScroll = false
        }

        if (minimumNumberLinks > this.MAX_SHOW_LIMIT) minimumNumberLinks = this.MAX_SHOW_LIMIT

        return minimumNumberLinks
    }

    needSearchHandler(e: IIcebergSearchFieldSearchEvent) {
        if (this.timerId) {
            clearTimeout(this.timerId)
        }
        this.searchText = e.detail.searchText.replace(/"/g, '')
        const searchBy = ESearchModes.ALL
        this.activeDropdownItem = undefined
        this.minimumNumberLinks = this.determineMinimumNumberLinks()
        this.dropdownScrollTop = false
        this.dropdownScrollBottom = false

        let isActiveOnly = true, searchText = this.searchText
        if (searchText[0] === '!') {
            searchText = searchText.substring(1)
            isActiveOnly = false
        }

        if (this.searchText.length < 2) return

        this.timerId = setTimeout(async () => {
            window.removeEventListener('resize', this.setRerenderTimerHandler)

            this.dropdownItems = []
            this.loading = true
            this.searchResult = undefined

            await this.updateComplete

            this.searchResult = await searchEntities(searchText, searchBy, isActiveOnly)

            await this.updateComplete
            this.checkScrollingPossibility()
            const searchResultLists = this.searchResultListRef.value
            if (searchResultLists) {
                searchResultLists.addEventListener('scroll', this.scrollHandler)
                window.addEventListener('resize', this.setRerenderTimerHandler)
            }
        }, this.TIME_FOR_SEARCH)
    }

    disableQuickSearch() {
        this.isSearchFieldActive = false
        this.searchResult = undefined
        this.loading = false
        if (this.inputFieldRef.value) this.inputFieldRef.value.blur()
        this.dropdownScrollTop = false
        this.dropdownScrollBottom = false
        this.searchText = ''
        if (this.timerId) clearTimeout(this.timerId)

        document.removeEventListener('keydown', this.checkKeyHandler)
        window.removeEventListener('resize', this.setRerenderTimerHandler)
    }

    enableQuickSearch() {
        this.isSearchFieldActive = true
        document.addEventListener('keydown', this.checkKeyHandler)
    }

    checkKey(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            this.disableQuickSearch()
        } else if (e.key === 'Enter') {
            e.preventDefault()
            if (this.searchText && !this.activeDropdownItem) {
                window.location.href = getSearchPageUrl(this.searchText)
            }
            if (this.activeDropdownItem) {
                window.location.href = this.activeDropdownItem.linkHref
            }
        } else if (
            e.key === 'ArrowUp' && this.dropdownItems.length ||
            e.key === 'ArrowDown' && this.dropdownItems.length
        ) {
            e.preventDefault()
            const activeLinkIndex = this.activeDropdownItem
                ? this.getItemIndex(this.activeDropdownItem)
                : e.key === 'ArrowUp'
                    ? 0
                    : -1
            const newActiveLinkIndex = e.key === 'ArrowUp'
                ? activeLinkIndex - 1
                : activeLinkIndex + 1

            this.activeDropdownItem = newActiveLinkIndex < 0
                ? this.dropdownItems.at(newActiveLinkIndex)
                : newActiveLinkIndex >= this.dropdownItems.length
                    ? this.dropdownItems[newActiveLinkIndex - this.dropdownItems.length]
                    : this.dropdownItems[newActiveLinkIndex]

            const searchResultListsWrapper = this.searchResultListRef.value
            if (searchResultListsWrapper && this.activeDropdownItem) {
                const activeLink = searchResultListsWrapper.querySelector(`a[href='${this.activeDropdownItem.linkHref}']`)
                if (activeLink) {
                    e.key === 'ArrowUp'
                        ? this.checkOffsetBottom(activeLink, searchResultListsWrapper)
                        : this.checkOffsetTop(activeLink, searchResultListsWrapper)
                    this.checkScrollingPossibility()
                }
            }
        }
    }

    getItemIndex(item: IQuickSearchDropdownItem) {
        return this.dropdownItems.findIndex(dropdownItem => dropdownItem.item.Id === item.item.Id)
    }

    checkOffsetTop(activeLink: Element, searchResultListsWrapper: HTMLDivElement) {
        const linkParentNode = activeLink.parentNode
        if (activeLink instanceof HTMLElement && linkParentNode instanceof HTMLElement) {
            if (
                linkParentNode.offsetTop + this.LINK_HEIGHT >
                searchResultListsWrapper.scrollTop + searchResultListsWrapper.offsetHeight
            ) {
                searchResultListsWrapper.scrollTop = linkParentNode.offsetTop + activeLink.offsetHeight - searchResultListsWrapper.offsetHeight
            } else if (
                linkParentNode.offsetTop + this.LINK_HEIGHT <
                searchResultListsWrapper.scrollTop
            ) {
                searchResultListsWrapper.scrollTop = 0
            }
        }
    }

    checkOffsetBottom(activeLink: Element, searchResultListsWrapper: HTMLDivElement) {
        const linkParentNode = activeLink.parentNode
        if (activeLink instanceof HTMLElement && linkParentNode instanceof HTMLElement) {
            if (
                linkParentNode.offsetTop <
                searchResultListsWrapper.scrollTop
            ) {
                searchResultListsWrapper.scrollTop  = linkParentNode.offsetTop
            } else if (
                linkParentNode.offsetTop + this.LINK_HEIGHT >
                searchResultListsWrapper.scrollTop + searchResultListsWrapper.offsetHeight
            ) {
                searchResultListsWrapper.scrollTop = linkParentNode.offsetTop - searchResultListsWrapper.offsetHeight + this.LINK_HEIGHT
            }
        }
    }

    checkScrollingPossibility() {
        const searchResultListsWrapper = this.searchResultListRef.value

        if (
            searchResultListsWrapper &&
            searchResultListsWrapper.offsetHeight < searchResultListsWrapper.scrollHeight
        ) {
            this.dropdownScroll = true

            if (
                searchResultListsWrapper.scrollTop > this.LINK_HEIGHT &&
                searchResultListsWrapper.scrollHeight - searchResultListsWrapper.offsetHeight >
                searchResultListsWrapper.scrollTop + this.LINK_HEIGHT
            ) {
                this.dropdownScrollTop = true
                this.dropdownScrollBottom = true
            } else if (searchResultListsWrapper.scrollTop > this.LINK_HEIGHT) {
                this.dropdownScrollTop = true
                this.dropdownScrollBottom = false
            } else if (
                searchResultListsWrapper.scrollHeight - searchResultListsWrapper.offsetHeight >
                searchResultListsWrapper.scrollTop + this.LINK_HEIGHT
            ) {
                this.dropdownScrollTop = false
                this.dropdownScrollBottom = true
            } else {
                this.dropdownScrollTop = false
                this.dropdownScrollBottom = false
            }
        } else {
            this.dropdownScroll = false
        }
    }

    setRerenderTimer() {
        if ( this.resizeTimer ) {
            clearTimeout(this.resizeTimer)
        }
        this.resizeTimer = setTimeout(() => {
            this.minimumNumberLinks = this.determineMinimumNumberLinks()
        }, 200)
    }

    checkKeyHandler = this.checkKey.bind(this)
    scrollHandler = this.checkScrollingPossibility.bind(this)
    setRerenderTimerHandler = this.setRerenderTimer.bind(this)
}

declare global {
    interface HTMLElementTagNameMap {
        'iceberg-quick-search': IcebergQuickSearch;
    }
}
