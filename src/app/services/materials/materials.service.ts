import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { constantes } from '../../utilitis/constantes';
import { materialsModel } from '../../models/materials_model';

@Injectable()
export class MaterialsService {

  private url: string;
  private constantes;

  constructor(private http: Http, private materialsmodel: materialsModel) {
    this.constantes = new constantes();
  }

  /*servicio para crear un nuevo material*/
  save_materials(params: materialsModel) {
    this.url = this.constantes.getRouterGlobal() + 'material/create';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers })
    return this.http.post(this.url, params, options).map(res => res.json())

  }

  /*servicio para consultar material*/
  query_materials(params: materialsModel) {
    this.url = this.constantes.getRouterGlobal() + 'material';
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, params, options).map(res => res.json());
  }

  /*servicio para actualizar un material*/
  update_materials(params: materialsModel) {
    this.url = this.constantes.getRouterGlobal() + 'material/update';
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, params, options).map(res => res.json());
  }

  /*servicio para eliminar un material*/
  delete_materials(params: materialsModel) {
    this.url = this.constantes.getRouterGlobal() + 'material/delete';
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, params, options).map(res => res.json());
  }
}
