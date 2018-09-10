import { LoginPage } from './../../pages/login/login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsProvider } from '../settings';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { filter } from 'rxjs/operators';
import { NavController, IonicApp, App }  from 'ionic-angular';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

    public navCtrl: NavController
   constructor(
    private http: HttpClient, 
    public app: App  
    ) { 
      this.app = app;
     this.navCtrl = this.app.getActiveNav();
    }

  check() {    
    return this.http.get<any>(`${SettingsProvider.api_url}/check`).do(data => {
        localStorage.setItem('user', btoa(JSON.stringify(data.user)));
    });
  }

  login(credentials: { email: string, password: string }) {
    return this.http.post<any>(`${SettingsProvider.api_url}/authenticate`, credentials)
      .do(data => {
        if(data.error != true){
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          console.log(data)
          localStorage.setItem('user', btoa(JSON.stringify(data.user)));
        }
      });
  }

  logout(): void {
    this.navCtrl.setRoot(LoginPage)
    localStorage.clear();
    this.http.get(`${SettingsProvider.api_url}/logout`);
  }

  getUser() {
    try {
       return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
    } catch (e) {
        this.logout();
    }
  }

  setUser(): Promise<boolean> {
    return this.http.get<any>(`${SettingsProvider.api_url}/authenticate`).toPromise()
      .then(data => {
        if (data.user) {
          localStorage.setItem('user', btoa(JSON.stringify(data.user)));
          return true;
        }
        return false;
      });
  }

  resetPassword(data: any) {
    return this.http.post<any>(`${SettingsProvider.api_url}/password/email`, data);
  }

  setNewPassword(data: any) {
    return this.http.post<any>(`${SettingsProvider.api_url}/password/reset`, data);
  }

}
