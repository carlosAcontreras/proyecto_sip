import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';
import { constantes } from '../../utilitis/constantes';

@Injectable()
export class DatatablesService {

  private constantes;
  private url;

  private json = {
    consulta: [
      {
        "n-orden": '01',
        "proveedor": 'proveedor 001',
        "estado": 'estado 001',
        "n-ingreso": 'ingreso 001',
        "fecha": '01/12/2017',
        "button": 'seleccionar'
      },
      {
        "n-orden": '02',
        "proveedor": 'proveedor 002',
        "estado": 'estado 002',
        "n-ingreso": 'ingreso 002',
        "fecha": '02/12/2017',
        "button": 'seleccionar'
      },
      {
        "n-orden": '03',
        "proveedor": 'proveedor 003',
        "estado": 'estado 003',
        "n-ingreso": 'ingreso 003',
        "fecha": '03/12/2017',
        "button": 'seleccionar'
      },
      {
        "n-orden": '04',
        "proveedor": 'proveedor 004',
        "estado": 'estado 004',
        "n-ingreso": 'ingreso 004',
        "fecha": '04/12/2017',
        "button": 'seleccionar'
      },
      {
        "n-orden": '05',
        "proveedor": 'proveedor 005',
        "estado": 'estado 005',
        "n-ingreso": 'ingreso 005',
        "fecha": '05/12/2017',
        "button": 'seleccionar'
      },
      {
        "n-orden": '06',
        "proveedor": 'proveedor 006',
        "estado": 'estado 006',
        "n-ingreso": 'ingreso 006',
        "fecha": '06/12/2017',
        "button": 'seleccionar'
      },
      {
        "n-orden": '07',
        "proveedor": 'proveedor 007',
        "estado": 'estado 007',
        "n-ingreso": 'ingreso 007',
        "fecha": '07/12/2017',
        "button": 'seleccionar'
      },
      {
        "n-orden": '08',
        "proveedor": 'proveedor 008',
        "estado": 'estado 008',
        "n-ingreso": 'ingreso 008',
        "fecha": '08/12/2017',
        "button": 'seleccionar'
      }
    ]
  }

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  get_datatables(params, route) {

    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this.constantes.getRouterGlobal() + route;

    return this.http.post(url, params, options).map(res => res.json());
  }

}
