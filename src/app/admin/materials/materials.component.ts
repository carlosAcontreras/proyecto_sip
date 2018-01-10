import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { materialsModel } from '../../models/materials_model';
import { MaterialsListService } from '../../services/materials/materials-list.service';
import { MaterialsService } from '../../services/materials/materials.service';
import { CustomValidators } from 'ng2-validation';
import swal from 'sweetalert2';
import { PermitsService } from '../../services/permisos/permits.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss'],
  providers: [materialsModel, MaterialsListService, MaterialsService, PermitsService]
})
export class MaterialsComponent implements OnInit {


  private material_models;
  public list_status: any[];
  public list_type: any[];
  public list_unity: any[];
  private search_codigo: string;
  private materials_permits;
  private permisos: any[];

  constructor(private material_list: MaterialsListService, private material_service: MaterialsService,
    private PermisosService: PermitsService) {
    this.material_models = new materialsModel();
    this.search_codigo = "/api/material/autocomplete?term=:keyword";
  }

  ngOnInit() {
    this.get_material_list();
    this.getPermits();
  }

  valueChanged(newVal) {
    if (newVal.idmateriales !== undefined)
      this.material_models = newVal;
  }

  /*consultar la lista de opciones de los materiales*/
  get_material_list() {
    this.material_list.get_list().subscribe(
      res => {
        this.list_status = res.states;
        this.list_type = res.Type_input;
        this.list_unity = res.Unity;
      },
      error => {
        console.log(error);
      }
    )
  }

  /*crear un nuevo material*/
  save_materials(params: materialsModel) {
    this.material_service.save_materials(params).subscribe(
      response => {
        let res = response;
        if (res.data === true) {
          swal("", "material creado con exito", "success");
          return;
        } else {
          swal("", "error al crear el material", "error");
          return false;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  /*consultar materiales*/
  query_materials(params: materialsModel) {
    this.material_service.query_materials(params).subscribe(
      response => {
        if (response.data === true) {
          swal("", "el material ya se encuenta registrado", "error");
          return false;
        } else {
          this.save_materials(params);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  /*actualizar materials*/
  update_materials(params: materialsModel) {
    this.material_service.update_materials(params).subscribe(
      response => {
        console.log(response)
        if (response.data === true) {
          swal("", "material actializado corrextamente", "success");
        } else {
          swal("", "no se pudo actualizar el material", "error");
        }
      },
      error => {
        console.log(error);
      }
    )

  }

  /*eliminar el material*/
  delete_materials(params: materialsModel) {
    console.log(params)
    this.material_service.delete_materials(params).subscribe(
      response => {
        if (response.data === true) {
          swal("", "material eliminado corrextamente", "success");
        } else {
          swal("", "no se pudo eliminar el material", "error");
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  /*Obtener los permisos del menu*/
  getPermits() {
    this.PermisosService.getPermits('1', 'materials');
    this.permisos = this.PermisosService.getPermitsSubMenu('materials');
    console.log(this.permisos);
  }

}


