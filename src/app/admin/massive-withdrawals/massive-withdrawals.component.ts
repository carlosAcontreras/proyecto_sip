import { Component, OnInit } from '@angular/core';
import { ListService } from "../../services/list/list.service";
import "jquery-ui/ui/widgets/autocomplete";
import { AutocompleteService } from "../../services/autocomplete/autocomplete.service";
import { SerializerService } from "../../services/serializer/serializer.service";
import { PermitsService } from "../../services/permisos/permits.service";
import { DatatablesService } from "../../services/datatables/datatables.service";
import { datatables } from "../../utilitis/datatables";
<<<<<<< HEAD
=======
import { massive_refund } from "../../services/massive-refund/massive_refund.service";
>>>>>>> 1fdf35656f801e0ddfcbb4e11e3ca5ed201c2683
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
<<<<<<< HEAD
=======
    massive_refund
>>>>>>> 1fdf35656f801e0ddfcbb4e11e3ca5ed201c2683


  ]
})
export class MassiveWithdrawalsComponent implements OnInit {


  public cellar;
  public company;
  public data = [];
  public datos;
  public selectedName;
<<<<<<< HEAD


  public cod_mater;
  public encargado;
  public descripcion;
  public despachos;
  public reintegros;
  public reintegros_masivo;
  public id_encargado;
=======
  public rowDatatable = [];;
  public Datatable;
  public  total_reintegro;


  public cod;
  public encargado;
  public descri;
  public desp;
  public rein;
  public reinms;
  public id_encargado;
  public unity;
  public user;


>>>>>>> 1fdf35656f801e0ddfcbb4e11e3ca5ed201c2683

  constructor(private ListService: ListService,

    private AutocompleteService: AutocompleteService,
    private SerializerService: SerializerService,
    private datatableservice: DatatablesService,
    private PermitsService: PermitsService,
    private datatables: datatables,
<<<<<<< HEAD
=======
    private mamassive_refund:massive_refund
>>>>>>> 1fdf35656f801e0ddfcbb4e11e3ca5ed201c2683

  ) { }

  ngOnInit() {

    this.company = localStorage.getItem("company");
    this.get_cellar(this.company);
    this.SerializerService.serializer();
<<<<<<< HEAD
=======
    this.AutocompleteService.autocomplete_employee();
    this.jquery();
    this.user = JSON.parse(localStorage.getItem("user"));
>>>>>>> 1fdf35656f801e0ddfcbb4e11e3ca5ed201c2683
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
<<<<<<< HEAD
=======
      console.log(data1);
>>>>>>> 1fdf35656f801e0ddfcbb4e11e3ca5ed201c2683
      this.data.push(data1);
    }
    this.datatables.reInitDatatable("#massive_refound");
  }

  public selectRow(index: number, row: any) {
<<<<<<< HEAD
    this.selectedName = "row#" + index + " " + row.cod_mater;


    console.log(this.selectedName);
=======
    this.selectedName =  row.cod_mater;
    console.log(index);

    
    this.descri=row.description;
    this.desp=row.despachos;
    this.rein=row.reintegrado
    this.desp=row.despacho;
    this.reinms=row.reintegrosmasivos;
    this.unity=row.name_Unity;
    
    this.Datatable=
{cod_mater:this.selectedName, despachos:this.desp,  descri:this.descri, total_reintegro:this.reinms, name_Unity:this.unity};


var table = $('#refund_massive').serializeFormJSON();
console.log(table);
let data1;

for (data1 of table) {

  if(data1.cod_mater==this.selectedName)
  {
    console.log('codigo repetido');

    return 
>>>>>>> 1fdf35656f801e0ddfcbb4e11e3ca5ed201c2683
  }


}

this.rowDatatable.push(this.Datatable);


  }


  delete(index, event) {

      this.rowDatatable.splice(index, 1);

  }

  insert(){

    var rawData = $('#refund_massive').serializeFormJSON();
    var formData = JSON.stringify(rawData);

    var table = $("#massive_head").serializeObject();

    let detail_massive = { body: formData, head: table, user: this.user.identification, company: this.company }

    this.mamassive_refund.insert(detail_massive).subscribe(
      res=>{

      },
      error=>{


      }
    )

  }

  jquery(){

    $(function () {
      $(document).on("keyup", ".item_actividad .refund", function (event) {

        let refund = Number($(this).parents(".item_actividad").find(".refund").val());

        let despachos = Number($(this).parents(".item_actividad").find(".despachos").val());

        let reintegros = Number($(this).parents(".item_actividad").find(".reintegros").val());

        let result = despachos-reintegros;

        if(refund > result){
          $(this)
          .parents(".item_actividad")
          .find(".refund")
          .val('');
        }

      });
    });

}
}
