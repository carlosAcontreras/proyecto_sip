import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';
import { constantes } from '../../utilitis/constantes';

@Injectable()
export class PurchasesService {




 private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  search_purchases_unit(params) {

    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this.constantes.getRouterGlobal() + 'purchase/search_detail';

    return this.http.post(url, params, options).map(res => res.json());
  }
}
