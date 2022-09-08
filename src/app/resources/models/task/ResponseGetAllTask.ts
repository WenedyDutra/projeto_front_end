export interface ResponseGetAllTask {
    id:string;
    generator: string;
    title: string;
    description: string;
    responsible: string;
    // responsibleName:string;
    status: string;
    statusDescription: string;
    activities: {
        activityDescription: string;
        activityId: string;
        activityTitle:string;
        taskId: string;
    }[]
    
}