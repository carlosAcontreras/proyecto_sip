import { Component, OnInit } from '@angular/core';
import { PermitsService } from '../../services/permisos/permits.service';
import { ListService } from '../../services/list/list.service';

@Component({
  selector: 'app-permits',
  templateUrl: './permits.component.html',
  styleUrls: ['./permits.component.scss'],
  providers: [PermitsService, ListService]

})
export class PermitsComponent implements OnInit {

  public rowDatatable;
  public company;
  public rowselect;

  constructor(private PermitsService: PermitsService, private ListService: ListService) {
  }
  ngOnInit() {
    this.company = localStorage.getItem("company");

    this.list_profiles();
  }
  chebox(profile, tipo, permiso, event) {

    let value = event.target.checked;

    console.log(profile, tipo, permiso, value);

    let param = {
      'profile': profile,
      'permiso': tipo,
      'id_permiso': permiso,
      'value': value


    }
    this.PermitsService.search_update(param).subscribe(
      response => {

      },
      error => {
        console.log(error);
      }
    )
  }



  list_profiles() {
    let param = {
      'company': this.company,
    }
    this.ListService.list_profiles(param).subscribe(
      response => {
        this.rowselect = response.profiles;
      },
      error => {
        console.log(error);
      }
    )

  }

  select(event) {
    let profile = event.target.value;

    let param = {
      'company': this.company,
      'idprofile': profile,
    }
    this.PermitsService.search_submenu(param).subscribe(
      response => {
        this.rowDatatable = response.profiles;
      },
      error => {
        console.log(error);
      }
    )
  }
}
