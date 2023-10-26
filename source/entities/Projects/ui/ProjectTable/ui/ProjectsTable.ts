import { IProjectItem } from 'entities/Projects/types'
import { property } from 'lit/decorators.js'
import { convertProjectItemToRowItem } from '../helpers/convertProjectItemToRowItem'
import { IcebergTable, ECellClasses, EIcebergTableSortingModes, IHeaderCell } from 'shared/ui/IcebergTable'
import { TConvertEntityFunction } from 'shared/ui/IcebergTable/types'

export class ProjectsTable extends IcebergTable {
    @property({type: Object, reflect: false, attribute: false}) displayedEntities?: IProjectItem[] | Promise<IProjectItem[] | undefined>

    convertEntityFunction: TConvertEntityFunction<ProjectsTable, IProjectItem> = convertProjectItemToRowItem

    headerCells: IHeaderCell[] = [
        {
            content: 'Project name',
            sortMode: EIcebergTableSortingModes.AS_STRING

        },
        {
            content: 'Customer',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Status',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Start date',
            sortMode: EIcebergTableSortingModes.AS_DATES
        },
        {
            content: 'End date',
            sortMode: EIcebergTableSortingModes.AS_DATES
        },
        {
            content: 'Account',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Supervisor',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: 'Project manager',
            sortMode: EIcebergTableSortingModes.AS_STRING
        },
        {
            content: '',
            classes: [ECellClasses.SM]
        },
        {
            content: '',
            classes: [ECellClasses.SM]
        }
    ]
}

declare global {
    interface HTMLElementTagNameMap {
        'projects-table': ProjectsTable;
    }
}
