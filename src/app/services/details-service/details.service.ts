import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private API_URL = 'http://localhost:8080/details';

  constructor(private httpClient: HttpClient) { }

  public addDetails(details: any): Observable<any> {
    return this.httpClient.post(this.API_URL + '/add', details);
  }

  public getApplicationDetailsById(application_id: String): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/getApplicationDetailsById/' + application_id);
  }
}
