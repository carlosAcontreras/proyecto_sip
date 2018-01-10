import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ListService } from '../../services/list/list.service';
import { AutocompleteService } from '../../services/autocomplete/autocomplete.service';
import { SerializerService } from '../../services/serializer/serializer.service';

declare var number_format: any;

import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/ui/widgets/autocomplete';

import { DatatablesService } from '../../services/datatables/datatables.service';
import { datatables } from '../../utilitis/datatables';
@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.scss'],
    providers: [ListService, AutocompleteService, SerializerService,DatatablesService]
})


export class PurchasesComponent implements OnInit {

    public state_moves;
    public cellar;
    public idcompany = 1;
    public consecutive;
    public company;
    public response;
    public buttonDisabled;
    private date = { 'start_date': '', 'end_date': '' };
    private datatables;


    constructor(private ListService: ListService, private AutocompleteService: AutocompleteService, private SerializerService: SerializerService, private changeDetectorRef: ChangeDetectorRef,private datatableservice: DatatablesService
    ) {
this.datatables = new datatables();
    }
    rowDataMainForm = [{
        Eliminar: '',
        Codigo: '',
        Descripcion: '',
    }];

    rowDataAdressForm = [{
        Eliminar: '',
        Codigo: '',
        Descripcion: '',

    }];

    rowDataHomeForm = [{

    }];
    ngOnInit() {
        localStorage.setItem('company', '1');
        this.get_state_movest();
        this.AutocompleteService.autocomplete_provider();
        this.AutocompleteService.autocomplete_code_provider();
        this.AutocompleteService.autocomplete_description_provider();
        this.get_cellar(this.idcompany);
        this.SerializerService.serializer();
        this.operation_purchases();

        this.company = localStorage.getItem('company')
       this.datatables.datatables_init("#table_search_purchase");
    }    


    // evento enter 
    someMethod(event: any) {

        if (event.keyCode == 13) {
            this.addRowHomeCampusProvinceAreaForm();
        } else {
        }
    }


    search_purchases(form) {
        this.datatableservice.get_datatables(form, '/purchase/search').subscribe(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
            }
        );
    }





    //elimina las filas de los tr
    deleteRowHomeForm(homeFormIndex: number) {
        this.rowDataHomeForm.splice(homeFormIndex, 1);
        this.changeDetectorRef.detectChanges();
    }

    // agrega filas a los tr
    addRowHomeCampusProvinceAreaForm() {
        this.rowDataHomeForm.push({

        })
    }

    savepurchase() {

        var rawData = $('#table').serializeFormJSON();
        var formData = JSON.stringify(rawData);


        var table = $('#form').serializeObject();
        console.log(table);

        let detail_purchase = { body: formData, head: table }

        console.log(detail_purchase);

        this.ListService.insert(detail_purchase, table).subscribe(
            res => {
                this.consecutive = res.consecutive;
                this.response = res.data;

                if (this.response == true) {

                    this.buttonDisabled = true; // ?

                }
            },
            error => {
                console.log(error);
            }
        )




        //this.AutocompleteService.savepurchase();
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

