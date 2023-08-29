jQuery(document).ready(function($) {

    $('#country-select').select2();
    // Enhance select2 with search
    $('#country-select').select2({
        width: '100%',
        placeholder: 'Search and select Countries',
        allowClear: true,
    });
});