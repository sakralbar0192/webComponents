import { ITechResourceItem } from 'entities/TechResources/types'
import { FIRST_ARRAY_INDEX } from 'shared/consts'
import { ICell, IRowItem } from 'shared/ui/IcebergTable'
import { convertTechResourceItemToRowItemWithoutPhisicalIdColumn } from './convertTechResourceItemToRowItemWithoutPhisicalIdColumn'

export function convertTechResourceItemToRowItemWithPhisicalIdColumn(techResourceItem: ITechResourceItem): IRowItem  {
    const PHISICAL_ID_COLUMN_INDEX = 2
    const techResourceRowItem: IRowItem = convertTechResourceItemToRowItemWithoutPhisicalIdColumn(techResourceItem)

    const phisicalIdCell: ICell = {
        content: techResourceItem.Physical
    }

    techResourceRowItem.row = [
        ...techResourceRowItem.row.slice(FIRST_ARRAY_INDEX, PHISICAL_ID_COLUMN_INDEX),
        {
            ...phisicalIdCell
        },
        ...techResourceRowItem.row.slice(PHISICAL_ID_COLUMN_INDEX),
    ]

    return techResourceRowItem
}
