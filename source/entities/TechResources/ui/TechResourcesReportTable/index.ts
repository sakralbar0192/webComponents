import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { TechResourcesReportTable } from './ui/TechResourcesReportTable'

export async function defineTechResourcesReportTable() {
    defineCustomElement(ECustomElements.techResourcesReportTable, TechResourcesReportTable)
}
