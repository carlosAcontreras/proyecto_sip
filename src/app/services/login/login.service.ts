import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Login } from '../../models/login_models';
import { constantes } from '../../utilitis/constantes';


@Injectable()
export class LoginService {

  private url: string;
  private constantes;


  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  login_autch(user) {
    this.url = this.constantes.getRouterGlobal() + 'user';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, user, options).map(res => res.json());
  }

}
