import { Component, OnInit, ChangeDetectorRef, ElementRef, HostListener } from '@angular/core';
import { ListService } from '../../services/list/list.service';
import { AutocompleteService } from '../../services/autocomplete/autocomplete.service';
import { SerializerService } from '../../services/serializer/serializer.service';
import { PurchasesService } from '../../services/purchases/purchases.service';
import { purchases_head } from '../../models/purchases_model';
import { PermitsService } from '../../services/permisos/permits.service';
import swal from 'sweetalert2';
declare var number_format: any;
declare var add: any;
import $ from 'jquery';
declare var validateDate: any;
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/ui/widgets/autocomplete';
import { CustomValidators } from 'ng2-validation';

import { DatatablesService } from '../../services/datatables/datatables.service';
import { datatables } from '../../utilitis/datatables';
@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.scss'],
    providers: [ListService, AutocompleteService, SerializerService, DatatablesService, PurchasesService, PermitsService]
})

export class PurchasesComponent implements OnInit {

    public state_moves;
    public cellar;
    public idcompany = 1;
    public consecutive;
    public company;
    public response;
    public buttonDisabled;
    public buttonUpdate;
    private datatables;
    public datos;
    public tableWidget: any;

    public selectedName: string = "";
    public purchases;
    public detail_purchases;
    public head = new purchases_head();
    public permisos;
    public validateHead = new purchases_head();

    public text: String;
    public data =
        [];


    constructor(
        private ListService: ListService,
        private AutocompleteService: AutocompleteService,
        private SerializerService: SerializerService,
        private changeDetectorRef: ChangeDetectorRef,
        private datatableservice: DatatablesService,
        private eRef: ElementRef,
        private PurchasesService: PurchasesService,
        private PermitsService: PermitsService
    ) {

        this.datatables = new datatables();

    }

    rowDataHomeForm = [];

    ngOnInit() {
        this.buttonUpdate = true;
        localStorage.setItem('company', '1');
        this.get_state_movest();
        this.AutocompleteService.autocomplete_provider();
        this.AutocompleteService.autocomplete_code_provider();
        this.AutocompleteService.autocomplete_description_provider();
        this.get_cellar(this.idcompany);
        this.SerializerService.serializer();
        this.operation_purchases();
        this.company = localStorage.getItem('company')
        this.get_permits();
        this.datatables.initDatatable('#example');

        // fecha de los input 
        $("#deliver_date").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#date").datepicker({ dateFormat: 'yy-mm-dd' });

        $("#start_date").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#end_date").datepicker({ dateFormat: 'yy-mm-dd' });

        //////////////////------------------------------------------
    }

    validate() {
        let result = validateDate();
        console.log(result);
    }


    // funcion para los permisos
    get_permits() {

        this.PermitsService.getPermits(2, 'Purchases');
        this.permisos = this.PermitsService.getPermitsSubMenu('Purchases');

    }


    // funciones del datatable 
    public addRow(datos): void {
        this.data = [];
        console.log(this.datos);
        let data1;
        let json = datos;
        for (data1 of json) {
            this.data.push(data1)
        }
        this.datatables.reInitDatatable('#example');
    }

    public selectRow(index: number, row: any) {
        this.selectedName = "row#" + index + " " + row.consecutive_purc
    }

    /////////////////////////////////-----------------------------------------////////////////////////////////--------------------------------///////////////////////////////////////////////__________



    // evento enter 
    someMethod(event: any) {
        if (event.keyCode == 13) {
            this.addRowHomeCampusProvinceAreaForm();
        } else {
        }
    }


    // funciona para buscar las ordenes de compras 
    search_purchases() {

        var table = $('#startdate').serializeObject();

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


    // funcion para el boton de seleccionar en la ventana modal
    handleClick(event) {

        let data = event.target.value.split(",");
        console.log(data);

        let json = {
            'id_company': data[2],
            'consecutive': data[1],
            'idpurchases': data[0]
        }

        this.PurchasesService.search_purchases_unit(json).subscribe(
            res => {

                this.purchases = res.purchases;
                this.rowDataHomeForm = res.detail_purchases;
                console.log(this.rowDataHomeForm);

                this.head = res.purchases;
                this.buttonUpdate = false;
            },
            error => {
                console.log(error);
            }
        )

        this.buttonDisabled = true; // ?
    }


    //elimina las filas de los tr
    deleteRowHomeForm(index, event) {

        let data = event.target.value;


        this.rowDataHomeForm.splice(index, 1);

        let json = { 'iddetail_shopping': data }

        if (data != '') {

            this.PurchasesService.delete(json).subscribe(

                res => {

                    let response = res.data;

                    if (response = true) {

                        swal("", "Se ha Eliminado correctamente el Material", "success");
                    }

                },
                error => {
                    console.log(error);
                }
            )
        }


    }


    // agrega filas a los tr
    addRowHomeCampusProvinceAreaForm() {

        this.rowDataHomeForm.push({

        })
    }


    // funcion para insertar los materiales 
    inser_purchase() {

        var rawData = $('#table').serializeFormJSON();
        var formData = JSON.stringify(rawData);

        var table = $('#form').serializeObject();


        let detail_purchase = { body: formData, head: table }

        console.log(detail_purchase);

        this.PurchasesService.insert(detail_purchase, table).subscribe(
            res => {

                this.head = res;
                this.response = res.data;

                if (this.response == true) {

                    this.buttonDisabled = true; // ?

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


    // funcion para imprimir 
    imprimir() {

        let consecutive_purc = $('#consecutive_purc').val();
        let id_company = $('#id_company').val();
        window.open('http://192.168.1.126:8000/api/purchase/print?consecutive_purc=' + consecutive_purc + '&id_company=' + id_company, '_blank');
    }


    // funcion para atualizar 
    update_purchase() {

        var rawData = $('#table').serializeFormJSON();
        var formData = JSON.stringify(rawData);


        var table = $('#form').serializeObject();


        let detail_purchase = { body: formData, head: table }



        this.PurchasesService.update(detail_purchase, table).subscribe(

            res => {
                this.consecutive = res.consecutive;
                this.response = res.data;
                this.buttonDisabled = true; // ?
                this.rowDataHomeForm = res.detail_purchases;

                if (this.response == true) {

                    swal("", "Se Atualizo correctamente", "success");

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

    //funcion para consultar los almacenes
    get_cellar(idcompany) {
        this.ListService.cellar(idcompany).subscribe(
            res => {
                this.cellar = res.cellar;
            },
            error => {
                console.log(error);
            }
        )
    }

    // funcion para las operaciones de cada fila de la tabla 
    operation_purchases() {

        $(function () {

            $(document).on('keyup', '.item_actividad .request_amount', function (event) {

                let quantity = $(this).val();
                let unit_value = $(this).parents(".item_actividad").find(".unit_value").val();
                let discount = $(this).parents(".item_actividad").find(".discount").val();
                let iva = $(this).parents(".item_actividad").find(".iva").val();

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
            var rawData = $('#table').serializeFormJSON();
            var vrl_iva = 0;
            let subtotal = 0;
            let data: any;

            for (data of rawData) {

                let unit_value = isNaN(data.unit_value) ? 0 : data.unit_value;
                let request_amount = isNaN(data.request_amount) ? 0 : data.request_amount;
                let discount = isNaN(data.discount) ? 0 : data.discount;
                let iva = isNaN(data.iva) ? 0 : data.iva;


                // el descuento 
                let total_discount = (Number(unit_value) * Number(discount) / 100).toFixed(2);


                // valor de cada material con el descuento
                let vlr_discount = (Number(unit_value) - Number(total_discount)).toFixed(2);

                //iva de cada producto
                let total_iva = (Number(vlr_discount) * Number(iva) / 100).toFixed(2);

                // cantidad por cada producto 
                let vlr_subtotal = (Number(request_amount) * Number(vlr_discount)).toFixed(2);

                // iva de cada producto * las cantidades
                let c = (Number(request_amount) * Number(total_iva)).toFixed(2);


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

