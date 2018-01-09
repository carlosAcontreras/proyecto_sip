import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { constantes } from '../../utilitis/constantes';


@Injectable()
export class PermitsService {

  private url: string;
  private constantes;
  private materials_permits;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  getParams(menu) {
    let cedula = JSON.parse(localStorage.getItem('user'));
    let data = { id: cedula.identification, submenu: menu };
    return JSON.stringify(data);
  }

  getPermits(menu, nombre_submenu) {
    this.url = this.constantes.getRouterGlobal() + 'permission';
    let headers = new Headers({ 'Content-type': 'aplication/json' });
    let options = new RequestOptions({ headers: headers });
    let params = this.getParams(menu);
    this.http.post(this.url, params, options).map(res => res.json()).subscribe(
      result => {
        this.materials_permits = JSON.stringify(result);
        if (this.materials_permits.identification !== false) {
          localStorage.setItem(nombre_submenu, this.materials_permits);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getPermitsSubMenu(value) {
    let permisos;
    if (localStorage.getItem(value)) {
      return permisos = JSON.parse(localStorage.getItem(value));
    } else {
      return permisos = { save: 0, delete: 0, update: 0, edit: 0 };
    }
  }

}
