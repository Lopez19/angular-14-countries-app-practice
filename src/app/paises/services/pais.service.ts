import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private _apiUrl: string = 'https://restcountries.com/v3.1';

  // Parámetros de la petición
  get httpParams() {
    return {
      params: {
        fields: 'name,capital,flags,population,region,cca2',
      },
    };
  }

  constructor(private http: HttpClient) {}

  // Get all countries
  buscarPais = (termino: string): Observable<Country[]> => {
    const url = `${this._apiUrl}/name/${termino}`;
    return this.http.get<Country[]>(url, this.httpParams);
  };

  // Get all countries by capital
  buscarCapital = (termino: string): Observable<Country[]> => {
    const url = `${this._apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url, this.httpParams);
  };

  // Get pais by alpha code
  getPaisPorAlpha = (id: string): Observable<Country[]> => {
    const url = `${this._apiUrl}/alpha/${id}`;
    return this.http.get<Country[]>(url);
  };

  // Get all countries by region
  buscarRegion = (region: string): Observable<Country[]> => {
    const url = `${this._apiUrl}/region/${region}`;
    return this.http
      .get<Country[]>(url, this.httpParams)
      .pipe(tap(console.log));
  };
}
