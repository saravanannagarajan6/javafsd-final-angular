import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ProjectService {
    baseUrl: string = 'http://localhost:4201/'
    constructor(public http: HttpClient) { }
    getProjects(): Observable<any> {
        return this.http.get(this.baseUrl+ "viewProject");
    }

    getProjectById(projectId): Observable<any> {
        return this.http.get(this.baseUrl + projectId);
    }
    saveProject(formValue): Observable<any>{       
        //return this.http.post(this.baseUrl, formValue);
        return this.http.put(this.baseUrl + "addProject", formValue);
    }
    updateProject(projectId, formValue): Observable<any>{       
         return this.http.put(this.baseUrl + "editProject", formValue);
    }
    deleteProject(projectId): Observable<any>{       
        return this.http.delete(this.baseUrl + "deleteProject?id="+projectId);
    }
}