/* global $ */

$(document).ready(function() {
    
    // change visible form
    $('.switch-btn').click(function(event) {
        event.preventDefault();
        if ($('#login-div').is(':visible')) {
            $('#login-div').hide();
            $('#signup-div').show();
        } else {
            $('#signup-div').hide();
            $('#login-div').show();
        }
    });
    
    // redirect to twitter auth
    $('.twitter-btn').click(function(event) {
        event.preventDefault();
        window.location.href = '/auth/twitter';
    });
    
    
    
});