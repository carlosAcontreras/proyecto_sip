import { Component, OnInit } from '@angular/core';
import { ListService } from "../../services/list/list.service";
import { AutocompleteService } from "../../services/autocomplete/autocomplete.service";
import { SerializerService } from "../../services/serializer/serializer.service";
import { PermitsService } from "../../services/permisos/permits.service";
import { DatatablesService } from "../../services/datatables/datatables.service";
import { datatables } from "../../utilitis/datatables";
import { RefundService } from "../../services/refund/refund.service";
import swal from "sweetalert2";
import $ from "jquery";
import "jquery-ui/ui/widgets/autocomplete";
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.scss'],
  providers: [
    ListService,
    AutocompleteService,
    SerializerService,
    DatatablesService,
    PermitsService,
    datatables,
    RefundService
  ]
})
export class RefundsComponent implements OnInit {



  public company;
  public dispatches_move;
  public datos;
  public data = [];
  public data_refund = [];
  public destination_dispatches;




  public employee;
  public id_employee;
  public consec;
  public rowDatatable;

  public cellar;
  public dispatche_cellar;
  public move;
  public consec_workI;
  public dispatches_conse;
  public date;
  public destino;
  public incharge;
  public iddispatches;
  public idemployees;
  public name;
  public idrefund;

  public permisos;
  public user;

  public consec_refund;



  constructor(
    private ListService: ListService,
    private AutocompleteService: AutocompleteService,
    private SerializerService: SerializerService,
    private datatableservice: DatatablesService,
    private PermitsService: PermitsService,
    private datatables: datatables,
    private RefundService: RefundService
  ) { }

  ngOnInit() {

    this.company = localStorage.getItem("company");
    this.get_cellar(this.company);
    this.get_dispatches_move();
    this.AutocompleteService.autocomplete_employee();
    this.AutocompleteService.autocomplete_material_description();
    this.AutocompleteService.autocomplete_material_code();
    this.SerializerService.serializer();
    this.get_destination_dispatches();
    this.permisos = this.PermitsService.getPermitsSubMenu("Refund");
    this.user = JSON.parse(localStorage.getItem("user"));
    this.get_permits();
    this.javascript();
  }

  get_permits() {
    this.PermitsService.getPermits(5, "Refund");
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

  // funcion para buscar los despachos
  search_date() {

    let table = $("#search_date").serializeObject();

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

  // funcion para buscar los reintegros
  search_date_refund() {

    let table = $("#search_date_refund").serializeObject();

    this.datatableservice
      .get_datatables(table, "refund/search_date_refund")
      .subscribe(
      response => {
        this.datos = response.income;
        this.addRow_refund(this.datos);
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
    this.datatables.reInitDatatable("#table_dispatche");
  }

  public addRow_refund(datos): void {
    this.data_refund = [];
    console.log(this.datos);
    let data1;
    let json = datos;
    for (data1 of json) {
      this.data_refund.push(data1);
    }
    this.datatables.reInitDatatable("#search_table");
  }

  // funcion para seleccionar el despacho
  select_dispatch(event) {

    let data = event.target.value.split(",");

    let json = {
      dispatche: data[0],
      consecutive: data[1],
      company: data[2]
    };

    this.RefundService.search_refund_unit(json).subscribe(

      res => {

        this.move = res.dispatches.dispatches_move;
        this.dispatche_cellar = res.dispatches.dispatches_cellar

        this.consec_workI = res.dispatches.consec_workI;
        this.dispatches_conse = res.dispatches.dispatches_conse;
        this.date = res.dispatches.dispatches_date;
        this.destino = res.dispatches.dispatches_destino;
        this.incharge = res.dispatches.dispatches_incharge;
        this.iddispatches = res.dispatches.iddispatches;
        this.idemployees = res.dispatches.idemployees;

        this.name = res.dispatches.name + ' ' + res.dispatches.last_name;

        this.rowDatatable = res.dispatches_body;

      },
      error => {

      }
    );


  }


  // funcion para insertar 
  insert() {

    var rawData = $("#body_refund").serializeFormJSON();

    var formData = JSON.stringify(rawData);

    var table = $("#head_refund").serializeObject();



    let income = {
      body: formData,
      head: table,
      user: this.user.identification,
      company: this.company
    };

    if (this.permisos.save == 1) {

      this.RefundService.insert(income).subscribe(
        res => {

          this.consec_refund = res.consecutive;
          if (res.data == true) {
            swal(
              "",
              "Se ha Guardado El Reintegro",
              "success"
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
      )

      console.log(income)
    } else {

      swal("", "No Cuenta con Permiso Para Guardar", "error");

    }

  }


  select_refound(event) {

    let data = event.target.value.split(",");

    let json = {
      idrefund: data[0],
      refund_conse: data[1],
      refund_company: data[2]
    };

    console.log(json)

    this.RefundService.search_refund(json).subscribe(
      res => {
        this.rowDatatable = res.search_body;

        this.move = res.search_head.refund_move;
        this.dispatche_cellar = res.search_head.refund_cellar

        this.consec_workI = res.search_head.refund_workI;
        this.dispatches_conse = res.search_head.consec_dispatch;
        this.date = res.search_head.refund_date;
        this.destino = res.search_head.refund_destino;
        this.incharge = res.search_head.refund_incharge;
        this.idrefund = res.search_head.idrefund;
        this.idemployees = res.search_head.refund_incharge;

        this.name = res.search_head.name + ' ' + res.search_head.last_name;
        this.consec_refund = res.search_head.refund_conse;


      },
      error => {

      }
    )

  }

  update() {


    if (this.permisos.update == 1) {

      var rawData = $("#body_refund").serializeFormJSON();

      var formData = JSON.stringify(rawData);

      var table = $("#head_refund").serializeObject();



      let refund = {
        body: formData,
        head: table,
        user: this.user.identification,
        company: this.company

      };

      this.RefundService.update_refund(refund).subscribe(

        res => {

          if (res.data = true) {
            swal(
              "",
              "Se ha Atualizado El Reintegro",
              "success"
            );

          }

        }, error => {
          swal(
            "",
            "Ha Ocurrido un Error Comuniquese al Area de Sistemas",
            "error"
          );
        }
      )

    }
    else {
      swal("", "No Cuenta con Permiso Para Atualizar", "error");
    }

  }

  javascript() {

    $(function () {
      $(document).on("keyup", ".item_actividad .refund", function (event) {

        let refund = Number($(this).parents(".item_actividad").find(".refund").val());

        let quantity = Number($(this).parents(".item_actividad").find(".quantity").val());

        let refundStock = Number($(this).parents(".item_actividad").find(".refundStock").val());

        let inventary_quantity = Number($(this).parents(".item_actividad").find(".inventary_quantity").val());
        //let stock_plus = Number($(this).parents(".item_actividad").find(".stostock_plusck").val());

        if (refund > quantity) {
          $(this)
            .parents(".item_actividad")
            .find(".refund")
            .val('');

        }
        if (refund < 0) {
          $(this)
            .parents(".item_actividad")
            .find(".refund")
            .val('');

        }
        if (refund < refundStock) {

          var v = Number(refundStock - refund);
          console.log(refund)
          console.log(refundStock)
          console.log(v)

        }

        if (v > inventary_quantity) {

          Number($(this).parents(".item_actividad").find(".refund").val(''))
        }



      });
    });
  }

}
