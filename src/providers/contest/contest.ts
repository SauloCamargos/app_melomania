import { CrudProvider } from './../crud';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsProvider } from '../settings';
import { Observable } from '../../../node_modules/rxjs';

/*
  Generated class for the ContestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContestProvider extends CrudProvider {

   constructor(
    public http: HttpClient,
    ) {
    super('contests',http)
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

  public getLotteries(id: number): Observable<any> {  
    return this.http.get<any>(`${SettingsProvider.api_url}/${this.prefix_service}/${id}/lotteries`);
  }
  public getRecordsUser(data?: number): Observable<any> {
    let dataSend = {}
    if(data){
      dataSend = data;
    }
    return this.http.post<any>(`${SettingsProvider.api_url}/${this.prefix_service}/records`, dataSend);
  }
  

}
