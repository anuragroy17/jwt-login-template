import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { config } from '../config';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class HomeService {

  constructor(private http: HttpClient) {}

  fetchHomeData() {
      return this.http.get(`${config.apiUrl}/login/hello`,{responseType: 'text'});
    };
  }