import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ListService } from "../../services/list/list.service";
import "jquery-ui/ui/widgets/autocomplete";
import { AutocompleteService } from "../../services/autocomplete/autocomplete.service";
import { SerializerService } from "../../services/serializer/serializer.service";
import { PermitsService } from "../../services/permisos/permits.service";
import { DatatablesService } from "../../services/datatables/datatables.service";
import { datatables } from "../../utilitis/datatables";
import { massive_refund } from "../../services/massive-refund/massive_refund.service";
import $ from "jquery";
import { asNativeElements } from '@angular/core/src/debug/debug_node';
import swal from "sweetalert2";
@Component({
  selector: 'app-massive-withdrawals',
  templateUrl: './massive-withdrawals.component.html',
  styleUrls: ['./massive-withdrawals.component.scss'],
  providers: [
    ListService,
    AutocompleteService,
    SerializerService,
    DatatablesService,
    PermitsService,
    datatables,
    massive_refund


  ]
})
export class MassiveWithdrawalsComponent implements OnInit {

  @ViewChild('cellar3') textinput: ElementRef;

  public cellar;
  public company;
  public data = [];
  public data2 = [];
  public datos;
  public selectedName;
  public rowDatatable = [];;
  public Datatable;
  public total_reintegro;


  public cod;
  public encargado;
  public descri;
  public desp;
  public rein;
  public reinms;
  public id_encargado;
  public unity;
  public user;
  public consecutive;
  public idrefund_masive;


  public cellar3: number;
  public employees;
  public idemployees;

  constructor(private ListService: ListService,

    private AutocompleteService: AutocompleteService,
    private SerializerService: SerializerService,
    private datatableservice: DatatablesService,
    private PermitsService: PermitsService,
    private datatables: datatables,
    private mamassive_refund: massive_refund,
    private ElementRef: ElementRef

  ) { }

  ngOnInit() {

    this.company = localStorage.getItem("company");
    this.get_cellar(this.company);
    this.SerializerService.serializer();
    this.AutocompleteService.autocomplete_employee();
    this.jquery();
    this.user = JSON.parse(localStorage.getItem("user"));
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


  search_date() {


    let table = $("#search_refundemplo").serializeObject();

    this.datatableservice
      .get_datatables(table, "refund/massive_refound")
      .subscribe(
        response => {
          this.datos = response.search;

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

    let data1;
    let json = datos;
    for (data1 of json) {
      this.data.push(data1);
    }
    this.datatables.reInitDatatable("#massive_refound");
  }

  public addRow_search(datos): void {
    this.data2 = [];

    let data1;
    let json = datos;
    for (data1 of json) {
      this.data2.push(data1);
    }
    this.datatables.reInitDatatable("#table_search_massive");
  }


  public selectRow(index: number, row: any) {
    this.selectedName = row.cod_mater;



    this.descri = row.description;
    this.desp = row.despachos;
    this.rein = row.reintegrado
    this.desp = row.despacho;
    this.reinms = row.reintegrosmasivos;
    this.unity = row.name_Unity;

    this.Datatable =
      { cod_mater: this.selectedName, despachos: this.desp, descri: this.descri, total_reintegro: this.reinms, name_Unity: this.unity };


    var table = $('#refund_massive').serializeFormJSON();

    let data1;



    var var_cellar = (<HTMLInputElement>document.getElementById('cellar2')).value;
    this.employees = $('#employee').val();
    this.idemployees = $('#employeehiden').val();

    this.cellar3 = Number(var_cellar);


    for (data1 of table) {

      if (data1.cod_mater == this.selectedName) {

        return
      }


    }

    this.rowDatatable.push(this.Datatable);


  }


  delete(index, event) {

    this.rowDatatable.splice(index, 1);

  }

  insert() {

    var rawData = $('#refund_massive').serializeFormJSON();
    var formData = JSON.stringify(rawData);

    var table = $("#massive_head").serializeObject();

    let detail_massive = { body: formData, head: table, user: this.user.identification, company: this.company }

    this.mamassive_refund.insert(detail_massive).subscribe(
      res => {

        this.consecutive = res.consecutive;
        this.idrefund_masive = res.idrefund_masive;

        if (res.data = true) {

          swal("", "Se ha Creado correctamente el Ingreso", "success");
        }

      },
      error => {


      }
    )

  }

  search_massive_refund(){
    let table = $("#search_massive").serializeObject();

    console.log(table);


    this.datatableservice
      .get_datatables(table, "refund/search_massive")
      .subscribe(
        response => {
          this.datos = response.search_massive;

          this.addRow_search(this.datos);

        },
        error => {
          console.log(error);
        }
      );

  }

  jquery() {

    $(function () {
      $(document).on("keyup", ".item_actividad .refund", function (event) {

        let refund = Number($(this).parents(".item_actividad").find(".refund").val());

        let despachos = Number($(this).parents(".item_actividad").find(".despachos").val());

        let reintegros = Number($(this).parents(".item_actividad").find(".reintegros").val());

        let result = despachos - reintegros;

        if (refund > result) {
          $(this)
            .parents(".item_actividad")
            .find(".refund")
            .val('');
        }

      });
    });

  }
}
