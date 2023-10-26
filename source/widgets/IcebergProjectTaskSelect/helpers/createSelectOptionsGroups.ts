import { IProjectTaskInfo } from 'entities/Projects/types'
import { ISelectOption } from 'shared/ui/IcebergSelect'

export function createSelectOptionsGroups(projectsTasksInfo: IProjectTaskInfo[]): ISelectOption[] {
    const projectsTasksInfoOptionsGroups: ISelectOption[] = projectsTasksInfo.map((projectTasksInfo, index) => {
        if ( projectTasksInfo.ProjectTasks.length <= 1) {
            return {
                id: `${projectTasksInfo.ProjectId},${projectTasksInfo.RoleId}`,
                value: `${projectTasksInfo.ProjectName}, role: ${projectTasksInfo.RoleName}`
            }
        } else {
            const tasksOptions = projectTasksInfo.ProjectTasks.map(projectTask => {
                return {
                    id: `${projectTasksInfo.ProjectId},${projectTasksInfo.RoleId},${projectTask.Id}`,
                    value: `Task: ${projectTask.Name}`
                }
            })
            return {
                value: `${projectTasksInfo.ProjectName}, role: ${projectTasksInfo.RoleName}`,
                id: index,
                options: tasksOptions
            }
        }
    })

    return projectsTasksInfoOptionsGroups.sort((a, b) => {
        return b.value.localeCompare(a.value)
    })
}
