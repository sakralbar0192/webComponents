import { ASMX_DEFINITION_STRING, ASPX_DEFINITION_STRING } from 'shared/consts'
// import { checkLoginPage } from './checkLoginPage'

const SESSION_STORAGE_RETURN_URL_ITEM_NAME = 'ReturnUrl'
const RETURN_URL_PROPERTY_KEY = 'ReturnUrl'

export function saveReturnUrl() {
    const isLoginPage = false

    if (!isLoginPage) {
        window.sessionStorage.setItem(SESSION_STORAGE_RETURN_URL_ITEM_NAME, document.location.pathname)
    } else {
        const result = Object.fromEntries(new URLSearchParams(window.location.search).entries())

        if (
            result[RETURN_URL_PROPERTY_KEY] !=null &&
            Boolean(
                result[RETURN_URL_PROPERTY_KEY].includes(ASPX_DEFINITION_STRING) ||
                result[RETURN_URL_PROPERTY_KEY].includes(ASMX_DEFINITION_STRING)
            )
        ) {
            window.sessionStorage.setItem(SESSION_STORAGE_RETURN_URL_ITEM_NAME, result[RETURN_URL_PROPERTY_KEY])
        }
    }
}
