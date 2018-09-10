import { AuthProvider } from './../auth/auth';
import { CrudProvider } from './../crud';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsProvider } from '../settings';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider extends CrudProvider {

  constructor(
    public http: HttpClient,
    ) {
    super('users',http)
  }

  getBalances(access_token_moip){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;version=2.1',
        'Authorization': `OAuth ${access_token_moip}`
      })
    };
    return this.http.get<any>(`${SettingsProvider.api_moip_url}/balances`,httpOptions);
  }

}
