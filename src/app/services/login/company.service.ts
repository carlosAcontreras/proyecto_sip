import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';
import { constantes } from '../../utilitis/constantes';

@Injectable()
export class CompanyService {
  private url: string;
  private constantes;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  load_company() {
    this.url = this.constantes.getRouterGlobal() + 'company';
    return this.http.get(this.url).map(res => res.json());
  }

}
