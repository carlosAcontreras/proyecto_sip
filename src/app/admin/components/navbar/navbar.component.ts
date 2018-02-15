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
  public contract_name;
  public id_company;
  public id_contract;
  public cambio = {
    'id_company': 0,
    'id_contract': 0
  }

  constructor(private router: Router, private _CompanyService: CompanyService, private _ListService: ListService) {

  }


  ngOnInit() {
    this.ValidateSession();
    this.getUserNameAndCompanyName();
    this.getCompany();
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
    this.contract_name = localStorage.getItem('contract_name');
    this.user_name = name.name;
  }

  fnConfig() {
    this.cambio.id_company = Number(localStorage.getItem('company'));
    this.get_contracts(this.cambio.id_company);
    this.cambio.id_contract = Number(localStorage.getItem('contract'));
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

  change_company(company, contract) {
    this.localCompany(company);
    this.localContract(company, contract);
  }

  localCompany(company) {
    let _company = { 'company': company }
    this._ListService.company(_company).subscribe(
      res => {
        if (res.business !== null) {
          localStorage.removeItem('company');
          localStorage.removeItem('company_name');
          localStorage.setItem('company_name', res.business.company_name);
          localStorage.setItem('company', res.business.idbusiness);
          this.company_name = localStorage.getItem('company_name');
        }
      },
      error => {
      }
    )
  }

  localContract(company, contract) {
    let _company = { 'company': company, 'contract': contract }
    this._ListService.contract(_company).subscribe(
      res => {
        if (res.contract !== null) {
          localStorage.removeItem('contract');
          localStorage.removeItem('contract_name');
          localStorage.setItem('contract_name', res.contract.contract_name);
          localStorage.setItem('contract', res.contract.idcontract);
          this.contract_name = localStorage.getItem('contract_name');
        }
      },
      error => {
      }
    )
  }

}
