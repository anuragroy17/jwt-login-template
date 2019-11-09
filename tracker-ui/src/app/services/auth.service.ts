import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { config } from '../config';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as moment from "moment";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, fullName: string, username: string, password: string) {
    return this.http.post(`${config.apiUrl}/login/register`, {
      email: email,
      fullName: fullName,
      userName: username,
      passWord: password
    });
  }

  login(username: string, password: string) {
     return this.http.post(`${config.apiUrl}/login/authenticate`, {
        username: username,
        password: password
      }).pipe(tap(res => this.setSession(res)));
  }

  private setSession(authResult) {
    console.log(JSON.stringify(authResult))
    const expiresAt = moment().add(3600,'second');

    localStorage.setItem('id_token', authResult.jwt);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
}          

logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
}

public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
}

isLoggedOut() {
    return !this.isLoggedIn();
}

getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
}    

}
