import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem("id_token");

        if(this.authService.isLoggedOut()){
            this.authService.logout();
        }

        if (idToken) {
            
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${idToken}`
                }
            });
        }
        // console.log(JSON.stringify(req))
        return next.handle(req);
        
    }
}