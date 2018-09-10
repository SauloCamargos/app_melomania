import { AuthProvider } from './../providers/auth/auth';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { SettingsProvider } from '../providers/settings';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

   constructor(private injector: Injector) {}
   
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = SettingsProvider.api_url.split('/');
    // const apiMoipUrl: Array<any> = SettingsProvider.api_moip_url.split('/');
    const token = localStorage.getItem('access_token');
    // const authProvider = this.injector.get(AuthProvider);

    if (token && (requestUrl[2] === apiUrl[2])) {
      const newRequest = request.clone({ setHeaders: {'Authorization': `Bearer ${token}`} });
      return next.handle(newRequest);
    }  




    return next.handle(request);
    

  }
}
