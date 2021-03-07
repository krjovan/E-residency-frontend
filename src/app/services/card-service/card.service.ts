import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private API_URL = 'http://localhost:8080/card';

  constructor(private httpClient: HttpClient) { }

  public getCards(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(this.API_URL + '/all');
  }

  public updateCard(id: String, act: Boolean): Observable<any> {
    let req = { active: act.toString() };
    return this.httpClient.put(this.API_URL + '/update/' + id, req);
  }
}
