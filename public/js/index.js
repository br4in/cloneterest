/* global $ */

$(document).ready(function() {
    var url = 'https://cloneterest-br4in.c9users.io';
    var user;
    
    /* Get all pins */
    $.getJSON(url + '/allPins', function(data) {
        for (var i = 0; i < data.length; i++) {
            var pinDiv = `
            <div class="block">
            <img class="block-img" src="`+data[i].imageUrl+`" onerror="this.src='../imgs/broken-image-placeholder.png';"></img>
            <p class="block-description">`+data[i].title+`</p>
            <div class="ctrls-div" id="`+data[i]._id+`">
            <a href="/user/`+data[i].user+`" class="block-user">`+data[i].user+`</a>
            <button class="like-btn"></button><p class="likes-num">`+data[i].likes+`</p></div>
            </div>`;
            
            $('#container').append(pinDiv);
            $('#container').masonry('reloadItems');
            $('#container').masonry('layout');
        }
    });
    
    /* Get user's data */
    $.getJSON(url + '/userData', function(data) {
        user = data.name;
    });
    
    $('#container').on('click', 'button', function() {
        if (user !== 'Guest') {
            var id = $(this).parent().attr('id');
            var textNum = $(this).siblings('p');

            var clicks = $(this).data('clicks');
            if (!clicks) {
                $.getJSON(url+'/addLike/'+id, function(data) {
                    //window.location.href = '/';
                    textNum.text(data);
                });
            } else {
                $.getJSON(url+'/removeLike/'+id, function(data) {
                    //window.location.href = '/';
                    textNum.text(data);
                });
            }
            $(this).data("clicks", !clicks);
        }
    });
    
});