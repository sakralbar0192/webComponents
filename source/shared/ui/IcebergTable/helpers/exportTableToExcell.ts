import { TIcebergTable } from 'shared/ui/IcebergTable'
// import {utils as XLSXUtils, writeFile} from 'xlsx-js-style'

export default async function exportToExcel() {
    
//     icebergTable: TIcebergTable,
//     onlyDisplayed = true,
//     reportName = 'Table',
//     headerRowsCount = 1
// ) {
//     const table = icebergTable.tableRef.value

//     // const ws = XLSXUtils.table_to_sheet(table, {
//         display: onlyDisplayed,
//         raw: true
//     })

//     const wsrows = []

//     const wscols = [
//         ...icebergTable.headerCells.map(cell => {
//             return {wpx: cell.wpx}
//         })
//     ]

//     const rowsCount = await Promise.resolve(icebergTable.displayedEntities)
//         .then(displayEntities => displayEntities ? displayEntities.length : null)

//     if (rowsCount) {
//         for (let i = 0; i < headerRowsCount; i++) {
//             wsrows.push({hpx: 15},)
//         }

//         for (let i = 0; i < rowsCount; i++) {
//             wsrows.push({hpx: 15},)
//         }

//         for (const key in ws) {
//             if (ws[key]['z']) {
//                 ws[key]['s'] = JSON.parse(ws[key]['z'])
//                 delete ws[key]['z']
//             }
//             if (!ws[key]['v']) {
//                 if (ws[key] instanceof Object) ws[key]['t'] = 's'
//             }
//         }

//         ws['!cols'] = wscols
//         ws['!rows'] = wsrows
//         const wb = XLSXUtils.book_new()
//         XLSXUtils.book_append_sheet(wb, ws, 'Export')
//         const now = new Date()

//         writeFile(wb, `${reportName}${now.toLocaleDateString('de-DE', {year: '2-digit', month: '2-digit', day: '2-digit'})}.xlsx`)
//     }
}
