export enum ELegendClasses {
    INACTIVE_USER = 'inactiveUser',
    ACTIVE_USER = 'activeUser'
}

export interface ILegendItem {
    title: string
    class: ELegendClasses
}
