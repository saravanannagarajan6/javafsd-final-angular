import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {
    baseUrl: string = 'http://localhost:4201/'
    constructor(public http: HttpClient) { }
    getUsers(): Observable<any> {
        return this.http.get(this.baseUrl+"viewUser");
    }

    getUsersById(employeeId): Observable<any> {
        return this.http.get(this.baseUrl + employeeId);
    }
    saveUser(formValue): Observable<any>{       
        return this.http.post(this.baseUrl+ "addUser", formValue);
    }
    updateUser(employeeId, formValue): Observable<any>{       
        return this.http.put(this.baseUrl+ "editUser", formValue);
    }
    deleteUser(employeeId): Observable<any>{       
       // return this.http.delete(this.baseUrl + employeeId);
       return this.http.delete(this.baseUrl + "deleteUser?id="+employeeId);
    }

}