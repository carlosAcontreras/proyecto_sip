import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login_models';
import { CustomValidators } from 'ng2-validation';
import { CompanyService } from '../services/login/company.service';
import { LoginService } from '../services/login/login.service';
import { Routes, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [Login, CompanyService, LoginService]
})
export class LoginComponent implements OnInit {

  private user;
  private company_list: any[];

  constructor(private company: CompanyService, private login: LoginService, private router: Router) {
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

  SessionStart(user) {
    this.login.login_autch(user).subscribe(
      response => {
        this.validate_auth(response, user.company);
      },
      error => {
        console.log(error);
      }
    )
  }

  validate_auth(user, company) {

    if (!user.identification) {
      swal("", "usuario / contraseña / empresa incorrecto", "error");
    } else {
      let _user = JSON.stringify(user);
      localStorage.setItem('user', _user);
      this.localCompany(company);
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
    let company_name = '';
    for (let i = 0; i < this.company_list.length; i++) {
      if (this.company_list[i].idbusiness == company) {
        company_name = this.company_list[i].company_name;
        localStorage.setItem('company_name', company_name);
      }
    }
    localStorage.setItem('company', company);
  }
}


