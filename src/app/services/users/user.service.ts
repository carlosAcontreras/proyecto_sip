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

  public consultar_users(params) {
    this.url = this.constantes.getRouterGlobal() + 'employee/search_employee';
    let options = this._headers();
    return this.http.post(this.url, params, options).map(res => res.json());
  }

  public save_user(params) {
    this.url = this.constantes.getRouterGlobal() + 'employee/insert_employee';
    let options = this._headers();
    return this.http.post(this.url, params, options).map(res => res.json());
  }

  public actualizar_users(params) {
    this.url = this.constantes.getRouterGlobal() + '';
    let options = this._headers();
    return this.http.post(this.url, params, options).map(res => res.json());
  }

  public upload_image(files: Array<File>) {
    var url = this.constantes.getRouterGlobal() + 'employee/upload_image';
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) {
        formData.append('uploads[]', files[i], files[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.send(formData);
    })
  }
}
