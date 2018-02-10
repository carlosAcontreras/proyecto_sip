import { Component, OnInit, HostListener } from '@angular/core';
import { PermitsService } from '../../services/permisos/permits.service';
import { CompanyService } from '../../services/login/company.service';
import { ListService } from '../../services/list/list.service';
import swal from 'sweetalert2';
import { Employees } from '../../models/employees_models';
import { CustomValidators } from 'ng2-validation';
import $ from 'jquery';
import { SerializerService } from "../../services/serializer/serializer.service";
import { UserService } from '../../services/users/user.service';
import { AutocompleteService } from "../../services/autocomplete/autocomplete.service";

export enum KEY_CODE {
  TECLA_F2 = 113
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [PermitsService, CompanyService, ListService, SerializerService, UserService, AutocompleteService]
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
  public edad: number;
  public user;
  public employees: Employees;
  public user_identification;
  public btn_save: boolean;
  public btn_update: boolean;



  constructor(private AutocompleteService: AutocompleteService, private UserService: UserService, private SerializerService: SerializerService, private _PermitsService: PermitsService, private CompanyService: CompanyService, private ListService: ListService) {
    this.employees = new Employees();
  }

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
    this.SerializerService.serializer();
    this.AutocompleteService.autocomplete_user(this.employees);

  }




  /*Obtener los permisos del menu*/
  getPermits() {
    this._PermitsService.getPermits('11', 'users');
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
      },
      error => {
        console.log(error);
      }
    );
  }

  get_city(id) {
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
      },
      error => {
        console.log(error);
      }
    );

  }

  get_contracts(company) {
    let url = "list/contract";
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
      },
      error => {
        console.log(error);
      }
    );

  }

  calcular_anios(date) {
    if (date === '' || date === null || date === undefined) {
      this.edad = 0;
      swal('', 'por favor ingrese la fecha de nacimiento', 'info');
      return false;
    } else {
      var fechaNace = new Date(date);
      var fechaActual = new Date()
      var mes = fechaActual.getMonth();
      var dia = fechaActual.getDate();
      var año = fechaActual.getFullYear();
      fechaActual.setDate(dia);
      fechaActual.setMonth(mes);
      fechaActual.setFullYear(año);
      this.edad = Math.floor(((Number(fechaActual) - Number(fechaNace)) / (1000 * 60 * 60 * 24) / 365));
    }
  }

  abrir_procesos() {
    if (this.employees.Users_id_identification === undefined || this.employees.Users_id_identification === null) {
      swal("", "debe consultar un usuario", "info");
      return false;
    } else {
      this.user_identification = this.employees.Users_id_identification;
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.TECLA_F2) {
      if (this.employees.Users_id_identification === undefined) {
        swal('', 'por favor ingrese un numero de documento valido', 'error');
        return false;
      } else {
        let params = { 'identification': this.employees.Users_id_identification };
        this.query_users(params);
      }
    }
  }

  query_users(params) {
    this.UserService.consultar_users(params).subscribe(
      response => {
        if (response.data.length === 0) {
          swal("", "el usuario no se encuentra registrado", "info");
        } else {
          this.get_contracts(response.data[0].id_company);
          this.get_city(response.data[0].id_depart);
          this.employees = response.data[0];
          this.calcular_anios(this.employees.birth_date);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  //variables para almacenar el resultado de la imagen
  public filesToUploads;
  public resultUpload;

  //function para mostar la imagen 
  upload_file(fileInput: any) {
    this.filesToUploads = <Array<File>>fileInput.target.files;

    let file = this.filesToUploads[0],
      imageType = /image.*/;
    if (!file.type.match(imageType)) {
      swal("", "El tipo de archivo no es una imagen", "error");
      return false;
    }

    let reader = new FileReader();
    reader.onload = function (fileInput) {
      let result = fileInput.target.result;
      $('#imgSalida').attr("src", result);
    }
    reader.readAsDataURL(file);
    console.log(this.filesToUploads);
  }

  insert_user() {
    let permisos = JSON.parse(localStorage.getItem('users'));
    permisos = permisos.save;
    this.employees.image = this.filesToUploads != undefined ? this.filesToUploads[0].name : '';
    let params = { 'identification': this.employees.Users_id_identification };
    this.UserService.consultar_users(params).subscribe(
      response => {
        if (response.data.length !== 0) {
          swal("", "el usuario ya esta registrado", "info")
        } else {
          if (permisos !== 1) {
            swal("", "no tiene permisos para registrar usuarios", "error");
          } else {
            alert('enviando...');
            if (this.filesToUploads === undefined) {
              alert('sin imagen');
              this.validate_save_user();
            } else {
              alert('con imagen');
              this.upload_image();
            }
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  validate_save_user() {
    this.UserService.save_user(this.employees).subscribe(
      response => {
      }, error => {
      }
    )
  }

  upload_image() {
    this.UserService.upload_image(this.filesToUploads).then((response) => {
      this.validate_save_user();
      console.log(response);
    },
      (error) => {
        console.log(error);
      })
  }

}




