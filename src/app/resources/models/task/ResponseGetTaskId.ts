export interface ResponseGetTaskId {
    title: string;
    description: string;
    activities: [{
        activityTitle: string,
        activityDescription: string,
        activityId: string,
        taskId: string,
    }]
}