import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Motorcycle } from 'src/interfaces/motorcycle';

@Injectable({
  providedIn: 'root'
})
export class MotorcycleService {
  private URL = environment.apiUrl

  constructor(private readonly _httpClient: HttpClient) { }

  getAllMotorcycles(): Observable<Motorcycle[]> {
    return this._httpClient.get<Motorcycle[]>(`${this.URL}/motorcycle/motorcycles`)
  }
}
