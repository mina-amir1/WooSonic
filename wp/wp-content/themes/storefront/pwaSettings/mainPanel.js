jQuery(function ($) {
    $(document).ready(function () {
        // Edit button click event
        $(document).on('click', '.edit-min-btn', function (e) {
            e.preventDefault();
            var row = $(this).closest('tr');
            var min_amount = row.find('td:eq(2)').text();

            // Replace with input fields for editing
            row.find('td:eq(2)').html('<input type="number" name="min_amount" value="' + min_amount + '">');

            // Add Save button
            row.find('td:eq(3)').html('<button class="button action save-min-btn">Save</button>');
        });

        // Save button click event (Using event delegation)
        $(document).on('click', '.save-min-btn', function () {
            var row = $(this).closest('tr');
            var id = row.find('td:eq(0)').text();
            var min_amount = row.find('input[name="min_amount"]').val();

            // Perform AJAX request to submit the data to the PHP script
            $.ajax({
                url: '/wp-content/themes/storefront/pwaSettings/edit.php',
                type: 'POST',
                data: {min_amount: min_amount, id: id, page: 'min_checkout'},
                success: function (response) {
                    if (response === 'success') {
                        $('.wrap').prepend(
                            '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Rule Edited successfully</span></div>');
                    }
                }
            });

            // Replace input fields with updated values
            row.find('td:eq(2)').text(min_amount);

            // Add Edit button
            row.find('td:eq(3)').html(
                '        <input type="hidden" name="rule_id" value="' + id + '"' + '><input type="submit" name="action" class="button action edit-min-btn" value="Edit">\n' +
                '        <form method="post">\n' +
                '        <input type="hidden" name="rule_id" value="' + id + '"> <input type="submit" name="action" class="button action" onclick="return confirm(\'Are you sure\')" value="Delete"></form>');
        });
    });
});
