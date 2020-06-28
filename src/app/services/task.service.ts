import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class TaskService {
    baseUrl: string = 'http://localhost:8080/'
    constructor(public http: HttpClient) { }
    getTasks(): Observable<any> {
        return this.http.get(this.baseUrl+"viewTask");
    }

    getTaskByTaskId(TaskId): Observable<any> {
        return this.http.get(this.baseUrl + TaskId);
    }
    saveTask(formValue): Observable<any>{       
        return this.http.post(this.baseUrl+"addTask", formValue);
    }
    updateTask(TaskId, formValue): Observable<any>{       
        return this.http.put(this.baseUrl+"editTask", formValue);
    }
    updateTaskStatus(formValue): Observable<any>{
        return this.http.put(this.baseUrl + "updateTaskByTaskId?taskId="+formValue, null);
    }
    deleteTask(taskId): Observable<any>{       
        //return this.http.delete(this.baseUrl + taskId);
        return this.http.delete(this.baseUrl + "deleteTask?id="+taskId);
    }
}

