import { CrudProvider } from './../crud';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsProvider } from '../settings';
import { Observable } from 'rxjs';

/*
  Generated class for the LotteryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LotteryProvider extends CrudProvider {

   constructor(http: HttpClient) {
    super('lotterys', http);
  }

  public getUpcoming(data): Observable<any> {
    if (data.page && data.qtd) {
      return this.http.get<any>(`${SettingsProvider.api_url}/${this.prefix_service}/getUpcoming?page=${data.page}&qtd=${data.qtd}`);
    }

    if (data.page) {
      return this.http.get<any>(`${SettingsProvider.api_url}/${this.prefix_service}/getUpcoming?page=${data.page}`);
    }

    if (data.qtd) {
      if (data.qtd === -1) {
        return this.http.get<any>(`${SettingsProvider.api_url}/${this.prefix_service}/getUpcoming`);
      }
      return this.http.get<any>(`${SettingsProvider.api_url}/${this.prefix_service}/getUpcoming?qtd=${data.qtd}`);
    }

    return this.http.get<any>(`${SettingsProvider.api_url}/${this.prefix_service}/getUpcoming`);
  }

}
