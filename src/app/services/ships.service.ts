import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShipsResponse} from '@models/ships.model';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  url: string = 'https://swapi.dev/api/starships/'
  headerDict = {
    'Authorization': 'none',
    'Access-Control-Allow-Origin': '*'
  }
  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor( private http: HttpClient ) {}

  getShips(page): Observable<ShipsResponse>{
    return this.http.get(`${this.url}?page=${page}`).pipe(
      map( (data: ShipsResponse) => { return data })
      );
  }
}
