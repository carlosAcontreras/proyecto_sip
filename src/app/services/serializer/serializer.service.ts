import { Injectable } from '@angular/core';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/ui/widgets/autocomplete';


@Injectable()
export class SerializerService {

  constructor() { }


serializer(){
  $.extend({
        toDictionary: function(query) {
            var parms = {};
            var items = query.split("&"); // split
            for (var i = 0; i < items.length; i++) {
                var values = items[i].split("=");
                var key = decodeURIComponent(values.shift());
                var value = values.join("=")
                parms[key] = decodeURIComponent(value);
            }
            return (parms);
        }
    })


    

    $.fn.serializeFormJSON = function() {
        var o = [];
        $(this).find('tr').each(function() {
            var elements = $(this).find('input, textarea, select')
       
           if (elements.length > 0) {
                var serialized = $(this).find('input, textarea, select').serialize();
                var item = $.toDictionary(serialized );
                o.push(item);
            }
        });
        return o;
    };

	$.fn.serializeObject = function () {
      var o = {};
      var a = this.serializeArray();

      $.each(a, function () {
        if (o[this.name]) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
        } else {
          o[this.name] = this.value || '';
        }
      });
      return o;
    };
}


}


