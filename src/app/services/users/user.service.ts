import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class UserService {
  public constantes = new constantes();
  public url: string;

  constructor(private http: Http) { }

  public _headers() {
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  public save_user(params) {
    this.url = this.constantes.getRouterGlobal() + 'employee/insert_employee';
    let options = this._headers();
    return this.http.post(this.url, params, options).map(res => res.json());
  }

  public consultar_users(params) {
    this.url = this.constantes.getRouterGlobal() + '';
    let options = this._headers();
    return this.http.post(this.url, params, options).map(res => res.json());
  }

}
