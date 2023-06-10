import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeycloakApi {
 
  constructor(private http: HttpClient) {}

  getUserDetail(): Observable<any> {
    let url: string = 'https://euc1.auth.ac/auth/realms/sastaai/account';
    return this.http.get(url);
  }

}
