import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = environment.apiUrl;

  constructor(private readonly _httpClient: HttpClient) { }

  getMotorcycleNumber(): Observable<{motorcycleNumber: number}> {
    return this._httpClient.get<{motorcycleNumber: number}>(`${this.URL}/motorcycle/number`);
  }
}
