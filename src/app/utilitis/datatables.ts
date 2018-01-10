import $ from 'jquery';
import 'datatables.net-bs4/js/dataTables.bootstrap4';

export class datatables {
    constructor() { }

    datatables_init(table) {
        $(document).ready(function () {
            $(table).DataTable({
                "zeroRecords": "NO HAY RESULTADOS",
                "lengthMenu": [[5, 10, 50, 100, -1], [5, 10, 50, 100, "Todo"]],
                "language": {
                    "paginate": {
                        "first": "Primera",
                        "last": "Última ",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    },
                    "lengthMenu": "MOSTRAR _MENU_",
                    "emptyTable": "No hay datos disponibles en la tabla",
                    "search": "BUSCAR"
                }
            });
        });
    }
}