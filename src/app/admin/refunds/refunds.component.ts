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


  public cellar;
  public company;
  public dispatches_move;
  public datos;
  public data = [];


  public move;
  public dispatche_cellar;
  public employee;
  public id_employee;
  public consec;
  public rowDatatable;

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

  select_dispatch(event) {

    let data = event.target.value.split(",");

    let json = {
      dispatche: data[0],
      consecutive: data[1],
      company: data[2]
    };

    this.RefundService.search_refund_unit(json).subscribe(

      res => {

        this.move = res.dispatche[0].dispatches_move;
        this.dispatche_cellar = res.dispatche[0].dispatches_cellar

        this.rowDatatable = res.dispatches_body;
        console.log(res);
      },
      error => {

      }
    );


  }
}
