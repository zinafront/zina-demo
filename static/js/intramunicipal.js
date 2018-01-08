/**
 * Intramunicipal validations for Transport Tracking tool JS
 */

function check_intramunicipal_str(str_form, index){

    $('input[name^="site_city["]').each(function () {

        var id = $(this).attr('name').substring(10);
        id = id.replace("[", "");
        id = id.replace("]", "");
        if ($('[name="intramunicipal['+id+']"]').prop("checked")) {
            $('[name="intramunicipal_iss['+id+']"]').each(function() {
               $("<input type='text' />").attr({ name: this.name, id:this.id, value: this.value, readonly:true }).insertBefore(this);
               if ( $("#empty_iss_"+id).length ) {
                    $("#empty_iss_"+id ).hide();
                }
            }).remove();
        }
        else {
            $('[name="intramunicipal_iss['+id+']"]').each(function() {
               $("<input type='hidden' />").attr({ name: this.name, id:this.id, value: this.value, readonly:true }).insertBefore(this);
                if ( $("#empty_iss_"+id).length ) {
                    $( "#empty_iss_"+id ).show();
                }
                else{
                    $("<div id='empty_iss_"+id+"' style='display: inline-block;'>0</div>").insertBefore(this);
                }
            }).remove();
        }
    });

    if (index>=0) {
        str_form.find('input[name^="site_city["]').each(function () {

            var id = $(this).attr('name').substring(10);
            id = id.replace("[", "");
            id = id.replace("]", "");

            if ($(this).val().length > 1) {
                jQuery.ajax({
                    type: 'GET',
                    dataType: 'json',
                    url: check_intramunicipal_information_url,
                    data: {
                        origin_city: str_form.find('input[name="origin_city"]').val(),
                        origin_state: str_form.find('select[name="origin_uf"]').val(),
                        destination_city: str_form.find('input[name^="site_city[' + id + ']"]').val()
                    },
                    success: function (data) {
                        if (data) {
                            $('[name="intramunicipal[' + id + ']"]').prop("checked", true);
                            $('[name="intramunicipal_iss[' + id + ']"]').val("5.0000")

                        }
                        else {
                            $('[name="intramunicipal[' + id + ']"]').prop("checked", false);
                            $('[name="intramunicipal_iss[' + id + ']"]').val("0.0000")
                        }

                        if ($('[name="intramunicipal['+id+']"]').prop("checked")) {
                            $('[name="intramunicipal_iss['+id+']"]').each(function() {
                               $("<input type='text' />").attr({ name: this.name, id:this.id, value: this.value, readonly:true }).insertBefore(this);
                               if ( $("#empty_iss_"+id).length ) {
                                    $("#empty_iss_"+id ).hide();
                                }
                            }).remove();
                        }
                        else {
                            $('[name="intramunicipal_iss['+id+']"]').each(function() {
                               $("<input type='hidden' />").attr({ name: this.name, id:this.id, value: this.value, readonly:true }).insertBefore(this);
                                if ( $("#empty_iss_"+id).length ) {
                                    $( "#empty_iss_"+id ).show();
                                }
                                else{
                                    $("<div id='empty_iss_"+id+"' style='display: inline-block;'>0</div>").insertBefore(this);
                                }
                            }).remove();
                        }
                    }
                });
            }
        });
    }

    str_form.find('input[name="origin_city"]').on('change input', function(){

        $('input[name^="site_city["]').each(function(){

            var id =$(this).attr('name').substring(10);
            id = id.replace("[", "");
            id = id.replace("]", "");

            if($(this).val().length > 1){
                jQuery.ajax({
                    type: 'GET',
                    dataType: 'json',
                    url: check_intramunicipal_information_url,
                    data: {
                        origin_city: str_form.find('input[name="origin_city"]').val(),
                        origin_state: str_form.find('select[name="origin_uf"]').val(),
                        destination_city: str_form.find('input[name^="site_city['+id+']"]').val()
                    },
                    success: function(data){

                        if (data){
                            $('[name="intramunicipal['+id+']"]').prop("checked", true);
                            $('[name="intramunicipal_iss['+id+']"]').val("5.0000")

                        }
                        else{
                            $('[name="intramunicipal['+id+']"]').prop("checked", false);
                            $('[name="intramunicipal_iss['+id+']"]').val("0.0000")
                        }

                        if ($('[name="intramunicipal['+id+']"]').prop("checked")) {
                            $('[name="intramunicipal_iss['+id+']"]').each(function() {
                               $("<input type='text' />").attr({ name: this.name, id:this.id, value: this.value, readonly:true }).insertBefore(this);
                               if ( $("#empty_iss_"+id).length ) {
                                    $("#empty_iss_"+id ).hide();
                                }
                            }).remove();
                        }
                        else {
                            $('[name="intramunicipal_iss['+id+']"]').each(function() {
                               $("<input type='hidden' />").attr({ name: this.name, id:this.id, value: this.value, readonly:true }).insertBefore(this);
                                if ( $("#empty_iss_"+id).length ) {
                                    $( "#empty_iss_"+id ).show();
                                }
                                else{
                                    $("<div id='empty_iss_"+id+"' style='display: inline-block;'>0</div>").insertBefore(this);
                                }
                            }).remove();
                        }
                    }
                });
            }
        });
    });

    str_form.find('input[name^="site_city["]').on('change input', function(){
        var id =$(this).attr('name').substring(10);
            id = id.replace("[", "");
            id = id.replace("]", "");

        if($(this).val().length > 1){
            jQuery.ajax({
                type: 'GET',
                dataType: 'json',
                url: check_intramunicipal_information_url,
                data: {
                    origin_city: str_form.find('input[name="origin_city"]').val(),
                    origin_state: str_form.find('select[name="origin_uf"]').val(),
                    destination_city: $(this).val()
                },
                success: function(data){

                    if (data){
                        $('[name="intramunicipal['+id+']"]').prop("checked", true);
                        $('[name="intramunicipal_iss['+id+']"]').val("5.0000")

                    }
                    else{
                        $('[name="intramunicipal['+id+']"]').prop("checked", false);
                        $('[name="intramunicipal_iss['+id+']"]').val("0.0000")
                    }

                    if ($('[name="intramunicipal['+id+']"]').prop("checked")) {
                        $('[name="intramunicipal_iss['+id+']"]').each(function() {
                           $("<input type='text' />").attr({ name: this.name, id:this.id, value: this.value, readonly:true }).insertBefore(this);
                           if ( $("#empty_iss_"+id).length ) {
                                $("#empty_iss_"+id ).hide();
                            }
                        }).remove();
                    }
                    else {
                        $('[name="intramunicipal_iss['+id+']"]').each(function() {
                           $("<input type='hidden' />").attr({ name: this.name, id:this.id, value: this.value, readonly:true }).insertBefore(this);
                            if ( $("#empty_iss_"+id).length ) {
                                $( "#empty_iss_"+id ).show();
                            }
                            else{
                                $("<div id='empty_iss_"+id+"' style='display: inline-block;'>0</div>").insertBefore(this);
                            }
                        }).remove();
                    }
                }
            });
        }
    });

    str_form.find('select[name="origin_uf"]').on('change', function(){

        $('input[name^="site_city["]').each(function(){

            var id =$(this).attr('name').substring(10);
            id = id.replace("[", "");
            id = id.replace("]", "");

            if($(this).val().length > 1){
                jQuery.ajax({
                    type: 'GET',
                    dataType: 'json',
                    url: check_intramunicipal_information_url,
                    data: {
                        origin_city: str_form.find('input[name="origin_city"]').val(),
                        origin_state: str_form.find('select[name="origin_uf"]').val(),
                        destination_city: str_form.find('input[name^="site_city['+id+']"]').val()
                    },
                    success: function(data){
                        if (data){
                            $('[name="intramunicipal['+id+']"]').prop("checked", true);
                            $('[name="intramunicipal_iss['+id+']"]').val("5.0000")

                        }
                        else{
                            $('[name="intramunicipal['+id+']"]').prop("checked", false);
                            $('[name="intramunicipal_iss['+id+']"]').val("0.0000")
                        }

                        if ($('[name="intramunicipal['+id+']"]').prop("checked")) {
                            $('[name="intramunicipal_iss['+id+']"]').each(function() {
                               $("<input type='text' />").attr({ name: this.name, id:this.id, value: this.value, readonly:true }).insertBefore(this);
                               if ( $("#empty_iss_"+id).length ) {
                                    $("#empty_iss_"+id ).hide();
                                }
                            }).remove();
                        }
                        else {
                            $('[name="intramunicipal_iss['+id+']"]').each(function() {
                               $("<input type='hidden' />").attr({ name: this.name, id:this.id, value: this.value, readonly:true }).insertBefore(this);
                                if ( $("#empty_iss_"+id).length ) {
                                    $( "#empty_iss_"+id ).show();
                                }
                                else{
                                    $("<div id='empty_iss_"+id+"' style='display: inline-block;'>0</div>").insertBefore(this);
                                }
                            }).remove();
                        }
                    }
                });
            }
        });
    });
}