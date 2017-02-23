/* global $ */

$(document).ready(function() {
    
    if ($(window).width() > 460) {
        $('#container').masonry({
            columnWidth: 180,
            itemSelector: '.block',
            gutter: 40,
            isFitWidth: true
        });
    } else {
        $('#container').masonry({
            columnWidth: 105,
            itemSelector: '.block',
            gutter: 40,
            isFitWidth: true
        });
    }
    

});