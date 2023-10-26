export function formatDateToString(date: Date) {
    return  date.toLocaleString('ru', { month: '2-digit', year: 'numeric', day: '2-digit'})
}
