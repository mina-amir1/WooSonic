jQuery(document).ready(function($) {
    var customGalleryFrame;

    $('.desktop-gallery-upload-btn').on('click', function(e) {
        e.preventDefault();
        if (customGalleryFrame) {
            customGalleryFrame.open();
            return;
        }

        customGalleryFrame = wp.media({
            title: 'Select Gallery Images',
            library: { type: 'image' },
            multiple: true,
            button: { text: 'Add to Gallery' },
        });

        customGalleryFrame.on('open', function() {
            var selection = customGalleryFrame.state().get('selection');
            var initialImageIds = $('#desktop_banners_gallery').val();

            if (initialImageIds) {
                initialImageIds = JSON.parse(initialImageIds);

                initialImageIds.forEach(function(attachmentId) {
                    var attachment = wp.media.attachment(attachmentId);
                    attachment.fetch();
                    selection.add(attachment ? [attachment] : []);
                });
            }
        });

        customGalleryFrame.on('select', function() {
            var attachments = customGalleryFrame.state().get('selection').toJSON();
            var galleryImages = [];
            var urls = [];

            $.each(attachments, function(index, attachment) {
                galleryImages.push(attachment.id);
                urls.push(attachment.url);
            });
            $('#desktop_banners_gallery').val(JSON.stringify(galleryImages));
            $('#desktop-gallery-images').html('');
            $.each(urls, function (index,url){
                $('#desktop-gallery-images').append(' <img src="'+url+'" alt="Desktop Photo" style="max-width: 150px;max-height: 150px">');
            });
        });

        customGalleryFrame.open();
    });
    $('.mobile-gallery-upload-btn').on('click', function(e) {
        e.preventDefault();
        if (customGalleryFrame) {
            customGalleryFrame.open();
            return;
        }

        customGalleryFrame = wp.media({
            title: 'Select Gallery Images',
            library: { type: 'image' },
            multiple: true,
            button: { text: 'Add to Gallery' },
        });

        customGalleryFrame.on('open', function() {
            var selection = customGalleryFrame.state().get('selection');
            var initialImageIds = $('#mobile_banners_gallery').val();

            if (initialImageIds) {
                initialImageIds = JSON.parse(initialImageIds);

                initialImageIds.forEach(function(attachmentId) {
                    var attachment = wp.media.attachment(attachmentId);
                    attachment.fetch();
                    selection.add(attachment ? [attachment] : []);
                });
            }
        });

        customGalleryFrame.on('select', function() {
            var attachments = customGalleryFrame.state().get('selection').toJSON();
            var galleryImages = [];
            var urls = [];

            $.each(attachments, function(index, attachment) {
                galleryImages.push(attachment.id);
                urls.push(attachment.url);
            });
            $('#mobile_banners_gallery').val(JSON.stringify(galleryImages));
            $('#mobile-gallery-images').html('');
            $.each(urls, function (index,url){
                $('#mobile-gallery-images').append(' <img src="'+url+'" alt="Mobile Photo" style="max-width: 150px;max-height: 150px">');
            });
        });

        customGalleryFrame.open();
    });
    $('.gifts-gallery-upload-btn').on('click', function(e) {
        e.preventDefault();
        if (customGalleryFrame) {
            customGalleryFrame.open();
            return;
        }

        customGalleryFrame = wp.media({
            title: 'Select Gallery Images',
            library: { type: 'image' },
            multiple: true,
            button: { text: 'Add to Gallery' },
        });

        customGalleryFrame.on('open', function() {
            var selection = customGalleryFrame.state().get('selection');
            var initialImageIds = $('#gifts_banners_gallery').val();

            if (initialImageIds) {
                initialImageIds = JSON.parse(initialImageIds);

                initialImageIds.forEach(function(attachmentId) {
                    var attachment = wp.media.attachment(attachmentId);
                    attachment.fetch();
                    selection.add(attachment ? [attachment] : []);
                });
            }
        });

        customGalleryFrame.on('select', function() {
            var attachments = customGalleryFrame.state().get('selection').toJSON();
            var galleryImages = [];
            var urls = [];

            $.each(attachments, function(index, attachment) {
                galleryImages.push(attachment.id);
                urls.push(attachment.url);
            });
            $('#gifts_banners_gallery').val(JSON.stringify(galleryImages));
            $('#gifts-gallery-images').html('');
            $.each(urls, function (index,url){
                $('#gifts-gallery-images').append(' <img src="'+url+'" alt="Gifts Photo" style="max-width: 150px;max-height: 150px">');
            });
        });

        customGalleryFrame.open();
    });

    $('#product-select').select2();
    // Enhance select2 with search
    $('#product-select').select2({
        width: '100%',
        placeholder: 'Search and select products',
        allowClear: true,
    });
    $('#category-select').select2();
    // Enhance select2 with search
    $('#category-select').select2({
        width: '100%',
        placeholder: 'Search and select products',
        allowClear: true,
    });

});
