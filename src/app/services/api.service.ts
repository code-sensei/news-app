import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  endpoint: string = environment.endpoint;

  constructor(
    private http: HttpClient
  ) {

  }

  get_top_headlines() {
    return this.http.get(`${this.endpoint}top-headlines`);
  }

  get_all_articles() {
    return this.http.get(`${this.endpoint}everything`);
  }

}
