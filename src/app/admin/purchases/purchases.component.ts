import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list/list.service';
import { AutocompleteService } from '../../services/autocomplete/autocomplete.service';
import { SerializerService } from '../../services/serializer/serializer.service';
import { number_format } from '../../../assets/js/function.js';

import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/ui/widgets/autocomplete';



@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.scss'],
    providers: [ListService, AutocompleteService, SerializerService]
})


export class PurchasesComponent implements OnInit {

    public state_moves;
    public cellar;
    public idcompany = 1;
    public consecutive;
    public company;
    public response;
    public buttonDisabled;



    constructor(private ListService: ListService, private AutocompleteService: AutocompleteService, private SerializerService: SerializerService) {



    }

    ngOnInit() {
        localStorage.setItem('company', '1');
        this.get_state_movest();
        this.AutocompleteService.autocomplete_provider();
        this.AutocompleteService.autocomplete_code_provider();
        this.AutocompleteService.autocomplete_description_provider();
        this.get_cellar(this.idcompany);
        this.SerializerService.serializer();
        this.operation_purchases();
        this.delet();
        this.company = localStorage.getItem('company')

    }

    someMethod(event: any) {
        if (event.keyCode == 13) {
            this.addtr();
        } else {
        }
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
    delet() {
        $(document).on('click', '.item_actividad .delet', function (event) {

            $(this).closest('tr').remove();

        });

    }

    addtr() {
        $('#table tr:last').after("<tr class='item_actividad eliminar_tr'>" +

            "<td>" +
            "<button type='button' class='delet' id='delet'>" +
            "<i class='fa fa fa-trash-o' aria-hidden='true'></i>" +
            "</button>" +
            "</td>" +

            "<td>" +
            "<input class='code_provider form-control purchase input1' type='text' name='code'>" +
            "<input class='form-control purchase hiden' type='text' name='idcode'>" +
            "</td>" +

            "<td>" +
            "<input class='description form-control purchase input1' type='text' name='description'>" +
            "</td>" +

            "<td>" +
            "<input class='request_amount form-control purchase input1' type='text' name='request_amount'>" +
            "</td>" +
            "<td>" +
            "<input class='amount_receipt form-control purchase input1' type='text' name='amount_receipt'>" +
            "</td>" +
            "<td>" +
            "<input class='unit_value form-control purchase input1' type='text' name='unit_value'>" +
            "</td>" +
            "<td>" +
            "<input class='discount form-control purchase input1' type='text' name='discount'>" +
            "</td>" +
            "<td>" +
            "<input class='iva form-control purchase input1' type='text' name='iva'>" +
            "</td>" +
            "<td class='vlr_iva text-center'>$0</td>" +
            "<td class='vlr_total text-center'>$0</td>" +

            "</tr>");

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



                let total_discount = (parseFloat(unit_value) * parseFloat(discount / 100)).toFixed(2);
                let vlr_discount = (parseFloat(unit_value) - parseFloat(total_discount)).toFixed(2);

                let total_iva = (parseFloat(vlr_discount * iva / 100)).toFixed(2);

                let total_vlrdiscount = (parseFloat(vlr_discount) + parseFloat(total_iva)).toFixed(2);
                let vlr_iva = (parseFloat(quantity) * parseFloat(vlr_discount)).toFixed(2);

                let subtotal = isNaN(vlr_iva) ? 0 : vlr_iva


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

            for (let data of rawData) {


            }
            $.each(rawData, function (i, item) {

                let unit_value = item.unit_value;
                let request_amount = item.request_amount;
                let discount = item.discount;
                let iva = item.iva;


                let total_discount = (parseFloat(unit_value) * parseFloat(discount / 100)).toFixed(2);
                let vlr_discount = (parseFloat(unit_value) - parseFloat(total_discount)).toFixed(2);


                let total_iva = (parseFloat(vlr_discount * iva / 100)).toFixed(2);
                let vlr_subtotal = (parseFloat(request_amount) * parseFloat(vlr_discount)).toFixed(2);


                let c = (parseFloat(request_amount) * parseFloat(total_iva)).toFixed(2);
                let d = isNaN(c) ? 0 : (parseFloat(c)).toFixed(2);
                let b = isNaN(vlr_subtotal) ? 0 : (parseFloat(vlr_subtotal)).toFixed(2);


                vrl_iva += parseFloat(d);

                subtotal += parseFloat(b);


            });

            let total = (parseFloat(vrl_iva) + parseFloat(subtotal));
            let sub_total = number_format(subtotal, 2)
            let sub_iva = number_format(vrl_iva, 2)
            let total1 = number_format(total, 2)


            $('.sub_total').html(sub_total)
            $('.sub_iva').html(sub_iva)
            $('.total').html(total1)
        }




    }


}

