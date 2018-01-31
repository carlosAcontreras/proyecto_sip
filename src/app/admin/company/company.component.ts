import { Component, OnInit } from '@angular/core';
import { PermitsService } from '../../services/permisos/permits.service'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [PermitsService]
})
export class CompanyComponent implements OnInit {
  public permisos;

  constructor(private _PermitsService: PermitsService) { }
  ngOnInit() {
    this.getPermits();
  }


  /*Obtener los permisos del menu*/
  getPermits() {
    this._PermitsService.getPermits('13', 'company');
    this.permisos = this._PermitsService.getPermitsSubMenu('users');
    console.log(this.permisos);
  }
}
