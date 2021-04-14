import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Motorcycle } from 'src/interfaces/motorcycle';

@Injectable({
  providedIn: 'root'
})
export class MotorcycleService {
  private URL = 'http://localhost:3000'

  constructor(private readonly _httpClient: HttpClient) { }

  getAllMotorcycles(): Observable<Motorcycle[]> {
    return this._httpClient.get<Motorcycle[]>(`${this.URL}/motorcycle/motorcycles`)
  }
}
