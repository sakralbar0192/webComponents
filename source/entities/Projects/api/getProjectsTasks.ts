import { IProjectTaskInfo } from '../types'

export interface IGetProjectsTasksRequestBody {
    userId: number
    fromDate: Date
    toDate: Date
}

export async function getProjectsTasks(userId: number, fromDate: Date, toDate: Date): Promise<IProjectTaskInfo[]> {
    const requestBody: IGetProjectsTasksRequestBody = {
        userId,
        fromDate,
        toDate
    }

    return await fetch('/Services/TimeSheetByMonthService.asmx/GetUserTimeFrameProjectRoles', {
        method: 'post',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(requestBody)
    })
        .then(res => res.json())
        .then((serverResponse) => {
            const response = serverResponse.d
            if (response.IsSucceeded) {
                return response.Value as IProjectTaskInfo[]
            } else return []
        })
        .catch(function () {
            return []
        })
}
