import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Heroe } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private urlHeroe: string = environment.baseUrl;

  get httpParams() {
    return new HttpParams().set('', '');
  }

  constructor(private http: HttpClient) { }
  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.urlHeroe}/heroes`)
  }
  getHeroePorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.urlHeroe}/heroes/${id}`);
  }
  getSugerencia(q: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.urlHeroe}/heroes?q=${q}&_limit=6}`);
  }
  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.urlHeroe}/heroes`, heroe);
  }
  editarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.urlHeroe}/heroes/${heroe.id}`, heroe);
  }
  borrarHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlHeroe}/heroes/${id}`);
  }
}
