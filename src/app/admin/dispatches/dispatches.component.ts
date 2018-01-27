import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list/list.service';
import { AutocompleteService } from '../../services/autocomplete/autocomplete.service';
import { DispatchesService } from '../../services/dispatches/dispatches.service';
import { SerializerService } from '../../services/serializer/serializer.service';
import { PermitsService } from '../../services/permisos/permits.service';
import { from } from 'rxjs/observable/from';

import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/ui/widgets/autocomplete';
import { CustomValidators } from 'ng2-validation';

import swal from 'sweetalert2';
import $ from 'jquery';


import { DatatablesService } from '../../services/datatables/datatables.service';
import { datatables } from '../../utilitis/datatables';


@Component({
    selector: 'app-dispatches',
    templateUrl: './dispatches.component.html',
    styleUrls: ['./dispatches.component.scss'],
    providers: [ListService, AutocompleteService, DispatchesService, SerializerService, DatatablesService,PermitsService]
})
export class DispatchesComponent implements OnInit {


    public dispatches_move;
    public cellar;
    public destination_dispatches;
    public rowDatatable = [{}]
    public company;
    public consecutive;
    public response;
    public buttoinsert;
    public btndisabled;
    public datatables;
    public data = [];
    public datos;
    public permisos;
    public user;

<<<<<<< HEAD
    constructor(private ListService: ListService, 
        private AutocompleteService: AutocompleteService, 
        private DispatchesService: DispatchesService,
        private SerializerService: SerializerService,
         private datatableservice: DatatablesService,
         private PermitsService: PermitsService ) { }
=======
    public validateHead = {
        "date": "",
        "employee_name": ""
    };


    constructor(private ListService: ListService, private AutocompleteService: AutocompleteService, private DispatchesService: DispatchesService, private SerializerService: SerializerService, private datatableservice: DatatablesService, ) { }
>>>>>>> af70e9ba48e13d0f8dce60d7b1cd8f10602adfbf

    ngOnInit() {

        this.get_dispatches_move();
        this.company = localStorage.getItem('company');
        this.get_cellar(this.company);
        this.get_destination_dispatches();
        this.AutocompleteService.autocomplete_employee();
        this.AutocompleteService.autocomplete_material_description();
        this.SerializerService.serializer();
        this.operation_purchases();

        this.btndisabled = false;
        this.get_permits();
        this.permisos = this.PermitsService.getPermitsSubMenu('dispatches');
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    get_dispatches_move() {
        this.ListService.dispatches_move().subscribe(
            res => {
                this.dispatches_move = res.dispatches_move;
            },
            error => {
                console.log(error);
            }
        )
    }


    get_permits() {

        this.PermitsService.getPermits(4, 'dispatches');

    }


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

    get_destination_dispatches() {
        this.ListService.destination_dispatches().subscribe(
            res => {
                this.destination_dispatches = res.destination_dispatches;
            },
            error => {
                console.log(error);
            }
        )
    }

    addrowtable() {

        this.rowDatatable.push({

        })
    }

    insert() {
        if (this.permisos.save == 1) {

        var rawData = $('#table_dispatche').serializeFormJSON();
        var formData = JSON.stringify(rawData);

        var table = $('#head_dispatch').serializeObject();

        let income = { body: formData, head: table , user: this.user.identification}



        this.DispatchesService.insert(income).subscribe(
            res => {

                this.buttoinsert = false;

                this.consecutive = res.consecutive;

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
    }else{

        swal("", "No Cuenta con Permiso Para Guardar", "error");

    }

    }

    update(){
if(this.permisos.update==1){

    var rawData = $('#table_dispatche').serializeFormJSON();
    var formData = JSON.stringify(rawData);

    var table = $('#head_dispatch').serializeObject();

    let income = { body: formData, head: table , user: this.user.identification}


    this.DispatchesService.update(income).subscribe(
        res => {

            this.buttoinsert = false;

            this.consecutive = res.consecutive;

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

}else{

 swal("", "No Cuenta con Permiso Para Atualizar", "error");
 
}

    }


    operation_purchases() {

        $(function () {

            $(document).on('keyup', '.item_actividad .quantity', function (event) {

                let quantity = Number($(this).parents(".item_actividad").find(".quantity").val());
                let stock = Number($(this).parents(".item_actividad").find(".stock").val());

                if (quantity > stock) {

                    $(this).parents(".item_actividad").find(".quantity").val(0)

                }



            });

        })
    }


    // funciona para buscar los despachos 
    searc_dispatche() {

        var table = $('#searc_dispatche').serializeObject();

        this.datatableservice.get_datatables(table, 'purchase/search').subscribe(
            response => {
                this.datos = response.purchases;
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
            this.data.push(data1)
        }
        this.datatables.reInitDatatable('#example');
    }

}
