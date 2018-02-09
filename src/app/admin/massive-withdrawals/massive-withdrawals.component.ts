import { Component, OnInit } from '@angular/core';
import { ListService } from "../../services/list/list.service";
import "jquery-ui/ui/widgets/autocomplete";
import { AutocompleteService } from "../../services/autocomplete/autocomplete.service";
import { SerializerService } from "../../services/serializer/serializer.service";
import { PermitsService } from "../../services/permisos/permits.service";
import { DatatablesService } from "../../services/datatables/datatables.service";
import { datatables } from "../../utilitis/datatables";
import $ from "jquery";

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


  ]
})
export class MassiveWithdrawalsComponent implements OnInit {


  public cellar;
  public company;
  public data = [];
  public datos;
  public selectedName;

  constructor(private ListService: ListService,

    private AutocompleteService: AutocompleteService,
    private SerializerService: SerializerService,
    private datatableservice: DatatablesService,
    private PermitsService: PermitsService,
    private datatables: datatables,

  ) { }

  ngOnInit() {

    this.company = localStorage.getItem("company");
    this.get_cellar(this.company);
    this.SerializerService.serializer();
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
        console.log(this.datos)
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

  public selectRow(index: number, row: any) {
    this.selectedName = "row#" + index + " " + row.cod_mater;

    console.log(this.selectedName);
  }

}
