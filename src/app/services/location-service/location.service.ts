import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private API_URL = 'http://localhost:8080/location';

  constructor(private httpClient: HttpClient) { }

  public getLocations(search): Observable<Location[]> {
    return this.httpClient.get<Location[]>(this.API_URL + '/all?search=' + search);
  }

  public getLocationsWithPagination(page, limit): Observable<Location[]> {
    return this.httpClient.get<Location[]>(this.API_URL + '/withPagination?page=' + page + '&limit=' + limit);
  }

  public getLocationsCount(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/numberOfLocations');
  }

  public addLocation(location: Location): Observable<any> {
    return this.httpClient.post(this.API_URL + '/add', location);
  }

  public updateLocation(location: Location): Observable<any> {
    return this.httpClient.put(this.API_URL + '/update/' + location._id, location);
  }

  public deleteLocation(id): Observable<any> {
    return this.httpClient.delete(this.API_URL + '/delete/' + id);
  }
}
