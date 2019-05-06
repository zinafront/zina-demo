$(function () {
    $('.country').on('change', function () {
        var $country = $(this);
        var $region = $country.closest('.panel-body').find('.regions');

        $region.empty();
        $region.multiselect('rebuild');
        $.getJSON(window.url_get_regions_by_country, {country_id: $(this).val()}, function(data){

            data.regions.forEach(function (region) {
                 $region.append('<option value="'+ region.id +'">'+ region.name +'</option>')
            });
            $region.multiselect('rebuild');


        });
    });
});