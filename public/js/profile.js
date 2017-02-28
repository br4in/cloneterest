/* global $ */

$(document).ready(function() {
    var url = 'https://cloneterest-br4in.c9users.io';
    /* Get user's data */
    // $.getJSON(url + '/userData', function(data) {
    //     alert(data.name);
    // });
    
    /* Get all user's pins */
    $.getJSON(url + '/userPins', function(data) {
        for (var i = 0; i < data.length; i++) {
            var pinDiv = `
            <div class="block" id="`+data[i]._id+`">
            <button class="close-btns" id="removePin"></button>
            <img class="block-img" src="`+data[i].imageUrl+`" onerror="this.src='../imgs/broken-image-placeholder.png';"></img>
            <p class="block-description">`+data[i].title+`</p>
            <div class="ctrls-div">
            <a href="#" class="block-user">`+data[i].user+`</a>
            <p class="likes-num">`+data[i].likes+`</p></div>
            </div>`;
            
            $('#container').append(pinDiv);
            $('#container').masonry( 'reloadItems' );
            $('#container').masonry( 'layout' );
        }
    });
    
    $('#new-pin').click(function() {
        $('#mask').show();
        $('#new-pin-div').show();
    });
    
    $('.close-btns').click(function() {
        $('#mask').hide();
        $('#new-pin-div').hide();
    });
    
    $('#container').on('click', 'button', function() {
        var id = $(this).parent().attr('id');
        $.getJSON(url + '/removePin/' + id, function(data) {
            window.location.href = '/profile';
        });
    });
    
});