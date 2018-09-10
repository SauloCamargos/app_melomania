import { SettingsProvider } from './settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../node_modules/rxjs/Observable';

/*
  Generated class for the CrudProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CrudProvider {

  prefix_service = '';

  constructor(
    prefix: string,
    public http: HttpClient
  ) { 
    this.prefix_service = prefix;
  }

  public getData(data): Observable<any> {
    if (data.page && data.qtd) {
      return this.http.get<any>(`${SettingsProvider.api_url}/${this.prefix_service}?page=${data.page}&qtd=${data.qtd}`);
    }

    if (data.page) {
      return this.http.get<any>(`${SettingsProvider.api_url}/${this.prefix_service}?page=${data.page}`);
    }

    if (data.qtd) {
      if (data.qtd === -1) {
        return this.http.get<any>(`${SettingsProvider.api_url}/${this.prefix_service}/getAll`);
      }
      return this.http.get<any>(`${SettingsProvider.api_url}/${this.prefix_service}?qtd=${data.qtd}`);
    }

    return this.http.get<any>(`${SettingsProvider.api_url}/${this.prefix_service}`);
  }

  public create(data: any): Observable<any> {
    return this.http.post<any>(`${SettingsProvider.api_url}/${this.prefix_service}`, data);
  }

  public update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${SettingsProvider.api_url}/${this.prefix_service}/${id}`, data);
  }

  public get(id: number): Observable<any> {
    return this.http.get<any>(`${SettingsProvider.api_url}/${this.prefix_service}/${id}`);
  }

  public remove(id: number): Observable<any> {
    return this.http.delete<any>(`${SettingsProvider.api_url}/${this.prefix_service}/${id}`);
  }

}
