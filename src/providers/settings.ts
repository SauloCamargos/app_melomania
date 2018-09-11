import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {
  // public static api_url = "http://localhost/melomania/api/public/api/v1"
  public static api_url = "https://9e680262.ngrok.io/melomania/api/public/api/v1"
  public static api_moip_url = "https://sandbox.moip.com.br/v2"
  constructor(public http: HttpClient) {
    console.log('Hello SettingsProvider Provider');
  }

}
