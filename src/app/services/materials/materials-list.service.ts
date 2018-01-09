import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { constantes } from '../../utilitis/constantes';

@Injectable()
export class MaterialsListService {

  private url: string;
  private params: string;
  private constantes;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  get_list() {
    this.url = this.constantes.getRouterGlobal() + 'listmateriales';
    return this.http.post(this.url, this.params).map(res => res.json());
  }

}
