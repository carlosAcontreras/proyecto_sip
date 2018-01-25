import $ from 'jquery';
import 'datatables.net-bs4/js/dataTables.bootstrap4';

export class datatables {
  constructor() { }

  public tableWidget: any;


  public initDatatable(table): void {

    let exampleId: any = $(table);
    this.tableWidget = exampleId.DataTable({
      select: true,
      lengthMenu: [[5, 10, 50, 100, -1], [5, 10, 50, 100, "Todo"]],
      zeroRecords: "NO HAY RESULTADOS",

      language: {
        "paginate": {
          "first": "Primera",
          "last": "Última ",
          "next": "Siguiente",
          "previous": "Anterior"
        },
        lengthMenu: "MOSTRAR _MENU_",
        emptyTable: "No hay datos disponibles en la tabla",
        search: "BUSCAR"
      }

    })

  }



  public reInitDatatable(table): void {
    if (this.tableWidget) {
      this.tableWidget.destroy()
      this.tableWidget = null

    }
    setTimeout(() => this.initDatatable(table), 0)
  }
}