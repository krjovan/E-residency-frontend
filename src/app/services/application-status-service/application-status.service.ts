import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStatusService {


  private API_URL = 'http://localhost:8080/application-status';

  constructor(private httpClient: HttpClient) { }

  public getApplicationDetailsById(application_id: String): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/getStatusByApplicationId/' + application_id);
  }

  public getSubmittedApplications(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/getSubmittedApplications');
  }

  public getProcessingApplications(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/getProcessingApplications');
  }

  public getApplicationsByStatusType(req): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/getApplicationsByStatusType/?status_type=' +  req.status_type);
  }

  public changeApplicationStatus(app_id, stat_type): Observable<any> {
    let req = {
      application_id: app_id,
      status_type: stat_type
    }
    return this.httpClient.post(this.API_URL + '/add', req);
  }

}
