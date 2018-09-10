import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudProvider } from '../crud';

/*
  Generated class for the RecordProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecordProvider extends CrudProvider {

   constructor(http: HttpClient) {
    super('records', http);
  }

}
