import { Component, OnInit } from '@angular/core';
import { PermitsService } from '../../services/permisos/permits.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
  providers: [PermitsService]
})
export class ProvidersComponent implements OnInit {
  public permisos;

  constructor(private _PermitsService: PermitsService) { }

  ngOnInit() {
    this.getPermits();
  }

  /*Obtener los permisos del menu*/
  getPermits() {
    this._PermitsService.getPermits('10', 'providers');
    this.permisos = this._PermitsService.getPermitsSubMenu('providers');
    console.log(this.permisos);
  }

}
