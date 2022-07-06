import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {

                //console.log(user);
                if(!user) {
                    return next.handle(req);
                }

                //ovde se dodaju one za koje ne treba autentifikacija

                const modifiedReq = req.clone({ headers: new HttpHeaders().set('Authorization', `Bearer ${user.token}`) });
                return next.handle(modifiedReq);
            }));
    }

} 