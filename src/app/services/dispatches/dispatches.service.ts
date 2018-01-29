import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/observable";
import { constantes } from "../../utilitis/constantes";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class DispatchesService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  insert(params) {
    this.url = this.constantes.getRouterGlobal() + "dispatche/insert";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "dispatche/update";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_dispatche(params) {
    this.url = this.constantes.getRouterGlobal() + "dispatche/search";

    return this.http.post(this.url, params).map(res => res.json());
  }
}
