import { Component, OnInit } from '@angular/core';
declare var upload_image;
import { PermitsService } from '../../services/permisos/permits.service';
import { CompanyService } from '../../services/login/company.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [PermitsService, CompanyService]
})
export class UsersComponent implements OnInit {
  public permisos;
  public list_company;

  constructor(private _PermitsService: PermitsService, private CompanyService: CompanyService) { }

  ngOnInit() {
    this.getPermits();
    this.getCompany();
  }

  upload_file() {
    upload_image();
  }

  /*Obtener los permisos del menu*/
  getPermits() {
    this._PermitsService.getPermits('9', 'users');
    this.permisos = this._PermitsService.getPermitsSubMenu('users');
    console.log(this.permisos);
  }

  getCompany() {
    this.CompanyService.load_company().subscribe(
      res => {
        this.list_company = res;
        console.log(this.list_company);
      },
      error => {
        console.log(error);
      }
    )
  }

}
