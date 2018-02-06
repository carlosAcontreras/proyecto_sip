import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';
import { constantes } from '../../utilitis/constantes';


@Injectable()
export class RefundService {

  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();

  }

  search_refund_unit(params) {

    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this.constantes.getRouterGlobal() + 'dispatche/search';

    return this.http.post(url, params, options).map(res => res.json());
  }

  insert(params) {
    this.url = this.constantes.getRouterGlobal() + "refund/create";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_refund(params) {
    this.url = this.constantes.getRouterGlobal() + "refund/search_refund";

    return this.http.post(this.url, params).map(res => res.json());
  }

}
