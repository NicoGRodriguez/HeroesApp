import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor(private http: HttpClient) { }

  verificaAutentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) { return of(false); }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(map(authe => { this._auth = authe; return true; }))
  }

  loginAuth() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(tap(res => this._auth = res),
        tap(res => localStorage.setItem('token', res.id)));
    ;
  }
}
