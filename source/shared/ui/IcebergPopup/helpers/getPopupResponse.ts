import { IPopupResultEvent, IPopupResultEventDetail } from 'shared/types'
import { TIcebergPopup } from '..'

export async function getPopupResponse(popup: TIcebergPopup): Promise<IPopupResultEventDetail> {
    return await new Promise((response) => {
        const onResultHandler = (e: IPopupResultEvent) => {
            const result: IPopupResultEventDetail = e.detail

            response(result)

            popup.removeEventListener(popup.RESULT_EVENT_NAME, onResultHandler as EventListener)
        }

        popup.addEventListener(popup.RESULT_EVENT_NAME, onResultHandler as EventListener)
    })
}
