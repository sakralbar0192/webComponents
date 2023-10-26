import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IProjectRowDeleteIconClickEvent } from './types'
import { ProjectsTable } from './ui/ProjectsTable'

export function defineProjectsTable() {
    defineCustomElement(ECustomElements.projectsTable, ProjectsTable)
}

export type TProjectsTable= ProjectsTable;

export { ProjectsTable, IProjectRowDeleteIconClickEvent }
