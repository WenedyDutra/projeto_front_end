import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ResponseGetAllTask } from "src/app/resources/models/task/ResponseGetAllTask";
import { ResponseGetTaskId } from "src/app/resources/models/task/ResponseGetTaskId";
import { ResponseCreateTask } from "src/app/resources/models/task/ResponseCreateTask";
import { RequestCreateTask } from "src/app/resources/models/task/RequestCreateTask";
import { Observable } from "rxjs";
import { RequestUpdateTask } from "src/app/resources/models/task/RequestUpdateTask";
import { ResponseUpdateTask } from "src/app/resources/models/task/ResponseUpdateTask";
import { RequestDeleteTask } from "src/app/resources/models/task/RequestDeleteTask";
import { ResponseDeleteTask } from "src/app/resources/models/task/ResponseDeleteTask";
import { ResponseCreateActivity } from "src/app/resources/models/activity/ResponseCreateActivity";
import { RequestCreateActivity } from "src/app/resources/models/activity/RequestCreateActivity";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private authenticated: string;
  constructor(private httpClient: HttpClient) {
    this.authenticated = localStorage.getItem("token");
  }

  public listTask(): Observable<ResponseGetAllTask[]> {
    return this.httpClient.get<ResponseGetAllTask[]>(
      "https://localhost:5001/api/task/lisTask",
      {
        headers: {
          authorization: `Bearer ${this.authenticated}`,
        },
      }
    );
  }

  public listTaskId(id: string): Observable<ResponseGetTaskId> {
    return this.httpClient.get<ResponseGetTaskId>(
      "https://localhost:5001/api/task/" + id,
      {
        headers: {
          authorization: `Bearer ${this.authenticated}`,
        },
      }
    );
  }

  public createTask(
    requestCreatTask: RequestCreateTask
  ): Observable<ResponseCreateTask> {
    return this.httpClient.post<ResponseCreateTask>(
      "https://localhost:5001/api/task/createTask",
      requestCreatTask,
      {
        headers: {
          authorization: `Bearer ${this.authenticated}`,
        },
      }
    );
  }

  public updateTask(
    requestUpdateTask: RequestUpdateTask
  ): Observable<ResponseUpdateTask> {
    return this.httpClient.put<ResponseUpdateTask>(
      "https://localhost:5001/api/task/updateTask",
      requestUpdateTask,
      {
        headers: {
          authorization: `Bearer ${this.authenticated}`,
        },
      }
    );
  }

  public deleteTask(requestDeleTask: RequestDeleteTask) :  Observable<ResponseDeleteTask>{
    return this.httpClient.delete<ResponseDeleteTask>(
      "https://localhost:5001/api/task/" + requestDeleTask,
      {
        headers: {
          authorization: `Bearer ${this.authenticated}`,
        },
      }
    );
  }

  public createActivity(
    requestCreateActivity: RequestCreateActivity
  ): Observable<ResponseCreateActivity> {
    return this.httpClient.put<ResponseCreateActivity>(
      "https://localhost:5001/api/task/createActivity",
      requestCreateActivity,
      {
        headers: {
          authorization: `Bearer ${this.authenticated}`,
        },
      }
    );
  }
}
