function changeActive(){
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
    $('header a').one('click', changeActive);
}

function onVisibility(){
    $('.nav').css('display', 'flex');
    $('header').one('mouseenter', onVisibility);
}

function offVisibility(){
    $('.nav').css('display', 'none');
    $('header').one('mouseleave', offVisibility);
}

function offIt(){

    $('#imagee').toggleClass('disno');
    $('body').one('keydown', offIt);
}


$(document).ready(function() {
    if (localStorage.getItem('darkMode') === 'true') {
        $('body').addClass('dark-mode');
        $('#toggleTheme').html('<img src="img/sun.png" height="20">')
    } else {
        $('body').removeClass('dark-mode');
        $('#toggleTheme').html('<img src="img/moon.png" height="20">')
    }

    $('#toggleTheme').click(function() {
        console.log('ok');
        $('body').toggleClass('dark-mode');
        localStorage.setItem('darkMode', $('body').hasClass('dark-mode'));
        if( $('body').hasClass('dark-mode')){
            $('#toggleTheme').html('<img src="img/sun.png" height="20">');
        }else{
            $('#toggleTheme').html('<img src="img/moon.png" height="20">')
        }
    });
});

$(function(){
    $('header a').one('click', changeActive);
    $('header').one('mouseenter', onVisibility);
    $('header').one('mouseleave', offVisibility);
    $('body').one('keydown', offIt);
});

$(function(){
    $('header a').click(function () {
        $('#content').load($(this).attr('href'));
        return false;
    });
});





