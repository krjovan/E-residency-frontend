import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../../models/application';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private API_URL = 'http://localhost:8080/application';

  constructor(private httpClient: HttpClient,
              private auth: AuthenticationService
              ) { }

  public getApplication(search): Observable<Application[]> {
    return this.httpClient.get<Application[]>(this.API_URL + '/all?search=' + search);
  }

  public getUserApplications(): Observable<Application[]> {
    return this.httpClient.get<Application[]>(this.API_URL + '/userApplications/' + this.auth.getUserDetails()._id);
  }

  public addApplication(application: Application): Observable<any> {
    return this.httpClient.post(this.API_URL + '/add', application);
  }

  public deleteApplication(id): Observable<any> {
    return this.httpClient.delete(this.API_URL + '/delete/' + id);
  }
}
