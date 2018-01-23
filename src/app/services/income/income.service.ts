import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';
import { constantes } from '../../utilitis/constantes';


@Injectable()
export class IncomeService {


  private constantes;
  private url;

  constructor(private http: Http) { this.constantes = new constantes(); }



   insert(params){

    this.url = this.constantes.getRouterGlobal() + 'income/create';
    
    return this.http.post(this.url, params).map(res => res.json());  
  }

  serach_income(params){

    this.url = this.constantes.getRouterGlobal() + 'income/search';
    
    return this.http.post(this.url, params).map(res => res.json());  

  }

  update(params){

    this.url = this.constantes.getRouterGlobal() + 'income/update';
    
    return this.http.post(this.url, params).map(res => res.json());  
  }

  editpurchase(params){
   this.url = this.constantes.getRouterGlobal() + 'income/editpurchase';
    
    return this.http.post(this.url, params).map(res => res.json()); 

  }

}
