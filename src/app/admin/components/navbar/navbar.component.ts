import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import $ from 'jquery';
import { CompanyService } from '../../../services/login/company.service';
import { ListService } from '../../../services/list/list.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [CompanyService, ListService]
})
export class NavbarComponent implements OnInit {
  public user_name: string;
  public company_name: string;
  public contador = 1;
  public list_company;
  public list_contracts;
  public selectedCompany: number;
  public contract_name;

  constructor(private router: Router, private _CompanyService: CompanyService, private _ListService: ListService) { }


  ngOnInit() {
    this.selectedCompany = Number(localStorage.getItem('company'));
    this.ValidateSession();
    this.getUserNameAndCompanyName();
    this.getCompany();
    this.get_contracts(this.selectedCompany);

  }

  ValidateSession() {
    let session = localStorage.getItem('user');
    if (!session)
      this.router.navigate(['/']);
  }

  sesionDestroy() {
    localStorage.clear();
  }

  getUserNameAndCompanyName() {
    let name = JSON.parse(localStorage.getItem("user"));
    this.company_name = localStorage.getItem("company_name");
    this.user_name = name.name;
  }

  fnConfig() {
    if (this.contador === 1) {
      $('.config').animate({
        right: 0
      })
      this.contador = 0;
    } else {
      $('.config').animate({
        right: -300
      })
      this.contador = 1;
    }
  }

  getCompany() {
    this._CompanyService.load_company().subscribe(
      res => {
        this.list_company = res;
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
        this.list_contracts = res.contract;
      },
      error => {
        console.log(error);
      }
    );
  }

  change_company(id_company) {
    let company_name: string;
    console.log(id_company);
    console.log(typeof (id_company));
    for (let i = 0; i < this.list_company.length; i++) {
      if (this.list_company[i].idbusiness === Number(id_company)) {
        company_name = this.list_company[i].company_name;
        localStorage.removeItem('company_name');
        localStorage.removeItem('company');
        localStorage.setItem('company_name', company_name);
        localStorage.setItem('company', id_company);
        this.company_name = localStorage.getItem("company_name");
      }
    }
  }

  /*
  
        localStorage.setItem('company', id_company);
 
  */

}
