import { Component, OnInit } from '@angular/core';
declare var upload_image;
import { PermitsService } from '../../services/permisos/permits.service';
import { CompanyService } from '../../services/login/company.service';
import { ListService } from '../../services/list/list.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [PermitsService, CompanyService, ListService]
})
export class UsersComponent implements OnInit {
  public permisos;
  public list_company;
  public list_departaments;
  public list_city = [];
  public list_sex;
  public list_account_type;
  public list_bank;
  public list_eps;
  public list_arl;
  public list_pension;
  public list_state;
  public list_charges;
  public list_clasificaciones;
  public list_education_level;
  public list_profiles;
  public list_place_of_work;
  public list_gangs;
  public list_contracts = [];
  public list_location;
  public list_civil_status;


  constructor(private _PermitsService: PermitsService, private CompanyService: CompanyService, private ListService: ListService) { }

  ngOnInit() {
    this.getPermits();
    this.getCompany();
    this.get_departments();
    this.get_sex();
    this.get_account_type();
    this.get_bank();
    this.get_eps();
    this.get_arl();
    this.get_pension();
    this.get_state();
    this.get_charges();
    this.get_clasificaciones();
    this.get_education_level();
    this.get_profiles();
    this.get_place_of_work();
    this.get_place_gangs();
    this.get_place_location();
    this.get_civil_status();


  }

  upload_file() {
    upload_image();
  }

  /*Obtener los permisos del menu*/
  getPermits() {
    this._PermitsService.getPermits('9', 'users');
    this.permisos = this._PermitsService.getPermitsSubMenu('users');
  }

  getCompany() {
    this.CompanyService.load_company().subscribe(
      res => {
        this.list_company = res;
      },
      error => {
        console.log(error);
      }
    )
  }





  get_departments() {
    let url = "departamentos/departamentos";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_departaments = res.departments;
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }



  get_city(e) {

    let id = e.target.value;
    let params = { 'id_departamento': id };
    let url = "departamentos/municipios";
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_city = res.municipality;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_sex() {
    let url = "list/sexo";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_sex = res.sexo;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_account_type() {
    let url = "list/account_type";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_account_type = res.account_type;
      },
      error => {
        console.log(error);
      }
    );
  }
  get_bank() {
    let url = "list/bank";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_bank = res.bank;
      },
      error => {
        console.log(error);
      }
    );
  }
  get_eps() {
    let url = "list/eps";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_eps = res.eps;
      },
      error => {
        console.log(error);
      }
    );
  }
  get_arl() {
    let url = "list/arl";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_arl = res.arl;
      },
      error => {
        console.log(error);
      }
    );
  }
  get_pension() {
    let url = "list/pensions";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_pension = res.pensions;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_state() {
    let url = "list/states";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_state = res.states;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_charges() {
    let url = "list/charges";
    let company = localStorage.getItem('company');
    let params = { 'company': company };
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_charges = res.charges;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_clasificaciones() {
    let url = "list/clasificaciones";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_clasificaciones = res.clasificaciones;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_education_level() {
    let url = "list/education_level";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_education_level = res.education_level;
      },
      error => {
        console.log(error);
      }
    );

  }
  get_profiles() {
    let url = "list/profiles";
    let company = localStorage.getItem('company');
    let params = { 'company': company };
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_profiles = res.p_profiles;
      },
      error => {
        console.log(error);
      }
    );

  }
  get_place_of_work() {
    let url = "list/place_of_work";
    let company = localStorage.getItem('company');
    let params = { 'company': company };
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_place_of_work = res.place_of_work;
      },
      error => {
        console.log(error);
      }
    );

  }

  get_place_gangs() {
    let url = "list/gangs";
    let company = localStorage.getItem('company');
    let params = { 'company': company };
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_gangs = res.gangs;
        console.log(this.list_gangs);
      },
      error => {
        console.log(error);
      }
    );

  }

  get_contracts(e) {
    let url = "list/contract";
    let company = e.target.value;
    let params = { 'company': company };
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_contracts = res.contract;
        console.log(this.list_contracts);
      },
      error => {
        console.log(error);
      }
    );

  }

  get_place_location() {
    let url = "list/location";
    let company = localStorage.getItem('company');
    let params = { 'company': company };
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_location = res.location;
        console.log(this.list_location);
      },
      error => {
        console.log(error);
      }
    );

  }

  get_civil_status() {
    let url = "list/civil_status";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_civil_status = res.civil_status;
        console.log(this.list_civil_status);
      },
      error => {
        console.log(error);
      }
    );

  }

}
