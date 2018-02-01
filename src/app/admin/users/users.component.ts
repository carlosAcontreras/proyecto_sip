import { Component, OnInit } from '@angular/core';
declare var upload_image;
import { PermitsService } from '../../services/permisos/permits.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [PermitsService]
})
export class UsersComponent implements OnInit {
  public permisos;

  constructor(private _PermitsService: PermitsService) { }

  ngOnInit() {
    this.getPermits();
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

}
