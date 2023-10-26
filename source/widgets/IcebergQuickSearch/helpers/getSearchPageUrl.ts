import { ESearchModes } from 'shared/api/searchEntities'
import { replaceSpecialCharactersForUrl } from 'shared/helpers/replaceSpecialCharactersForUrl'

export function getSearchPageUrl(searchText: string, targetId?: ESearchModes) {
    return `Search.aspx?text=${replaceSpecialCharactersForUrl(searchText)}${targetId ? `&quick-search_target_id=${targetId}` : ''}`
}
