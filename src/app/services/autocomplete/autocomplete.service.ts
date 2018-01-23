import { Injectable } from '@angular/core';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/ui/widgets/autocomplete';


@Injectable()
export class AutocompleteService {

  constructor() { }

  ngOnInit() {

  }


  // funcion autocomplete proveedor 
  autocomplete_provider() {
    $(function () {
      $(".provider").click(function () {
        var oID = $(this).attr("id");

        $(this).autocomplete({
          source: 'api/provider/autocomplete',
          minLength: 1,
          selectFirst: true,
          success: function () {

          },
          select: function (event, ui) {

            $('#' + oID + 'hiden').val(ui.item.provee_id)
          }
        });
      });



    });
  }

  autocomplete_code_provider() {

    $(document).on('keyup', '.item_actividad .code_provider', function (event) {

      $(this).autocomplete({
        source: 'api/provider/autocomplete_code',
        minLength: 1,
        selectFirst: true,
        success: function () {

        },
        select: function (event, ui) {

          $(this).parents(".item_actividad").find(".description").val(ui.item.description);
          $(this).parents(".item_actividad").find(".unit_value").val(ui.item.supply_vlru);
          $(this).parents(".item_actividad").find(".discount").val(ui.item.supply_discount);
          $(this).parents(".item_actividad").find(".iva").val(ui.item.supply_iva);
        }
      });
    });




  }

  autocomplete_description_provider() {

    $(document).on('keyup', '.item_actividad .description', function (event) {

      $(this).autocomplete({
        source: 'api/provider/autocomplete_description_provider',
        minLength: 1,
        selectFirst: true,
        success: function () {

        },
        select: function (event, ui) {

          $(this).parents(".item_actividad").find(".code_provider").val(ui.item.code);
          $(this).parents(".item_actividad").find(".unit_value").val(ui.item.supply_vlru);
          $(this).parents(".item_actividad").find(".discount").val(ui.item.supply_discount);
          $(this).parents(".item_actividad").find(".iva").val(ui.item.supply_iva);
        }
      });
    });




  }


  autocomplete_material_description() {

    $(document).on('keyup', '.item_actividad .code_mater', function (event) {

      let cellar = $('#cellar').val();
      let company = $('#idcompany').val()

      $(this).autocomplete({
        source: 'api/material/query_inventmate?cellar=' + cellar + '&company=' + company,
        minLength: 1,
        selectFirst: true,
        success: function () {

        },
        select: function (event, ui) {


          $(this).parents(".item_actividad").find(".description").val(ui.item.description);
          $(this).parents(".item_actividad").find(".unidad").val(ui.item.name_Unity);
          $(this).parents(".item_actividad").find(".stock").val(ui.item.quantity);

        }
      });
    });




  }


  autocomplete_employee() {

    $(function () {
      $(".employee").click(function () {
        var oID = $(this).attr("id");

        $(this).autocomplete({
          source: 'api/employee/autocomplete_employee',
          minLength: 1,
          selectFirst: true,
          success: function () {

          },
          select: function (event, ui) {

            $('#' + oID + 'hiden').val(ui.item.idemployees)
          }
        });
      });



    });

  }



}
