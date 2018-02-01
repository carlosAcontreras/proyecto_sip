import { Component, OnInit } from "@angular/core";
import { ListService } from "../../services/list/list.service";
import { AutocompleteService } from "../../services/autocomplete/autocomplete.service";
import { DispatchesService } from "../../services/dispatches/dispatches.service";
import { SerializerService } from "../../services/serializer/serializer.service";
import { rowhear } from "../../models/dispatches_models";

import { from } from "rxjs/observable/from";
//import { PermitsService } from '../../services/permisos/permits.service';
import { PermitsService } from "../../services/permisos/permits.service";
import "jquery-ui/ui/widgets/datepicker";
import "jquery-ui/ui/widgets/autocomplete";
import { CustomValidators } from "ng2-validation";

import swal from "sweetalert2";
import $ from "jquery";

import { DatatablesService } from "../../services/datatables/datatables.service";
import { datatables } from "../../utilitis/datatables";
import { concat } from "rxjs/operators/concat";

@Component({
  selector: "app-dispatches",
  templateUrl: "./dispatches.component.html",
  styleUrls: ["./dispatches.component.scss"],
  providers: [
    ListService,
    AutocompleteService,
    DispatchesService,
    SerializerService,
    DatatablesService,
    PermitsService,
    datatables
  ]
})
export class DispatchesComponent implements OnInit {
  public dispatches_move;
  public cellar;
  public destination_dispatches;
  public rowDatatable = [];
  public company;
  public consecutive;
  public response;
  public buttoinsert;
  public btndisabled;
  public head = new rowhear();
  public data = [];
  public datos;
  public permisos;
  public user;
  public dispatches;
  public name_last;
  public bootom_save;
  public bootom_update;
  public buttonaddrow;
  public buttondelete;
  public bottonupdate;
  public bottoninsert;
  public inventary_quantity;
  public quantity;
  public stostock_plusck;

  constructor(
    private ListService: ListService,
    private AutocompleteService: AutocompleteService,
    private DispatchesService: DispatchesService,
    private SerializerService: SerializerService,
    private datatableservice: DatatablesService,
    private PermitsService: PermitsService,
    private datatables: datatables
  ) { }

  ngOnInit() {
    this.get_dispatches_move();
    this.company = localStorage.getItem("company");
    this.get_cellar(this.company);
    this.get_destination_dispatches();
    this.AutocompleteService.autocomplete_employee();
    this.AutocompleteService.autocomplete_material_description();
    this.AutocompleteService.autocomplete_material_code();
    this.SerializerService.serializer();
    this.operation_purchases();

    this.bottonupdate = true;
    this.bottoninsert = true;
    this.get_permits();

    this.permisos = this.PermitsService.getPermitsSubMenu("dispatches");
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  get_dispatches_move() {
    this.ListService.dispatches_move().subscribe(
      res => {
        this.dispatches_move = res.dispatches_move;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_permits() {
    this.PermitsService.getPermits(4, "dispatches");
  }

  get_cellar(idcompany) {
    this.ListService.cellar(this.company).subscribe(
      res => {
        this.cellar = res.cellar;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_destination_dispatches() {
    this.ListService.destination_dispatches().subscribe(
      res => {
        this.destination_dispatches = res.destination_dispatches;
      },
      error => {
        console.log(error);
      }
    );
  }

  addrowtable() {
    this.rowDatatable.push({});
  }

  insert() {
    if (this.permisos.save == 1) {
      var rawData = $("#table_dispatche").serializeFormJSON();
      var formData = JSON.stringify(rawData);

      var table = $("#head_dispatch").serializeObject();

      let income = {
        body: formData,
        head: table,
        user: this.user.identification
      };

      this.DispatchesService.insert(income).subscribe(
        res => {
          this.buttoinsert = false;

          this.consecutive = res.consecutive;

          this.response = res.data;

          if (this.response == true) {
            swal(
              "",
              "Se ha Guardado la Orden de Compra correctamente",
              "success"
            );
          }

          if (this.response == "") {
            swal(
              "",
              "Ha Ocurrido un Error Comuniquese al Area de Sistemas",
              "error"
            );
          }
        },
        error => {
          swal(
            "",
            "Ha Ocurrido un Error Comuniquese al Area de Sistemas",
            "error"
          );
          console.log(error);
        }
      );
    } else {
      swal("", "No Cuenta con Permiso Para Guardar", "error");
    }
  }

  update() {
    if (this.permisos.update == 1) {
      var rawData = $("#table_dispatche").serializeFormJSON();
      var formData = JSON.stringify(rawData);

      var table = $("#head_dispatch").serializeObject();
      let income = {
        body: formData,
        head: table,
        user: this.user.identification
      };

      this.DispatchesService.update(income).subscribe(
        res => {
          this.buttoinsert = false;

          this.response = res.dispatches;

          if (this.response == true) {
            swal(
              "",
              "Se ha Guardado la Orden de Compra correctamente",
              "success"
            );
          }

          if (this.response == "") {
            swal(
              "",
              "Ha Ocurrido un Error Comuniquese al Area de Sistemas",
              "error"
            );
          }
        },
        error => {
          swal(
            "",
            "Ha Ocurrido un Error Comuniquese al Area de Sistemas",
            "error"
          );
          console.log(error);
        }
      );
    } else {
      swal("", "No Cuenta con Permiso Para Atualizar", "error");
    }
  }

  operation_purchases() {
    $(function () {
      $(document).on("keyup", ".item_actividad .quantity", function (event) {
        let quantity = Number($(this).parents(".item_actividad").find(".quantity").val());


        let stock_plus = Number($(this).parents(".item_actividad").find(".stostock_plusck").val());


        if (quantity > stock_plus) {
          $(this)
            .parents(".item_actividad")
            .find(".quantity")
            .val(0);
        }
      });
    });
  }

  // funciona para buscar los despachos
  search_dispatche() {
    let table = $("#searc_dispatche").serializeObject();

    this.datatableservice
      .get_datatables(table, "dispatche/search_dispatches")
      .subscribe(
      response => {
        this.datos = response.dispatches;
        this.addRow(this.datos);
      },
      error => {
        console.log(error);
      }
      );
  }
  // funciones del datatable
  public addRow(datos): void {
    this.data = [];
    console.log(this.datos);
    let data1;
    let json = datos;
    for (data1 of json) {
      this.data.push(data1);
    }
    this.datatables.reInitDatatable("#table_dispatches");
  }

  handleClick(event) {
    let data = event.target.value.split(",");

    let json = {
      dispatche: data[0],
      consecutive: data[1]
    };

    this.DispatchesService.search_dispatche(json).subscribe(
      res => {
        this.head = res.dispatches;
        this.rowDatatable = res.dispatches_body;

        this.name_last = res.dispatches.name + " " + res.dispatches.last_name;
        this.consecutive = res.dispatches.dispatches_conse;

        this.bottonupdate = false;
        this.buttoinsert = true;

        this.inventary_quantity = res.dispatches_body[0].inventary_quantity;
        this.quantity = res.dispatches_body[0].quantity;
        this.stostock_plusck = Number(this.inventary_quantity + this.quantity);

        console.log(this.stostock_plusck);

        this.buttonaddrow = true;
        this.buttondelete = true;
      },
      error => {
        console.log(error);
      }
    );
  }
}
