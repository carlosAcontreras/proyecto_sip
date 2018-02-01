import { Component, OnInit } from '@angular/core';
import { PermitsService } from '../../services/permisos/permits.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
  providers: [PermitsService]
})
export class ContractsComponent implements OnInit {
  public permisos;

  constructor(private _PermitsService: PermitsService) { }
  ngOnInit() {
    this.getPermits();
  }


  /*Obtener los permisos del menu*/
  getPermits() {
    this._PermitsService.getPermits('12', 'contracts');
    this.permisos = this._PermitsService.getPermitsSubMenu('users');
    console.log(this.permisos);
  }
}