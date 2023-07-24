jQuery(function ($) {
    $(document).ready(function () {
        // Edit button click event
        $(document).on('click', '.edit-btn', function (e) {
            e.preventDefault();
            var row = $(this).closest('tr');
            var gov_name = row.find('td:eq(1)').text();
            var gov_name_en = row.find('td:eq(2)').text();

            // Replace with input fields for editing
            row.find('td:eq(1)').html('<input type="text" name="gov_name" value="' + gov_name + '">');
            row.find('td:eq(2)').html('<input type="email" name="gov_name_en" value="' + gov_name_en + '">');

            // Add Save button
            row.find('td:eq(3)').html('<button class="button action save-btn">Save</button>');
        });

        // Save button click event
        $(document).on('click', '.save-btn', function () {
            var row = $(this).closest('tr');
            var id = row.find('td:eq(0)').text();
            var gov_name = row.find('input[name="gov_name"]').val();
            var gov_name_en = row.find('input[name="gov_name_en"]').val();

            // Perform AJAX request to submit the data to the PHP script
            $.ajax({
                url: '/wp-content/themes/storefront/shipping/edit.php',
                type: 'POST',
                data: {gov_name: gov_name, gov_name_en: gov_name_en, id: id, page: 'govs'},
                success: function (response) {
                    if (response === 'success') {
                        $('.wrap').prepend(
                            '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Government Edited successfully</span></div>');
                    }
                }
            });

            // Replace input fields with updated values
            row.find('td:eq(1)').text(gov_name);
            row.find('td:eq(2)').text(gov_name_en);

            // Add Edit button
            row.find('td:eq(3)').html(
                '        <input type="hidden" name="gov_id" value="' + id + '"' + '><input type="submit" name="action" class="button action edit-btn" value="Edit">\n' +
                '        <form method="post">\n' +
                '        <input type="hidden" name="gov_id" value="' + id + '"> <input type="submit" name="action" class="button action" onclick="return confirm(\'Are you sure\')" value="Delete"></form>');
        });
    });
    $(document).ready(function () {
        // Edit button click event
        $(document).on('click', '.edit-city-btn', function (e) {
            e.preventDefault();
            var row = $(this).closest('tr');
            var city_name = row.find('td:eq(1)').text();
            var rate = row.find('td:eq(3)').text();
            var city_name_en = row.find('td:eq(4)').text();


            // Replace with input fields for editing
            row.find('td:eq(1)').html('<input type="text" name="city_name" value="' + city_name + '">');
            row.find('td:eq(3)').html('<input type="number" name="rate" value="' + rate + '">');
            row.find('td:eq(4)').html('<input type="text" name="city_name_en" value="' + city_name_en + '">');

            // Add Save button
            row.find('td:eq(5)').html('<button class="button action save-city-btn">Save</button>');
        });

        // Save button click event
        $(document).on('click', '.save-city-btn', function () {
            var row = $(this).closest('tr');
            var id = row.find('td:eq(0)').text();
            var city_name = row.find('input[name="city_name"]').val();
            var rate = row.find('input[name="rate"]').val();
            var city_name_en = row.find('input[name="city_name_en"]').val();

            // Perform AJAX request to submit the data to the PHP script
            $.ajax({
                url: '/wp-content/themes/storefront/shipping/edit.php',
                type: 'POST',
                data: {city_name: city_name, rate: rate, city_name_en: city_name_en, id: id, page: 'cities'},
                success: function (response) {
                    if (response === 'success') {
                        $('.wrap').prepend(
                            '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Area Edited successfully</span></div>');
                    } else {
                        $('.wrap').prepend(
                            '<div class="notice notice-error is-dismissible" style="padding: 10px"><span>Failed: ' + response + '</span></div>');
                    }
                }
            });

            // Replace input fields with updated values
            row.find('td:eq(1)').text(city_name);
            row.find('td:eq(3)').text(rate);
            row.find('td:eq(4)').text(city_name_en);

            // Add Edit button
            row.find('td:eq(5)').html(
                '        <input type="hidden" name="city_id" value="' + id + '"' + '><input type="submit" name="action" class="button action edit-city-btn" value="Edit">\n' +
                '        <form method="post">\n' +
                '        <input type="hidden" name="city_id" value="' + id + '"> <input type="submit" name="action" class="button action" onclick="return confirm(\'Are you sure\')" value="Delete"></form>');
        });
    });

    $(document).ready(function () {
        // Edit button click event
        $(document).on('click', '.edit-area-btn', function (e) {
            e.preventDefault();
            var row = $(this).closest('tr');
            var area_name = row.find('td:eq(1)').text();
            var rate = row.find('td:eq(3)').text();
            var area_name_en = row.find('td:eq(4)').text();


            // Replace with input fields for editing
            row.find('td:eq(1)').html('<input type="text" name="area_name" value="' + area_name + '">');
            row.find('td:eq(3)').html('<input type="number" name="rate" value="' + rate + '">');
            row.find('td:eq(4)').html('<input type="text" name="area_name_en" value="' + area_name_en + '">');

            // Add Save button
            row.find('td:eq(6)').html('<button class="button action save-area-btn">Save</button>');
        });

        // Save button click event
        $(document).on('click', '.save-area-btn', function () {
            var row = $(this).closest('tr');
            var id = row.find('td:eq(0)').text();
            var area_name = row.find('input[name="area_name"]').val();
            var rate = row.find('input[name="rate"]').val();
            var area_name_en = row.find('input[name="area_name_en"]').val();

            // Perform AJAX request to submit the data to the PHP script
            $.ajax({
                url: '/wp-content/themes/storefront/shipping/edit.php',
                type: 'POST',
                data: {area_name: area_name, rate: rate, area_name_en: area_name_en, id: id, page: 'areas'},
                success: function (response) {
                    if (response === 'success') {
                        $('.wrap').prepend(
                            '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Area Edited successfully</span></div>');
                    } else {
                        $('.wrap').prepend(
                            '<div class="notice notice-error is-dismissible" style="padding: 10px"><span>Failed: ' + response + '</span></div>');
                    }
                }
            });

            // Replace input fields with updated values
            row.find('td:eq(1)').text(area_name);
            row.find('td:eq(3)').text(rate);
            row.find('td:eq(4)').text(area_name_en);

            // Add Edit button
            row.find('td:eq(6)').html('<form style="margin-right: 10px" method="post">\n' +
                '        <input type="hidden" name="area_id" value="' + id + '"' + '><input type="submit" name="action" class="button action edit-area-btn" value="Edit"></form>\n' +
                '        <form method="post">\n' +
                '        <input type="hidden" name="area_id" value="' + id + '"> <input type="submit" name="action" class="button action" onclick="return confirm(\'Are you sure\')" value="Delete"></form>');
        });
    });
    $(document).ready(function () {
        var servingAreasExists = false;
        $('.branches-table').each(function () {
            var thText = $(this).find('th').text();
            if (thText.includes('Serving Areas')) {
                servingAreasExists = true;
                return false; // Exit the loop if the "Serving Areas" row is found
            }
        });

        var current_area;
        // Edit button click event
        $(document).on('click', '.edit-branch-btn', function (e) {
            e.preventDefault();
            var row = $(this).closest('tr');
            var branch_name = row.find('td:eq(1)').text();
            var branch_slug = row.find('td:eq(2)').text();
            var branch_name_en = row.find('td:eq(3)').text();
            var branch_notes = row.find('td:eq(4)').text();
            if (servingAreasExists) {
                current_area = row.find('td:eq(5)').text();
                $.ajax({
                    url: '/wp-content/themes/storefront/shipping/servingAreas.php',
                    type: 'GET',
                    success: function (response) {
                        if (response !== 'failed') {
                            row.find('td:eq(5)').html(response);

                        }
                    }
                });
            }
            // Replace with input fields for editing
            row.find('td:eq(1)').html('<input type="text" name="branch_name" value="' + branch_name + '">');
            row.find('td:eq(2)').html('<input type="text" name="branch_slug" value="' + branch_slug + '">');
            row.find('td:eq(3)').html('<input type="text" name="branch_name_en" value="' + branch_name_en + '">');
            row.find('td:eq(4)').html('<input type="text" name="branch_notes" value="' + branch_notes + '">');

            if (servingAreasExists){
            // Add Save button in case of serving area are enabled
            row.find('td:eq(7)').html('<button class="button action save-branch-btn">Save</button>');
            }else {
                // Add Save button in case of serving area are disabled
                row.find('td:eq(6)').html('<button class="button action save-branch-btn">Save</button>');
            }
        });

        // Save button click event
        $(document).on('click', '.save-branch-btn', function () {
            var row = $(this).closest('tr');
            var id = row.find('td:eq(0)').text();
            var branch_name = row.find('input[name="branch_name"]').val();
            var branch_slug = row.find('input[name="branch_slug"]').val();
            var branch_name_en = row.find('input[name="branch_name_en"]').val();
            var branch_notes = row.find('input[name="branch_notes"]').val();
            var serving_ids = null;
            if (servingAreasExists) {
                serving_ids = row.find('select[name="areas_ids[]"]').val();
                var serving_areas = row.find('select[name="areas_ids[]"] option:selected').map(function () {
                    return $(this).text();
                }).get().join(', ');
            }

            // Perform AJAX request to submit the data to the PHP script
            $.ajax({
                url: '/wp-content/themes/storefront/shipping/edit.php',
                type: 'POST',
                data: {
                    branch_name: branch_name,
                    branch_slug: branch_slug,
                    branch_name_en: branch_name_en,
                    branch_notes: branch_notes,
                    serving_ids: serving_ids,
                    id: id,
                    page: 'branches'
                },
                success: function (response) {
                    if (response === 'success') {
                        $('.wrap').prepend(
                            '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Area Edited successfully</span></div>');
                    }
                }
            });

            // Replace input fields with updated values
            row.find('td:eq(1)').text(branch_name);
            row.find('td:eq(2)').text(branch_slug);
            row.find('td:eq(3)').text(branch_name_en);
            row.find('td:eq(4)').text(branch_notes);
            if (servingAreasExists) {
                if (serving_areas) {
                    row.find('td:eq(5)').text(serving_areas);
                } else {
                    row.find('td:eq(5)').text(current_area);
                }
                // Add Edit button with considering the places of the serving areas
                row.find('td:eq(7)').html('<form style="margin-right: 10px" method="post">\n' +
                    '        <input type="hidden" name="area_id" value="' + id + '"' + '><input type="submit" name="action" class="button action edit-area-btn" value="Edit"></form>\n' +
                    '        <form method="post">\n' +
                    '        <input type="hidden" name="area_id" value="' + id + '"> <input type="submit" name="action" class="button action" onclick="return confirm(\'Are you sure\')" value="Delete"></form>');
            }else{
                // Add Edit button in case of serving areas are disabled
                row.find('td:eq(6)').html('<form style="margin-right: 10px" method="post">\n' +
                    '        <input type="hidden" name="area_id" value="' + id + '"' + '><input type="submit" name="action" class="button action edit-area-btn" value="Edit"></form>\n' +
                    '        <form method="post">\n' +
                    '        <input type="hidden" name="area_id" value="' + id + '"> <input type="submit" name="action" class="button action" onclick="return confirm(\'Are you sure\')" value="Delete"></form>');
            }
        });
    });

})
