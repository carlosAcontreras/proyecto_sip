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


  constructor(private http: Http) {

    this.constantes = new constantes();
  }

  state_moves() {
    this.url = this.constantes.getRouterGlobal() + 'state_moves';
    return this.http.post(this.url, this.params).map(res => res.json());
  }

  cellar(idcompany) {
    let params = { 'idcompany': idcompany };
    this.url = this.constantes.getRouterGlobal() + 'cellar';
    return this.http.post(this.url, params).map(res => res.json());
  }



}
