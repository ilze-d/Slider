$(function() {
    var slideCount = $('.main-slider .slide').length;
	var slideWidth = $('.main-slider .slide').width();
	var slideHeight = $('.main-slider .slide').height();
	var sliderUlWidth = slideCount * slideWidth;

	 
		
	//$('.main-slider .slide').css({ width: slideWidth, marginLeft: - slideWidth });
	
    $('.main-slider .slide:last-child').prependTo('.main-slider');

    function moveLeft() {
    	$('.slide').css("width",slideWidth);
	 $('.main-slider').css("width",sliderUlWidth);

    	 $('.slide:first-child').animate({
            marginLeft: - slideWidth*1.7,
        }, 400, function () {
            $('.slide:first-child').appendTo('.main-slider');
            $('.slide:last-child').css("margin-left","")
            $('#slider ul').css('left', '');
        });
        
        $('.slide:nth-child(2)').animate({
            marginLeft: - slideWidth*0.7,
            opacity: 0.5
        }, 400, function () {
            
        });

        $('.slide:nth-child(3)').animate({
            marginLeft: - slideWidth*-0.333333333333333333,
            opacity: 1
        }, 400, function () {
            
        });
        
         $('.slide:nth-child(4)').animate({
         	display:block,
            marginLeft: + slideWidth*1.366,
            opacity: 0.5
        }, 400, function () {
            
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('.main-slider').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });
});

