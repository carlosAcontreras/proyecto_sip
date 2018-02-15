import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login_models';
import { CustomValidators } from 'ng2-validation';
import { CompanyService } from '../services/login/company.service';
import { LoginService } from '../services/login/login.service';
import { Routes, Router } from '@angular/router';
import swal from 'sweetalert2';
import { ListService } from '../services/list/list.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [Login, CompanyService, LoginService, ListService]
})
export class LoginComponent implements OnInit {

  private user;
  private company_list: any[];
  public contracts_list: any[];
  public user_data;

  constructor(private company: CompanyService, private login: LoginService, private router: Router, private _ListService: ListService) {
    this.user = new Login();
  }

  ngOnInit() {
    this.load_company();
    this.validate_session();
  }

  load_company() {
    this.company.load_company().subscribe(
      response => {
        this.company_list = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  get_contracts(company) {
    let url = "list/contract";
    let params = { 'company': company };
    this._ListService.get_list(url, params).subscribe(
      res => {
        this.contracts_list = res.contract;
        console.log(this.contracts_list);
      },
      error => {
        console.log(error);
      }
    );
  }

  SessionStart(user) {
    this.user_data = user;
    this.login.login_autch(user).subscribe(
      response => {
        this.validate_auth(response, user.company);
        console.log(response);
        return false;
      },
      error => {
        console.log(error);
      }
    )
  }

  validate_auth(user, company) {

    if (!user.identification) {
      swal("", "usuario / contraseña / empresa / contrato incorrecto", "error");
    } else {
      let _user = JSON.stringify(user);
      localStorage.setItem('user', _user);
      this.localCompany(company);
      this.localContract(this.user_data)
      this.validate_session();

    }
  }

  validate_session() {
    let _user = localStorage.getItem('user');
    console.log(_user);
    if (_user)
      this.router.navigate(['/admin']);
    else
      this.router.navigate(['/']);
  }



  localCompany(company) {
    let _company = { 'company': company }
    this._ListService.company(_company).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('company_name', res.business.company_name);
        localStorage.setItem('company', company);
      },
      error => {
      }
    )


  }

  localContract(user) {

    let _company = { 'company': user.company, 'contract': user.contract }
    this._ListService.contract(_company).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('contract_name', res.contract.contract_name);
        localStorage.setItem('contract', user.contract);
      },
      error => {
      }
    )
  }
}


