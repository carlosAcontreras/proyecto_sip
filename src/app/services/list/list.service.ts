import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { constantes } from '../../utilitis/constantes';

@Injectable()
export class ListService {

  private url: string;
  private params: string;
  private constantes;
  public generate_list: any[];


  constructor(private http: Http) {

    this.constantes = new constantes();
  }

  state_moves() {
    this.url = this.constantes.getRouterGlobal() + 'state_moves';
    return this.http.post(this.url, this.params).map(res => res.json());
  }

  moves_income() {

    this.url = this.constantes.getRouterGlobal() + 'income_move';
    return this.http.post(this.url, this.params).map(res => res.json());

  }

  cellar(idcompany) {
    let params = { 'idcompany': idcompany };
    this.url = this.constantes.getRouterGlobal() + 'cellar';
    return this.http.post(this.url, params).map(res => res.json());
  }


  dispatches_move() {

    this.url = this.constantes.getRouterGlobal() + 'dispatches/dispatches_move';
    return this.http.post(this.url, this.params).map(res => res.json());

  }

  destination_dispatches() {

    this.url = this.constantes.getRouterGlobal() + 'dispatches/destination_dispatches';
    return this.http.post(this.url, this.params).map(res => res.json());
  }



  company(params) {

    this.url = this.constantes.getRouterGlobal() + 'list/company';
    return this.http.post(this.url, params).map(res => res.json());
  }

  contract(params) {

    this.url = this.constantes.getRouterGlobal() + 'list/local_contract';
    return this.http.post(this.url, params).map(res => res.json());
  }

  list_profiles(params) {

    this.url = this.constantes.getRouterGlobal() + 'list/list_profiles';
    return this.http.post(this.url, params).map(res => res.json());
  }


  get_list(url, params = null) {
    this.url = this.constantes.getRouterGlobal() + url;
    let headers = new Headers({ 'content-type': 'aplication/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, params, options).map(res => res.json());
  }
}

