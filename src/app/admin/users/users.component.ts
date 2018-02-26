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
import { Contracts } from '../../models/contracts_models';
import { datatables } from "../../utilitis/datatables";
import { constantes } from '../../utilitis/constantes';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [PermitsService, CompanyService, ListService, SerializerService, UserService, AutocompleteService, Contracts, datatables, constantes]
})
export class UsersComponent implements OnInit {
  /*LISTAS*/
  public list_company: Array<any>;
  public list_departaments: Array<any>;
  public list_city: Array<any>;
  public list_sex: Array<any>;
  public list_account_type: Array<any>;
  public list_bank: Array<any>;
  public list_eps: Array<any>;
  public list_arl: Array<any>;
  public list_pension: Array<any>;
  public list_state: Array<any>;
  public list_charges: Array<any>;
  public list_clasificaciones: Array<any>;
  public list_education_level: Array<any>;
  public list_profiles: Array<any>;
  public list_place_of_work: Array<any>;
  public list_gangs: Array<any>;
  public list_contracts: Array<any>;
  public list_location: Array<any>;
  public list_civil_status: Array<any>;
  public list_type_contracts: Array<any>;
  public list_type_charge: Array<any>;

  /*MODELOS*/
  public employees: Employees;
  public datatables: datatables;
  public constantes: constantes;
  public contracts: Contracts;

  /*VARIABLES */
  public edad: number;
  public identification: number;
  public img_base = "../../assets/images/users.png";
  public url_image = this.img_base;
  public permisos: any;
  public data_table: any[];


  constructor(private AutocompleteService: AutocompleteService, private UserService: UserService, private SerializerService: SerializerService, private _PermitsService: PermitsService, private CompanyService: CompanyService, private ListService: ListService) {
    this.employees = new Employees();
    this.contracts = new Contracts();
    this.datatables = new datatables();
    this.constantes = new constantes;
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
    this.get_place_gangs();
    this.get_place_location();
    this.get_civil_status();
    this.get_municipality(5);
    this.get_type_contracts();
    this.datatables.initDatatable("#table_contracts");
    /*
    this.AutocompleteService.autocomplete_user(this.employees);
    */

  }

  /*OBTENER LOS PERMISOS DEL SUBMENU*/
  getPermits() {
    this._PermitsService.getPermits(this.constantes.SUBMENUS.Usuario, 'users');
    this.permisos = this._PermitsService.getPermitsSubMenu('users');
  }
  /*--FIN--*/


  /*OBTENER TODAS LAS LISTAS*/
  getCompany() {
    this.CompanyService.load_company().subscribe(res => { this.list_company = res; },
      error => { console.log(error); })
  }

  get_departments() {
    let url = "departamentos/departamentos";
    this.ListService.get_list(url).subscribe(res => { this.list_departaments = res.departments; },
      error => { console.log(error); });
  }

  get_city(id: number) {
    let params = { 'id_departamento': id };
    let url = "departamentos/municipios";
    this.ListService.get_list(url, params).subscribe(res => { this.list_city = res.municipality; },
      error => { console.log(error); });
  }

  get_municipality(id: number) {
    let params = { 'id_departamento': id };
    let url = "departamentos/municipios";
    this.ListService.get_list(url, params).subscribe(res => { this.list_place_of_work = res.municipality; },
      error => { console.log(error); });
  }

  get_sex() {
    let url = "list/sexo";
    this.ListService.get_list(url).subscribe(res => { this.list_sex = res.sexo; },
      error => { console.log(error); });
  }

  get_account_type() {
    let url = "list/account_type";
    this.ListService.get_list(url).subscribe(res => { this.list_account_type = res.account_type; },
      error => { console.log(error); });
  }
  get_bank() {
    let url = "list/bank";
    this.ListService.get_list(url).subscribe(res => { this.list_bank = res.bank; },
      error => { console.log(error); });
  }
  get_eps() {
    let url = "list/eps";
    this.ListService.get_list(url).subscribe(res => { this.list_eps = res.eps; },
      error => { console.log(error); });
  }
  get_arl() {
    let url = "list/arl";
    this.ListService.get_list(url).subscribe(res => { this.list_arl = res.arl; },
      error => { console.log(error); });
  }
  get_pension() {
    let url = "list/pensions";
    this.ListService.get_list(url).subscribe(res => { this.list_pension = res.pensions; },
      error => { console.log(error); });
  }

  get_state() {
    let url = "list/states";
    this.ListService.get_list(url).subscribe(res => { this.list_state = res.states; },
      error => { console.log(error); });
  }

  get_charges() {
    let url = "list/charges";
    let company = localStorage.getItem('company');
    let params = { 'company': company };
    this.ListService.get_list(url, params).subscribe(res => { this.list_charges = res.charges; },
      error => { console.log(error); });
  }

  get_clasificaciones() {
    let url = "list/clasificaciones";
    this.ListService.get_list(url).subscribe(res => { this.list_clasificaciones = res.clasificaciones; },
      error => { console.log(error); });
  }

  get_education_level() {
    let url = "list/education_level";
    this.ListService.get_list(url).subscribe(res => { this.list_education_level = res.education_level; },
      error => { console.log(error); });

  }
  get_profiles() {
    let url = "list/profiles";
    let company = localStorage.getItem('company');
    let params = { 'company': company };
    this.ListService.get_list(url, params).subscribe(res => { this.list_profiles = res.p_profiles; },
      error => { console.log(error); });

  }

  get_place_gangs() {
    let url = "list/gangs";
    let company = localStorage.getItem('company');
    let params = { 'company': company };
    this.ListService.get_list(url, params).subscribe(res => { this.list_gangs = res.gangs; },
      error => { console.log(error); });

  }

  get_contracts(company: number) {
    let url = "list/contract";
    let params = { 'company': company };
    this.ListService.get_list(url, params).subscribe(res => { this.list_contracts = res.contract; },
      error => { console.log(error); });

  }

  get_place_location() {
    let url = "list/location";
    let company = localStorage.getItem('company');
    let params = { 'company': company };
    this.ListService.get_list(url, params).subscribe(res => { this.list_location = res.location; },
      error => { console.log(error); });
  }

  get_civil_status() {
    let url = "list/civil_status";
    this.ListService.get_list(url).subscribe(res => { this.list_civil_status = res.civil_status; },
      error => { console.log(error); });
  }

  get_type_contracts() {
    let url = "list/type_contract";
    this.ListService.get_list(url).subscribe(res => { this.list_type_contracts = res.type_contract; },
      error => { console.log(error); });
  }

  get_type_charge(company: number) {
    let url = "list/type_charges";
    let params = { 'company': company };
    this.ListService.get_list(url, params).subscribe(res => { this.list_type_charge = res.type_charges; },
      error => { console.log(error); });
  }

  /*--FIN--*/


  /*FUNCTIONES QUE SE USAN DURANTE EL FLUJO DEL PROGRAMA*/
  /*CALCULAR LA FECHA*/
  calcular_anios(date) {
    if (date === '' || date === null || date === undefined) {
      this.employees.age = 0;
      return swal('', 'por favor ingrese la fecha de nacimiento', 'info');

    } else {
      const fechaNace = new Date(date),
        fechaActual = new Date(),
        mes = fechaActual.getMonth(),
        dia = fechaActual.getDate(),
        año = fechaActual.getFullYear();

      fechaActual.setDate(dia);
      fechaActual.setMonth(mes);
      fechaActual.setFullYear(año);
      this.employees.age = Math.floor(((Number(fechaActual) - Number(fechaNace)) / (1000 * 60 * 60 * 24) / 365));
    }
  }

  /*PRESIONAR LA TECLA F2 PARA CONSULAR*/
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.constantes.KEYBOARD.TECLA_F2) {
      if (this.employees.Users_id_identification === undefined ||
        this.employees.Users_id_identification === null) {
        return swal('', 'por favor ingrese un numero de documento valido', 'error');
      } else {
        let params = { 'identification': this.employees.Users_id_identification };
        this.consultar_usuario(params);
      }
    }
  }

  /*FUNCION PARA PREVISUALIZAR LA IMAGEN*/
  public filesToUploads;
  mostrar_imagen(event: any) {
    this.filesToUploads = <Array<File>>event.target.files;

    let file = this.filesToUploads[0],
      imageType = /image.*/;
    if (!file.type.match(imageType)) {
      event.target.value = '';
      this.url_image = this.img_base;
      return swal("", "El tipo de archivo no es una imagen", "error");
    }

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url_image = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  /*--FIN--*/


  /*FUNCION PARA CONSULTAR EL USUARIO*/
  consultar_usuario(params: any) {
    const ID_USER = this.employees.Users_id_identification;
    this.UserService.consultar_users(params).subscribe(
      response => {
        if (response.data.length === 0) {
          this.url_image = this.img_base;
          this.employees = this.employees = new Employees();
          this.employees.Users_id_identification = ID_USER;
          return swal("", "el usuario no se encuentra registrado", "info");
        } else {
          this.employees = response.data[0];
          this.url_image = 'http://192.168.1.126/public/images/' + this.employees.image;
        }
      }, error => { console.log(error); });
  }
  /*--FIN--*/


  /*FUNCION PARA ALMACEN LOS USUARIOS*/
  guardar_usuario() {
    const PERMISOS = JSON.parse(localStorage.getItem('users'));
    let params = { 'identification': this.employees.Users_id_identification };
    this.employees.image = this.filesToUploads != undefined ? this.filesToUploads[0].name : '';
    if (PERMISOS.save !== 1) {
      return swal("", "el usuario no cuenta con permisos", "error");
    } else {
      this.UserService.consultar_users(params).subscribe(
        response => {
          if (response.data.length !== 0) {
            return swal("", "el usuario ya esta registrado", "info");
          } else {
            if (this.filesToUploads === undefined) {
              this.insertar_usuario_sinImangen();
            } else {
              this.insertar_usuario_imagen();
            }
          }
        }, error => { console.log(error) }
      );
    }
  }
  /*--FIN--*/


  /*--FUNCION PARA ACTUALIZAR LOS USUARIOS--*/
  actualizar_usuario(usuario) {
    const PERMISOS = JSON.parse(localStorage.getItem('users'));
    this.employees.image = this.filesToUploads != undefined ? this.filesToUploads[0].name : this.employees.image;
    if (PERMISOS.update !== 1) {
      return swal("", "el usuario no cuenta con permisos", "error");
    } else {
      this.UserService.actualizar_users(this.employees).subscribe(
        response => {
          if (this.filesToUploads != undefined) {
            this.subir_imagen('usuario actualizado con exito');
          } else {
            swal("", "usuario actualizado con exito", "success")
          }
          let params = { 'identification': this.employees.Users_id_identification };
          this.consultar_usuario(params)
        }, error => { console.log(error) });
    }
  }
  /*--FIN--*/

  /*--FUNCION PARA OBTENER LA INFORMACION DEL USUARIO Y ALMACENRLO SI TIENE FOTO-*/
  insertar_usuario_imagen() {
    this.UserService.save_user(this.employees).subscribe(
      response => {
        if (response.idemploye !== '' || response.idemploye !== null || response.idemploye !== undefined) {
          this.employees.idemployees = response.idemploye;
          this.subir_imagen("usuario creado correctamente");
        } else {
          return swal("", "error al crear el usuario por favor cominicarse con el area de sistemas", "error");
        }
      }, error => {
        console.log(error);
      }
    )
  }
  /*--FIN--*/

  /*--FUNCION PARA OBTENER LA INFORMACION DEL USUARIO Y ALMACENRLO SIN FOTO-*/
  insertar_usuario_sinImangen() {
    this.UserService.save_user(this.employees).subscribe(
      response => {
        if (response.idemploye !== '' || response.idemploye !== null || response.idemploye !== undefined) {
          this.employees.idemployees = response.idemploye;
          swal("", "usuario creado correctamente", "success");
        } else {
          return swal("", "error al crear el usuario por favor cominicarse con el area de sistemas", "error");
        }
      }, error => { console.log(error); }
    )
  }
  /*--FIN--*/

  /*--SUBIR IMAGEN-*/
  subir_imagen(mensaje) {
    let resultado;
    this.UserService.upload_image(this.filesToUploads).then((response) => {
      resultado = response;
      if (resultado.data) {
        swal("", mensaje, "success");
      } else {
        return swal("", "la foto del usuario no fue almacenada, comuniquese con el area de sistemas", "info");
      }
    }, (error) => { console.log(error); })
  }
  /*--FIN--*/


  /*--FUCIONES PARA LOS CONTRATOS--*/
  /*FUNCION PARA LA DATATABLE*/
  // funciones del datatable
  public addRow(datos): void {
    this.data_table = [];
    for (let llenar_data of datos) {
      this.data_table.push(llenar_data);
    }
    this.datatables.reInitDatatable("#table_contracts");
  }
  /*FUNCION PARA CARGAR LOS CONTRATOS*/
  ver_contratos() {
    let params = { 'id_employee': this.employees.idemployees }
    this.UserService.getAll_contracts(params).subscribe(
      response => { this.addRow(response.contract); },
      error => { console.log(error); }
    )

  }

  /*FUNCION PARA ACTUALIZAR LOS CONTRATOS*/
  actualizar_contratos(id) {
    let params = { 'id_contract': id }
    let permisos = JSON.parse(localStorage.getItem('users'));
    if (permisos.update !== 1) {
      return swal("", "el usuario no tiene permisos para actualizar contratos", "error")
    } else {
      this.UserService.getId_contract(params).subscribe(
        response => {
          if (response.contract !== '' || response.contract !== undefined || response.contract !== null) {
            this.contracts = response.contract[0];
          } else {
            console.log("error al cargar el contrato");
          }
        }, error => { console.log(error) }
      )
    }
  }

  /*FUNCION PARA GUARDAR LOS CONTRATOS*/
  guardar_contratos() {
    let permisos = JSON.parse(localStorage.getItem('users'));
    if (permisos.save !== 1) {
      swal("", "no tiene permisos para crear contratos", "error");
    } else {
      this.contracts.id_employee = this.employees.idemployees;
      this.UserService.save_contracts(this.contracts).subscribe(
        response => {
          if (response.idcontrat !== '' || response.idcontrat !== null || response.idcontrat !== undefined) {
            swal("", "el contrato se creo correctamente", "success");
          } else {
            return swal("", "no se pudo crear en contrato, comuniquese con el area de sistemas", "error");
          }
        },
        error => { console.log(error); }
      )
    }
  }

  /*FUNCIONES PARA LOS PROCESOS DISCIPLINARIOS*/
  ver_dotacion() {

  }
  abrir_procesos() {

  }
}







