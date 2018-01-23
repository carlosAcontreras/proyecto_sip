import { Component, OnInit } from '@angular/core';

import { AutocompleteService } from '../../services/autocomplete/autocomplete.service';
import { SerializerService } from '../../services/serializer/serializer.service';
import { PurchasesService } from '../../services/purchases/purchases.service';

import swal from 'sweetalert2';
import { IncomeService } from '../../services/income/income.service';

import { ListService } from '../../services/list/list.service';




import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/ui/widgets/autocomplete';

import $ from 'jquery';
declare var number_format: any;

import { DatatablesService } from '../../services/datatables/datatables.service';
import { datatables } from '../../utilitis/datatables';

@Component({
    selector: 'app-income',
    templateUrl: './income.component.html',
    styleUrls: ['./income.component.scss'],
    providers: [ListService, AutocompleteService, DatatablesService, datatables, SerializerService, PurchasesService, IncomeService]
})
export class IncomeComponent implements OnInit {

    public moves_income: any;
    public company;
    public cellar;
    public data = [];
    public dataincome = [];

    public rowDatatable = [];
    public datos;
    public selectedName: string = "";
    public buttonaddrow;
    public buttoinsert;

    public state_moves;
    public response;
    public buttonDisabled;
    public buttonUpdate;

    //variables para el retorno de datos consulta por compras

    public consecutive_purc;
    public providers_name;
    public provider;
    public purchases_state_purc;
    public purchases_cellar;


    //variables para el retorno de datos consuctivo y otros datos del ingreso
    public income_conse;

    public income_remission;
    public income_invoice;
    public income_date;
    public income_date_delivery;
    public income_observations;
    public idincome;
    public idincome_move;
    public delete;







    constructor(

        private AutocompleteService: AutocompleteService,
        private datatableservice: DatatablesService,
        private datatables: datatables,
        private SerializerService: SerializerService,
        private PurchasesService: PurchasesService,
        private IncomeService: IncomeService,
        private ListService: ListService) { }

    ngOnInit() {
        this.buttonUpdate = true;
        this.company = localStorage.getItem('company');
        this.get_moves_income();
        this.get_cellar(this.company);
        this.AutocompleteService.autocomplete_provider();
        this.AutocompleteService.autocomplete_code_provider();
        this.SerializerService.serializer();
        this.rowDatatable = [{}];
        this.operation_purchases();
        this.get_state_movest();

        this.datatables.initDatatable('#search_purchases');


        $('#income_date').datepicker({ dateFormat: 'yy-mm-dd' });
        $('#income_date_delivery').datepicker({ dateFormat: 'yy-mm-dd' });

        $('#start_date').datepicker({ dateFormat: 'yy-mm-dd' });
        $('#end_date').datepicker({ dateFormat: 'yy-mm-dd' });

        $('#income_start_date').datepicker({ dateFormat: 'yy-mm-dd' });
        $('#income_end_date').datepicker({ dateFormat: 'yy-mm-dd' });

    }

    // funcion para consultar la lista de movimientos
    get_moves_income() {
        this.ListService.moves_income().subscribe(
            res => {
                this.moves_income = res.moves_income;
            },
            error => {
                console.log(error);
            }
        )
    }


    // funcion para consutar la lista de almaenes 
    get_cellar(idcompany) {
        this.ListService.cellar(this.company).subscribe(
            res => {
                this.cellar = res.cellar;
            },
            error => {
                console.log(error);
            }
        )
    }


    //funcion para consultar los estados de compras y ingresos
    get_state_movest() {
        this.ListService.state_moves().subscribe(
            res => {
                this.state_moves = res.state_moves;
            },
            error => {
                console.log(error);
            }
        )
    }


    // funciones para agregar registros a la tabla de busqueda de compras
    addRow(datos): void {
        this.data = [];
        console.log(this.datos);
        let data1;
        let json = datos;
        for (data1 of json) {
            this.data.push(data1)
        }
        this.datatables.reInitDatatable('#search_purchases');
    }


    // funcion para agregar la tabla a la busqueda de ingresos
    addRow_income(datos): void {
        this.dataincome = [];
        console.log(this.datos);
        let data1;
        let json = datos;
        for (data1 of json) {
            this.dataincome.push(data1)
        }
        this.datatables.reInitDatatable('#searctable_income');
    }



    // funciona para buscar las ordenes de compras 
    search_purchases() {

        var table = $('#date_purchases').serializeObject();

        this.datatableservice.get_datatables(table, '/purchase/search').subscribe(
            response => {

                this.datos = response.purchases;
                this.addRow(this.datos);
            },
            error => {
                console.log(error);
            }
        );
    }


    serach_income() {

        var table = $('#searc_income').serializeObject();

        this.datatableservice.get_datatables(table, '/income/search_date').subscribe(
            response => {

                this.datos = response.income;
                this.addRow_income(this.datos);
            },
            error => {
                console.log(error);
            }
        );
    }


    public selectRow(index: number, row: any) {
        this.selectedName = "row#" + index + " " + row.consecutive_purc
    }



    // funcion para el boton de seleccionar en la ventana modal
    seleccionar(event) {

        let data = event.target.value.split(",");

        let json = {
            'id_company': data[2],
            'consecutive': data[1],
            'idpurchases': data[0]
        }

        this.PurchasesService.search_purchases_unit(json).subscribe(
            res => {

                this.buttonaddrow = false;

                this.consecutive_purc = res.purchases.consecutive_purc;
                this.providers_name = res.purchases.providers_name;
                this.provider = res.purchases.provider;
                this.purchases_state_purc = res.purchases.purchases_state_purc;
                this.purchases_cellar = res.purchases.purchases_cellar;

                this.rowDatatable = res.detail_purchases;


            },
            error => {
                console.log(error);
            }
        )


    }

    // funcion para el boton de seleccionar en la ventana modal de buscar ingresos
    seleccionar_income(event) {

        this.buttoinsert = true;
        this.buttonUpdate = false;

        let data = event.target.value.split(",");

        let json = {
            'id_company': data[2],
            'consecutive': data[1],
            'idincome': data[0]
        }

        this.IncomeService.serach_income(json).subscribe(
            res => {



                this.consecutive_purc = res.income.income_idpurchases;

                this.providers_name = res.income.providers_name;

                this.provider = res.income.provider;

                this.purchases_state_purc = res.income.income_state;

                this.purchases_cellar = res.income.income_cellar;



                this.income_remission = res.income.income_remission;
                this.income_invoice = res.income.income_invoice;
                this.income_date = res.income.income_date;
                this.income_date_delivery = res.income.income_date_delivery;
                this.income_observations = res.income.income_observations;
                this.income_conse = res.income.income_conse
                this.idincome = res.income.idincome;
                this.idincome_move = res.income.income_move;


                if (this.idincome_move == 1) {

                    this.buttonaddrow = false;
                    this.delete = true;
                    console.log(1);
                }


                this.rowDatatable = res.detail_income;


            },
            error => {
                console.log(error);
            }
        )


    }

    // funcion para agregar tr a la tabla
    addrowtable() {

        this.rowDatatable.push({

        })
    }


    // funcion para insertar los ingresos
    insert_income() {


        var rawData = $('#table_income').serializeFormJSON();
        var formData = JSON.stringify(rawData);

        var table = $('#income').serializeObject();

        let income = { body: formData, head: table }



        this.IncomeService.insert(income).subscribe(
            res => {

                this.buttoinsert = false;
                this.income_conse = res.income_conse;

                this.response = res.data;

                if (this.response == true) {



                    swal("", "Se ha Guardado la Orden de Compra correctamente", "success");

                }

                if (this.response == '') {

                    swal("", "Ha Ocurrido un Error Comuniquese al Area de Sistemas", "error");

                }
            },
            error => {
                swal("", "Ha Ocurrido un Error Comuniquese al Area de Sistemas", "error");
                console.log(error);
            }
        )

    }


    editpurchase(event) {

        let idpurchase = event.target.value.split(",");

        let json = {

            'idpurchase': idpurchase[0],
            'cantidad': idpurchase[1]
        }
        console.log(json);


        this.IncomeService.editpurchase(json).subscribe(
            res => {


            },
            error => {

                swal("", "Ha Ocurrido un Error Comuniquese al Area de Sistemas", "error");
                console.log(error);
            }
        )
    }

    // funcion de atualizar
    update_income() {

        var rawData = $('#table_income').serializeFormJSON();
        var formData = JSON.stringify(rawData);

        var table = $('#income').serializeObject();

        let income = { body: formData, head: table }



        this.IncomeService.update(income).subscribe(
            res => {

                this.response = res.data;


                if (this.response == true) {



                    swal("", "Se ha Guardado la Orden de Compra correctamente", "success");

                }

                if (this.response == '') {

                    swal("", "Ha Ocurrido un Error Comuniquese al Area de Sistemas", "error");

                }
            },
            error => {
                swal("", "Ha Ocurrido un Error Comuniquese al Area de Sistemas", "error");
                console.log(error);
            }
        )


    }

    // funcion para las operaciones de cada fila de la tabla 
    operation_purchases() {

        $(function () {

            $(document).on('keyup', '.item_actividad .amount_receipt', function (event) {

                let requested_amount = Number($(this).parents(".item_actividad").find(".request_amount").val());
                let quantity = $(this).val();

                let unit_value = $(this).parents(".item_actividad").find(".unit_value").val();
                let discount = $(this).parents(".item_actividad").find(".discount").val();
                let iva = $(this).parents(".item_actividad").find(".iva").val();

                if (quantity > requested_amount) {
                    console.log(requested_amount)
                    console.log('mayor');
                    $(this).val(0);
                }

                // descuento
                let discount1 = isNaN(parseFloat(discount)) ? 0 : discount

                // formula para sacar el descuento
                let total_discount = (parseFloat(unit_value) * parseFloat(discount1) / 100).toFixed(2);

                // valor de cada material con el descuento
                let vlr_discount = (parseFloat(unit_value) - parseFloat(total_discount)).toFixed(2);

                //iva de cada producto
                let total_iva = (parseFloat(vlr_discount) * parseFloat(iva) / 100).toFixed(2);

                // valor de cada producto con iva
                let total_vlrdiscount = (parseFloat(vlr_discount) + parseFloat(total_iva)).toFixed(2);
                // cantidad por el valor unitario incluido el descuento
                let vlr_iva = (parseFloat(quantity) * parseFloat(vlr_discount)).toFixed(2);

                let subtotal = isNaN(parseFloat(vlr_iva)) ? 0 : vlr_iva


                let vrl_c_iva = number_format(total_vlrdiscount, 2);
                let vrl_subtotal = number_format(subtotal, 2)


                $(this).parents(".item_actividad").find(".vlr_iva").html(vrl_c_iva);
                $(this).parents(".item_actividad").find(".vlr_total").html(vrl_subtotal);

                total();



            });

        })

        // funcion para calcular el total de cada tabla
        function total() {
            var rawData = $('#table_income').serializeFormJSON();
            var vrl_iva = 0;
            let subtotal = 0;
            let data: any;

            for (data of rawData) {

                let unit_value = isNaN(data.unit_value) ? 0 : data.unit_value;
                let amount_receipt = isNaN(data.amount_receipt) ? 0 : data.amount_receipt;
                let discount = isNaN(data.discount) ? 0 : data.discount;
                let iva = isNaN(data.iva) ? 0 : data.iva;


                // el descuento 
                let total_discount = (Number(unit_value) * Number(discount) / 100).toFixed(2);


                // valor de cada material con el descuento
                let vlr_discount = (Number(unit_value) - Number(total_discount)).toFixed(2);

                //iva de cada producto
                let total_iva = (Number(vlr_discount) * Number(iva) / 100).toFixed(2);

                // cantidad por cada producto 
                let vlr_subtotal = (Number(amount_receipt) * Number(vlr_discount)).toFixed(2);

                // iva de cada producto * las cantidades
                let c = (Number(amount_receipt) * Number(total_iva)).toFixed(2);


                // suma de los valores del iva
                vrl_iva += Number(c);

                // sama de los subotales
                subtotal += Number(vlr_subtotal);

            }


            let total = (Number(vrl_iva) + Number(subtotal)).toFixed(2);

            let sub_total = number_format(subtotal, 2)
            let sub_iva = number_format(vrl_iva, 2)
            let total1 = number_format(total, 2)


            $('.sub_total').html(sub_total)
            $('.sub_iva').html(sub_iva)
            $('.total').html(total1)
        }
    }
}


